// Model: Inquiry
import mongoose from 'mongoose';

const InquirySchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  companyName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'resolved', 'closed'],
    default: 'new'
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    default: null
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Method to get safe object for API response
InquirySchema.methods.toSafeObject = function() {
  return {
    id: this._id,
    fullName: this.fullName,
    companyName: this.companyName,
    email: this.email,
    phone: this.phone,
    message: this.message,
    status: this.status,
    productId: this.productId,
    notes: this.notes,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

// Static method for validation
InquirySchema.statics.validate = function(data) {
  const errors = {};

  if (!data.fullName || data.fullName.trim().length === 0) {
    errors.fullName = 'Full name is required';
  }

  if (!data.email || data.email.trim().length === 0) {
    errors.email = 'Email is required';
  } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
    errors.email = 'Please enter a valid email';
  }

  if (!data.phone || data.phone.trim().length === 0) {
    errors.phone = 'Phone number is required';
  }

  if (!data.message || data.message.trim().length === 0) {
    errors.message = 'Message is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Indexes for better query performance
InquirySchema.index({ email: 1 });
InquirySchema.index({ status: 1 });
InquirySchema.index({ createdAt: -1 });

// Text index for search
InquirySchema.index({ 
  fullName: 'text', 
  companyName: 'text',
  email: 'text',
  message: 'text'
});

// Prevent model recompilation in development
const Inquiry = mongoose.models.Inquiry || mongoose.model('Inquiry', InquirySchema);

export default Inquiry;
