"use client";
import React from 'react';

const Testimonials = () => {
  // Dummy data generated inside the component
  const testimonialsData = Array(8).fill({
    id: 1,
    text: "Nice collection (though limited selection) of handmade paper. They'll also give you a quick tour of the paper making process. Price of paper and books is a lot lesser than any boutique store since this is a factory outlet.",
    name: "Sudeep Nair",
    avatar: "/images/testimonials/avatar.png" // Replace with your actual path
  }).map((item, index) => ({ ...item, id: index }));

  // Reusable Star Rating Component (SVG)
  const Stars = () => (
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-4 h-4 text-[#860000]" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );

  // Reusable Card Component
  const TestimonialCard = ({ data }) => (
    <div className="w-[320px] sm:w-[380px] flex-shrink-0 whitespace-normal bg-[#F5ECE3] p-8 rounded-2xl flex flex-col justify-between">
      <div>
        <Stars />
        <p className="text-sm leading-tight text-gray-900 mb-6 font-medium">
          {data.text}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden flex-shrink-0">
          {/* Fallback styling in case image is missing */}
          <img 
            src={data.avatar} 
            alt={data.name} 
            className="w-full h-full object-cover"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>
        <span className="text-sm font-bold text-gray-900">
          {data.name}
        </span>
      </div>
    </div>
  );

  return (
    <section className="w-full py-20 sm:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 lg:mb-16">
        
        {/* Header Area */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-[1px] bg-[#860000]"></div>
          <span className="text-[#860000] text-sm font-semibold tracking-wider uppercase">
            Happy Customers
          </span>
        </div>
        
        <h2 
          className="text-4xl sm:text-5xl text-gray-900 leading-tight"
          style={{ fontFamily: 'MainFont, sans-serif' }}
        >
          What Our Customers <span className="text-[#860000]">Are Saying</span>
        </h2>

      </div>

      {/* Marquee Container */}
      <div className="flex flex-col gap-6 w-full relative">
        
        {/* Row 1: Scrolling Left */}
        <div className="flex whitespace-nowrap animate-marquee-left w-max pause-on-hover">
          {[...Array(2)].map((_, arrayIndex) => (
            <div key={arrayIndex} className="flex gap-6 px-3">
              {testimonialsData.map((testimonial) => (
                <TestimonialCard key={`${arrayIndex}-${testimonial.id}`} data={testimonial} />
              ))}
            </div>
          ))}
        </div>

        {/* Row 2: Scrolling Right */}
        <div className="flex whitespace-nowrap animate-marquee-right w-max pause-on-hover">
          {[...Array(2)].map((_, arrayIndex) => (
            <div key={arrayIndex} className="flex gap-6 px-3">
              {[...testimonialsData].reverse().map((testimonial) => (
                <TestimonialCard key={`row2-${arrayIndex}-${testimonial.id}`} data={testimonial} />
              ))}
            </div>
          ))}
        </div>

      </div>

      {/* Custom Keyframe Animations */}
      <style jsx="true">{`
        @keyframes marqueeLeft {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        
        .animate-marquee-left {
          animation: marqueeLeft 40s linear infinite;
        }
        
        .animate-marquee-right {
          animation: marqueeRight 40s linear infinite;
        }

        /* Hover pause logic */
        .pause-on-hover:hover {
          animation-play-state: paused;
        }
      `}</style>
      
    </section>
  );
};

export default Testimonials;