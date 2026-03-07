// Model: Category
import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    trim: true,
    unique: true
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
  image: {
    type: String, // URL or path to image
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true // Adds createdAt and updatedAt
});

// Auto-generate slug from name before saving
CategorySchema.pre('save', async function() {
  if (this.isModified('name') || !this.slug) {
    // Generate slug from name
    let slug = this.name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen

    // Check if slug already exists
    const existingCategory = await mongoose.models.Category.findOne({ 
      slug, 
      _id: { $ne: this._id } 
    });

    if (existingCategory) {
      // Add timestamp to make it unique
      slug = `${slug}-${Date.now()}`;
    }

    this.slug = slug;
  }
});

// Method to get safe object for API response
CategorySchema.methods.toSafeObject = function() {
  return {
    id: this._id,
    name: this.name,
    slug: this.slug,
    description: this.description,
    image: this.image,
    isActive: this.isActive,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

// Static method for validation
CategorySchema.statics.validate = function(data) {
  const errors = {};

  if (!data.name || data.name.trim().length === 0) {
    errors.name = 'Category name is required';
  }

  if (data.name && data.name.length > 100) {
    errors.name = 'Category name must be less than 100 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Index for better query performance
CategorySchema.index({ slug: 1 });
CategorySchema.index({ isActive: 1 });

// Prevent model recompilation in development
const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

export default Category;
