import Link from 'next/link';
import React from 'react';

const Hero = () => {
  const certIcons = [
    { id: 1, src: '/images/icons/icon10.svg', alt: 'ISO Certified' },
    { id: 2, src: '/images/icons/icon11.svg', alt: 'IAF Accredited' },
    { id: 5, src: '/images/icons/icon14.png', alt: 'AGCS' },
  ];

  return (
    <section className="w-full pt-5">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* 1. Top Wide Text */}
        <div className="text-xs sm:text-sm font-medium text-center sm:text-left text-gray-900">
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
              className="text-3xl sm:text-4xl lg:text-[58px] font-extrabold text-gray-900"
              style={{ fontFamily: 'MainFont, sans-serif' }}
            >
              Paper As <span className="text-[#860000]">Pure</span> As Its <span className="text-[#860000]">Making</span>
            </h1>

            {/* Added Logos Here */}
            <div className="mt-12 flex flex-wrap items-center gap-6 md:gap-8">
              {certIcons.map((icon) => (
                <div key={icon.id} className="h-10 md:h-12 w-auto flex items-center">
                  <img 
                    src={icon.src} 
                    alt={icon.alt} 
                    className="h-full w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Paragraph & Buttons */}
          <div className="lg:col-span-5 flex flex-col justify-center">
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