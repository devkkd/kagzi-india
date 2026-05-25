import React from 'react';

const AboutValues = () => {
  return (
    <section className="w-full py-20 sm:py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-24 lg:gap-32">

        {/* =========================================
            SECTION 1: DESIGN PHILOSOPHY
            ========================================= */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Text Content */}
          <div className="flex-1 flex flex-col">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-[1px] bg-[#860000]"></div>
              <span className="text-[#860000] text-sm font-semibold tracking-wider uppercase">
                Design Philosophy
              </span>
            </div>
            
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-[1.2] mb-8"
              style={{ fontFamily: 'MainFont, sans-serif' }}
            >
              Timeless Design <span className="text-[#860000]">Philosophy</span><br />
              for Luxury <span className="text-[#860000]">Paper Products</span>
            </h2>
            
            <div className="flex flex-col gap-5">
              <p className="text-sm leading-tight text-gray-900">
                We believe design plays a vital role in expanding market reach. Our paper products are not just items — they are expressions of creativity, emotional values, and cultural heritage.
              </p>
              <p className="text-sm leading-tight text-gray-900">
                As a trusted handmade paper manufacturer, we always provide our clients with original designs that blend tradition and modernity without apology. From journal notebook collections to premium leather diary designs, every creation reflects timeless craftsmanship and sustainable innovation.
              </p>
              <p className="text-sm leading-tight text-gray-900">
                At Kagzi Industries, we create paper products that turn everyday writing and packaging into a creative experience.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="flex-1 w-full flex justify-center lg:justify-end">
            <img
              src="/images/about/about2.svg"
              alt="Design Philosophy"
              className="w-full max-w-lg xl:max-w-xl object-contain"
            />
          </div>
        </div>

        {/* =========================================
            SECTION 2: QUALITY ASSURANCE
            ========================================= */}
        {/* Note: lg:flex-row-reverse swaps the order on desktop so the image is on the left */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
          
          {/* Text Content */}
          <div className="flex-1 flex flex-col">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-[1px] bg-[#860000]"></div>
              <span className="text-[#860000] text-sm font-semibold tracking-wider uppercase">
                Quality Assurance
              </span>
            </div>
            
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-[1.2] mb-8"
              style={{ fontFamily: 'MainFont, sans-serif' }}
            >
              Quality You Can Feel in <span className="text-[#860000]">Every Sheet,</span><br />
              Excellence Crafted by <span className="text-[#860000]">Hand</span>
            </h2>
            
            <div className="flex flex-col gap-5">
              <p className="text-sm leading-tight text-gray-900">
                Quality is at the heart of everything we do. We procure the finest biodegradable handmade paper and leather from the most reliable sources. Raw materials are tested on multiple parameters before entering production. 
              </p>
              <p className="text-sm leading-tight text-gray-900">
                Our premium quality accessories and handmade paper products are thoughtfully crafted for modern and creative lifestyles.
              </p>
              <p className="text-sm leading-tight text-gray-900">
                From elegant leather diary and vintage diary collections to stylish diary notebook, paper notebook, and leather journal designs, every piece reflects fine craftsmanship and timeless appeal.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="flex-1 w-full flex justify-center lg:justify-start">
            <img
              src="/images/about/about3.svg"
              alt="Quality Assurance"
              className="w-full max-w-lg xl:max-w-xl object-contain"
            />
          </div>
        </div>

        {/* =========================================
            SECTION 3: OUR TEAM
            ========================================= */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Text Content */}
          <div className="flex-1 flex flex-col">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-[1px] bg-[#860000]"></div>
              <span className="text-[#860000] text-sm font-semibold tracking-wider uppercase">
                Our Team
              </span>
            </div>
            
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-[1.2] mb-8"
              style={{ fontFamily: 'MainFont, sans-serif' }}
            >
              Driven by <span className="text-[#860000]">Passion</span><br />
              Guided by <span className="text-[#860000]">Craft</span>
            </h2>
            
            <div className="flex flex-col gap-5">
              <p className="text-sm leading-tight text-gray-900">
                Our team comprises experienced craftsmen, designers, and skilled artisans - each a master in their respective field. 
              </p>
              <p className="text-sm leading-tight text-gray-900">
                Our designers are well-versed in global market trends and work in close collaboration with clients to bring ideas to life, transforming them into paper products that stand apart in any market.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="flex-1 w-full flex justify-center lg:justify-end">
            <img
              src="/images/about/about4.svg"
              alt="Our Team"
              className="w-full max-w-lg xl:max-w-xl object-contain"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutValues;