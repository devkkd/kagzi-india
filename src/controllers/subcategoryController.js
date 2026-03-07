// Controller: Subcategory Management
import mongoose from 'mongoose';
import Subcategory from '../models/Subcategory';
import Category from '../models/Category';
import connectDB from '../lib/mongodb';

class SubcategoryController {
  // Get all subcategories (optionally filter by categoryId)
  static async getAllSubcategories(filters = {}) {
    try {
      await connectDB();

      const query = {};
      
      // Filter by category
      if (filters.categoryId) {
        query.categoryId = filters.categoryId;
      }
      
      // Filter by active status
      if (filters.isActive !== undefined) {
        query.isActive = filters.isActive;
      }

      const subcategories = await Subcategory.find(query)
        .populate('categoryId', 'name slug')
        .sort({ name: 1 });

      return {
        success: true,
        data: subcategories.map(sub => ({
          ...sub.toSafeObject(),
          category: sub.categoryId
        }))
      };
    } catch (error) {
      console.error('Get subcategories error:', error);
      return {
        success: false,
        message: 'Failed to fetch subcategories'
      };
    }
  }

  // Get single subcategory by ID or slug
  static async getSubcategoryById(identifier) {
    try {
      await connectDB();

      const query = mongoose.Types.ObjectId.isValid(identifier)
        ? { _id: identifier }
        : { slug: identifier };

      const subcategory = await Subcategory.findOne(query)
        .populate('categoryId', 'name slug');

      if (!subcategory) {
        return {
          success: false,
          message: 'Subcategory not found'
        };
      }

      return {
        success: true,
        data: {
          ...subcategory.toSafeObject(),
          category: subcategory.categoryId
        }
      };
    } catch (error) {
      console.error('Get subcategory error:', error);
      return {
        success: false,
        message: 'Failed to fetch subcategory'
      };
    }
  }

  // Create new subcategory
  static async createSubcategory(data) {
    try {
      await connectDB();

      // Validate data
      const validation = Subcategory.validate(data);
      if (!validation.isValid) {
        return {
          success: false,
          message: 'Validation failed',
          errors: validation.errors
        };
      }

      // Check if category exists
      const category = await Category.findById(data.categoryId);
      if (!category) {
        return {
          success: false,
          message: 'Category not found'
        };
      }

      // Check if subcategory with same name exists in this category
      const existingSubcategory = await Subcategory.findOne({ 
        name: { $regex: new RegExp(`^${data.name}$`, 'i') },
        categoryId: data.categoryId
      });

      if (existingSubcategory) {
        return {
          success: false,
          message: 'Subcategory with this name already exists in this category'
        };
      }

      // Create subcategory
      const subcategory = new Subcategory(data);
      await subcategory.save();

      // Populate category
      await subcategory.populate('categoryId', 'name slug');

      return {
        success: true,
        message: 'Subcategory created successfully',
        data: {
          ...subcategory.toSafeObject(),
          category: subcategory.categoryId
        }
      };
    } catch (error) {
      console.error('Create subcategory error:', error);
      return {
        success: false,
        message: 'Failed to create subcategory'
      };
    }
  }

  // Update subcategory
  static async updateSubcategory(id, data) {
    try {
      await connectDB();

      const subcategory = await Subcategory.findById(id);

      if (!subcategory) {
        return {
          success: false,
          message: 'Subcategory not found'
        };
      }

      // If category is being changed, verify it exists
      if (data.categoryId && data.categoryId !== subcategory.categoryId.toString()) {
        const category = await Category.findById(data.categoryId);
        if (!category) {
          return {
            success: false,
            message: 'Category not found'
          };
        }
      }

      // Update fields
      Object.keys(data).forEach(key => {
        if (data[key] !== undefined) {
          subcategory[key] = data[key];
        }
      });

      await subcategory.save();
      await subcategory.populate('categoryId', 'name slug');

      return {
        success: true,
        message: 'Subcategory updated successfully',
        data: {
          ...subcategory.toSafeObject(),
          category: subcategory.categoryId
        }
      };
    } catch (error) {
      console.error('Update subcategory error:', error);
      return {
        success: false,
        message: 'Failed to update subcategory'
      };
    }
  }

  // Delete subcategory
  static async deleteSubcategory(id) {
    try {
      await connectDB();

      const subcategory = await Subcategory.findByIdAndDelete(id);

      if (!subcategory) {
        return {
          success: false,
          message: 'Subcategory not found'
        };
      }

      return {
        success: true,
        message: 'Subcategory deleted successfully'
      };
    } catch (error) {
      console.error('Delete subcategory error:', error);
      return {
        success: false,
        message: 'Failed to delete subcategory'
      };
    }
  }

  // Get subcategories count by category
  static async getSubcategoryCountByCategory(categoryId) {
    try {
      await connectDB();

      const count = await Subcategory.countDocuments({ 
        categoryId,
        isActive: true 
      });

      return {
        success: true,
        data: { count }
      };
    } catch (error) {
      console.error('Get count error:', error);
      return {
        success: false,
        message: 'Failed to get count'
      };
    }
  }
}

export default SubcategoryController;
