import Link from 'next/link';
import React from 'react';

const Hero = () => {

  return (
    <section className="w-full pt-5">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">

        {/* 1. Top Wide Text - justify between */}
        <div className="flex justify-between items-center text-xs sm:text-sm font-medium text-gray-900 uppercase tracking-wide">
          <span>HANDCRAFTED 100% SUSTAINABLE MADE IN INDIA</span>
          <span>ARTISAN MAKING HANDMADE PAPER</span>
        </div>

        {/* 2. Sub-header: location left, description right */}
        <div className="flex justify-between items-start text-sm text-gray-900 uppercase tracking-wide mt-5 md:mt-8 gap-8">
          <span className="shrink-0">JAIPUR, INDIA - EST. 1940</span>
          <p className="text-xs sm:text-sm text-gray-800 leading-relaxed normal-case text-right max-w-md">
            We craft 100% cotton rag handmade paper for the world's most thoughtful brands from Jaipur's ancient paper quarter, the way it has always been done.
          </p>
        </div>

        {/* 3. Main Content Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mt-8 md:mt-10 mb-4">

          {/* Left Column: Heading & Badges */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Using the Sooner font defined in your global CSS */}
            <h1
              className="text-3xl sm:text-4xl lg:text-[58px] font-extrabold text-gray-900"
              style={{ fontFamily: 'MainFont, sans-serif' }}
            >
              Paper As <span className="text-[#860000]">Pure</span> As Its <span className="text-[#860000]">Making</span>
            </h1>

            {/* Added Logos Here */}
            {/* <div className="mt-12 flex flex-wrap items-center gap-6 md:gap-8">
              {certIcons.map((icon) => (
                <div key={icon.id} className="h-10 md:h-12 max-w-[120px] w-auto flex items-center">
                  <img
                    src={icon.src}
                    alt={icon.alt}
                    className="h-full w-auto object-contain"
                  />
                </div>
              ))}
            </div> */}
          </div>

          {/* Right Column: Buttons */}
          <div className="lg:col-span-5 flex flex-col justify-center">
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