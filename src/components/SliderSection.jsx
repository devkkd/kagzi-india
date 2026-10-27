"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SliderSection = () => {
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

  const bannerImages = [
    {
      src: "/images/banner/banner1.png",
      alt: "Kagzi India premium handmade paper — Banner 1",
    },
    {
      src: "/images/banner/banner2.png",
      alt: "Kagzi India eco-friendly paper products — Banner 2",
    },
    {
      src: "/images/banner/banner3.png",
      alt: "Kagzi India artisan handmade paper — Banner 3",
    },
  ];

  return (
    <section className="w-full flex flex-col">

      {/* 1. Image Slider */}
      <div className="w-full relative group">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            el: ".custom-swiper-pagination",
            bulletClass: "swiper-custom-bullet",
            bulletActiveClass: "swiper-custom-bullet-active",
          }}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          className="w-full h-[400px] sm:h-[500px] lg:h-[600px]"
        >
          {bannerImages.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="w-full h-full relative">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  /*
                   * priority=true on first slide → tells Next.js to preload this image,
                   * removes lazy-loading, and emits a <link rel="preload"> in <head>.
                   * This is the #1 fix for the 36.4s LCP score.
                   */
                  priority={index === 0}
                  /*
                   * Subsequent slides are lazy-loaded to save bandwidth.
                   */
                  loading={index === 0 ? "eager" : "lazy"}
                  /*
                   * sizes tells the browser the image always fills 100vw,
                   * so it picks the right srcset entry and avoids downloading
                   * a 1920px image on a 375px phone.
                   */
                  sizes="100vw"
                  quality={85}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Arrows */}
        <button
          className="custom-prev absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-800 hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
          aria-label="Previous slide"
        >
          <FiChevronLeft size={24} />
        </button>

        <button
          className="custom-next absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-800 hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
          aria-label="Next slide"
        >
          <FiChevronRight size={24} />
        </button>
      </div>

      {/* 2. Marquee Banner */}
      <div className="w-full bg-[#860000] py-3.5 overflow-hidden flex relative mt-5">
        <div className="flex whitespace-nowrap animate-marquee-lr">
          {[...Array(2)].map((_, arrayIndex) => (
            <div key={arrayIndex} className="flex items-center">
              {marqueeItems.map((item, index) => (
                <React.Fragment key={`${arrayIndex}-${index}`}>
                  <span className="text-white text-xs sm:text-sm font-semibold tracking-wider px-6">
                    {item}
                  </span>
                  <span className="text-white text-[10px] mx-2" aria-hidden="true">
                    ◆
                  </span>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 3. CSS for marquee animation and Swiper bullets */}
      <style jsx="true">{`
        @keyframes marquee-lr {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee-lr {
          animation: marquee-lr 30s linear infinite;
          width: max-content;
        }
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
