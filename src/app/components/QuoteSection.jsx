import React from 'react';

const QuoteSection = () => {
  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 bg-[#FBF0E4] relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center z-10">
        
        {/* Background Quote Icon */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none select-none">
          <img 
            src="/images/icons/icon9.svg" 
            alt="Quote mark background" 
            className="w-32 sm:w-48 lg:w-56 h-auto opacity-40 object-contain"
          />
        </div>

        {/* Quote Text */}
        <h3 
          className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-relaxed sm:leading-relaxed lg:leading-[1.4] mb-8 sm:mb-10 font-medium z-10"
          style={{ fontFamily: '"Crimson Pro", serif' }}
        >
          "In an age that moves too fast, we make paper that asks you to<br className="hidden md:block" /> slow down. To feel the surface, to trust your hands,<br className="hidden md:block" /> to write something worth keeping."
        </h3>

        {/* Author Text */}
        <p 
          className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 tracking-wider z-10"
          style={{ fontFamily: 'Sooner, sans-serif' }}
        >
          THE KAGZI FAMILY, JAIPUR
        </p>

      </div>
    </section>
  );
};

export default QuoteSection;