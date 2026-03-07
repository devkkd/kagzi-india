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
              style={{ fontFamily: 'Sooner, sans-serif' }}
            >
              Design Is Not <span className="text-[#860000]">Decoration</span><br />
              It's Our <span className="text-[#860000]">Language</span>
            </h2>
            
            <div className="flex flex-col gap-5">
              <p className="text-sm leading-tight text-gray-900">
                We believe design plays a vital role in expanding market reach. Our products are not just items - they are expressions of creativity, emotional values, and cultural heritage.
              </p>
              <p className="text-sm leading-tight text-gray-900">
                We always provide our clients with original designs that blend tradition and modernity without apology.
              </p>
              <p className="text-sm leading-tight text-gray-900">
                Every product begins with a question: What does this mean to the person who holds it? The answer shapes everything the texture, the weight, the colour, the edge.
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
              style={{ fontFamily: 'Sooner, sans-serif' }}
            >
              Quality Isn't a <span className="text-[#860000]">Process</span><br />
              It's a Standard of <span className="text-[#860000]">Care</span>
            </h2>
            
            <div className="flex flex-col gap-5">
              <p className="text-sm leading-tight text-gray-900">
                Quality is at the heart of everything we do. We procure the finest biodegradable handmade paper and leather from the most reliable sources. Raw materials are tested on multiple parameters before entering production.
              </p>
              <p className="text-sm leading-tight text-gray-900">
                Accessories are meticulously attached. Printing, where required, is done with precision. The entire process is supervised by master craftsmen.
              </p>
              <p className="text-sm leading-tight text-gray-900">
                Our ornamentation artists then enhance finished products with dried flowers, leaves, or hand-applied paint. Finally, we personally handpick the best items before dispatch - ensuring only the finest reach our clients.
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
              style={{ fontFamily: 'Sooner, sans-serif' }}
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