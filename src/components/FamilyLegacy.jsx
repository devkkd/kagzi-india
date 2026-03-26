import React from 'react';

const FamilyLegacy = () => {
  const stats = [
    { number: '1990', label: 'Founded in Jaipur' },
    { number: '120+', label: 'Products in Range' },
    { number: '40+', label: 'Years Craft Expertise' },
    { number: '30+', label: 'Countries Exported To' },
    { number: '100%', label: 'Natural Fibres' },
  ];

  return (
    <section className="w-full py-20 sm:py-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16">
        
        {/* Top Section: Text and Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Content */}
          <div className="flex flex-col">
            {/* Subheading */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-[1px] bg-[#860000]"></div>
              <span className="text-[#860000] text-sm font-semibold tracking-wider uppercase">
                Who We're
              </span>
            </div>

            {/* Main Heading */}
            <h2 
              className="text-4xl sm:text-5xl text-gray-900 leading-[1.5] mb-4"
              style={{ fontFamily: 'MainFont, sans-serif' }}
            >
              A Family Legacy Written in <br />
              <span className="text-[#860000]">Cotton & Water</span>
            </h2>

            {/* Paragraphs */}
            <div className="text-gray-900 text-sm leading-tight space-y-6 max-w-xl">
              <p>
                In the workshops of <span className="font-bold">Sanganer, Jaipur</span> where afternoon light falls in long golden strips and the river Saraswati once ran clear we make paper the way it has always been made.
              </p>
              
              <p className="font-bold">
                Slowly. By hand. With materials the earth itself offers.
              </p>

              <p>
                <span className="font-bold">Kagzi Industries</span> has been a quiet keeper of this tradition since 1990, supplying India and the world with paper that carries the imprint of its maker. We are not a factory. We are a family of paper-lovers artisans who understand that the deckled edge of a handmade sheet is not a flaw, but a signature.
              </p>

              <p>
                We partner with major global brands - <span className="font-bold">TESCO, TARGET, CARREFOUR, PIER ONE, INDISKA</span> - and serve independent designers, publishers, and luxury labels across 30+ countries.
              </p>
            </div>

            {/* Button */}
            <button className="bg-[#860000] text-white px-8 py-3.5 rounded-full text-base font-medium hover:bg-[#680000] transition-colors w-fit mt-5">
              See All About Kagzi Industries &rarr;
            </button>
          </div>

          {/* Right Column: Image Group */}
          <div className="flex justify-center lg:justify-end h-full">
            <img 
              src="/images/home/home1.svg" 
              alt="Kagzi Industries Legacy" 
              className="w-full max-w-lg lg:max-w-none object-contain"
            />
          </div>

        </div>

        {/* Bottom Section: Statistics Strip */}
        <div className="mt-8 sm:mt-14 w-full border border-gray-900 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 lg:divide-x divide-gray-900 bg-transparent">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center justify-center py-4 sm:py-6 text-center px-3">
              <span 
                className="text-4xl sm:text-5xl text-gray-900 mb-3"
                style={{ fontFamily: 'MainFont, sans-serif' }}
              >
                {stat.number}
              </span>
              <span className="text-gray-800 text-sm sm:text-base font-medium tracking-wide">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FamilyLegacy;