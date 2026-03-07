"use client";
import React from 'react';

const EnquiryForm = () => {
  return (
    <section className="w-full py-20 sm:py-24 bg-[#FBF0E4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        {/* Main Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-12 sm:mb-16 text-center tracking-tight">
          Send Your Enquiry
        </h2>

        {/* Form Container */}
        <form 
          className="w-full max-w-5xl flex flex-col gap-12"
          onSubmit={(e) => e.preventDefault()}
        >
          
          {/* Two Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            
            {/* =========================================
                LEFT COLUMN
                ========================================= */}
            <div className="flex flex-col gap-6">
              
              {/* Full Name */}
              <div className="flex flex-col gap-2">
                <label className="text-sm leading-tight font-medium text-gray-900">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full bg-[#FAF6F1] border border-[#E1D6CD] rounded-full px-5 py-3.5 text-sm leading-tight text-gray-900 outline-none focus:border-gray-400 placeholder-gray-400 transition-colors"
                  required
                />
              </div>

              {/* Company / Brand Name */}
              <div className="flex flex-col gap-2">
                <label className="text-sm leading-tight font-medium text-gray-900">Company / Brand Name</label>
                <input
                  type="text"
                  placeholder="Enter your company / brand name"
                  className="w-full bg-[#FAF6F1] border border-[#E1D6CD] rounded-full px-5 py-3.5 text-sm leading-tight text-gray-900 outline-none focus:border-gray-400 placeholder-gray-400 transition-colors"
                />
              </div>

              {/* Country */}
              <div className="flex flex-col gap-2">
                <label className="text-sm leading-tight font-medium text-gray-900">Country</label>
                <input
                  type="text"
                  placeholder="Enter your country"
                  className="w-full bg-[#FAF6F1] border border-[#E1D6CD] rounded-full px-5 py-3.5 text-sm leading-tight text-gray-900 outline-none focus:border-gray-400 placeholder-gray-400 transition-colors"
                  required
                />
              </div>

              {/* Email Address */}
              <div className="flex flex-col gap-2">
                <label className="text-sm leading-tight font-medium text-gray-900">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full bg-[#FAF6F1] border border-[#E1D6CD] rounded-full px-5 py-3.5 text-sm leading-tight text-gray-900 outline-none focus:border-gray-400 placeholder-gray-400 transition-colors"
                  required
                />
              </div>

              {/* Phone / WhatsApp Number */}
              <div className="flex flex-col gap-2">
                <label className="text-sm leading-tight font-medium text-gray-900">Phone / WhatsApp Number</label>
                <input
                  type="tel"
                  placeholder="Enter your phone / whatsapp number"
                  className="w-full bg-[#FAF6F1] border border-[#E1D6CD] rounded-full px-5 py-3.5 text-sm leading-tight text-gray-900 outline-none focus:border-gray-400 placeholder-gray-400 transition-colors"
                  required
                />
              </div>

              {/* Product Category (Dropdown) */}
              <div className="flex flex-col gap-2">
                <label className="text-sm leading-tight font-medium text-gray-900">Product Category</label>
                <div className="relative">
                  <select
                    className="w-full bg-[#FAF6F1] border border-[#E1D6CD] rounded-full px-5 py-3.5 text-sm leading-tight text-gray-900 outline-none focus:border-gray-400 transition-colors appearance-none cursor-pointer"
                    defaultValue=""
                  >
                    <option value="" disabled>Select Product Category</option>
                    <option value="diaries">Diaries & Notebooks</option>
                    <option value="packaging">Gift Packaging</option>
                    <option value="bags">Bags</option>
                    <option value="custom">Custom Range</option>
                  </select>
                  {/* Custom Chevron Icon */}
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

            </div>

            {/* =========================================
                RIGHT COLUMN
                ========================================= */}
            <div className="flex flex-col gap-6">
              
              {/* Specific Product of Interest */}
              <div className="flex flex-col gap-2">
                <label className="text-sm leading-tight font-medium text-gray-900">Specific Product of Interest</label>
                <textarea
                  placeholder="Enter your specific product of interest"
                  rows="4"
                  className="w-full bg-[#FAF6F1] border border-[#E1D6CD] rounded-2xl px-5 py-4 text-sm leading-tight text-gray-900 outline-none focus:border-gray-400 placeholder-gray-400 transition-colors resize-none h-32"
                ></textarea>
              </div>

              {/* Custom Requirements */}
              <div className="flex flex-col gap-2">
                <label className="text-sm leading-tight font-medium text-gray-900">Custom Requirements</label>
                <textarea
                  placeholder="Please describe any custom specifications - GSM, size, colour, branding, packaging, etc."
                  rows="5"
                  className="w-full bg-[#FAF6F1] border border-[#E1D6CD] rounded-2xl px-5 py-4 text-sm leading-tight text-gray-900 outline-none focus:border-gray-400 placeholder-gray-400 transition-colors resize-none h-40"
                ></textarea>
              </div>

              {/* Attach Reference Files */}
              <div className="flex flex-col gap-2">
                <label className="text-sm leading-tight font-medium text-gray-900">Attach Reference Files</label>
                <div className="relative w-full bg-[#FAF6F1] border border-[#E1D6CD] rounded-full flex items-center h-[52px] px-2 overflow-hidden">
                  {/* Actual hidden file input */}
                  <input 
                    type="file" 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                  />
                  {/* Fake UI Button */}
                  <div className="bg-black text-white px-6 py-2 rounded-full text-sm leading-tight font-medium">
                    Upload
                  </div>
                </div>
              </div>

              {/* Privacy Notice */}
              <div className="mt-4 pt-2">
                <p className="text-sm leading-tight text-gray-900 font-medium pr-4">
                  Your information is kept strictly confidential and used only to process your enquiry. We do not share data with third parties.
                </p>
              </div>

            </div>
          </div>

          {/* =========================================
              SUBMIT BUTTON
              ========================================= */}
          <div className="flex justify-center w-full mt-4">
            <button
              type="submit"
              className="bg-[#860000] text-white px-10 py-4 rounded-full text-base font-bold hover:bg-[#680000] transition-colors flex items-center justify-center gap-2"
            >
              Submit Enquiry <span>&rarr;</span>
            </button>
          </div>

        </form>

      </div>
    </section>
  );
};

export default EnquiryForm;