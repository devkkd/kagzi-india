import React from 'react';

const WeMake = () => {
  return (
    <section className="w-full py-20 sm:py-24 bg-[#FBF0E4]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        
        {/* Main Heading */}
        <h2 
          className="text-4xl sm:text-5xl lg:text-[3.5rem] text-gray-900 leading-[1.1] sm:leading-[1.2] mb-6"
          style={{ fontFamily: 'Sooner, sans-serif' }}
        >
          This Is the Paper <span className="text-[#860000]">We Make</span>
        </h2>

        {/* Subtitle / Description */}
        <p className="text-base sm:text-lg text-gray-900 font-medium mb-10">
          Every sheet carries 3,500 years of human ingenuity. Feel it.
        </p>
        
        {/* Button */}
        <button className="bg-[#860000] text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-[#680000] transition-colors flex items-center justify-center gap-2 w-max">
          Explore Our Products <span aria-hidden="true">&rarr;</span>
        </button>

      </div>
    </section>
  );
};

export default WeMake;