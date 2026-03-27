"use client"
import React from 'react';

const CertificationsNewsletter = () => {
  // Certification logos data using your exact paths
  const certifications = [
    { id: 1, src: '/images/icons/icon10.svg', alt: 'ISO Certified' },
    { id: 2, src: '/images/icons/icon11.svg', alt: 'IAF Accredited' },
    { id: 3, src: '/images/icons/icon12.svg', alt: 'Sedex' },
    { id: 4, src: '/images/icons/icon13.png', alt: 'Eco Friendly' },
    { id: 5, src: '/images/icons/icon14.png', alt: 'AGCS' },
  ];

  return (
    <section className="w-full py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================
            TOP SECTION: OUR CERTIFICATIONS
            ========================================= */}
        <div className="mb-24 sm:mb-32">
          {/* Section Heading */}
          <h2 
            className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-[1.1] mb-12 sm:mb-16"
            style={{ fontFamily: 'MainFont, sans-serif' }}
          >
            Our <span className="text-[#860000]">Certifications</span>
          </h2>

          {/* Logos Row */}
          <div className="flex flex-wrap justify-center lg:justify-between items-center gap-10 sm:gap-12 lg:gap-8">
            {certifications.map((cert) => (
              <div 
                key={cert.id} 
                className="flex justify-center items-center h-16 sm:h-20 lg:h-24 hover:scale-105 transition-transform duration-300 overflow-hidden"
              >
                <img 
                  src={cert.src} 
                  alt={cert.alt} 
                  className="max-h-full w-auto max-w-[120px] sm:max-w-[150px] lg:max-w-[180px] object-contain mix-blend-multiply"
                />
              </div>
            ))}
          </div>
        </div>

        {/* =========================================
            BOTTOM SECTION: STAY CONNECTED (NEWSLETTER)
            ========================================= */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 lg:gap-20 pt-10">
          
          {/* Left Column: Heading */}
          <div className="flex flex-col flex-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-[1px] bg-[#860000]"></div>
              <span className="text-[#860000] text-sm font-semibold tracking-wider uppercase">
                Stay Connected
              </span>
            </div>
            
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-[1.2]"
              style={{ fontFamily: 'MainFont, sans-serif' }}
            >
              Paper Love, Delivered To <br />
              <span className="text-[#860000]">Your Inbox</span>
            </h2>
          </div>

          {/* Right Column: Form and Text */}
          <div className="flex flex-col flex-1 w-full max-w-2xl lg:pb-2">
            
            {/* Description Texts */}
            <div className="mb-8">
              <p className="text-sm leading-tight text-gray-900 font-medium mb-2">
                New collections, process stories, sustainable living guides, and early access to limited editions once a month, never more.
              </p>
              <p className="text-sm leading-tight text-[#860000] font-medium">
                No spam. Unsubscribe anytime. We hate clutter too.
              </p>
            </div>

            {/* Newsletter Input Form */}
            <form 
              className="flex flex-col sm:flex-row gap-4 w-full"
              onSubmit={(e) => e.preventDefault()}
            >
              <input 
                type="email" 
                placeholder="your@email.com" 
                required
                className="flex-1 bg-transparent border border-gray-300 rounded-full px-6 py-3.5 text-sm outline-none focus:border-gray-500 text-gray-900 placeholder-gray-400 transition-colors"
              />
              <button 
                type="submit"
                className="bg-[#860000] text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-[#680000] transition-colors flex items-center justify-center gap-2 flex-shrink-0"
              >
                Subscribe <span aria-hidden="true">&rarr;</span>
              </button>
            </form>

          </div>

        </div>

      </div>
    </section>
  );
};

export default CertificationsNewsletter;