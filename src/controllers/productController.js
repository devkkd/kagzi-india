// Controller: Product Management
import mongoose from 'mongoose';
import Product from '../models/Product';
import Category from '../models/Category';
import Subcategory from '../models/Subcategory';
import connectDB from '../lib/mongodb';

class ProductController {
  // Get all products with filters
  static async getAllProducts(filters = {}) {
    try {
      await connectDB();

      const query = {};
      
      // Apply filters
      if (filters.categoryId) {
        query.categoryId = filters.categoryId;
      }
      
      if (filters.subcategoryId) {
        query.subcategoryId = filters.subcategoryId;
      }
      
      if (filters.isActive !== undefined) {
        query.isActive = filters.isActive;
      }
      
      // Search
      if (filters.search) {
        query.$text = { $search: filters.search };
      }

      const products = await Product.find(query)
        .populate('categoryId', 'name slug')
        .populate('subcategoryId', 'name slug')
        .sort({ createdAt: -1 });

      return {
        success: true,
        data: products.map(product => ({
          ...product.toSafeObject(),
          category: product.categoryId,
          subcategory: product.subcategoryId
        }))
      };
    } catch (error) {
      console.error('Get products error:', error);
      return {
        success: false,
        message: 'Failed to fetch products'
      };
    }
  }

  // Get single product by ID or slug
  static async getProductById(identifier) {
    try {
      await connectDB();

      const query = mongoose.Types.ObjectId.isValid(identifier)
        ? { _id: identifier }
        : { slug: identifier };

      const product = await Product.findOne(query)
        .populate('categoryId', 'name slug')
        .populate('subcategoryId', 'name slug');

      if (!product) {
        return {
          success: false,
          message: 'Product not found'
        };
      }

      return {
        success: true,
        data: {
          ...product.toSafeObject(),
          category: product.categoryId,
          subcategory: product.subcategoryId
        }
      };
    } catch (error) {
      console.error('Get product error:', error);
      return {
        success: false,
        message: 'Failed to fetch product'
      };
    }
  }

  // Create new product
  static async createProduct(data) {
    try {
      await connectDB();

      // Validate data
      const validation = Product.validate(data);
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

      // Check if subcategory exists (if provided)
      if (data.subcategoryId) {
        const subcategory = await Subcategory.findById(data.subcategoryId);
        if (!subcategory) {
          return {
            success: false,
            message: 'Subcategory not found'
          };
        }
      }

      // Create product
      const product = new Product(data);
      await product.save();

      // Populate relations
      await product.populate('categoryId', 'name slug');
      await product.populate('subcategoryId', 'name slug');

      return {
        success: true,
        message: 'Product created successfully',
        data: {
          ...product.toSafeObject(),
          category: product.categoryId,
          subcategory: product.subcategoryId
        }
      };
    } catch (error) {
      console.error('Create product error:', error);
      return {
        success: false,
        message: 'Failed to create product'
      };
    }
  }

  // Update product
  static async updateProduct(id, data) {
    try {
      await connectDB();

      const product = await Product.findById(id);

      if (!product) {
        return {
          success: false,
          message: 'Product not found'
        };
      }

      // Verify category if being changed
      if (data.categoryId && data.categoryId !== product.categoryId.toString()) {
        const category = await Category.findById(data.categoryId);
        if (!category) {
          return {
            success: false,
            message: 'Category not found'
          };
        }
      }

      // Verify subcategory if being changed
      if (data.subcategoryId && data.subcategoryId !== product.subcategoryId?.toString()) {
        const subcategory = await Subcategory.findById(data.subcategoryId);
        if (!subcategory) {
          return {
            success: false,
            message: 'Subcategory not found'
          };
        }
      }

      // Update fields
      Object.keys(data).forEach(key => {
        if (data[key] !== undefined) {
          product[key] = data[key];
        }
      });

      await product.save();
      await product.populate('categoryId', 'name slug');
      await product.populate('subcategoryId', 'name slug');

      return {
        success: true,
        message: 'Product updated successfully',
        data: {
          ...product.toSafeObject(),
          category: product.categoryId,
          subcategory: product.subcategoryId
        }
      };
    } catch (error) {
      console.error('Update product error:', error);
      return {
        success: false,
        message: 'Failed to update product'
      };
    }
  }

  // Delete product
  static async deleteProduct(id) {
    try {
      await connectDB();

      const product = await Product.findByIdAndDelete(id);

      if (!product) {
        return {
          success: false,
          message: 'Product not found'
        };
      }

      return {
        success: true,
        message: 'Product deleted successfully'
      };
    } catch (error) {
      console.error('Delete product error:', error);
      return {
        success: false,
        message: 'Failed to delete product'
      };
    }
  }

  // Toggle product status
  static async toggleStatus(id, field = 'isActive') {
    try {
      await connectDB();

      const product = await Product.findById(id);

      if (!product) {
        return {
          success: false,
          message: 'Product not found'
        };
      }

      product[field] = !product[field];
      await product.save();

      return {
        success: true,
        message: `Product ${field} toggled successfully`,
        data: product.toSafeObject()
      };
    } catch (error) {
      console.error('Toggle status error:', error);
      return {
        success: false,
        message: 'Failed to toggle status'
      };
    }
  }
}

export default ProductController;
