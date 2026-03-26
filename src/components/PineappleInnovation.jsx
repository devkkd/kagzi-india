import React from 'react';

const PineappleInnovation = () => {
  return (
    <section className="w-full py-20 sm:py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================
            TOP SECTION: HEADING & INTRO
            ========================================= */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-16 mb-20 lg:mb-24">
          
          {/* Left Column: Heading */}
          <div className="flex flex-col flex-1 w-full">
            
            {/* Pre-title */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-[1px] bg-[#860000]"></div>
              <span className="text-[#860000] text-sm font-semibold tracking-wider uppercase">
                Beyond Cotton - Innovation In Progress
              </span>
            </div>

            {/* Main Heading */}
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-[1.3] lg:leading-[1.4]"
              style={{ fontFamily: 'MainFont, sans-serif' }}
            >
              What If the World's Next <br className="hidden lg:block" />
              Paper Came from a <br className="hidden lg:block" />
              <span className="text-[#860000]">Pineapple?</span>
            </h2>
          </div>

          {/* Right Column: Description Text */}
          <div className="flex flex-col flex-1 lg:max-w-xl gap-6 lg:pt-14">
            <p className="text-sm leading-tight text-gray-900 font-medium">
              We don't just preserve tradition. We question it - carefully, scientifically, with the same hands that have made cotton rag paper for decades.
            </p>
            <p className="text-sm leading-tight text-gray-900 font-medium">
              <span className="font-bold">Our research programme</span> explores what happens when you look at agricultural waste not as a problem, but as a raw material waiting to be discovered. Pineapple is one of the world's most produced fruits. But for every kilogram eaten, nearly 60% of the plant - the leaves, the crown, the stem – is discarded. In most places, burned or left to rot.
            </p>
            <p className="text-sm leading-tight text-gray-900 font-medium">
              In our workshop in Sanganer, we asked a different question: <span className="font-bold">what if we made paper from it?</span>
            </p>
          </div>

        </div>

        {/* =========================================
            BOTTOM SECTION: DIAGRAM, STATS, & PHOTO
            ========================================= */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12">
          
          {/* Left: Diagram Image */}
          <div className="w-full lg:w-[40%] flex justify-center">
            {/* Update the src to your actual diagram image path */}
            <img 
              src="/images/papermaking/paperMaking2.png" 
              alt="Pineapple Chemical Treatment Diagram" 
              className="w-full max-w-md lg:max-w-full h-auto object-contain mix-blend-multiply"
            />
          </div>

          {/* Center: Highlight Text */}
          <div className="w-full lg:w-[20%] flex flex-col gap-6 text-center lg:text-left">
            <h3 className="text-2xl sm:text-3xl lg:text-[2rem] font-bold text-gray-900 leading-snug">
              Pineapple <br />
              40% Use <br />
              60% Waste
            </h3>
            <p className="text-sm leading-tight text-gray-900 font-medium">
              Every pineapple harvested, 60% of the plant becomes agricultural waste. We're working to make that number mean something different.
            </p>
          </div>

          {/* Right: Field Photo */}
          <div className="w-full lg:w-[40%]">
            <div className="w-full aspect-[4/3] sm:aspect-video lg:aspect-[4/2.5] bg-gray-200 overflow-hidden">
              {/* Update the src to your actual field image path */}
              <img 
                src="/images/papermaking/paperMaking3.png" 
                alt="Pineapples growing in a field" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default PineappleInnovation;