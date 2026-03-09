// Controller: Customer Inquiry Management
import CustomerInquiry from '../models/CustomerInquiry.js';
import connectDB from '../lib/mongodb.js';
import { sendInquiryNotification, sendCustomerConfirmation } from '../lib/emailService.js';

// Get all customer inquiries with filters
export const getAllCustomerInquiries = async (req) => {
  try {
    await connectDB();

    const { status, search } = req.nextUrl.searchParams;
    
    let query = {};

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Search by name, email, phone, or company
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { companyName: { $regex: search, $options: 'i' } }
      ];
    }

    const inquiries = await CustomerInquiry.find(query)
      .sort({ createdAt: -1 });

    return {
      success: true,
      data: inquiries
    };
  } catch (error) {
    console.error('Get customer inquiries error:', error);
    return {
      success: false,
      message: error.message || 'Failed to fetch customer inquiries'
    };
  }
};

// Create new customer inquiry
export const createCustomerInquiry = async (data) => {
  try {
    await connectDB();

    const inquiry = await CustomerInquiry.create(data);

    // Send email notifications (don't block the response if email fails)
    try {
      // Send notification to admin
      await sendInquiryNotification({
        name: inquiry.fullName,
        email: inquiry.email,
        phone: inquiry.phone,
        company: inquiry.companyName,
        message: inquiry.message,
      });

      // Send confirmation to customer
      await sendCustomerConfirmation({
        name: inquiry.fullName,
        email: inquiry.email,
        message: inquiry.message,
      });
    } catch (emailError) {
      console.error('Email notification error:', emailError);
      // Continue even if email fails
    }

    return {
      success: true,
      data: inquiry,
      message: 'Inquiry submitted successfully'
    };
  } catch (error) {
    console.error('Create customer inquiry error:', error);
    return {
      success: false,
      message: error.message || 'Failed to submit inquiry'
    };
  }
};

// Get single customer inquiry by ID
export const getCustomerInquiryById = async (id) => {
  try {
    await connectDB();

    const inquiry = await CustomerInquiry.findById(id);

    if (!inquiry) {
      return {
        success: false,
        message: 'Customer inquiry not found'
      };
    }

    return {
      success: true,
      data: inquiry
    };
  } catch (error) {
    console.error('Get customer inquiry error:', error);
    return {
      success: false,
      message: error.message || 'Failed to fetch customer inquiry'
    };
  }
};

// Update customer inquiry status
export const updateCustomerInquiry = async (id, data) => {
  try {
    await connectDB();

    const inquiry = await CustomerInquiry.findByIdAndUpdate(
      id,
      data,
      { new: true, runValidators: true }
    );

    if (!inquiry) {
      return {
        success: false,
        message: 'Customer inquiry not found'
      };
    }

    return {
      success: true,
      data: inquiry,
      message: 'Customer inquiry updated successfully'
    };
  } catch (error) {
    console.error('Update customer inquiry error:', error);
    return {
      success: false,
      message: error.message || 'Failed to update customer inquiry'
    };
  }
};

// Delete customer inquiry
export const deleteCustomerInquiry = async (id) => {
  try {
    await connectDB();

    const inquiry = await CustomerInquiry.findByIdAndDelete(id);

    if (!inquiry) {
      return {
        success: false,
        message: 'Customer inquiry not found'
      };
    }

    return {
      success: true,
      message: 'Customer inquiry deleted successfully'
    };
  } catch (error) {
    console.error('Delete customer inquiry error:', error);
    return {
      success: false,
      message: error.message || 'Failed to delete customer inquiry'
    };
  }
};
