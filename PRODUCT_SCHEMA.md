# Product Schema Documentation

## 📋 Schema Overview

Product schema based on Figma design for "Printed Corporate Gifts Diaries"

## 🗄️ Database Fields

### Basic Information
```javascript
{
  name: String,              // "Printed Corporate Gifts Diaries"
  slug: String,              // "printed-corporate-gifts-diaries" (auto-generated)
  description: String,       // Product description
  sku: String,              // "KI-000001" (auto-generated if not provided)
}
```

### Pricing & Quantity
```javascript
{
  price: Number,                    // ₹299 (per piece)
  minimumOrderQuantity: Number,     // 100 Piece (minimum order)
}
```

### Images
```javascript
{
  images: [String],          // Array of Cloudinary URLs
  // Example: ["url1.jpg", "url2.jpg", "url3.jpg", "url4.jpg"]
  // First image is main/thumbnail
}
```

### Category & Classification
```javascript
{
  categoryId: ObjectId,      // Reference to Category (e.g., "Corporate Gifts")
  subcategoryId: ObjectId,   // Reference to Subcategory (optional)
}
```

### Product Specifications (From Design)
```javascript
{
  size: String,              // "A5" (from design)
  coverMaterial: String,     // "Paper Cover" (from design)
  bindingType: String,       // "Glue Bound" (from design)
  coverType: String,         // "Hard Cover" (from design)
  usageApplication: String,  // "Gifting" (from design)
  gsm: Number,              // 75 (paper weight from design)
  coverPrint: String,       // "Printed" (from design)
  color: String,            // "Multicolor" (from design)
}
```

### Inventory
```javascript
{
  stock: Number,            // Available quantity
}
```

### Features & Tags
```javascript
{
  features: [String],       // ["Eco-friendly", "Customizable", "Premium Quality"]
  tags: [String],          // ["diary", "corporate", "gifts", "printed"]
}
```

### Status Flags
```javascript
{
  isActive: Boolean,        // true/false (visible on website)
  isFeatured: Boolean,      // true/false (show on homepage)
  isNew: Boolean,          // true/false (new arrival badge)
  isBestseller: Boolean,   // true/false (bestseller badge)
}
```

### SEO Fields
```javascript
{
  metaTitle: String,
  metaDescription: String,
  metaKeywords: [String]
}
```

### Timestamps
```javascript
{
  createdAt: Date,          // Auto-generated
  updatedAt: Date,          // Auto-updated
}
```

## 📊 Complete Example

```javascript
{
  _id: ObjectId("..."),
  name: "Printed Corporate Gifts Diaries",
  slug: "printed-corporate-gifts-diaries",
  description: "Premium quality corporate diaries with custom printing options",
  
  // Pricing
  price: 299,
  minimumOrderQuantity: 100,
  
  // Images
  images: [
    "https://res.cloudinary.com/.../diary1.jpg",
    "https://res.cloudinary.com/.../diary2.jpg",
    "https://res.cloudinary.com/.../diary3.jpg",
    "https://res.cloudinary.com/.../diary4.jpg"
  ],
  
  // Category
  categoryId: ObjectId("507f1f77bcf86cd799439011"),
  subcategoryId: ObjectId("507f1f77bcf86cd799439012"),
  
  // Specifications
  size: "A5",
  coverMaterial: "Paper Cover",
  bindingType: "Glue Bound",
  coverType: "Hard Cover",
  usageApplication: "Gifting",
  gsm: 75,
  coverPrint: "Printed",
  color: "Multicolor",
  
  // Inventory
  sku: "KI-000001",
  stock: 500,
  
  // Features
  features: [
    "Eco-friendly paper",
    "Customizable cover design",
    "Premium quality binding"
  ],
  tags: ["diary", "corporate", "gifts", "printed", "customizable"],
  
  // Status
  isActive: true,
  isFeatured: true,
  isNew: false,
  isBestseller: true,
  
  // SEO
  metaTitle: "Printed Corporate Gifts Diaries - Kagzi India",
  metaDescription: "Premium quality corporate diaries with custom printing",
  metaKeywords: ["corporate diary", "printed diary", "gift diary"],
  
  // Timestamps
  createdAt: "2024-01-15T10:30:00Z",
  updatedAt: "2024-01-15T10:30:00Z"
}
```

## 🎯 Field Mapping from Design

| Design Field | Schema Field | Example Value |
|-------------|--------------|---------------|
| Product Name | `name` | "Printed Corporate Gifts Diaries" |
| Price | `price` | 299 |
| Minimum Order | `minimumOrderQuantity` | 100 |
| Size | `size` | "A5" |
| Cover Material | `coverMaterial` | "Paper Cover" |
| Binding Type | `bindingType` | "Glue Bound" |
| Cover Type | `coverType` | "Hard Cover" |
| Usage/Application | `usageApplication` | "Gifting" |
| GSM | `gsm` | 75 |
| Cover Print | `coverPrint` | "Printed" |
| Color | `color` | "Multicolor" |
| Product Images | `images[]` | Array of URLs |

## 🔧 Auto-Generated Fields

### Slug Generation
```
Name: "Printed Corporate Gifts Diaries"
    ↓
Lowercase: "printed corporate gifts diaries"
    ↓
Replace spaces: "printed-corporate-gifts-diaries"
    ↓
Remove special chars
    ↓
Check uniqueness
    ↓
Final: "printed-corporate-gifts-diaries"
```

### SKU Generation
```
Count existing products: 0
    ↓
Generate: "KI-" + padded number
    ↓
Result: "KI-000001"

Next product: "KI-000002"
```

## 📝 Validation Rules

### Required Fields
- ✅ `name` - Product name is required
- ✅ `price` - Price must be greater than 0
- ✅ `categoryId` - Category is required

### Optional Fields
- All specification fields (size, coverMaterial, etc.)
- Images (can be added later)
- Subcategory
- Stock (defaults to 0)
- Features & tags

### Constraints
- `price` - Must be >= 0
- `minimumOrderQuantity` - Must be >= 1
- `stock` - Must be >= 0
- `gsm` - Must be >= 0
- `slug` - Must be unique
- `sku` - Must be unique

## 🔍 Indexes

For better query performance:
```javascript
- slug (unique)
- categoryId
- subcategoryId
- sku (unique)
- isActive
- isFeatured
- price
- createdAt (descending)
- Text search on: name, description, tags
```

## 🎨 Virtual Fields

### mainImage
```javascript
// Returns first image from images array
product.mainImage // "https://res.cloudinary.com/.../diary1.jpg"
```

## 📊 Relationships

```
Category (1) ←→ (Many) Products
Subcategory (1) ←→ (Many) Products

Product references:
- categoryId → Category
- subcategoryId → Subcategory
```

## 🚀 Usage Example

### Create Product
```javascript
const product = new Product({
  name: "Printed Corporate Gifts Diaries",
  price: 299,
  minimumOrderQuantity: 100,
  categoryId: "507f1f77bcf86cd799439011",
  size: "A5",
  coverMaterial: "Paper Cover",
  bindingType: "Glue Bound",
  coverType: "Hard Cover",
  usageApplication: "Gifting",
  gsm: 75,
  coverPrint: "Printed",
  color: "Multicolor",
  images: ["url1.jpg", "url2.jpg"],
  isActive: true
});

await product.save();
// Auto-generates: slug, sku
```

### Query Products
```javascript
// Get all active products
Product.find({ isActive: true })

// Get by category
Product.find({ categoryId: "..." })

// Get featured products
Product.find({ isFeatured: true })

// Search products
Product.find({ $text: { $search: "diary corporate" } })

// Get with populated category
Product.find().populate('categoryId subcategoryId')
```

## 📱 API Response Format

```javascript
{
  success: true,
  data: {
    id: "507f1f77bcf86cd799439011",
    name: "Printed Corporate Gifts Diaries",
    slug: "printed-corporate-gifts-diaries",
    price: 299,
    minimumOrderQuantity: 100,
    mainImage: "https://res.cloudinary.com/.../diary1.jpg",
    images: ["url1.jpg", "url2.jpg", "url3.jpg"],
    size: "A5",
    coverMaterial: "Paper Cover",
    // ... all other fields
    category: {
      id: "...",
      name: "Corporate Gifts",
      slug: "corporate-gifts"
    },
    subcategory: {
      id: "...",
      name: "Diaries",
      slug: "diaries"
    }
  }
}
```

---

**Schema Ready!** 🎉

Product schema design ke according complete hai with all specifications!
