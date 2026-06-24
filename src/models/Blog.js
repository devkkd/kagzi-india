// Model: Blog
import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Blog title is required'],
    trim: true,
    unique: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Blog content is required']
  },
  excerpt: {
    type: String,
    trim: true
  },
  image: {
    type: String, // Cloudinary image URL
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  },
  author: {
    type: String,
    default: 'Admin',
    trim: true
  },
  readTime: {
    type: Number,
    default: 5
  },
  metaTitle: {
    type: String,
    trim: true
  },
  metaDescription: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    default: 'General',
    trim: true
  }
}, {
  timestamps: true // Adds createdAt and updatedAt
});

// Auto-generate slug from title before saving
BlogSchema.pre('save', async function() {
  if (this.isModified('title') || !this.slug) {
    let slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen

    // Check if slug already exists
    const existingBlog = await mongoose.models.Blog.findOne({ 
      slug, 
      _id: { $ne: this._id } 
    });

    if (existingBlog) {
      slug = `${slug}-${Date.now()}`;
    }

    this.slug = slug;
  }
});

// Method to get safe object for API response
BlogSchema.methods.toSafeObject = function() {
  return {
    id: this._id,
    title: this.title,
    slug: this.slug,
    content: this.content,
    excerpt: this.excerpt,
    image: this.image,
    isActive: this.isActive,
    author: this.author,
    readTime: this.readTime,
    metaTitle: this.metaTitle,
    metaDescription: this.metaDescription,
    category: this.category,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

// Static method for validation
BlogSchema.statics.validate = function(data) {
  const errors = {};

  if (!data.title || data.title.trim().length === 0) {
    errors.title = 'Blog title is required';
  } else if (data.title.length > 200) {
    errors.title = 'Blog title must be less than 200 characters';
  }

  if (!data.content || data.content.trim().length === 0) {
    errors.content = 'Blog content is required';
  }

  if (data.readTime !== undefined && (isNaN(data.readTime) || data.readTime < 1)) {
    errors.readTime = 'Read time must be a valid number of at least 1 minute';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Index for better query performance
BlogSchema.index({ isActive: 1 });

const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

export default Blog;
