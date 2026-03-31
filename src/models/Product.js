// Model: Product
import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  
  // Pricing
  price: {
    type: Number,
    min: 0
  },
  minimumOrderQuantity: {
    type: Number,
    default: 1,
    min: 1
  },
  
  // Images (multiple)
  images: [{
    type: String // Cloudinary URLs
  }],
  
  // Category & Subcategory
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category is required']
  },
  subcategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subcategory',
    default: null
  },
  
  // Product Specifications
  size: {
    type: String, // e.g., "A5", "A4", "Custom"
    trim: true
  },
  coverMaterial: {
    type: String, // e.g., "Paper Cover", "Leather", "Cloth"
    trim: true
  },
  bindingType: {
    type: String, // e.g., "Glue Bound", "Spiral", "Stitched"
    trim: true
  },
  coverType: {
    type: String, // e.g., "Hard Cover", "Soft Cover"
    trim: true
  },
  usageApplication: {
    type: String, // e.g., "Gifting", "Office Use", "Personal"
    trim: true
  },
  gsm: {
    type: Number, // Paper weight (e.g., 75, 80, 100)
    min: 0
  },
  coverPrint: {
    type: String, // e.g., "Printed", "Plain", "Embossed"
    trim: true
  },
  color: {
    type: String, // e.g., "Multicolor", "White", "Custom"
    trim: true
  },
  
  // Additional Details
  stock: {
    type: Number,
    default: 0,
    min: 0
  },
  
  // Tags
  tags: [{
    type: String
  }],
  
  // Status Flags
  isActive: {
    type: Boolean,
    default: true
  },
  
  // SEO
  metaTitle: {
    type: String,
    trim: true
  },
  metaDescription: {
    type: String,
    trim: true
  },
  metaKeywords: [{
    type: String
  }]
}, {
  timestamps: true
});

// Auto-generate slug from name before saving
ProductSchema.pre('save', async function() {
  if (this.isModified('name') || !this.slug) {
    let slug = this.name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

    const existingProduct = await mongoose.models.Product.findOne({ 
      slug, 
      _id: { $ne: this._id } 
    });

    if (existingProduct) {
      slug = `${slug}-${Date.now()}`;
    }

    this.slug = slug;
  }
});

// Indexes for better query performance
ProductSchema.virtual('mainImage').get(function() {
  return this.images && this.images.length > 0 ? this.images[0] : null;
});

// Method to get safe object for API response
ProductSchema.methods.toSafeObject = function() {
  return {
    id: this._id,
    name: this.name,
    slug: this.slug,
    description: this.description,
    minimumOrderQuantity: this.minimumOrderQuantity,
    images: this.images,
    mainImage: this.mainImage,
    categoryId: this.categoryId,
    subcategoryId: this.subcategoryId,
    size: this.size,
    coverMaterial: this.coverMaterial,
    bindingType: this.bindingType,
    coverType: this.coverType,
    usageApplication: this.usageApplication,
    gsm: this.gsm,
    coverPrint: this.coverPrint,
    color: this.color,
    stock: this.stock,
    tags: this.tags,
    isActive: this.isActive,
    metaTitle: this.metaTitle,
    metaDescription: this.metaDescription,
    metaKeywords: this.metaKeywords,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

// Static method for validation
ProductSchema.statics.validate = function(data) {
  const errors = {};

  if (!data.name || data.name.trim().length === 0) {
    errors.name = 'Product name is required';
  }

  if (!data.categoryId) {
    errors.categoryId = 'Category is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Indexes for better query performance
ProductSchema.index({ slug: 1 });
ProductSchema.index({ categoryId: 1 });
ProductSchema.index({ subcategoryId: 1 });
ProductSchema.index({ isActive: 1 });
ProductSchema.index({ createdAt: -1 });

// Text index for search
ProductSchema.index({ 
  name: 'text', 
  description: 'text', 
  tags: 'text' 
});

// Prevent model recompilation in development
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default Product;
