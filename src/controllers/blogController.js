// Controller: Blog Management
import mongoose from 'mongoose';
import Blog from '../models/Blog';
import connectDB from '../lib/mongodb';

class BlogController {
  // Get all blogs
  static async getAllBlogs(filters = {}) {
    try {
      await connectDB();

      const query = {};
      
      // Apply filters
      if (filters.isActive !== undefined) {
        query.isActive = filters.isActive;
      }

      if (filters.category) {
        query.category = filters.category;
      }

      if (filters.search) {
        query.$or = [
          { title: { $regex: filters.search, $options: 'i' } },
          { excerpt: { $regex: filters.search, $options: 'i' } },
          { content: { $regex: filters.search, $options: 'i' } }
        ];
      }

      // Sort by creation date descending (newest first)
      const blogs = await Blog.find(query).sort({ createdAt: -1 });

      return {
        success: true,
        data: blogs.map(blog => blog.toSafeObject())
      };
    } catch (error) {
      console.error('Get blogs error:', error);
      return {
        success: false,
        message: 'Failed to fetch blogs'
      };
    }
  }

  // Get single blog by ID or slug
  static async getBlogByIdOrSlug(identifier) {
    try {
      await connectDB();

      // Check if identifier is ObjectId or slug
      const query = mongoose.Types.ObjectId.isValid(identifier)
        ? { _id: identifier }
        : { slug: identifier };

      const blog = await Blog.findOne(query);

      if (!blog) {
        return {
          success: false,
          message: 'Blog not found'
        };
      }

      return {
        success: true,
        data: blog.toSafeObject()
      };
    } catch (error) {
      console.error('Get blog error:', error);
      return {
        success: false,
        message: 'Failed to fetch blog'
      };
    }
  }

  // Create new blog
  static async createBlog(data) {
    try {
      await connectDB();

      // Validate data
      const validation = Blog.validate(data);
      if (!validation.isValid) {
        return {
          success: false,
          message: 'Validation failed',
          errors: validation.errors
        };
      }

      // Check if blog with same title exists
      const existingBlog = await Blog.findOne({ 
        title: { $regex: new RegExp(`^${data.title.trim()}$`, 'i') }
      });

      if (existingBlog) {
        return {
          success: false,
          message: 'A blog with this title already exists'
        };
      }

      // Create blog
      const blog = new Blog(data);
      await blog.save();

      return {
        success: true,
        message: 'Blog created successfully',
        data: blog.toSafeObject()
      };
    } catch (error) {
      console.error('Create blog error:', error);
      return {
        success: false,
        message: 'Failed to create blog'
      };
    }
  }

  // Update blog
  static async updateBlog(id, data) {
    try {
      await connectDB();

      const blog = await Blog.findById(id);

      if (!blog) {
        return {
          success: false,
          message: 'Blog not found'
        };
      }

      // If title is changing, check for duplicate and validate
      if (data.title && data.title !== blog.title) {
        const existingBlog = await Blog.findOne({
          title: { $regex: new RegExp(`^${data.title.trim()}$`, 'i') },
          _id: { $ne: id }
        });
        if (existingBlog) {
          return {
            success: false,
            message: 'A blog with this title already exists'
          };
        }
      }

      // Validate data (merged with existing to check validity)
      const mergedData = {
        title: data.title !== undefined ? data.title : blog.title,
        content: data.content !== undefined ? data.content : blog.content,
        readTime: data.readTime !== undefined ? data.readTime : blog.readTime,
      };
      
      const validation = Blog.validate(mergedData);
      if (!validation.isValid) {
        return {
          success: false,
          message: 'Validation failed',
          errors: validation.errors
        };
      }

      // Update fields
      Object.keys(data).forEach(key => {
        if (data[key] !== undefined) {
          blog[key] = data[key];
        }
      });

      await blog.save();

      return {
        success: true,
        message: 'Blog updated successfully',
        data: blog.toSafeObject()
      };
    } catch (error) {
      console.error('Update blog error:', error);
      return {
        success: false,
        message: 'Failed to update blog'
      };
    }
  }

  // Delete blog
  static async deleteBlog(id) {
    try {
      await connectDB();

      const blog = await Blog.findByIdAndDelete(id);

      if (!blog) {
        return {
          success: false,
          message: 'Blog not found'
        };
      }

      return {
        success: true,
        message: 'Blog deleted successfully'
      };
    } catch (error) {
      console.error('Delete blog error:', error);
      return {
        success: false,
        message: 'Failed to delete blog'
      };
    }
  }

  // Toggle blog status (Draft/Publish)
  static async toggleStatus(id) {
    try {
      await connectDB();

      const blog = await Blog.findById(id);

      if (!blog) {
        return {
          success: false,
          message: 'Blog not found'
        };
      }

      blog.isActive = !blog.isActive;
      await blog.save();

      return {
        success: true,
        message: `Blog ${blog.isActive ? 'published' : 'saved as draft'} successfully`,
        data: blog.toSafeObject()
      };
    } catch (error) {
      console.error('Toggle status error:', error);
      return {
        success: false,
        message: 'Failed to toggle blog status'
      };
    }
  }
}

export default BlogController;
