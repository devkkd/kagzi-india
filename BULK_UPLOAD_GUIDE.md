# Bulk Product Upload Guide

## Overview
Bulk upload feature allows you to upload multiple products at once using a CSV file. The system automatically uploads images from local paths to Cloudinary and creates products in the database.

## Process Flow

```
1. Download CSV Template
   ↓
2. Fill Product Data in CSV
   ↓
3. Add Local Image Paths
   ↓
4. Upload CSV File
   ↓
5. System Processes:
   - Reads CSV data
   - Uploads images to Cloudinary
   - Creates products in database
   ↓
6. View Results (Success/Failed counts)
```

## Step-by-Step Guide

### Step 1: Download Template
1. Go to Admin Panel → Bulk Upload
2. Click "Download Template" button
3. A CSV file will be downloaded with all required fields

### Step 2: Fill CSV Data

#### Required Fields:
- `name` - Product name (Required)
- `price` - Product price in rupees (Required)
- `categoryId` - MongoDB ObjectId of category (Required)

#### Optional Fields:
- `description` - Product description
- `minimumOrderQuantity` - Minimum order quantity (default: 1)
- `subcategoryId` - MongoDB ObjectId of subcategory
- `size` - Product size (e.g., "A5 (148 x 210 mm)")
- `coverMaterial` - Material used for cover
- `bindingType` - Type of binding
- `coverType` - Type of cover
- `usageApplication` - Usage/Application
- `gsm` - GSM value
- `coverPrint` - Cover print type
- `color` - Product color
- `stock` - Available stock quantity
- `features` - Features separated by | (pipe)
- `tags` - Tags separated by | (pipe)
- `imagePaths` - Local image paths separated by | (pipe)

#### Example CSV Row:
```csv
name,description,price,minimumOrderQuantity,categoryId,subcategoryId,size,coverMaterial,bindingType,coverType,usageApplication,gsm,coverPrint,color,stock,features,tags,imagePaths
Premium Notebook,High quality handmade notebook,299,50,65a1b2c3d4e5f6g7h8i9j0k1,65a1b2c3d4e5f6g7h8i9j0k2,A5 (148 x 210 mm),Handmade Paper,Thread Binding,Hard Cover,Office,120,Screen Print,Natural Brown,100,Eco-friendly|Recyclable|Handmade,notebook|diary|journal,C:/images/notebook1.jpg|C:/images/notebook2.jpg
```

### Step 3: Image Paths

#### Important Notes:
- Use **full local file paths** (absolute paths)
- Separate multiple images with `|` (pipe symbol)
- Images will be automatically uploaded to Cloudinary
- Supported formats: JPG, PNG, WEBP

#### Windows Path Examples:
```
C:/Users/Admin/Pictures/product1.jpg
D:/Images/Products/notebook.png
E:/Photos/diary1.jpg|E:/Photos/diary2.jpg
```

#### Linux/Mac Path Examples:
```
/home/user/images/product1.jpg
/Users/admin/Pictures/notebook.png
/var/www/images/product1.jpg|/var/www/images/product2.jpg
```

### Step 4: Upload CSV

1. Click "Choose File" or drag & drop CSV file
2. Click "Upload and Process"
3. Wait for processing (progress bar will show)
4. View results:
   - ✅ Successful uploads
   - ❌ Failed uploads with error messages
   - 📊 Total processed

## Technical Details

### API Endpoint
```
POST /api/products/bulk-upload
Content-Type: multipart/form-data
```

### Process:
1. **CSV Parsing**: Reads and validates CSV data
2. **Image Upload**: For each product:
   - Reads image from local path
   - Uploads to Cloudinary (folder: `kagzi-products`)
   - Applies transformations (max 1200x1200, auto quality)
   - Gets secure URL
3. **Product Creation**: Creates product in MongoDB with:
   - Auto-generated slug (from name)
   - Auto-generated SKU (KI-000001 format)
   - Uploaded image URLs
   - All product specifications

### Error Handling:
- Invalid CSV format → Error message
- Missing required fields → Skip row, log error
- Image upload failure → Log error, continue with other images
- Database error → Skip product, log error

### Response Format:
```json
{
  "success": true,
  "results": {
    "total": 10,
    "successful": 8,
    "failed": 2,
    "errors": [
      "Row 3: Failed to upload image - File not found",
      "Row 7: Missing required field: categoryId"
    ]
  }
}
```

## Best Practices

### 1. Prepare Images First
- Organize all product images in one folder
- Use consistent naming (e.g., product1_img1.jpg, product1_img2.jpg)
- Optimize images before upload (recommended: < 5MB per image)

### 2. Get Category IDs
- Go to Admin → Categories
- Copy MongoDB ObjectId for each category
- Keep a reference list

### 3. Test with Small Batch
- Start with 2-3 products
- Verify everything works correctly
- Then upload larger batches

### 4. Use Pipe Separator
- Features: `Eco-friendly|Recyclable|Handmade`
- Tags: `notebook|diary|journal`
- Images: `path1.jpg|path2.jpg|path3.jpg`

### 5. Check Results
- Review success/failed counts
- Fix errors in CSV
- Re-upload failed products

## Troubleshooting

### Common Issues:

#### 1. "File not found" Error
- **Cause**: Image path is incorrect
- **Solution**: Use full absolute path, check file exists

#### 2. "Missing required fields" Error
- **Cause**: name, price, or categoryId is empty
- **Solution**: Fill all required fields

#### 3. "Invalid categoryId" Error
- **Cause**: Category doesn't exist in database
- **Solution**: Use valid MongoDB ObjectId from Categories page

#### 4. Image Upload Fails
- **Cause**: Cloudinary credentials issue or file format
- **Solution**: Check .env file, use supported formats (JPG, PNG)

#### 5. CSV Parse Error
- **Cause**: Invalid CSV format
- **Solution**: Use template, don't modify headers

## Security Notes

- Only admin users can access bulk upload
- File size limit: 10MB per CSV
- Image size limit: 10MB per image
- Cloudinary folder: `kagzi-products` (organized)
- All uploads are logged for audit

## Performance

- **Small batch** (1-10 products): ~30 seconds
- **Medium batch** (10-50 products): ~2-5 minutes
- **Large batch** (50-100 products): ~5-10 minutes

*Processing time depends on:*
- Number of images per product
- Image file sizes
- Internet speed
- Server load

## Support

For issues or questions:
- Check error messages in results
- Review this guide
- Contact technical support

---

**Last Updated**: 2024
**Version**: 1.0.0
