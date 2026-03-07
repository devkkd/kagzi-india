"use client";
import React from 'react';

const ContactForm = () => {
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

            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>

              {/* Input Group: Full Name */}
              <div className="flex flex-col gap-2">
                <label className="text-xs sm:text-sm font-semibold text-gray-900">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full bg-transparent border border-gray-300 rounded-full px-5 py-3.5 text-sm text-gray-900 outline-none focus:border-gray-500 placeholder-gray-400 transition-colors"
                  required
                />
              </div>

              {/* Input Group: Company */}
              <div className="flex flex-col gap-2">
                <label className="text-xs sm:text-sm font-semibold text-gray-900">Company / Brand Name</label>
                <input
                  type="text"
                  placeholder="Enter your company / brand name"
                  className="w-full bg-transparent border border-gray-300 rounded-full px-5 py-3.5 text-sm text-gray-900 outline-none focus:border-gray-500 placeholder-gray-400 transition-colors"
                />
              </div>

              {/* Input Group: Email */}
              <div className="flex flex-col gap-2">
                <label className="text-xs sm:text-sm font-semibold text-gray-900">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full bg-transparent border border-gray-300 rounded-full px-5 py-3.5 text-sm text-gray-900 outline-none focus:border-gray-500 placeholder-gray-400 transition-colors"
                  required
                />
              </div>

              {/* Input Group: Phone */}
              <div className="flex flex-col gap-2">
                <label className="text-xs sm:text-sm font-semibold text-gray-900">Phone / WhatsApp Number</label>
                <input
                  type="tel"
                  placeholder="Enter your phone / whatsapp number"
                  className="w-full bg-transparent border border-gray-300 rounded-full px-5 py-3.5 text-sm text-gray-900 outline-none focus:border-gray-500 placeholder-gray-400 transition-colors"
                  required
                />
              </div>

              {/* Input Group: Textarea */}
              <div className="flex flex-col gap-2">
                <label className="text-xs sm:text-sm font-semibold text-gray-900">Message</label>
                <textarea
                  placeholder="Enter your specific product of interest"
                  rows="4"
                  className="w-full bg-transparent border border-gray-300 rounded-2xl px-5 py-4 text-sm text-gray-900 outline-none focus:border-gray-500 placeholder-gray-400 transition-colors resize-none"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-[#860000] text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-[#680000] transition-colors flex items-center justify-center gap-2 w-max mt-2"
              >
                Send Message <span aria-hidden="true">&rarr;</span>
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactForm;