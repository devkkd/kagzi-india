import React from 'react';

const PaperMakingIntro = () => {
  return (
    <section className="w-full py-20 sm:py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================
            TOP SECTION: FROM FIBRE TO FEELING
            ========================================= */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-16 mb-24 lg:mb-32">
          
          {/* Left Column: Heading */}
          <div className="flex flex-col flex-1 w-full">
            <span className="text-sm leading-tight font-medium text-gray-900 mb-6">
              Our Paper Making Process
            </span>
            <h1 
              className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-[1.2]"
              style={{ fontFamily: 'MainFont, sans-serif' }}
            >
              From Fibre to <span className="text-[#860000]">Feeling</span>
            </h1>
          </div>

          {/* Right Column: Description */}
          <div className="flex flex-col flex-1 lg:max-w-xl gap-6 lg:pt-10">
            <p className="text-sm leading-tight text-gray-900 font-medium">
              Every sheet of <span className="font-bold">Kagzi paper</span> passes through six stages of transformation each one attended to by a human hand, not a machine. This is how we make paper that lasts.
            </p>
            <p className="text-sm leading-tight text-gray-900 font-medium">
              Paper is not manufactured here. It is grown nurtured from raw cotton waste through water, patience, and skilled hands into something the world needs more of: a surface that holds meaning.
            </p>
            <p className="text-sm leading-tight text-gray-900 font-medium">
              Our process has not changed in centuries. Not because we haven't tried new things – but because the old way, done with care, still produces the finest paper on earth.
            </p>
          </div>

        </div>

        {/* =========================================
            BOTTOM SECTION: OUR PRIMARY FIBRE
            ========================================= */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-16">
          
          {/* Left Column: Heading & Image */}
          <div className="flex flex-col flex-1 w-full">
            
            {/* Pre-title with line */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-[1px] bg-[#860000]"></div>
              <span className="text-[#860000] text-sm font-semibold tracking-wider uppercase">
                Our Primary Fibre
              </span>
            </div>

            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-[1.2] mb-10"
              style={{ fontFamily: 'MainFont, sans-serif' }}
            >
              Cotton The Soul Of <br className="hidden sm:block" />
              Every Sheet We <span className="text-[#860000]">Make</span>
            </h2>

            <div className="w-full aspect-[4/2] bg-gray-200 overflow-hidden">
              <img 
                src="/images/papermaking/paperMaking1.png" 
                alt="Cotton Field" 
                className="w-full h-full object-cover"
              />
            </div>
            
          </div>

          {/* Right Column: Description & Stats Grid */}
          <div className="flex flex-col flex-1 lg:max-w-xl lg:pt-[104px]">
            <p className="text-sm leading-tight text-gray-900 font-medium mb-16">
              Cotton rag is not just a material to us it is the reason our paper exists at all. <br />
              A fibre with <span className="font-bold">95%</span> cellulose purity, rescued from textile waste and reborn as something archival, beautiful, and permanent. <br />
              Here is the science behind why it works.
            </p>

            {/* Stats Grid with interlocking borders */}
            <div className="grid grid-cols-2">
              
              {/* Stat 1: Top Left */}
              <div className="flex flex-col border-b border-r border-gray-400 pb-8 pr-4 sm:pr-8">
                <span 
                  className="text-4xl sm:text-5xl lg:text-6xl text-gray-900 mb-2"
                  style={{ fontFamily: 'MainFont, sans-serif' }}
                >
                  95%
                </span>
                <span className="text-sm leading-tight text-gray-900 font-medium">
                  Cellulose Purity
                </span>
              </div>

              {/* Stat 2: Top Right */}
              <div className="flex flex-col border-b border-gray-400 pb-8 pl-4 sm:pl-8">
                <span 
                  className="text-4xl sm:text-5xl lg:text-6xl text-gray-900 mb-2"
                  style={{ fontFamily: 'MainFont, sans-serif' }}
                >
                  100%
                </span>
                <span className="text-sm leading-tight text-gray-900 font-medium">
                  Recycled Textile Waste
                </span>
              </div>

              {/* Stat 3: Bottom Left */}
              <div className="flex flex-col border-r border-gray-400 pt-8 pr-4 sm:pr-8">
                <span 
                  className="text-4xl sm:text-5xl lg:text-6xl text-gray-900 mb-2"
                  style={{ fontFamily: 'MainFont, sans-serif' }}
                >
                  0
                </span>
                <span className="text-sm leading-tight text-gray-900 font-medium">
                  Trees Used. Ever.
                </span>
              </div>

              {/* Stat 4: Bottom Right */}
              <div className="flex flex-col pt-8 pl-4 sm:pl-8">
                <span 
                  className="text-4xl sm:text-5xl lg:text-6xl text-gray-900 mb-2"
                  style={{ fontFamily: 'MainFont, sans-serif' }}
                >
                  ∞
                </span>
                <span className="text-sm leading-tight text-gray-900 font-medium">
                  Archival Lifespan
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default PaperMakingIntro;