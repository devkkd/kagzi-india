"use client"
import React from 'react';
// Import Swiper React components and modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const SliderSection = () => {
  // Array of text items for the marquee
  const marqueeItems = [
    "HANDMADE SINCE 1980",
    "ZERO-CHEMICAL DYEING",
    "B2B",
    "MADE IN JAIPUR",
    "EXPORT QUALITY",
    "DECKLE EDGE ARTISAN PAPER",
    "COTTON RAG PAPER",
    "SUSTAINABLE",
  ];

  return (
    <section className="w-full flex flex-col">
      
      {/* 1. Image Slider Section */}
      <div className="w-full relative group">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{
            clickable: true,
            el: '.custom-swiper-pagination',
            bulletClass: 'swiper-custom-bullet',
            bulletActiveClass: 'swiper-custom-bullet-active',
          }}
          navigation={{
            prevEl: '.custom-prev',
            nextEl: '.custom-next',
          }}
          className="w-full h-[400px] sm:h-[500px] lg:h-[600px]"
        >
          {/* Repeating the same image 3 times as requested */}
          {[1, 2, 3].map((index) => (
            <SwiperSlide key={index}>
              <div className="w-full h-full relative">
                <img 
                  src="/images/banner/banner1.png" 
                  alt={`Banner Slide ${index}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Arrows (matching the white circles in your design) */}
        <button className="custom-prev absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-800 hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer">
          <FiChevronLeft size={24} />
        </button>
        <button className="custom-next absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-800 hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer">
          <FiChevronRight size={24} />
        </button>

        {/* Custom Pagination Container */}
        {/* <div className="custom-swiper-pagination absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full"></div> */}
      </div>

      {/* 2. Infinite Marquee Banner (Left to Right) */}
      <div className="w-full bg-[#860000] py-3.5 overflow-hidden flex relative mt-5">
        <div className="flex whitespace-nowrap animate-marquee-lr">
          {/* We duplicate the content twice to create the seamless infinite loop */}
          {[...Array(2)].map((_, arrayIndex) => (
            <div key={arrayIndex} className="flex items-center">
              {marqueeItems.map((item, index) => (
                <React.Fragment key={`${arrayIndex}-${index}`}>
                  <span className="text-white text-xs sm:text-sm font-semibold tracking-wider px-6">
                    {item}
                  </span>
                  {/* Diamond Separator */}
                  <span className="text-white text-[10px] mx-2">◆</span>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 3. Embedded CSS for custom Swiper styling & Left-to-Right Marquee Animation */}
      <style jsx="true">{`
        /* Marquee Animation (Left to Right) */
        @keyframes marquee-lr {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee-lr {
          animation: marquee-lr 30s linear infinite;
          /* Width is doubled due to the two identical blocks of content */
          width: max-content; 
        }

        /* Swiper Custom Pagination Bullets */
        .swiper-custom-bullet {
          width: 8px;
          height: 8px;
          background-color: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          display: inline-block;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .swiper-custom-bullet-active {
          background-color: #ffffff;
          transform: scale(1.2);
        }
      `}</style>
      
    </section>
  );
};

export default SliderSection;