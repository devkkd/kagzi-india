"use client";
import Link from 'next/link';
import React, { useState } from 'react';

const FAQ = () => {
  // State to track which FAQ is currently open. Defaulting to 0 (the first one).
  const [openIndex, setOpenIndex] = useState(0);

  // FAQ Data from the design
  const faqs = [
    {
      question: "Can you customize handmade paper according to our brand requirements?",
      answer: "Yes. We can provide sustainable customized handmade paper in different sizes, GSM, colors, textures, and finishes that comply with your brand and product requirements."
    },
    {
      question: "Do you offer custom printing and embossing services?",
      answer: "Yes. We offer custom printing, foil stamping, embossing, debossing, and branding for premium packaging, stationery, invitations, and corporate gifting."
    },
    {
      question: "Can you develop exclusive paper designs for luxury brands?",
      answer: "Yes. As a supplier of handmade paper for luxury packaging, we design exclusive papers with textures and finishes for luxury brands wanting unique packaging solutions."
    },
    {
      question: "Is custom color matching available?",
      answer: "Yes. We offer accurate color matching utilizing eco-friendly pigments to ensure that your handmade papers match your branding and packaging needs."
    },
    {
      question: " Can you manufacture products under our private label?",
      answer: "Yes. As a leading eco-friendly paper manufacturer, we offer private label manufacturing with personalized packaging, branding, and product specs to businesses throughout the world."
    }
  ];

  return (
    <section className="w-full py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-24">
          
          {/* Left Column: Headings */}
          <div className="lg:w-2/5 flex flex-col">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-[1px] bg-[#860000]"></div>
              <span className="text-[#860000] text-sm font-semibold tracking-wider uppercase">
                FAQ's
              </span>
            </div>
            
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-[1.15]"
              style={{ fontFamily: 'MainFont, sans-serif' }}
            >
              Questions We Hear <br />
              Often <span className="text-[#860000]">Answered</span> <br />
              <span className="text-[#860000]">Honestly</span>
            </h2>
          </div>

          {/* Right Column: Accordion */}
          <div className="lg:w-3/5 flex flex-col">
            
            <span className="text-sm font-medium text-gray-900 mb-4">
              About Customization
            </span>

            <div className="flex flex-col border-t border-gray-300">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;

                return (
                  <div 
                    key={index} 
                    className="border-b border-gray-300 group cursor-pointer"
                    onMouseEnter={() => setOpenIndex(index)}
                    onClick={() => setOpenIndex(isOpen ? null : index)} // Toggles on click, but hover keeps it open
                  >
                    {/* Question Header */}
                    <div className="py-6 flex justify-between items-center w-full bg-transparent">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 pr-4">
                        {faq.question}
                      </h3>
                    </div>

                    {/* Animated Answer Body */}
                    <div 
                      className={`grid transition-all duration-300 ease-in-out ${
                        isOpen ? 'grid-rows-[1fr] opacity-100 pb-6' : 'grid-rows-[0fr] opacity-0 pb-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="text-sm leading-tight text-gray-800 pr-4 sm:pr-12">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Button */}
            <div className="mt-10">
              <Link href="faqs">
              <button className="bg-[#171717] text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 w-max">
                See All FAQ's <span aria-hidden="true">&rarr;</span>
              </button>
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default FAQ;