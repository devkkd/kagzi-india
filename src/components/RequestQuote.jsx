import React from 'react';

const RequestQuote = () => {
  // Feature lists mapped into two columns to match the design layout
  const col1Features = [
    "24-Hour Response Time",
    "Custom Specifications Welcome",
    "Sample Packs Available"
  ];

  const col2Features = [
    "Minimum Order Quantities Discussed Per Product",
    "ISO 9001:2015 Certified"
  ];

  // Reusable Checkmark Icon Component
  const CheckIcon = () => (
    <svg 
      className="w-4 h-4 text-gray-900 shrink-0 mt-[2px]" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
    </svg>
  );

  return (
    <section className="w-full py-16 sm:py-20 lg:py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================
            TOP SECTION: HEADING & DESCRIPTION
            ========================================= */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-16 lg:mb-20 gap-10 lg:gap-16">
          
          {/* Left Column: Pre-Title & Heading */}
          <div className="flex flex-col flex-1 w-full">
            
            <span className="text-gray-900 text-sm font-semibold tracking-wider uppercase mb-8">
              REQUEST QUOTE
            </span>
            
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-[1.2]"
              style={{ fontFamily: 'Sooner, sans-serif' }}
            >
              Tell Us What You Need <br />
              <span className="text-[#860000]">We'll Make It</span>
            </h2>
            
          </div>

          {/* Right Column: Paragraphs */}
          <div className="flex flex-col flex-1 lg:max-w-xl gap-6 lg:pt-14">
            <p className="text-sm leading-tight text-gray-900 font-medium">
              Whether you're sourcing for the first time or scaling an existing product line our team is ready to help you find exactly what your brand needs.
            </p>
            <p className="text-sm leading-tight text-gray-900 font-medium">
              We respond to all enquiries within 24 business hours.
            </p>
          </div>

        </div>

        {/* =========================================
            BOTTOM SECTION: FEATURES LIST
            ========================================= */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 lg:gap-24">
          
          {/* List Column 1 */}
          <div className="flex flex-col gap-4 flex-1">
            {col1Features.map((feature, idx) => (
              <div key={`col1-${idx}`} className="flex items-start gap-3">
                <CheckIcon />
                <span className="text-sm leading-tight font-bold text-gray-900">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          {/* List Column 2 */}
          <div className="flex flex-col gap-4 flex-1">
            {col2Features.map((feature, idx) => (
              <div key={`col2-${idx}`} className="flex items-start gap-3">
                <CheckIcon />
                <span className="text-sm leading-tight font-bold text-gray-900">
                  {feature}
                </span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default RequestQuote;