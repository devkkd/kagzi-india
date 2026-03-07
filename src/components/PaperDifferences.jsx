import React from 'react';

const PaperDifferences = () => {
  // Data for Section 1: Differences
  const differences = [
    {
      subtitle: 'Quality 01',
      title: 'Archival Quality',
      desc: 'Cotton rag paper can outlast wood-pulp paper by centuries. Museums and archivists worldwide prefer it for documents meant to last.'
    },
    {
      subtitle: 'Quality 02',
      title: 'Deckle Edge',
      desc: 'Each sheet has a natural, organic edge on all four sides unrepeatable, uneven, entirely handmade. No machine can fake it. No two sheets are the same.'
    },
    {
      subtitle: 'Quality 03',
      title: 'Acid-Free',
      desc: 'Our paper will not yellow, crack, or degrade over time. It is safe for fine art, legal documents, and anything meant to outlast the moment it was made for.'
    },
    {
      subtitle: 'Quality 04',
      title: 'Eco-Certified',
      desc: 'Zero trees. Zero harmful chemicals. 100% recycled input material. ISO 9001:2015 certified production from start to finish.'
    },
    {
      subtitle: 'Quality 05',
      title: 'Tactile Richness',
      desc: 'The surface texture holds ink, paint, and gold leaf differently from any other paper. Artists who use it once rarely go back to anything else.'
    }
  ];

  // Data for Section 2: Materials
  const materials = [
    {
      num: '01.',
      title: 'Cotton Rag',
      desc: 'Strong, long-lasting, archival. The primary building block of every sheet we make. Sourced from textile waste rescued before it reaches landfill.',
      footer: 'Primary Fibre'
    },
    {
      num: '02.',
      title: 'Khadi Fibre',
      desc: 'Indigenous, rough-textured, distinctly Indian. Used in our premium specialty sheets for a surface texture that tells you exactly where it was made.',
      footer: 'Specialty Texture'
    },
    {
      num: '03.',
      title: 'Natural Colour',
      desc: 'Indigo, turmeric, rose petals, pomegranate rind, henna. Colour that comes from the same earth the paper was made in. Zero synthetic dyes.',
      footer: 'Zero Chemicals'
    },
    {
      num: '04.',
      title: 'Pineapple Leaf',
      desc: 'From our ongoing research programme pineapple leaves yield cellulose-rich fibre that creates uniquely lightweight, translucent papers. Experimental line.',
      footer: 'Innovation Fibre'
    },
    {
      num: '05.',
      title: 'Clean Water',
      desc: 'The silent ingredient. Treated and returned to the ground after every use. Paper should nourish the world, not deplete it.',
      footer: 'Zero Waste'
    }
  ];

  return (
    <section className="w-full py-20 sm:py-24 bg-transparent text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-24 lg:gap-32">
        
        {/* =========================================
            SECTION 1: WHAT MAKES OUR PAPER DIFFERENT
            ========================================= */}
        <div className="flex flex-col">
          
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-[1px] bg-[#860000]"></div>
            <span className="text-[#860000] text-sm font-semibold tracking-wider uppercase">
              What Makes Our Paper Different
            </span>
          </div>

          <h2 
            className="text-3xl sm:text-4xl lg:text-5xl leading-[1.2] mb-12"
            style={{ fontFamily: 'Sooner, sans-serif' }}
          >
            The Difference You Can <span className="text-[#860000]">Feel</span>
          </h2>

          {/* Grid Layout for 5 columns */}
          <div className="grid grid-cols-1 lg:grid-cols-5 w-full border-t border-b border-gray-300 divide-y lg:divide-y-0 lg:divide-x divide-gray-300">
            {differences.map((item, index) => (
              <div 
                key={index} 
                className="flex flex-col p-6 lg:px-6 lg:py-8 hover:bg-[#FFDEDE] transition-colors duration-300 ease-in-out cursor-default"
              >
                <span className="text-sm font-bold text-gray-900 mb-1 block">
                  {item.subtitle}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-sm leading-tight text-gray-900 font-medium">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================
            SECTION 2: WHAT WE USE
            ========================================= */}
        <div className="flex flex-col">
          
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-[1px] bg-[#860000]"></div>
            <span className="text-[#860000] text-sm font-semibold tracking-wider uppercase">
              What We Use
            </span>
          </div>

          <h2 
            className="text-3xl sm:text-4xl lg:text-5xl leading-[1.2] mb-12"
            style={{ fontFamily: 'Sooner, sans-serif' }}
          >
            Materials That Carry No <span className="text-[#860000]">Hidden Harm</span>
          </h2>

          {/* Grid Layout for 5 columns */}
          <div className="grid grid-cols-1 lg:grid-cols-5 w-full border-t border-b border-gray-300 divide-y lg:divide-y-0 lg:divide-x divide-gray-300">
            {materials.map((item, index) => (
              <div 
                key={index} 
                className="flex flex-col p-6 lg:px-6 lg:py-8 hover:bg-[#FFDEDE] transition-colors duration-300 ease-in-out h-full cursor-default"
              >
                <div className="flex flex-col flex-1 mb-8">
                  <span className="text-sm font-bold text-gray-900 mb-1 block">
                    {item.num}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-tight text-gray-900 font-medium">
                    {item.desc}
                  </p>
                </div>
                
                {/* Footer text pinned to bottom */}
                <div className="mt-auto">
                  <span className="text-sm font-bold text-gray-900">
                    {item.footer}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default PaperDifferences;