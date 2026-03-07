import React from 'react';

const RootedInJaipur = () => {
  return (
    <section className="w-full py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: Heading & Paragraphs */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-20 mb-16 sm:mb-20">
          
          {/* Left Column: Main Heading */}
          <div className="flex-1">
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-[1.2]"
              style={{ fontFamily: 'Sooner, sans-serif' }}
            >
              Rooted in <span className="text-[#860000]">Jaipur</span>,<br className="hidden sm:block" />
              Grown for the <span className="text-[#860000]">World</span>
            </h2>
          </div>

          {/* Right Column: Description */}
          <div className="flex-1 flex flex-col gap-5 lg:pt-2">
            <p className="text-sm leading-tight text-gray-900">
              <span className="font-bold">Founded in 1990, Kagzi Industries</span> began with a single vision: to bring the world's most ancient papermaking tradition into a global marketplace – without losing a single thread of its soul.
            </p>
            <p className="text-sm leading-tight text-gray-900">
              <span className="font-bold">We started in Sanganer, Jaipur</span> - the historic heartland of India's handmade paper craft, where the <span className="font-bold">Kagzi community</span> has made paper for centuries. Armed with generations of inherited knowledge, recycled cotton fibres, and a deep belief that sustainable and beautiful are not opposing ideas, we built a business around craft.
            </p>
            <p className="text-sm leading-tight text-gray-900">
              Today, we are one of India's leading manufacturers and exporters of handmade paper products, supplying brands across <span className="font-bold">30+ countries</span> with paper that carries something no machine can replicate: the imprint of a human hand.
            </p>
          </div>

        </div>

        {/* Bottom Section: Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Our Mission Card */}
          <div className="border border-[#860000] p-4 sm:p-5 lg:p-6 flex flex-col justify-around">
            <div className="flex items-center gap-6 mb-8">
              <img 
                src="/images/icons/icon15.svg" 
                alt="Mission Icon" 
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain flex-shrink-0"
              />
              <h3 
                className="text-3xl sm:text-4xl lg:text-5xl text-gray-900"
                style={{ fontFamily: 'Sooner, sans-serif' }}
              >
                Our Mission
              </h3>
            </div>
            <p className="text-sm leading-tight text-gray-900 pl-2">
              To produce the world's finest handmade paper - sustainably, equitably, and beautifully - while preserving the ancient craft of the <span className="font-bold">Kagzi community</span> for generations to come.
            </p>
          </div>

          {/* Our Vision Card */}
          <div className="border border-[#860000] p-4 sm:p-5 lg:p-6 flex flex-col justify-around">
            <div className="flex items-center gap-6 mb-8">
              <img 
                src="/images/icons/icon15.svg" 
                alt="Vision Icon" 
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain flex-shrink-0"
              />
              <h3 
                className="text-3xl sm:text-4xl lg:text-5xl text-gray-900"
                style={{ fontFamily: 'Sooner, sans-serif' }}
              >
                Our Vision
              </h3>
            </div>
            <div className="text-sm leading-tight text-gray-900  pl-2 mx-auto">
              A world where every sheet of paper carries a story worth telling, and every business that touches it is made more purposeful by the choice.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default RootedInJaipur;