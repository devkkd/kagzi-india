'use client';
import { useState, useEffect, useRef } from 'react';
import { 
  FiPlus, FiEdit2, FiTrash2, FiSearch, FiX, FiImage, 
  FiEye, FiBold, FiItalic, FiUnderline, FiLink, FiList, 
  FiFileText, FiCode, FiClock, FiUser, FiCheck, FiFolder, FiGrid
} from 'react-icons/fi';
import ImageUpload from '../components/ImageUpload';

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('write'); // 'write' | 'preview'
  
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    image: '',
    author: 'Admin',
    readTime: 5,
    metaTitle: '',
    metaDescription: '',
    category: 'General',
    schemaScript: '',
    isActive: true
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const contentTextAreaRef = useRef(null);

  // Fetch blogs
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/blogs');
      const data = await response.json();
      if (data.success) {
        setBlogs(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Handle form change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Open modal for create/edit
  const openModal = (blog = null) => {
    if (blog) {
      setEditingBlog(blog);
      setFormData({
        title: blog.title,
        excerpt: blog.excerpt || '',
        content: blog.content || '',
        image: blog.image || '',
        author: blog.author || 'Admin',
        readTime: blog.readTime || 5,
        metaTitle: blog.metaTitle || '',
        metaDescription: blog.metaDescription || '',
        category: blog.category || 'General',
        schemaScript: blog.schemaScript || '',
        isActive: blog.isActive
      });
    } else {
      setEditingBlog(null);
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        image: '',
        author: 'Admin',
        readTime: 5,
        metaTitle: '',
        metaDescription: '',
        category: 'General',
        schemaScript: '',
        isActive: true
      });
    }
    setFormErrors({});
    setActiveTab('write');
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setEditingBlog(null);
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      image: '',
      author: 'Admin',
      readTime: 5,
      metaTitle: '',
      metaDescription: '',
      category: 'General',
      schemaScript: '',
      isActive: true
    });
    setFormErrors({});
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormErrors({});

    try {
      const url = editingBlog 
        ? `/api/blogs/${editingBlog.id}`
        : '/api/blogs';
      
      const method = editingBlog ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        await fetchBlogs();
        closeModal();
      } else {
        setFormErrors(data.errors || { submit: data.message });
      }
    } catch (error) {
      setFormErrors({ submit: 'Failed to save blog' });
    } finally {
      setSubmitting(false);
    }
  };

  // Delete blog
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (data.success) {
        await fetchBlogs();
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('Failed to delete blog');
    }
  };

  // Helper to wrap selected text with HTML tags in editor
  const insertHTMLTag = (tagType, placeholder = '') => {
    const textarea = contentTextAreaRef.current;
    if (!textarea) return;

    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(startPos, endPos) || placeholder;

    let tagStart = '';
    let tagEnd = '';

    switch (tagType) {
      case 'bold':
        tagStart = '<strong>';
        tagEnd = '</strong>';
        break;
      case 'italic':
        tagStart = '<em>';
        tagEnd = '</em>';
        break;
      case 'underline':
        tagStart = '<u>';
        tagEnd = '</u>';
        break;
      case 'h2':
        tagStart = '\n<h2 class="text-2xl font-bold text-[#860000] mt-6 mb-3">';
        tagEnd = '</h2>\n';
        break;
      case 'h3':
        tagStart = '\n<h3 class="text-xl font-bold text-gray-900 mt-5 mb-2">';
        tagEnd = '</h3>\n';
        break;
      case 'ul':
        tagStart = '\n<ul class="list-disc pl-6 my-4 space-y-2 text-gray-700">\n  <li>';
        tagEnd = '</li>\n  <li>Second item</li>\n</ul>\n';
        break;
      case 'ol':
        tagStart = '\n<ol class="list-decimal pl-6 my-4 space-y-2 text-gray-700">\n  <li>';
        tagEnd = '</li>\n  <li>Second item</li>\n</ol>\n';
        break;
      case 'link':
        const url = prompt('Enter the link URL (e.g., https://example.com):', 'https://');
        if (url === null) return;
        tagStart = `<a href="${url}" class="text-[#860000] underline font-medium hover:text-[#680000] transition-colors" target="_blank" rel="noopener noreferrer">`;
        tagEnd = '</a>';
        break;
      case 'image':
        const imageUrl = prompt('Enter the image URL:', 'https://');
        if (imageUrl === null) return;
        const altText = prompt('Enter image caption/alt text:', 'Blog Illustration');
        tagStart = `\n<figure class="my-6 flex flex-col items-center">\n  <img src="${imageUrl}" alt="${altText}" class="w-full max-h-[450px] object-cover rounded-xl shadow-md border border-[rgba(208,195,195,0.3)]" />\n  <figcaption class="text-xs text-gray-500 mt-2 italic">${altText}</figcaption>\n</figure>\n`;
        tagEnd = '';
        break;
      case 'quote':
        tagStart = '\n<blockquote class="border-l-4 border-[#860000] bg-[#FAF6F1] px-6 py-4 my-6 italic text-gray-700 rounded-r-lg font-serif">\n  ';
        tagEnd = '\n</blockquote>\n';
        break;
      case 'table':
        tagStart = `\n<div class="overflow-x-auto my-6 border border-[rgba(208,195,195,0.6)] rounded-lg">\n  <table class="w-full text-left border-collapse">\n    <thead>\n      <tr class="bg-[#FAF6F1] border-b border-[rgba(208,195,195,0.6)]">\n        <th class="p-3 font-semibold text-[#860000]">Header 1</th>\n        <th class="p-3 font-semibold text-[#860000]">Header 2</th>\n      </tr>\n    </thead>\n    <tbody class="divide-y divide-[rgba(208,195,195,0.3)]">\n      <tr>\n        <td class="p-3 text-gray-700">Data Row 1 - Col 1</td>\n        <td class="p-3 text-gray-700">Data Row 1 - Col 2</td>\n      </tr>\n      <tr>\n        <td class="p-3 text-gray-700">Data Row 2 - Col 1</td>\n        <td class="p-3 text-gray-700">Data Row 2 - Col 2</td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n`;
        tagEnd = '';
        break;
      case 'p':
        tagStart = '\n<p class="text-gray-700 leading-relaxed mb-4">';
        tagEnd = '</p>\n';
        break;
      default:
        return;
    }

    const newContent = text.substring(0, startPos) + tagStart + selectedText + tagEnd + text.substring(endPos);
    setFormData(prev => ({ ...prev, content: newContent }));

    // Refocus and place cursor
    setTimeout(() => {
      textarea.focus();
      const offset = tagStart.length + selectedText.length + tagEnd.length;
      textarea.setSelectionRange(startPos + offset, startPos + offset);
    }, 10);
  };

  // Filter blogs
  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (blog.excerpt && blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <div className="text-[#860000] text-xl animate-pulse font-medium">Loading blogs dashboard...</div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8 bg-[#FAF6F1]/40 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-serif">Blogs Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage articles, news, and guides for Kagzi India</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center space-x-2 bg-[#860000] text-white px-6 py-3 rounded-lg hover:bg-[#680000] transition-all transform active:scale-95 shadow-md font-medium"
        >
          <FiPlus />
          <span>Add New Post</span>
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search blogs by title or excerpt..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-[rgba(208,195,195,1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#860000] bg-white text-gray-800"
          />
        </div>
      </div>

      {/* Blogs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md border border-[rgba(208,195,195,0.3)] overflow-hidden transition-all flex flex-col group"
          >
            {/* Image */}
            <div className="h-48 bg-[#FAF6F1] flex items-center justify-center relative overflow-hidden">
              {blog.image ? (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <FiImage className="text-gray-400" size={48} />
              )}
              
              {/* Publication Status Badge */}
              <span
                className={`absolute top-3 right-3 px-2.5 py-1 text-[11px] font-bold tracking-wide rounded-full shadow-sm ${
                  blog.isActive
                    ? 'bg-green-500 text-white'
                    : 'bg-amber-500 text-white'
                }`}
              >
                {blog.isActive ? 'Published' : 'Draft'}
              </span>
            </div>

            {/* Content Summary */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-4 text-xs text-gray-500 mb-2">
                  <span className="flex items-center gap-1">
                    <FiUser size={12} /> {blog.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiClock size={12} /> {blog.readTime} min read
                  </span>
                  <span className="bg-[#860000]/10 text-[#860000] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                    {blog.category || 'General'}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 line-clamp-2 hover:text-[#860000] transition-colors mb-2 font-serif">
                  {blog.title}
                </h3>
                {blog.excerpt && (
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed">
                    {blog.excerpt}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex space-x-2 pt-4 border-t border-[rgba(208,195,195,0.2)]">
                <button
                  onClick={() => openModal(blog)}
                  className="flex-1 flex items-center justify-center space-x-1.5 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-xs font-semibold"
                >
                  <FiEdit2 size={13} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(blog.id)}
                  className="flex-1 flex items-center justify-center space-x-1.5 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-xs font-semibold"
                >
                  <FiTrash2 size={13} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredBlogs.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl border border-[rgba(208,195,195,0.3)] shadow-sm max-w-lg mx-auto mt-8">
          <FiFileText className="mx-auto text-gray-300 mb-4" size={64} />
          <h3 className="text-xl font-semibold text-gray-900 mb-2 font-serif">No blog posts found</h3>
          <p className="text-gray-600 mb-6 max-w-sm mx-auto text-sm">
            {searchTerm ? 'Try adjusting your search keywords' : 'Get started by creating your first promotional or educational blog post.'}
          </p>
          {!searchTerm && (
            <button
              onClick={() => openModal()}
              className="inline-flex items-center space-x-2 bg-[#860000] text-white px-6 py-3 rounded-lg hover:bg-[#680000] transition-colors shadow-md"
            >
              <FiPlus />
              <span>Create Blog Post</span>
            </button>
          )}
        </div>
      )}

      {/* Modal - Create/Edit Post */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-2 sm:p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[95vh] flex flex-col shadow-2xl border border-[rgba(208,195,195,0.4)] my-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-[rgba(208,195,195,0.3)] bg-[#FAF6F1]">
              <div>
                <h2 className="text-xl font-bold text-gray-900 font-serif">
                  {editingBlog ? 'Edit Blog Post' : 'Add New Blog Post'}
                </h2>
                <p className="text-xs text-gray-500 mt-1">Configure details, upload a banner, and format post content</p>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-800 p-2 rounded-full hover:bg-gray-200/50 transition-colors"
              >
                <FiX size={22} />
              </button>
            </div>

            {/* Modal Body & Forms - Scrollable */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* 2-Column fields: Title & Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Left Column Fields */}
                  <div className="space-y-4">
                    {/* Title */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                        Blog Title *
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border ${
                          formErrors.title ? 'border-red-500' : 'border-[rgba(208,195,195,1)]'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#860000] bg-white text-gray-800`}
                        placeholder="e.g. The Ancient Art of Handmade Paper"
                      />
                      {formErrors.title && (
                        <p className="mt-1 text-xs text-red-600 font-semibold">{formErrors.title}</p>
                      )}
                    </div>

                    {/* Author & Read Time */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                          Author Name
                        </label>
                        <input
                          type="text"
                          name="author"
                          value={formData.author}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-[rgba(208,195,195,1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#860000] bg-white text-gray-800"
                          placeholder="e.g. Admin / Team Kagzi"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                          Read Time (mins)
                        </label>
                        <input
                          type="number"
                          name="readTime"
                          value={formData.readTime}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-[rgba(208,195,195,1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#860000] bg-white text-gray-800"
                          min="1"
                        />
                      </div>
                    </div>

                    {/* Excerpt */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                        Short Excerpt / Summary
                      </label>
                      <textarea
                        name="excerpt"
                        value={formData.excerpt}
                        onChange={handleChange}
                        rows="3"
                        className="w-full px-4 py-2 border border-[rgba(208,195,195,1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#860000] bg-white text-gray-800 text-sm leading-relaxed"
                        placeholder="Write a brief, catchy summary of the post to show on search and listings cards."
                      />
                    </div>
                  </div>

                  {/* Right Column: Image Upload & Status */}
                  <div className="space-y-4">
                    {/* Image Upload */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                        Cover Image / Banner
                      </label>
                      <ImageUpload
                        value={formData.image}
                        onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
                        folder="blogs"
                      />
                    </div>

                    {/* Active Publication Status Toggle */}
                    <div className="bg-[#FAF6F1] p-4 rounded-lg border border-[rgba(208,195,195,0.4)] flex items-center justify-between">
                      <div>
                        <span className="block text-xs font-bold uppercase tracking-wider text-gray-800">
                          Publication Status
                        </span>
                        <span className="text-xs text-gray-500">
                          {formData.isActive ? 'Visible to public immediately' : 'Keep as a private draft'}
                        </span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="isActive"
                          checked={formData.isActive}
                          onChange={handleChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#860000] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                      </label>
                    </div>

                    {/* Category Tag Selection */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                        Category / Tag
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-[rgba(208,195,195,1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#860000] bg-white text-gray-800 text-sm focus:bg-white"
                      >
                        <option value="General">General</option>
                        <option value="Heritage">Heritage</option>
                        <option value="Artisan">Artisan</option>
                        <option value="Eco-friendly">Eco-friendly</option>
                        <option value="Sustainability">Sustainability</option>
                        <option value="Guides">Guides</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* SEO Settings Group */}
                <div className="bg-[#FAF6F1]/60 p-4 rounded-xl border border-[rgba(208,195,195,0.4)] space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#860000] border-b border-[rgba(208,195,195,0.4)] pb-2 flex items-center gap-1.5">
                    <FiFolder size={14} /> Search Engine Optimization (SEO) Settings
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                        Meta Title (Page Title Tag)
                      </label>
                      <input
                        type="text"
                        name="metaTitle"
                        value={formData.metaTitle}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-[rgba(208,195,195,1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#860000] bg-white text-gray-800 text-xs"
                        placeholder="Leave blank to use post title"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                        Meta Description (Page Description Tag)
                      </label>
                      <input
                        type="text"
                        name="metaDescription"
                        value={formData.metaDescription}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-[rgba(208,195,195,1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#860000] bg-white text-gray-800 text-xs"
                        placeholder="Leave blank to use post excerpt"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                        JSON-LD Schema Script (Paste complete script tag for SEO)
                      </label>
                      <textarea
                        name="schemaScript"
                        value={formData.schemaScript}
                        onChange={handleChange}
                        rows="4"
                        className="w-full px-4 py-2 border border-[rgba(208,195,195,1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#860000] bg-white text-gray-800 text-xs font-mono"
                        placeholder='e.g. <script type="application/ld+json">...</script>'
                      />
                      <p className="text-[10px] text-gray-500 mt-1">
                        Ensure you include the opening and closing script tags, e.g., &lt;script type="application/ld+json"&gt; &lt;/script&gt;
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content Editor Panel - FULL WIDTH */}
                <div className="border border-[rgba(208,195,195,0.7)] rounded-xl overflow-hidden shadow-sm">
                  {/* Editor Menu Header */}
                  <div className="flex flex-wrap items-center justify-between bg-gray-50 border-b border-[rgba(208,195,195,0.7)] px-4 py-2 gap-2">
                    
                    {/* View Tabs */}
                    <div className="flex bg-gray-200/70 p-1 rounded-lg">
                      <button
                        type="button"
                        onClick={() => setActiveTab('write')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                          activeTab === 'write' 
                            ? 'bg-white text-[#860000] shadow-sm' 
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        <FiCode size={14} />
                        <span>Write HTML</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab('preview')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                          activeTab === 'preview' 
                            ? 'bg-white text-[#860000] shadow-sm' 
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        <FiEye size={14} />
                        <span>Live Preview</span>
                      </button>
                    </div>

                    {/* Editor Toolbar (Only show in write tab) */}
                    {activeTab === 'write' && (
                      <div className="flex flex-wrap items-center gap-1 border-l pl-2 border-gray-300 md:ml-4">
                        <button
                          type="button"
                          onClick={() => insertHTMLTag('bold')}
                          title="Bold text"
                          className="p-1.5 text-gray-600 hover:text-[#860000] hover:bg-gray-200/50 rounded transition-colors"
                        >
                          <FiBold size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => insertHTMLTag('italic')}
                          title="Italic text"
                          className="p-1.5 text-gray-600 hover:text-[#860000] hover:bg-gray-200/50 rounded transition-colors"
                        >
                          <FiItalic size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => insertHTMLTag('underline')}
                          title="Underline text"
                          className="p-1.5 text-gray-600 hover:text-[#860000] hover:bg-gray-200/50 rounded transition-colors"
                        >
                          <FiUnderline size={15} />
                        </button>
                        <div className="h-4 w-[1px] bg-gray-300 mx-1"></div>
                        <button
                          type="button"
                          onClick={() => insertHTMLTag('h2', 'Heading 2')}
                          title="Insert Section Heading (H2)"
                          className="px-2 py-1 text-xs font-extrabold text-gray-600 hover:text-[#860000] hover:bg-gray-200/50 rounded transition-colors"
                        >
                          H2
                        </button>
                        <button
                          type="button"
                          onClick={() => insertHTMLTag('h3', 'Heading 3')}
                          title="Insert Sub-heading (H3)"
                          className="px-2 py-1 text-xs font-bold text-gray-600 hover:text-[#860000] hover:bg-gray-200/50 rounded transition-colors"
                        >
                          H3
                        </button>
                        <button
                          type="button"
                          onClick={() => insertHTMLTag('p', 'Paragraph text...')}
                          title="Insert Paragraph"
                          className="px-2 py-1 text-xs text-gray-600 hover:text-[#860000] hover:bg-gray-200/50 rounded transition-colors"
                        >
                          P
                        </button>
                        <div className="h-4 w-[1px] bg-gray-300 mx-1"></div>
                        <button
                          type="button"
                          onClick={() => insertHTMLTag('ul', 'List item')}
                          title="Bullet List"
                          className="p-1.5 text-gray-600 hover:text-[#860000] hover:bg-gray-200/50 rounded transition-colors"
                        >
                          <FiList size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => insertHTMLTag('ol', 'List item')}
                          title="Numbered List"
                          className="px-2 py-1 text-xs font-semibold text-gray-600 hover:text-[#860000] hover:bg-gray-200/50 rounded transition-colors"
                        >
                          1.
                        </button>
                        <button
                          type="button"
                          onClick={() => insertHTMLTag('link', 'Link label')}
                          title="Add Hyperlink"
                          className="p-1.5 text-gray-600 hover:text-[#860000] hover:bg-gray-200/50 rounded transition-colors"
                        >
                          <FiLink size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => insertHTMLTag('image')}
                          title="Insert Cloudinary/External Image"
                          className="p-1.5 text-gray-600 hover:text-[#860000] hover:bg-gray-200/50 rounded transition-colors"
                        >
                          <FiImage size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => insertHTMLTag('quote', 'Quote text...')}
                          title="Insert Quote Box"
                          className="px-2 py-1 text-xs italic font-serif text-gray-600 hover:text-[#860000] hover:bg-gray-200/50 rounded transition-colors"
                        >
                          &ldquo; Quote &rdquo;
                        </button>
                        <button
                          type="button"
                          onClick={() => insertHTMLTag('table')}
                          title="Insert Structured Table"
                          className="px-2 py-1 text-xs text-gray-600 hover:text-[#860000] hover:bg-gray-200/50 rounded transition-colors"
                        >
                          Table
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Editor Content Area */}
                  <div className="relative">
                    {/* WRITE TAB */}
                    {activeTab === 'write' && (
                      <div>
                        <textarea
                          ref={contentTextAreaRef}
                          name="content"
                          value={formData.content}
                          onChange={handleChange}
                          rows="15"
                          className="w-full px-5 py-4 font-mono text-sm focus:outline-none bg-white text-gray-800 leading-relaxed border-0 resize-y min-h-[300px]"
                          placeholder="Write or paste your article HTML code here. You can select text and use the toolbar above to apply headings, formatting, lists, quotes, tables, and images."
                        />
                        <div className="bg-gray-50 px-4 py-1.5 border-t border-[rgba(208,195,195,0.4)] text-[10px] text-gray-500 flex justify-between">
                          <span>Characters: {formData.content.length}</span>
                          <span>HTML content support active</span>
                        </div>
                      </div>
                    )}

                    {/* PREVIEW TAB */}
                    {activeTab === 'preview' && (
                      <div className="bg-[#FAF9F6] p-6 sm:p-8 min-h-[340px] max-h-[550px] overflow-y-auto border-0">
                        {/* Fake Article Container mimicking the real public detail page styling */}
                        <div className="max-w-2xl mx-auto">
                          {/* Heading info */}
                          <h1 className="text-3xl font-bold font-serif text-gray-900 mb-4">
                            {formData.title || 'Draft Article Title'}
                          </h1>
                          <div className="flex items-center gap-4 text-xs text-gray-500 mb-6 pb-4 border-b border-[rgba(208,195,195,0.4)]">
                            <span className="flex items-center gap-1 font-semibold text-gray-800">
                              <FiUser size={12} className="text-[#860000]" /> By {formData.author || 'Admin'}
                            </span>
                            <span>&bull;</span>
                            <span className="flex items-center gap-1">
                              <FiClock size={12} /> {formData.readTime || 5} min read
                            </span>
                          </div>

                          {/* Cover Image mockup */}
                          {formData.image && (
                            <img
                              src={formData.image}
                              alt="Cover Preview"
                              className="w-full max-h-[320px] object-cover rounded-xl mb-6 shadow-sm border border-[rgba(208,195,195,0.2)]"
                            />
                          )}

                          {/* Rendered HTML Body */}
                          {formData.content ? (
                            <div 
                              className="blog-content-preview prose prose-stone text-gray-700 leading-relaxed font-sans text-sm space-y-4"
                              dangerouslySetInnerHTML={{ __html: formData.content }}
                            />
                          ) : (
                            <p className="text-gray-400 italic text-center py-10 font-sans">
                              (No content written yet. Switch to the 'Write HTML' tab to insert text.)
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Validation/Submit Error Messages */}
                {formErrors.content && (
                  <p className="text-sm text-red-600 font-semibold">{formErrors.content}</p>
                )}
                {formErrors.submit && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600 font-semibold">{formErrors.submit}</p>
                  </div>
                )}

                {/* Save Actions */}
                <div className="flex space-x-3 pt-4 border-t border-[rgba(208,195,195,0.3)]">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 px-4 py-2.5 bg-[#860000] text-white rounded-lg hover:bg-[#680000] transition-colors disabled:opacity-50 font-medium text-sm shadow-md"
                  >
                    {submitting ? 'Saving post...' : editingBlog ? 'Update Post' : 'Publish / Save Post'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
