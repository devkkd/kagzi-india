'use client';
import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiX, FiImage, FiFilter } from 'react-icons/fi';
import ImageUpload from '../components/ImageUpload';

export default function SubcategoriesPage() {
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSubcategory, setEditingSubcategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    categoryId: '',
    isActive: true
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  // Fetch subcategories
  const fetchSubcategories = async () => {
    try {
      setLoading(true);
      const url = filterCategory 
        ? `/api/subcategories?categoryId=${filterCategory}`
        : '/api/subcategories';
      
      const response = await fetch(url);
      const data = await response.json();
      if (data.success) {
        setSubcategories(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch subcategories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchSubcategories();
  }, [filterCategory]);

  // Handle form change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Open modal
  const openModal = (subcategory = null) => {
    if (subcategory) {
      setEditingSubcategory(subcategory);
      setFormData({
        name: subcategory.name,
        description: subcategory.description || '',
        image: subcategory.image || '',
        categoryId: subcategory.categoryId,
        isActive: subcategory.isActive
      });
    } else {
      setEditingSubcategory(null);
      setFormData({
        name: '',
        description: '',
        image: '',
        categoryId: filterCategory || '',
        isActive: true
      });
    }
    setFormErrors({});
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setEditingSubcategory(null);
    setFormData({ name: '', description: '', image: '', categoryId: '', isActive: true });
    setFormErrors({});
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormErrors({});

    try {
      const url = editingSubcategory 
        ? `/api/subcategories/${editingSubcategory.id}`
        : '/api/subcategories';
      
      const method = editingSubcategory ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        await fetchSubcategories();
        closeModal();
      } else {
        setFormErrors(data.errors || { submit: data.message });
      }
    } catch (error) {
      setFormErrors({ submit: 'Failed to save subcategory' });
    } finally {
      setSubmitting(false);
    }
  };

  // Delete subcategory
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this subcategory?')) return;

    try {
      const response = await fetch(`/api/subcategories/${id}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (data.success) {
        await fetchSubcategories();
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('Failed to delete subcategory');
    }
  };

  // Filter subcategories
  const filteredSubcategories = subcategories.filter(sub =>
    sub.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-[#860000] text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Subcategories</h1>
          <p className="text-gray-600 mt-1">Manage subcategories under each category</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center space-x-2 bg-[#860000] text-white px-6 py-3 rounded-lg hover:bg-[#680000] transition-colors"
        >
          <FiPlus />
          <span>Add Subcategory</span>
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Search */}
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search subcategories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-[rgba(208,195,195,1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#860000]"
          />
        </div>

        {/* Category Filter */}
        <div className="relative">
          <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-[rgba(208,195,195,1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#860000] appearance-none"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Subcategories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSubcategories.map((subcategory) => (
          <div
            key={subcategory.id}
            className="bg-white rounded-xl shadow-md border border-[rgba(208,195,195,0.3)] overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Image */}
            <div className="h-48 bg-[#FAF6F1] flex items-center justify-center">
              {subcategory.image ? (
                <img
                  src={subcategory.image}
                  alt={subcategory.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <FiImage className="text-gray-400" size={48} />
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">{subcategory.name}</h3>
                  <p className="text-sm text-gray-500">/{subcategory.slug}</p>
                  {subcategory.category && (
                    <p className="text-xs text-[#860000] mt-1">
                      📁 {subcategory.category.name}
                    </p>
                  )}
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    subcategory.isActive
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {subcategory.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              {subcategory.description && (
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {subcategory.description}
                </p>
              )}

              {/* Actions */}
              <div className="flex space-x-2">
                <button
                  onClick={() => openModal(subcategory)}
                  className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <FiEdit2 size={16} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(subcategory.id)}
                  className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <FiTrash2 size={16} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredSubcategories.length === 0 && (
        <div className="text-center py-12">
          <FiImage className="mx-auto text-gray-400 mb-4" size={64} />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No subcategories found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || filterCategory 
              ? 'Try adjusting your filters' 
              : 'Get started by creating your first subcategory'}
          </p>
          {!searchTerm && !filterCategory && (
            <button
              onClick={() => openModal()}
              className="inline-flex items-center space-x-2 bg-[#860000] text-white px-6 py-3 rounded-lg hover:bg-[#680000] transition-colors"
            >
              <FiPlus />
              <span>Add Subcategory</span>
            </button>
          )}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-[rgba(208,195,195,0.3)]">
              <h2 className="text-xl font-bold text-gray-900">
                {editingSubcategory ? 'Edit Subcategory' : 'Add Subcategory'}
              </h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <FiX size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Category Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${
                    formErrors.categoryId ? 'border-red-500' : 'border-[rgba(208,195,195,1)]'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#860000]`}
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                {formErrors.categoryId && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.categoryId}</p>
                )}
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Subcategory Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${
                    formErrors.name ? 'border-red-500' : 'border-[rgba(208,195,195,1)]'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#860000]`}
                  placeholder="Enter subcategory name"
                />
                {formErrors.name && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-2 border border-[rgba(208,195,195,1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#860000]"
                  placeholder="Enter subcategory description"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Subcategory Image
                </label>
                <ImageUpload
                  value={formData.image}
                  onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
                  folder="subcategories"
                />
              </div>

              {/* Active Status */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="w-4 h-4 text-[#860000] border-gray-300 rounded focus:ring-[#860000]"
                />
                <label className="ml-2 text-sm text-gray-700">
                  Active (visible on website)
                </label>
              </div>

              {/* Submit Error */}
              {formErrors.submit && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{formErrors.submit}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-4 py-2 bg-[#860000] text-white rounded-lg hover:bg-[#680000] transition-colors disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : editingSubcategory ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
