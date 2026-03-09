'use client';
import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiX, FiImage, FiFilter, FiPackage } from 'react-icons/fi';
import MultipleImageUpload from '../components/MultipleImageUpload';
import Pagination from '../components/Pagination';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    minimumOrderQuantity: 1,
    images: [],
    categoryId: '',
    subcategoryId: '',
    size: '',
    coverMaterial: '',
    bindingType: '',
    coverType: '',
    usageApplication: '',
    gsm: '',
    coverPrint: '',
    color: '',
    stock: 0,
    features: [],
    tags: [],
    isActive: true
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Fetch data
  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      if (data.success) setCategories(data.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const fetchSubcategories = async (categoryId) => {
    if (!categoryId) {
      setSubcategories([]);
      return;
    }
    try {
      const response = await fetch(`/api/subcategories?categoryId=${categoryId}`);
      const data = await response.json();
      if (data.success) setSubcategories(data.data);
    } catch (error) {
      console.error('Failed to fetch subcategories:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const url = filterCategory 
        ? `/api/products?categoryId=${filterCategory}`
        : '/api/products';
      
      const response = await fetch(url);
      const data = await response.json();
      if (data.success) setProducts(data.data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [filterCategory]);

  useEffect(() => {
    if (formData.categoryId) {
      fetchSubcategories(formData.categoryId);
    }
  }, [formData.categoryId]);

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

  const openModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        description: product.description || '',
        price: product.price,
        minimumOrderQuantity: product.minimumOrderQuantity,
        images: product.images || [],
        categoryId: product.categoryId,
        subcategoryId: product.subcategoryId || '',
        size: product.size || '',
        coverMaterial: product.coverMaterial || '',
        bindingType: product.bindingType || '',
        coverType: product.coverType || '',
        usageApplication: product.usageApplication || '',
        gsm: product.gsm || '',
        coverPrint: product.coverPrint || '',
        color: product.color || '',
        stock: product.stock || 0,
        features: product.features || [],
        tags: product.tags || [],
        isActive: product.isActive
      });
      fetchSubcategories(product.categoryId);
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        minimumOrderQuantity: 1,
        images: [],
        categoryId: filterCategory || '',
        subcategoryId: '',
        size: '',
        coverMaterial: '',
        bindingType: '',
        coverType: '',
        usageApplication: '',
        gsm: '',
        coverPrint: '',
        color: '',
        stock: 0,
        features: [],
        tags: [],
        isActive: true
      });
    }
    setFormErrors({});
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormErrors({});

    try {
      const url = editingProduct 
        ? `/api/products/${editingProduct.id}`
        : '/api/products';
      
      const method = editingProduct ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        await fetchProducts();
        closeModal();
      } else {
        setFormErrors(data.errors || { submit: data.message });
      }
    } catch (error) {
      setFormErrors({ submit: 'Failed to save product' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      const data = await response.json();
      if (data.success) await fetchProducts();
      else alert(data.message);
    } catch (error) {
      alert('Failed to delete product');
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterCategory]);

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
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-1">Manage your product catalog</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center space-x-2 bg-[#860000] text-white px-6 py-3 rounded-lg hover:bg-[#680000] transition-colors"
        >
          <FiPlus />
          <span>Add Product</span>
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-[rgba(208,195,195,1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#860000]"
          />
        </div>

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

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-md border border-[rgba(208,195,195,0.3)] overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Image */}
            <div className="relative h-48 bg-[#FAF6F1] flex items-center justify-center">
              {product.mainImage ? (
                <img
                  src={product.mainImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <FiImage className="text-gray-400" size={48} />
              )}

              <span
                className={`absolute top-2 right-2 px-2 py-1 text-xs rounded-full ${
                  product.isActive
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {product.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">
                {product.name}
              </h3>
              
              {product.category && (
                <p className="text-xs text-[#860000] mb-2">
                  📁 {product.category.name}
                  {product.subcategory && ` / ${product.subcategory.name}`}
                </p>
              )}

              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xl font-bold text-[#860000]">₹{product.price}</p>
                  <p className="text-xs text-gray-500">MOQ: {product.minimumOrderQuantity}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">
                    <FiPackage className="inline" size={14} /> {product.stock}
                  </p>
                  <p className="text-xs text-gray-500">in stock</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button
                  onClick={() => openModal(product)}
                  className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <FiEdit2 size={16} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
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

      {/* Pagination */}
      {filteredProducts.length > 0 && (
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <FiPackage className="mx-auto text-gray-400 mb-4" size={64} />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || filterCategory 
              ? 'Try adjusting your filters' 
              : 'Get started by creating your first product'}
          </p>
          {!searchTerm && !filterCategory && (
            <button
              onClick={() => openModal()}
              className="inline-flex items-center space-x-2 bg-[#860000] text-white px-6 py-3 rounded-lg hover:bg-[#680000] transition-colors"
            >
              <FiPlus />
              <span>Add Product</span>
            </button>
          )}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <ProductModal
          editingProduct={editingProduct}
          formData={formData}
          setFormData={setFormData}
          formErrors={formErrors}
          submitting={submitting}
          categories={categories}
          subcategories={subcategories}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}

// Product Modal Component - Single Page Form
function ProductModal({
  editingProduct,
  formData,
  setFormData,
  formErrors,
  submitting,
  categories,
  subcategories,
  handleChange,
  handleSubmit,
  closeModal
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-4xl w-full my-8">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-[rgba(208,195,195,0.3)]">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {editingProduct ? 'Edit Product' : 'Add Product'}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Fill in all the product details below
            </p>
          </div>
          <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
            <FiX size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
            {/* Basic Information Section */}
            <div className="bg-[#FAF6F1] p-4 rounded-lg">
              <h3 className="text-lg font-bold text-[#860000] mb-4">Basic Information</h3>
              <div className="space-y-4">
                {/* Product Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${
                      formErrors.name ? 'border-red-500' : 'border-[rgba(208,195,195,1)]'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#860000]`}
                    placeholder="e.g., Printed Corporate Gifts Diaries"
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
                    placeholder="Product description..."
                  />
                </div>

                {/* Price & MOQ */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Price (₹) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      className={`w-full px-4 py-2 border ${
                        formErrors.price ? 'border-red-500' : 'border-[rgba(208,195,195,1)]'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#860000]`}
                      placeholder="299"
                    />
                    {formErrors.price && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.price}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Min Order Qty
                    </label>
                    <input
                      type="number"
                      name="minimumOrderQuantity"
                      value={formData.minimumOrderQuantity}
                      onChange={handleChange}
                      min="1"
                      className="w-full px-4 py-2 border border-[rgba(208,195,195,1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#860000]"
                      placeholder="100"
                    />
                  </div>
                </div>

                {/* Category & Subcategory */}
                <div className="grid grid-cols-2 gap-4">
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

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Subcategory
                    </label>
                    <select
                      name="subcategoryId"
                      value={formData.subcategoryId}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-[rgba(208,195,195,1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#860000]"
                      disabled={!formData.categoryId}
                    >
                      <option value="">Select Subcategory</option>
                      {subcategories.map(sub => (
                        <option key={sub.id} value={sub.id}>{sub.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Stock */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-4 py-2 border border-[rgba(208,195,195,1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#860000]"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            {/* Specifications Section */}
            <div className="bg-[#FAF6F1] p-4 rounded-lg">
              <h3 className="text-lg font-bold text-[#860000] mb-4">Specifications</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {/* Size */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Size
                    </label>
                    <input
                      type="text"
                      name="size"
                      value={formData.size}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-[rgba(208,195,195,1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#860000]"
                      placeholder="e.g., A5, A4"
                    />
                  </div>

                  {/* GSM */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      GSM (Paper Weight)
                    </label>
                    <input
                      type="number"
                      name="gsm"
                      value={formData.gsm}
                      onChange={handleChange}
                      min="0"
                      className="w-full px-4 py-2 border border-[rgba(208,195,195,1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#860000]"
                      placeholder="75"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Cover Material */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Cover Material
                    </label>
                    <input
                      type="text"
                      name="coverMaterial"
                      value={formData.coverMaterial}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-[rgba(208,195,195,1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#860000]"
                      placeholder="e.g., Paper Cover"
                    />
                  </div>

                  {/* Cover Type */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Cover Type
                    </label>
                    <input
                      type="text"
                      name="coverType"
                      value={formData.coverType}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-[rgba(208,195,195,1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#860000]"
                      placeholder="e.g., Hard Cover"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Binding Type */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Binding Type
                    </label>
                    <input
                      type="text"
                      name="bindingType"
                      value={formData.bindingType}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-[rgba(208,195,195,1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#860000]"
                      placeholder="e.g., Glue Bound"
                    />
                  </div>

                  {/* Cover Print */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Cover Print
                    </label>
                    <input
                      type="text"
                      name="coverPrint"
                      value={formData.coverPrint}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-[rgba(208,195,195,1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#860000]"
                      placeholder="e.g., Printed"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Usage/Application */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Usage/Application
                    </label>
                    <input
                      type="text"
                      name="usageApplication"
                      value={formData.usageApplication}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-[rgba(208,195,195,1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#860000]"
                      placeholder="e.g., Gifting"
                    />
                  </div>

                  {/* Color */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Color
                    </label>
                    <input
                      type="text"
                      name="color"
                      value={formData.color}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-[rgba(208,195,195,1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#860000]"
                      placeholder="e.g., Multicolor"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Images & Status Section */}
            <div className="bg-[#FAF6F1] p-4 rounded-lg">
              <h3 className="text-lg font-bold text-[#860000] mb-4">Images & Status</h3>
              <div className="space-y-4">
                {/* Images */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Product Images
                  </label>
                  <MultipleImageUpload
                    values={formData.images}
                    onChange={(urls) => setFormData(prev => ({ ...prev, images: urls }))}
                    folder="products"
                    maxImages={5}
                  />
                </div>

                {/* Active Status */}
                <div className="pt-2">
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
                </div>
              </div>
            </div>
          </div>

          {/* Submit Error */}
          {formErrors.submit && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg mt-4">
              <p className="text-sm text-red-600">{formErrors.submit}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-[rgba(208,195,195,0.3)] mt-6">
            <button
              type="button"
              onClick={closeModal}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2 bg-[#860000] text-white rounded-lg hover:bg-[#680000] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Saving...' : editingProduct ? 'Update Product' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
