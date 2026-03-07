"use client";
import React from 'react';

const EnquiryButton = ({ productId }) => {
  const handleEnquiry = () => {
    // Logic to handle enquiry (e.g., open modal, send event)
    console.log(`Enquiry clicked for product ID: ${productId}`);
  };

  return (
    <button 
      onClick={handleEnquiry}
      className="bg-[#171717] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2 mt-5 w-max"
    >
      Enquiry Now <span>&rarr;</span>
    </button>
  );
};

export default EnquiryButton;