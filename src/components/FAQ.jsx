"use client";
import React, { useState } from 'react';

const FAQ = () => {
  // State to track which FAQ is currently open. Defaulting to 0 (the first one).
  const [openIndex, setOpenIndex] = useState(0);

  // FAQ Data from the design
  const faqs = [
    {
      question: "What raw material do you use to make your paper?",
      answer: "All our paper is made from 100% recycled cotton textile waste remnants from garment and textile factories. We use no wood pulp. Some specialty papers incorporate khadi fibre, pineapple leaf fibre, or other natural plant-based materials. All input materials are biodegradable and sustainably sourced."
    },
    {
      question: "Is your paper acid-free?",
      answer: "Yes. All our handmade cotton rag paper is acid-free and archival quality - meaning it will not yellow, crack, or degrade over time. Suitable for fine art, legal documents, and anything designed to last."
    },
    {
      question: "What GSM weights are available?",
      answer: "Our standard range runs from 120 GSM to 250 GSM. Custom weights are available on request for B2B orders. Please include your GSM requirement in your enquiry."
    },
    {
      question: "What sizes do you offer?",
      answer: "Our standard maximum sheet size is 22 × 30 inches. Custom sizes are available. Please specify your required dimensions in your enquiry form."
    },
    {
      question: "What is a deckle edge?",
      answer: "A deckle edge is the natural, organic, uneven edge created during the sheet-lifting stage of handmade papermaking. It appears on all four sides of a handmade sheet and is the hallmark of authentic handmade paper. It cannot be replicated by machines. Many of our customers specifically seek it out as a design feature."
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
              style={{ fontFamily: 'Sooner, sans-serif' }}
            >
              Questions We Hear <br />
              Often <span className="text-[#860000]">Answered</span> <br />
              <span className="text-[#860000]">Honestly</span>
            </h2>
          </div>

          {/* Right Column: Accordion */}
          <div className="lg:w-3/5 flex flex-col">
            
            <span className="text-sm font-medium text-gray-900 mb-4">
              About Our Products
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
              <button className="bg-[#171717] text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 w-max">
                See All FAQ's <span aria-hidden="true">&rarr;</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default FAQ;