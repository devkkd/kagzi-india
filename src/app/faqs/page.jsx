"use client";
import React, { useState, useEffect } from 'react';

const FAQPage = () => {
  const [activeId, setActiveId] = useState('faq-1');

  // FAQ Data extracted from the provided design
  const faqData = [
    {
      id: 'faq-1',
      category: 'ABOUT OUR PRODUCTS',
      items: [
        {
          q: 'What raw material do you use to make your paper?',
          a: 'All our paper is made from 100% recycled cotton textile waste – remnants from garment and textile factories. We use no wood pulp. Some specialty papers incorporate khadi fibre, pineapple leaf fibre, or other natural plant-based materials. All our input materials are biodegradable and sustainably sourced.'
        },
        {
          q: 'Is your paper acid-free?',
          a: 'Yes. All our handmade cotton rag paper is acid-free and archival quality - meaning it will not yellow, crack, or degrade over time. Suitable for fine art, legal documents, and anything designed to last.'
        },
        {
          q: 'What GSM weights are available?',
          a: 'Our standard range runs from 120 GSM to 250 GSM. Custom weights are available on request for B2B orders. Please include your GSM requirement in your enquiry.'
        },
        {
          q: 'What sizes do you offer?',
          a: 'Our standard maximum sheet size is 22 × 30 inches. Custom sizes are available. Please specify your required dimensions in your enquiry form.'
        },
        {
          q: 'Do you offer coloured paper?',
          a: 'Yes. We offer natural white, a range of soft pastels, and custom-dyed sheets using natural pigments indigo, turmeric, rose, pomegranate rind, and more. Bespoke colour matching is available for B2B orders.'
        },
        {
          q: 'What is a deckle edge?',
          a: 'A deckle edge is the natural, organic, uneven edge created during the sheet-lifting stage of handmade papermaking. It appears on all four sides of a handmade sheet and is the hallmark of authentic handmade paper. It cannot be replicated by machines. Many of our customers specifically seek it out as a design feature.'
        }
      ]
    },
    {
      id: 'faq-2',
      category: 'ABOUT ORDERING',
      items: [
        {
          q: 'What is your minimum order quantity (MOQ)?',
          a: 'MOQ varies by product. For handmade paper sheets, it is typically 100 sheets. For notebooks, bags, and boxes, MOQ is discussed based on custom specifications. Please submit an enquiry and our team will advise accordingly.'
        },
        {
          q: 'Can I request a sample before placing a bulk order?',
          a: 'Yes. We offer sample packs to qualified B2B buyers. Please submit an enquiry specifying which products you\'d like to sample, and our team will arrange this.'
        },
        {
          q: 'Do you offer custom products?',
          a: 'Absolutely. Custom GSM, size, colour, texture, embossing, foiling, branding, and packaging are all available. We work directly with brands on product development. Submit an enquiry with your specifications and we\'ll take it from there.'
        },
        {
          q: 'How long does production take?',
          a: 'Lead times depend on the product and order volume. Standard reorders typically take 15–30 days. New custom products may require 30–45 days from sample approval. Exact timelines are shared at the quotation stage.'
        },
        {
          q: 'Do you have a product catalogue?',
          a: 'Yes. Please submit a catalogue request through our enquiry form and we\'ll share our current product catalogue in PDF format.'
        }
      ]
    },
    {
      id: 'faq-3',
      category: 'ABOUT SHIPPING & EXPORT',
      items: [
        {
          q: 'Which countries do you export to?',
          a: 'We export to 30+ countries worldwide, including the United States, United Kingdom, Germany, France, Japan, Australia, Canada, and across Southeast Asia, the Middle East, and Africa.'
        },
        {
          q: 'What are your shipping and payment terms?',
          a: 'We offer standard international trade terms (FOB, CIF, etc.) and payment via bank transfer (T/T), Letter of Credit (L/C), or agreed terms for established partners. Full terms are discussed and confirmed at the quotation stage.'
        },
        {
          q: 'How do you pack your products for export?',
          a: 'We use high-quality, multi-layer, moisture-free, cushioned, and sturdy packaging suitable for long ocean freight transit. All export orders are packed by trained professionals and include appropriate documentation.'
        }
      ]
    },
    {
      id: 'faq-4',
      category: 'ABOUT SUSTAINABILITY',
      items: [
        {
          q: 'Is your paper really eco-friendly?',
          a: 'Yes, fully. Our paper is made from 100% recycled cotton waste – no trees are cut. We use no bleach or caustic chemicals. Our natural dyes are plant-based. All process water is treated and returned. We are ISO 9001:2015 certified and follow sustainable manufacturing practices throughout.'
        },
        {
          q: 'Are your products biodegradable?',
          a: 'Yes. All our paper products are fully biodegradable and will return to the earth without harmful residue.'
        },
        {
          q: 'Do you have any environmental certifications?',
          a: 'Yes ISO 9001:2015 Certified, IAF Accredited, AGCS Verified. We are continuously working toward additional certifications as our sustainability programme develops.'
        }
      ]
    }
  ];

  // ScrollSpy Logic: Update active category based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = faqData.map(item => document.getElementById(item.id));
      
      let currentActive = activeId;
      sectionElements.forEach(section => {
        if (section) {
          const rect = section.getBoundingClientRect();
          // Adjust offset to trigger active state when section hits the upper third of screen
          if (rect.top <= 250 && rect.bottom >= 250) {
            currentActive = section.id;
          }
        }
      });
      if (currentActive !== activeId) {
        setActiveId(currentActive);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeId, faqData]);

  // Click to scroll smoothly to a specific section
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // Account for sticky headers
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveId(id);
    }
  };

  return (
   <>
    <main className="w-full py-20 bg-transparent min-h-screen relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================
            HEADER SECTION
            ========================================= */}
        <div className="flex flex-col mb-16 lg:mb-24">
          <span className="text-sm leading-tight font-medium text-gray-900 mb-6">
            FAQ's
          </span>
          <h1 
            className="text-4xl sm:text-5xl lg:text-[3.5rem] text-gray-900 leading-[1.1]"
            style={{ fontFamily: 'Sooner, sans-serif' }}
          >
            Questions We Hear Often, <span className="text-[#860000]">Answered Honestly</span>
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row relative gap-12 lg:gap-20">
          
          {/* =========================================
              LEFT COLUMN: STICKY NAV
              ========================================= */}
          <div className="lg:w-[35%] sticky top-[100px] z-30 lg:h-max bg-[#FAF6F1] lg:bg-transparent pb-4 lg:pb-0 border-b border-gray-300 lg:border-none">
            
            <div className="relative flex lg:flex-col overflow-x-auto lg:overflow-visible gap-6 lg:gap-10 py-2 hide-scrollbar">
              {faqData.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <div 
                    key={item.id} 
                    onClick={() => scrollToSection(item.id)}
                    className="relative flex items-center cursor-pointer group whitespace-nowrap lg:whitespace-normal z-10"
                  >
                    <span 
                      className={`text-lg sm:text-xl lg:text-2xl transition-colors duration-300 ${
                        isActive 
                          ? 'text-[#860000] font-bold' 
                          : 'text-gray-800 font-normal hover:text-[#860000]'
                      }`}
                    >
                      {item.category}
                    </span>
                  </div>
                );
              })}
            </div>

          </div>

          {/* =========================================
              RIGHT COLUMN: FAQ CONTENT
              ========================================= */}
          <div className="lg:w-[65%] flex flex-col gap-20 pb-20">
            {faqData.map((section) => (
              <div key={section.id} id={section.id} className="flex flex-col scroll-mt-32">
                
                {/* Section Subheading */}
                <h3 className="text-sm sm:text-base font-bold text-[#860000] mb-8 uppercase tracking-wide">
                  {section.category}
                </h3>
                
                {/* Questions & Answers Map */}
                <div className="flex flex-col">
                  {section.items.map((qa, idx) => (
                    <div 
                      key={idx} 
                      className={`flex flex-col ${idx !== section.items.length - 1 ? 'border-b border-gray-300 mb-8 pb-8' : ''}`}
                    >
                      <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 leading-snug">
                        {qa.q}
                      </h4>
                      <p className="text-sm leading-relaxed text-gray-900 font-medium lg:max-w-2xl">
                        {qa.a}
                      </p>
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
      
      {/* Hide scrollbar for mobile horizontal nav while keeping it scrollable */}
      <style jsx="true">{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </main>
    
    </>
  );
};

export default FAQPage;