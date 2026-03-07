// Controller: Admin Authentication & Management
import Admin from '../models/Admin';
import connectDB from '../lib/mongodb';
import { generateToken } from '../utils/auth';

class AdminController {
  // Login handler
  static async login(email, password) {
    try {
      // Connect to database
      await connectDB();

      // Validate input
      const validation = Admin.validate({ email, password });
      if (!validation.isValid) {
        return {
          success: false,
          message: 'Validation failed',
          errors: validation.errors
        };
      }

      // Find admin by email
      const admin = await Admin.findOne({ email: email.toLowerCase() });
      
      if (!admin) {
        return {
          success: false,
          message: 'Invalid credentials'
        };
      }

      // Verify password using model method
      const isPasswordValid = await admin.comparePassword(password);
      
      if (!isPasswordValid) {
        return {
          success: false,
          message: 'Invalid credentials'
        };
      }

      // Update last login
      admin.lastLogin = new Date();
      await admin.save();

      // Generate JWT token
      const token = generateToken({
        id: admin._id,
        email: admin.email,
        role: admin.role
      });

      return {
        success: true,
        message: 'Login successful',
        data: {
          admin: admin.toSafeObject(),
          token
        }
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'Internal server error'
      };
    }
  }

  // Create initial admin (for setup)
  static async createAdmin(email, password, name) {
    try {
      await connectDB();

      // Check if admin already exists
      const existingAdmin = await Admin.findOne({ email: email.toLowerCase() });
      
      if (existingAdmin) {
        return {
          success: false,
          message: 'Admin already exists'
        };
      }

      // Create new admin
      const admin = new Admin({
        email: email.toLowerCase(),
        password, // Will be hashed by pre-save hook
        name,
        role: 'admin'
      });

      await admin.save();

      return {
        success: true,
        message: 'Admin created successfully',
        data: admin.toSafeObject()
      };
    } catch (error) {
      console.error('Create admin error:', error);
      return {
        success: false,
        message: 'Failed to create admin'
      };
    }
  }

  // Get admin profile
  static async getProfile(adminId) {
    try {
      await connectDB();
      
      const admin = await Admin.findById(adminId);
      
      if (!admin) {
        return {
          success: false,
          message: 'Admin not found'
        };
      }

      return {
        success: true,
        data: admin.toSafeObject()
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch profile'
      };
    }
  }
}

export default AdminController;
