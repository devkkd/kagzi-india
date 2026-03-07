import React from 'react';

const BrandPartners = () => {
  // Brand logo data mapping the provided paths
  const brands = [
    { id: 1, src: '/images/brands/brands1.svg', alt: 'Target' },
    { id: 2, src: '/images/brands/brands2.svg', alt: 'Poundland' },
    { id: 3, src: '/images/brands/brands3.svg', alt: 'Pier 1 Imports' },
    { id: 4, src: '/images/brands/brands4.png', alt: 'Hanil TNC' },
    { id: 5, src: '/images/brands/brands5.svg', alt: 'Indiska' },
    { id: 6, src: '/images/brands/brands6.svg', alt: 'Tesco' },
  ];

  return (
    <section className="w-full py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Block */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-6">
          
          {/* Left: Subtitle and Main Heading */}
          <div className="flex flex-col">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-16 h-[1px] bg-[#860000]"></div>
              <span className="text-[#860000] text-sm font-semibold tracking-wider uppercase">
                Brand Partners
              </span>
            </div>
            
            <h2 
              className="text-4xl sm:text-5xl text-gray-900 leading-tight"
              style={{ fontFamily: 'Sooner, sans-serif' }}
            >
              Trusted By Global <span className="text-[#860000]">Brands</span>
            </h2>
          </div>

          {/* Right: Statistic Text */}
          <div className="lg:pb-3">
            <span className="text-sm leading-tight font-bold text-gray-900 tracking-wide">
              +30 Countries Worldwide
            </span>
          </div>
          
        </div>

        {/* Brand Logos Row */}
        <div className="flex flex-wrap justify-center lg:justify-between items-center gap-10 sm:gap-12 lg:gap-8">
          {brands.map((brand) => (
            <div 
              key={brand.id} 
              className="flex justify-center items-center h-8 sm:h-10 lg:h-12 hover:scale-105 transition-transform duration-300"
            >
              <img 
                src={brand.src} 
                alt={brand.alt} 
                className="max-h-full w-auto max-w-[110px] sm:max-w-[130px] lg:max-w-[150px] object-contain"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BrandPartners;