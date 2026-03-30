import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import Category from '@/models/Category';
import Subcategory from '@/models/Subcategory';
import { uploadToCloudinary } from '@/lib/cloudinary';
import * as XLSX from 'xlsx';

// Normalize header names: remove spaces, lowercase, handle common variations
function normalizeHeader(header) {
  if (!header) return '';
  const h = header.toString().trim().toLowerCase().replace(/[\s\-_]+/g, '');
  const map = {
    'name': 'name',
    'description': 'description',
    'price': 'price',
    'minimumorderquantity': 'minimumOrderQuantity',
    'minorderqty': 'minimumOrderQuantity',
    'moq': 'minimumOrderQuantity',
    'categoryid': 'categoryId',
    'category': 'categoryId',
    'subcategoryid': 'subcategoryId',
    'subcategory': 'subcategoryId',
    'size': 'size',
    'covermaterial': 'coverMaterial',
    'bindingtype': 'bindingType',
    'covertype': 'coverType',
    'usageapplication': 'usageApplication',
    'usage': 'usageApplication',
    'gsm': 'gsm',
    'coverprint': 'coverPrint',
    'color': 'color',
    'colour': 'color',
    'stock': 'stock',
    'tags': 'tags',
    'imagepaths': 'imagePaths',
    'images': 'imagePaths',
  };
  return map[h] || h;
}

// Parse file - supports both CSV and XLSX
async function parseFile(file) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = file.name.toLowerCase();

  let rawRows = [];

  if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    rawRows = XLSX.utils.sheet_to_json(sheet, { defval: '' });
  } else {
    // CSV fallback
    const csvText = buffer.toString('utf-8');
    const lines = csvText.split('\n').filter(l => l.trim());
    if (lines.length < 2) throw new Error('CSV file is empty or invalid');

    const parseLine = (line) => {
      const values = [];
      let current = '';
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
          else inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          values.push(current.trim()); current = '';
        } else {
          current += char;
        }
      }
      values.push(current.trim());
      return values;
    };

    const headers = parseLine(lines[0]);
    for (let i = 1; i < lines.length; i++) {
      const values = parseLine(lines[i]);
      const row = {};
      headers.forEach((h, idx) => { row[h] = values[idx] || ''; });
      rawRows.push(row);
    }
  }

  // Normalize all header keys
  return rawRows.map(row => {
    const normalized = {};
    for (const key of Object.keys(row)) {
      const normKey = normalizeHeader(key);
      normalized[normKey] = row[key];
    }
    return normalized;
  });
}

async function uploadImageFromPath(imagePath, uploadedFilesMap) {
  const trimmed = imagePath.trim();

  // If it's a URL, upload directly to Cloudinary
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    const result = await uploadToCloudinary(trimmed, 'kagzi-products');
    if (!result.success) throw new Error(result.error || 'Upload failed');
    return result.url;
  }

  // Extract just the filename (ignore any path prefix like C:/Users/...)
  const fileName = trimmed.replace(/\\/g, '/').split('/').pop();

  // Look for the file in uploaded images map (keyed by filename)
  const fileBuffer = uploadedFilesMap[fileName];
  if (!fileBuffer) {
    throw new Error(`Image "${fileName}" not found in uploaded files. Make sure to select this image file in the Images field.`);
  }

  // Convert buffer to base64 data URI for Cloudinary
  const base64 = fileBuffer.toString('base64');
  const mimeType = fileName.match(/\.png$/i) ? 'image/png' : fileName.match(/\.gif$/i) ? 'image/gif' : 'image/jpeg';
  const dataUri = `data:${mimeType};base64,${base64}`;

  const result = await uploadToCloudinary(dataUri, 'kagzi-products');
  if (!result.success) throw new Error(result.error || 'Upload failed');
  return result.url;
}

async function findCategory(nameOrId) {
  if (!nameOrId) return null;
  const val = nameOrId.toString().trim();
  if (val.match(/^[0-9a-fA-F]{24}$/)) {
    const cat = await Category.findById(val);
    if (cat) return cat._id;
  }
  const cat = await Category.findOne({ name: { $regex: new RegExp(`^${val}$`, 'i') } });
  return cat ? cat._id : null;
}

async function findSubcategory(nameOrId, categoryId) {
  if (!nameOrId) return null;
  const val = nameOrId.toString().trim();
  if (val.match(/^[0-9a-fA-F]{24}$/)) {
    const sub = await Subcategory.findById(val);
    if (sub) return sub._id;
  }
  const query = { name: { $regex: new RegExp(`^${val}$`, 'i') } };
  if (categoryId) query.categoryId = categoryId;
  const sub = await Subcategory.findOne(query);
  return sub ? sub._id : null;
}

export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ success: false, message: 'No file uploaded' }, { status: 400 });
    }

    // Build a map of filename -> Buffer for all uploaded image files
    const uploadedFilesMap = {};
    const imageFiles = formData.getAll('images');
    for (const imgFile of imageFiles) {
      if (imgFile && imgFile.name) {
        const buffer = Buffer.from(await imgFile.arrayBuffer());
        uploadedFilesMap[imgFile.name] = buffer;
      }
    }

    const rows = await parseFile(file);

    const results = { total: rows.length, successful: 0, failed: 0, errors: [] };

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];

      // Skip rows that look like secondary header rows
      if (row.name && row.name.toString().toLowerCase() === 'name') {
        results.total--;
        continue;
      }

      // Skip completely empty rows
      if (!row.name || row.name.toString().trim() === '') {
        results.total--;
        continue;
      }

      try {
        const categoryId = await findCategory(row.categoryId);
        if (!categoryId) {
          results.errors.push(`Row ${i + 2}: Category not found: "${row.categoryId}"`);
          results.failed++;
          continue;
        }

        let subcategoryId = null;
        if (row.subcategoryId && row.subcategoryId.toString().trim()) {
          subcategoryId = await findSubcategory(row.subcategoryId.toString().trim(), categoryId);
          if (!subcategoryId) {
            results.errors.push(`Row ${i + 2}: Warning - Subcategory not found: "${row.subcategoryId}" (continuing without subcategory)`);
          }
        }

        // Upload images
        const imagePaths = row.imagePaths ? row.imagePaths.toString().split('|').map(p => p.trim()).filter(Boolean) : [];
        const uploadedImages = [];
        for (const imgPath of imagePaths) {
          try {
            const url = await uploadImageFromPath(imgPath, uploadedFilesMap);
            uploadedImages.push(url);
          } catch (imgErr) {
            results.errors.push(`Row ${i + 2}: Image upload failed for "${imgPath}" - ${imgErr.message}`);
          }
        }

        const price = parseFloat(row.price) || 0;

        const productData = {
          name: row.name.toString().trim(),
          description: row.description ? row.description.toString().trim() : '',
          price,
          minimumOrderQuantity: parseInt(row.minimumOrderQuantity) || 1,
          images: uploadedImages,
          categoryId,
          subcategoryId,
          size: row.size ? row.size.toString().trim() : '',
          coverMaterial: row.coverMaterial ? row.coverMaterial.toString().trim() : '',
          bindingType: row.bindingType ? row.bindingType.toString().trim() : '',
          coverType: row.coverType ? row.coverType.toString().trim() : '',
          usageApplication: row.usageApplication ? row.usageApplication.toString().trim() : '',
          gsm: row.gsm ? row.gsm.toString().trim() : '',
          coverPrint: row.coverPrint ? row.coverPrint.toString().trim() : '',
          color: row.color ? row.color.toString().trim() : '',
          stock: parseInt(row.stock) || 0,
          tags: row.tags ? row.tags.toString().split('|').map(t => t.trim()).filter(Boolean) : [],
          isActive: true
        };

        if (!productData.name) {
          results.errors.push(`Row ${i + 2}: Missing required field: name`);
          results.failed++;
          continue;
        }

        await Product.create(productData);
        results.successful++;

      } catch (error) {
        console.error(`Error processing row ${i + 2}:`, error);
        results.errors.push(`Row ${i + 2}: ${error.message}`);
        results.failed++;
      }
    }

    return NextResponse.json({ success: true, results });

  } catch (error) {
    console.error('Bulk upload error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Bulk upload failed', errors: [error.message] },
      { status: 500 }
    );
  }
}
