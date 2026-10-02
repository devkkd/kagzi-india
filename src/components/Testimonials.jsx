"use client";

import React from "react";

const Testimonials = () => {
  const testimonialsData = [
    {
      id: 1,
      text: "We were looking for sustainable packaging material and found the handmade paper very suitable for our products. Good quality and professional service.",
      name: "Vikram Jain",
    },
    {
      id: 2,
      text: "We ordered handmade paper for our wedding invitation project. The texture and finish made the final product look very premium.",
      name: "Neha Agarwal",
    },
    {
      id: 3,
      text: "Good experience with the team. They understood our custom size and GSM requirements and helped us select the right paper.",
      name: "Rohan Bansal",
    },
    {
      id: 4,
      text: "The handmade paper has a beautiful natural appearance. We are using it for our eco-friendly product packaging and are satisfied with the result.",
      name: "Simran Kaur",
    },
    {
      id: 5,
      text: "We loved the handmade feel of the paper. It added a premium touch to our notebooks and other stationery products.",
      name: "Meera Joshi",
    },
    {
      id: 6,
      text: "Very good collection of handmade paper and paper products. The team was responsive and understood our bulk-order requirements.",
      name: "Aditya Verma",
    },
    {
      id: 7,
      text: "The natural texture and deckled edges gave our packaging a handcrafted look. Very happy with the overall quality.",
      name: "Pooja Sethi",
    },
    {
      id: 8,
      text: "We sourced handmade paper for our corporate gifting products. The paper quality and finish worked very well for our project.",
      name: "Nikhil Sharma",
    },
    {
      id: 9,
      text: "Beautiful paper with a genuine handmade appearance. We especially liked the customization options for our brand requirements.",
      name: "Kavya Singh",
    },
    {
      id: 10,
      text: "We were looking for sustainable handmade paper for our packaging line. The quality, texture, and natural finish were exactly what we needed.",
      name: "Emily Carter",
      country: "UK",
    },
    {
      id: 11,
      text: "The paper has a wonderful artisanal character and premium feel. It worked beautifully for our luxury stationery collection.",
      name: "Sophie Martin",
      country: "France",
    },
    {
      id: 12,
      text: "We needed consistent handmade paper for our stationery products. Kagzi India provided a quality product that matched our requirements.",
      name: "Michael Johnson",
      country: "Germany",
    },
    {
      id: 13,
      text: "We appreciated the customization options available for our project. The paper quality and handmade texture gave our packaging a premium appearance.",
      name: "Thomas Anderson",
      country: "USA",
    },
    {
      id: 14,
      text: "We sourced custom handmade paper for our brand and were happy with the quality and professional communication.",
      name: "William Harris",
      country: "UK",
    },
    {
      id: 15,
      text: "We were searching for sustainable paper for our premium stationery products. The handmade finish and quality were a great fit for our collection.",
      name: "Isabella Rossi",
      country: "Singapore",
    },
  ];

  // Reusable Star Rating Component
  const Stars = () => (
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4 text-[#860000]"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );

  // Reusable Card Component
  const TestimonialCard = ({ data }) => {
    // First letter of the person's name
    const firstLetter = data.name.charAt(0).toUpperCase();

    return (
      <div className="w-[320px] sm:w-[380px] flex-shrink-0 whitespace-normal bg-[#F5ECE3] p-8 rounded-2xl flex flex-col justify-between">
        <div>
          <Stars />

          <p className="text-sm leading-tight text-gray-900 mb-6 font-medium">
            {data.text}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* First Letter Avatar */}
          <div className="w-10 h-10 rounded-full bg-[#860000] flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm font-bold">
              {firstLetter}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-900">
              {data.name}
            </span>

            {data.country && (
              <span className="text-xs text-gray-500">
                {data.country}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

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
          style={{ fontFamily: "MainFont, sans-serif" }}
        >
          What Our Customers{" "}
          <span className="text-[#860000]">Are Saying</span>
        </h2>
      </div>

      {/* Marquee Container */}
      <div className="flex flex-col gap-6 w-full relative">
        
        {/* Row 1: Scrolling Left */}
        <div className="flex whitespace-nowrap animate-marquee-left w-max pause-on-hover">
          {[...Array(2)].map((_, arrayIndex) => (
            <div
              key={arrayIndex}
              className="flex gap-6 px-3"
            >
              {testimonialsData.map((testimonial) => (
                <TestimonialCard
                  key={`${arrayIndex}-${testimonial.id}`}
                  data={testimonial}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Row 2: Scrolling Right */}
        <div className="flex whitespace-nowrap animate-marquee-right w-max pause-on-hover">
          {[...Array(2)].map((_, arrayIndex) => (
            <div
              key={arrayIndex}
              className="flex gap-6 px-3"
            >
              {[...testimonialsData]
                .reverse()
                .map((testimonial) => (
                  <TestimonialCard
                    key={`row2-${arrayIndex}-${testimonial.id}`}
                    data={testimonial}
                  />
                ))}
            </div>
          ))}
        </div>
      </div>

      {/* Custom Keyframe Animations */}
      <style jsx="true">{`
        @keyframes marqueeLeft {
          0% {
            transform: translateX(0%);
          }

          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes marqueeRight {
          0% {
            transform: translateX(-50%);
          }

          100% {
            transform: translateX(0%);
          }
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