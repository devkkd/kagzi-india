// Model: Customer Inquiry (Contact Form Submissions)
import mongoose from 'mongoose';

const CustomerInquirySchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  companyName: {
    type: String,
    trim: true,
    default: ''
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true
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
  }
}, {
  timestamps: true
});

// Index for search
CustomerInquirySchema.index({ fullName: 'text', email: 'text', phone: 'text', companyName: 'text' });

export default mongoose.models.CustomerInquiry || mongoose.model('CustomerInquiry', CustomerInquirySchema);
