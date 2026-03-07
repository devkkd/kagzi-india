// Controller: Category Management
import mongoose from 'mongoose';
import Category from '../models/Category';
import connectDB from '../lib/mongodb';

class CategoryController {
  // Get all categories
  static async getAllCategories(filters = {}) {
    try {
      await connectDB();

      const query = {};
      
      // Apply filters
      if (filters.isActive !== undefined) {
        query.isActive = filters.isActive;
      }

      const categories = await Category.find(query).sort({ name: 1 });

      return {
        success: true,
        data: categories.map(cat => cat.toSafeObject())
      };
    } catch (error) {
      console.error('Get categories error:', error);
      return {
        success: false,
        message: 'Failed to fetch categories'
      };
    }
  }

  // Get single category by ID or slug
  static async getCategoryById(identifier) {
    try {
      await connectDB();

      // Check if identifier is ObjectId or slug
      const query = mongoose.Types.ObjectId.isValid(identifier)
        ? { _id: identifier }
        : { slug: identifier };

      const category = await Category.findOne(query);

      if (!category) {
        return {
          success: false,
          message: 'Category not found'
        };
      }

      return {
        success: true,
        data: category.toSafeObject()
      };
    } catch (error) {
      console.error('Get category error:', error);
      return {
        success: false,
        message: 'Failed to fetch category'
      };
    }
  }

  // Create new category
  static async createCategory(data) {
    try {
      await connectDB();

      // Validate data
      const validation = Category.validate(data);
      if (!validation.isValid) {
        return {
          success: false,
          message: 'Validation failed',
          errors: validation.errors
        };
      }

      // Check if category with same name exists
      const existingCategory = await Category.findOne({ 
        name: { $regex: new RegExp(`^${data.name}$`, 'i') }
      });

      if (existingCategory) {
        return {
          success: false,
          message: 'Category with this name already exists'
        };
      }

      // Create category
      const category = new Category(data);
      await category.save();

      return {
        success: true,
        message: 'Category created successfully',
        data: category.toSafeObject()
      };
    } catch (error) {
      console.error('Create category error:', error);
      return {
        success: false,
        message: 'Failed to create category'
      };
    }
  }

  // Update category
  static async updateCategory(id, data) {
    try {
      await connectDB();

      const category = await Category.findById(id);

      if (!category) {
        return {
          success: false,
          message: 'Category not found'
        };
      }

      // Update fields
      Object.keys(data).forEach(key => {
        if (data[key] !== undefined) {
          category[key] = data[key];
        }
      });

      await category.save();

      return {
        success: true,
        message: 'Category updated successfully',
        data: category.toSafeObject()
      };
    } catch (error) {
      console.error('Update category error:', error);
      return {
        success: false,
        message: 'Failed to update category'
      };
    }
  }

  // Delete category
  static async deleteCategory(id) {
    try {
      await connectDB();

      const category = await Category.findByIdAndDelete(id);

      if (!category) {
        return {
          success: false,
          message: 'Category not found'
        };
      }

      return {
        success: true,
        message: 'Category deleted successfully'
      };
    } catch (error) {
      console.error('Delete category error:', error);
      return {
        success: false,
        message: 'Failed to delete category'
      };
    }
  }

  // Toggle category status
  static async toggleStatus(id) {
    try {
      await connectDB();

      const category = await Category.findById(id);

      if (!category) {
        return {
          success: false,
          message: 'Category not found'
        };
      }

      category.isActive = !category.isActive;
      await category.save();

      return {
        success: true,
        message: `Category ${category.isActive ? 'activated' : 'deactivated'} successfully`,
        data: category.toSafeObject()
      };
    } catch (error) {
      console.error('Toggle status error:', error);
      return {
        success: false,
        message: 'Failed to toggle category status'
      };
    }
  }
}

export default CategoryController;
