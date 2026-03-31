'use client';
import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { FiTrash2, FiShoppingBag, FiArrowLeft, FiUser, FiMail, FiPhone, FiBriefcase } from 'react-icons/fi';
import Link from 'next/link';
import axios from 'axios';
import Toast from '@/components/Toast';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) errors.email = 'Invalid email format';
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setSubmitting(true);

    try {
      // Create inquiry for each product in cart
      const inquiryPromises = cart.map(item => 
        axios.post('/api/inquiries', {
          ...formData,
          productId: item.id,
          message: formData.message || `Inquiry for ${item.quantity} x ${item.name}`
        })
      );

      await Promise.all(inquiryPromises);

      // Show success modal - DON'T clear cart yet
      setShowSuccessModal(true);
      
      // Clear form only
      setFormData({
        fullName: '',
        companyName: '',
        email: '',
        phone: '',
        message: ''
      });

    } catch (error) {
      console.error('Failed to submit inquiry:', error);
      setToastMessage('Failed to submit inquiry. Please try again.');
      setShowToast(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseSuccessModal = (redirectTo) => {
    setShowSuccessModal(false);
    clearCart(); // Clear cart when modal closes
    if (redirectTo) {
      setTimeout(() => {
        window.location.href = redirectTo;
      }, 300);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <FiShoppingBag size={80} className="text-gray-300 mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-8">Add some products to send an inquiry!</p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-[#860000] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#680000] transition-colors"
            >
              <FiArrowLeft />
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen py-10 lg:py-20 bg-[#FAF6F1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-[#860000] hover:text-[#680000] transition-colors mb-4"
            >
              <FiArrowLeft />
              Continue Shopping
            </Link>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Send Inquiry</h1>
            <p className="text-gray-600 mt-2">{cart.length} {cart.length === 1 ? 'product' : 'products'} selected for inquiry</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* LEFT: Selected Products */}
            <div className="space-y-6">
              
              {/* Products List */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Selected Products</h2>
                <div className="space-y-4">
                  {cart.map((item, index) => (
                    <div
                      key={item.id || index}
                      className="flex gap-4 p-4 bg-[#FAF6F1] rounded-lg"
                    >
                      {/* Image */}
                      <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                        {item.mainImage || (item.images && item.images[0]) ? (
                          <img
                            src={item.mainImage || item.images[0]}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <FiShoppingBag size={24} />
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-bold text-gray-900 mb-2">
                          {item.name}
                        </h3>
                        {item.size && (
                          <p className="text-sm text-gray-600 mb-1">
                            <span className="font-medium">Size:</span> {item.size}
                          </p>
                        )}
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors self-start"
                        title="Remove from cart"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to clear all products?')) {
                      clearCart();
                    }
                  }}
                  className="text-red-600 hover:text-red-800 transition-colors text-sm font-medium mt-4"
                >
                  Clear All
                </button>
              </div>

              {/* What Happens Next Info */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">What Happens Next?</h2>
                
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-[#860000] text-white rounded-full flex items-center justify-center shrink-0 font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Submit Inquiry</h3>
                      <p className="text-sm text-gray-600">Fill in your details and submit the inquiry form</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-[#860000] text-white rounded-full flex items-center justify-center shrink-0 font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">We Review</h3>
                      <p className="text-sm text-gray-600">Our team will review your requirements</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-[#860000] text-white rounded-full flex items-center justify-center shrink-0 font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Get Quote</h3>
                      <p className="text-sm text-gray-600">Receive a customized quote within 24 hours</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-3">
                    <span className="font-semibold">Need Help?</span>
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    📧 Email: sales@kagziindia.com
                  </p>
                  <p className="text-sm text-gray-600">
                    📞 Phone: +91 99284 24518
                  </p>
                </div>
              </div>

            </div>

            {/* RIGHT: Inquiry Form */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Your Details</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Full Name */}
                  <div>
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                      <FiUser className="mr-2" /> Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border ${
                        formErrors.fullName ? 'border-red-500' : 'border-gray-300'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#860000]`}
                      placeholder="Enter your full name"
                    />
                    {formErrors.fullName && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.fullName}</p>
                    )}
                  </div>

                  {/* Company Name */}
                  <div>
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                      <FiBriefcase className="mr-2" /> Company Name (Optional)
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#860000]"
                      placeholder="Enter your company name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                      <FiMail className="mr-2" /> Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border ${
                        formErrors.email ? 'border-red-500' : 'border-gray-300'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#860000]`}
                      placeholder="your.email@example.com"
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                      <FiPhone className="mr-2" /> Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border ${
                        formErrors.phone ? 'border-red-500' : 'border-gray-300'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#860000]`}
                      placeholder="+91 XXXXX XXXXX"
                    />
                    {formErrors.phone && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">
                      Additional Message (Optional)
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#860000]"
                      placeholder="Any specific requirements or questions..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#860000] text-white py-3 rounded-lg font-medium hover:bg-[#680000] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Submitting...' : 'Submit Inquiry'}
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>

      {showToast && (
        <Toast
          message={toastMessage}
          onClose={() => setShowToast(false)}
        />
      )}

      {/* Success Modal - Clean & Simple */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-white bg-opacity-70 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-hidden">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 animate-fade-in">
            
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-[#860000] rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
              Thank You!
            </h2>
            
            {/* Message */}
            <p className="text-gray-600 text-center mb-8 leading-relaxed">
              Your inquiry has been submitted successfully. Our team will contact you within 24 hours.
            </p>

            {/* Divider */}
            <div className="border-t border-gray-200 mb-6"></div>

            {/* Contact Info */}
            <div className="bg-[#FAF6F1] rounded-lg p-4 mb-8">
              <p className="text-sm font-semibold text-gray-900 mb-3">Need immediate help?</p>
              <div className="space-y-2">
                <p className="text-sm text-gray-700">
                  📧 info@kagziindia.com
                </p>
                <p className="text-sm text-gray-700">
                  📞 +91 XXXXX XXXXX
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => handleCloseSuccessModal('/products')}
                className="w-full bg-[#860000] text-white py-3 rounded-lg font-medium hover:bg-[#680000] transition-colors"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => handleCloseSuccessModal('/')}
                className="w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Back to Home
              </button>
            </div>

          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default CartPage;
