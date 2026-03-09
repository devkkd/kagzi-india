import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import Category from '@/models/Category';
import Subcategory from '@/models/Subcategory';
import { uploadToCloudinary } from '@/lib/cloudinary';
import fs from 'fs';
import path from 'path';

// Helper function to upload image to Cloudinary from local path
async function uploadImageFromPath(imagePath) {
  try {
    // Normalize path and handle spaces
    const normalizedPath = imagePath.trim().replace(/\\/g, '/');
    
    // Check if file exists
    if (!fs.existsSync(normalizedPath)) {
      throw new Error(`File not found: ${normalizedPath}`);
    }

    // Use existing cloudinary utility
    const result = await uploadToCloudinary(normalizedPath, 'kagzi-products');
    
    if (!result.success) {
      throw new Error(result.error || 'Upload failed');
    }

    return result.url;
  } catch (error) {
    console.error('Image upload error:', error);
    throw error;
  }
}

// Helper function to find category by name or ID
async function findCategory(nameOrId) {
  if (!nameOrId) return null;
  
  // Try to find by ID first
  if (nameOrId.match(/^[0-9a-fA-F]{24}$/)) {
    const category = await Category.findById(nameOrId);
    if (category) return category._id;
  }
  
  // Find by name (case-insensitive)
  const category = await Category.findOne({ 
    name: { $regex: new RegExp(`^${nameOrId}$`, 'i') } 
  });
  
  return category ? category._id : null;
}

// Helper function to find subcategory by name or ID
async function findSubcategory(nameOrId, categoryId) {
  if (!nameOrId) return null;
  
  // Try to find by ID first
  if (nameOrId.match(/^[0-9a-fA-F]{24}$/)) {
    const subcategory = await Subcategory.findById(nameOrId);
    if (subcategory) return subcategory._id;
  }
  
  // Find by name (case-insensitive) and category
  const query = { 
    name: { $regex: new RegExp(`^${nameOrId}$`, 'i') }
  };
  
  if (categoryId) {
    query.categoryId = categoryId;
  }
  
  const subcategory = await Subcategory.findOne(query);
  return subcategory ? subcategory._id : null;
}

// Parse CSV data with proper handling of quoted values
function parseCSV(csvText) {
  const lines = csvText.split('\n').filter(line => line.trim());
  if (lines.length < 2) {
    throw new Error('CSV file is empty or invalid');
  }

  // Parse CSV line considering quotes
  const parseLine = (line) => {
    const values = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      const nextChar = line[i + 1];

      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          // Escaped quote
          current += '"';
          i++; // Skip next quote
        } else {
          // Toggle quote state
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        // End of value
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    // Add last value
    values.push(current.trim());
    return values;
  };

  const headers = parseLine(lines[0]);
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseLine(lines[i]);
    const row = {};
    
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });
    
    rows.push(row);
  }

  return rows;
}

export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Read CSV file
    const csvText = await file.text();
    const rows = parseCSV(csvText);

    const results = {
      total: rows.length,
      successful: 0,
      failed: 0,
      errors: []
    };

    // Process each row
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      
      try {
        // Find category by name or ID
        const categoryId = await findCategory(row.categoryId || row.category);
        if (!categoryId) {
          results.errors.push(`Row ${i + 2}: Category not found: ${row.categoryId || row.category}`);
          results.failed++;
          continue;
        }

        // Find subcategory by name or ID (optional)
        let subcategoryId = null;
        if (row.subcategoryId || row.subcategory) {
          subcategoryId = await findSubcategory(row.subcategoryId || row.subcategory, categoryId);
          if (!subcategoryId) {
            results.errors.push(`Row ${i + 2}: Warning - Subcategory not found: ${row.subcategoryId || row.subcategory} (continuing without subcategory)`);
          }
        }

        // Upload images from local paths
        const imagePaths = row.imagePaths ? row.imagePaths.split('|').map(p => p.trim()) : [];
        const uploadedImages = [];

        for (const imagePath of imagePaths) {
          if (imagePath) {
            try {
              const imageUrl = await uploadImageFromPath(imagePath);
              uploadedImages.push(imageUrl);
            } catch (imgError) {
              results.errors.push(`Row ${i + 2}: Failed to upload image ${imagePath} - ${imgError.message}`);
            }
          }
        }

        // Prepare product data
        const productData = {
          name: row.name,
          description: row.description,
          price: parseFloat(row.price) || 0,
          minimumOrderQuantity: parseInt(row.minimumOrderQuantity) || 1,
          images: uploadedImages,
          categoryId: categoryId,
          subcategoryId: subcategoryId,
          size: row.size || '',
          coverMaterial: row.coverMaterial || '',
          bindingType: row.bindingType || '',
          coverType: row.coverType || '',
          usageApplication: row.usageApplication || '',
          gsm: row.gsm || '',
          coverPrint: row.coverPrint || '',
          color: row.color || '',
          stock: parseInt(row.stock) || 0,
          tags: row.tags ? row.tags.split('|').map(t => t.trim()) : [],
          isActive: true
        };

        // Validate required fields
        if (!productData.name || !productData.price) {
          results.errors.push(`Row ${i + 2}: Missing required fields (name or price)`);
          results.failed++;
          continue;
        }

        // Create product
        await Product.create(productData);
        results.successful++;

      } catch (error) {
        console.error(`Error processing row ${i + 2}:`, error);
        results.errors.push(`Row ${i + 2}: ${error.message}`);
        results.failed++;
      }
    }

    return NextResponse.json({
      success: true,
      results
    });

  } catch (error) {
    console.error('Bulk upload error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error.message || 'Bulk upload failed',
        errors: [error.message]
      },
      { status: 500 }
    );
  }
}
