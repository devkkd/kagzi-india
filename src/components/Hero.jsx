import Link from 'next/link';
import React from 'react';

const Hero = () => {
  return (
    <section className="w-full pt-5">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* 1. Top Wide Text */}
        <div className="text-center text-xs sm:text-sm font-medium tracking-[0.4em] sm:tracking-[1.6em] text-gray-900">
          HANDCRAFTED 100% SUSTAINABLE MADE IN INDIA
        </div>

        {/* 2. Sub-header text */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-900 uppercase tracking-wide mt-5 md:mt-8 ">
          <span>JAIPUR, INDIA - EST. 1980</span>
          <span className="mt-2 sm:mt-0">ARTISAN MAKING HANDMADE PAPER</span>
        </div>

        {/* 3. Main Content Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mt-8 md:mt-10">
          
          {/* Left Column: Heading & Badges */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Using the Sooner font defined in your global CSS */}
            <h1 
              className="text-3xl sm:text-4xl lg:text-6xl leading-[1.1] text-gray-900"
              style={{ fontFamily: 'Sooner, sans-serif' }}
            >
              Paper As <span className="text-[#860000]">Pure</span> As Its <span className="text-[#860000]">Making</span>
            </h1>

            <div className="mt-12 flex flex-wrap items-center gap-3 text-sm sm:text-base font-bold text-gray-900 tracking-wide">
              <span>✓ ISO 9001:2015 Certified</span>
              <span className="text-gray-400 font-normal mx-1">|</span>
              <span>✓ IAF Accredited</span>
              <span className="text-gray-400 font-normal mx-1">|</span>
              <span>✓ AGCS Verified</span>
            </div>
          </div>

          {/* Right Column: Paragraph & Buttons */}
          <div className="lg:col-span-5 flex flex-col justify-center lg:pl-6">
            <p className="text-sm sm:text-md text-gray-800 leading-relaxed mb-10">
              We craft 100% cotton rag handmade paper for the world's most thoughtful brands from Jaipur's ancient paper quarter, the way it has always been done.
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <Link href='/products'>
              <button className="bg-[#860000] text-white px-8 py-3.5 rounded-full text-base font-medium hover:bg-[#680000] transition-colors flex items-center gap-2">
                Explore Our Products <span>&rarr;</span>
              </button>
              </Link>
              <Link href='/contact'>
              <button className="bg-transparent border border-gray-900 text-gray-900 px-8 py-3.5 rounded-full text-base font-medium hover:bg-gray-100 transition-colors">
                Request A Quote
              </button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;