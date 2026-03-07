// Model: Subcategory
import mongoose from 'mongoose';

const SubcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Subcategory name is required'],
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
  image: {
    type: String, // URL or path to image
    default: null
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category is required']
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Auto-generate slug from name before saving
SubcategorySchema.pre('save', async function() {
  if (this.isModified('name') || !this.slug) {
    // Generate slug from name
    let slug = this.name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

    // Check if slug already exists
    const existingSubcategory = await mongoose.models.Subcategory.findOne({ 
      slug, 
      _id: { $ne: this._id } 
    });

    if (existingSubcategory) {
      slug = `${slug}-${Date.now()}`;
    }

    this.slug = slug;
  }
});

// Method to get safe object for API response
SubcategorySchema.methods.toSafeObject = function() {
  return {
    id: this._id,
    name: this.name,
    slug: this.slug,
    description: this.description,
    image: this.image,
    categoryId: this.categoryId,
    isActive: this.isActive,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

// Static method for validation
SubcategorySchema.statics.validate = function(data) {
  const errors = {};

  if (!data.name || data.name.trim().length === 0) {
    errors.name = 'Subcategory name is required';
  }

  if (!data.categoryId) {
    errors.categoryId = 'Category is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Index for better query performance
SubcategorySchema.index({ slug: 1 });
SubcategorySchema.index({ categoryId: 1 });
SubcategorySchema.index({ isActive: 1 });

// Prevent model recompilation in development
const Subcategory = mongoose.models.Subcategory || mongoose.model('Subcategory', SubcategorySchema);

export default Subcategory;
