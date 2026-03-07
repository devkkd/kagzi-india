// Controller: Inquiry
import connectDB from '@/lib/mongodb';
import Inquiry from '@/models/Inquiry';
import Product from '@/models/Product';

class InquiryController {
  // Create new inquiry
  static async createInquiry(data) {
    try {
      await connectDB();

      // Validate data
      const validation = Inquiry.validate(data);
      if (!validation.isValid) {
        return {
          success: false,
          message: 'Validation failed',
          errors: validation.errors
        };
      }

      const inquiry = new Inquiry(data);
      await inquiry.save();

      return {
        success: true,
        message: 'Inquiry submitted successfully',
        data: inquiry.toSafeObject()
      };
    } catch (error) {
      console.error('Create inquiry error:', error);
      return {
        success: false,
        message: error.message || 'Failed to create inquiry'
      };
    }
  }

  // Get all inquiries with optional filters
  static async getAllInquiries(filters = {}) {
    try {
      await connectDB();

      const query = {};

      // Filter by status
      if (filters.status) {
        query.status = filters.status;
      }

      // Search by text
      if (filters.search) {
        query.$text = { $search: filters.search };
      }

      const inquiries = await Inquiry.find(query)
        .populate('productId', 'name slug mainImage')
        .sort({ createdAt: -1 })
        .lean();

      const safeInquiries = inquiries.map(inquiry => ({
        id: inquiry._id,
        fullName: inquiry.fullName,
        companyName: inquiry.companyName,
        email: inquiry.email,
        phone: inquiry.phone,
        message: inquiry.message,
        status: inquiry.status,
        product: inquiry.productId,
        notes: inquiry.notes,
        createdAt: inquiry.createdAt,
        updatedAt: inquiry.updatedAt
      }));

      return {
        success: true,
        data: safeInquiries
      };
    } catch (error) {
      console.error('Get inquiries error:', error);
      return {
        success: false,
        message: error.message || 'Failed to fetch inquiries'
      };
    }
  }

  // Get single inquiry by ID
  static async getInquiryById(id) {
    try {
      await connectDB();

      const inquiry = await Inquiry.findById(id)
        .populate('productId', 'name slug mainImage price')
        .lean();

      if (!inquiry) {
        return {
          success: false,
          message: 'Inquiry not found'
        };
      }

      return {
        success: true,
        data: {
          id: inquiry._id,
          fullName: inquiry.fullName,
          companyName: inquiry.companyName,
          email: inquiry.email,
          phone: inquiry.phone,
          message: inquiry.message,
          status: inquiry.status,
          product: inquiry.productId,
          notes: inquiry.notes,
          createdAt: inquiry.createdAt,
          updatedAt: inquiry.updatedAt
        }
      };
    } catch (error) {
      console.error('Get inquiry error:', error);
      return {
        success: false,
        message: error.message || 'Failed to fetch inquiry'
      };
    }
  }

  // Update inquiry (mainly for status and notes)
  static async updateInquiry(id, data) {
    try {
      await connectDB();

      const inquiry = await Inquiry.findById(id);

      if (!inquiry) {
        return {
          success: false,
          message: 'Inquiry not found'
        };
      }

      // Update allowed fields
      if (data.status) inquiry.status = data.status;
      if (data.notes !== undefined) inquiry.notes = data.notes;

      await inquiry.save();

      return {
        success: true,
        message: 'Inquiry updated successfully',
        data: inquiry.toSafeObject()
      };
    } catch (error) {
      console.error('Update inquiry error:', error);
      return {
        success: false,
        message: error.message || 'Failed to update inquiry'
      };
    }
  }

  // Delete inquiry
  static async deleteInquiry(id) {
    try {
      await connectDB();

      const inquiry = await Inquiry.findByIdAndDelete(id);

      if (!inquiry) {
        return {
          success: false,
          message: 'Inquiry not found'
        };
      }

      return {
        success: true,
        message: 'Inquiry deleted successfully'
      };
    } catch (error) {
      console.error('Delete inquiry error:', error);
      return {
        success: false,
        message: error.message || 'Failed to delete inquiry'
      };
    }
  }

  // Get inquiry statistics
  static async getInquiryStats() {
    try {
      await connectDB();

      const total = await Inquiry.countDocuments();
      const newCount = await Inquiry.countDocuments({ status: 'new' });
      const contactedCount = await Inquiry.countDocuments({ status: 'contacted' });
      const resolvedCount = await Inquiry.countDocuments({ status: 'resolved' });
      const closedCount = await Inquiry.countDocuments({ status: 'closed' });

      return {
        success: true,
        data: {
          total,
          new: newCount,
          contacted: contactedCount,
          resolved: resolvedCount,
          closed: closedCount
        }
      };
    } catch (error) {
      console.error('Get inquiry stats error:', error);
      return {
        success: false,
        message: error.message || 'Failed to fetch inquiry statistics'
      };
    }
  }
}

export default InquiryController;
