"use client";
import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setSubmitting(true);

    try {
      const response = await axios.post('/api/customer-inquiries', formData);
      
      if (response.data.success) {
        setShowSuccess(true);
        setFormData({
          fullName: '',
          companyName: '',
          email: '',
          phone: '',
          message: ''
        });
        
        // Hide success message after 5 seconds
        setTimeout(() => setShowSuccess(false), 5000);
      }
    } catch (error) {
      console.error('Failed to submit inquiry:', error);
      setErrors({ submit: 'Failed to submit inquiry. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <section className="w-full py-20 sm:py-24 bg-[#FBF0E4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Container with a vertical divider on desktop, horizontal on mobile */}
        <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-[#D4C8C0] gap-y-12 lg:gap-y-0">

          {/* =========================================
              LEFT COLUMN: CONTACT DETAILS
              ========================================= */}
          <div className="w-full lg:w-1/2 lg:pr-16 flex flex-col">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-10 tracking-tight">
              Get in Touch
            </h2>

            <div className="flex flex-col gap-8">
              {/* Address */}
              <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[120px_1fr] gap-4">
                <span className="text-base font-bold text-gray-900">Address</span>
                <div className="text-base text-gray-800 leading-relaxed">
                  <span className="font-bold block mb-1">Kagzi Industries</span>
                  Khadi Gramodyog Road,<br />
                  Near Sanganer Stadium,<br />
                  Sanganer, Jaipur, Rajasthan 303902<br />
                  India
                </div>
              </div>

              {/* Phone */}
              <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[120px_1fr] gap-4">
                <span className="text-base font-bold text-gray-900">Phone</span>
                <div className="text-base text-gray-800 leading-relaxed">
                  +91 99284 24518<br />
                  (Monday-Saturday, 10:00 AM - 6:00 PM IST)
                </div>
              </div>

              {/* Email */}
              <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[120px_1fr] gap-4">
                <span className="text-base font-bold text-gray-900">Email</span>
                <div className="text-base text-gray-800 leading-relaxed">
                  sales@kagziindia.com<br />
                  (We respond within 24 business hours)
                </div>
              </div>
            </div>
          </div>

          {/* =========================================
              RIGHT COLUMN: MESSAGE FORM
              ========================================= */}
          <div className="w-full lg:w-1/2 lg:pl-16 pt-12 lg:pt-0">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-10 tracking-tight">
              Send your Message
            </h2>

            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>

              {/* Success Message */}
              {showSuccess && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 text-sm font-medium">
                    ✓ Message sent successfully! We'll get back to you within 24 hours.
                  </p>
                </div>
              )}

              {/* Error Message */}
              {errors.submit && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800 text-sm font-medium">{errors.submit}</p>
                </div>
              )}

              {/* Input Group: Full Name */}
              <div className="flex flex-col gap-2">
                <label className="text-xs sm:text-sm font-semibold text-gray-900">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`w-full bg-transparent border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-full px-5 py-3.5 text-sm text-gray-900 outline-none focus:border-gray-500 placeholder-gray-400 transition-colors`}
                  required
                />
                {errors.fullName && <p className="text-xs text-red-600">{errors.fullName}</p>}
              </div>

              {/* Input Group: Company */}
              <div className="flex flex-col gap-2">
                <label className="text-xs sm:text-sm font-semibold text-gray-900">Company / Brand Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Enter your company / brand name"
                  className="w-full bg-transparent border border-gray-300 rounded-full px-5 py-3.5 text-sm text-gray-900 outline-none focus:border-gray-500 placeholder-gray-400 transition-colors"
                />
              </div>

              {/* Input Group: Email */}
              <div className="flex flex-col gap-2">
                <label className="text-xs sm:text-sm font-semibold text-gray-900">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className={`w-full bg-transparent border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-full px-5 py-3.5 text-sm text-gray-900 outline-none focus:border-gray-500 placeholder-gray-400 transition-colors`}
                  required
                />
                {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
              </div>

              {/* Input Group: Phone */}
              <div className="flex flex-col gap-2">
                <label className="text-xs sm:text-sm font-semibold text-gray-900">Phone / WhatsApp Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone / whatsapp number"
                  className={`w-full bg-transparent border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-full px-5 py-3.5 text-sm text-gray-900 outline-none focus:border-gray-500 placeholder-gray-400 transition-colors`}
                  required
                />
                {errors.phone && <p className="text-xs text-red-600">{errors.phone}</p>}
              </div>

              {/* Input Group: Textarea */}
              <div className="flex flex-col gap-2">
                <label className="text-xs sm:text-sm font-semibold text-gray-900">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter your specific product of interest"
                  rows="4"
                  className={`w-full bg-transparent border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-2xl px-5 py-4 text-sm text-gray-900 outline-none focus:border-gray-500 placeholder-gray-400 transition-colors resize-none`}
                  required
                ></textarea>
                {errors.message && <p className="text-xs text-red-600">{errors.message}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="bg-[#860000] text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-[#680000] transition-colors flex items-center justify-center gap-2 w-max mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Sending...' : 'Send Message'} <span aria-hidden="true">&rarr;</span>
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactForm;