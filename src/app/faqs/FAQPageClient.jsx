"use client";
import React, { useState, useEffect } from 'react';

const FAQPage = () => {
  const [activeId, setActiveId] = useState('faq-1');

  // FAQ Data extracted from the provided design
  const faqData = [
    {
      id: 'faq-1',
      category: 'ABOUT CUSTOMIZATION ',
      items: [
        {
          q: 'Can you customize handmade paper according to our brand requirements?',
          a: 'Yes. We can provide sustainable customized handmade paper in different sizes, GSM, colors, textures, and finishes that comply with your brand and product requirements.'
        },
        {
          q: 'Do you offer custom printing and embossing services?',
          a: 'Yes. We offer custom printing, foil stamping, embossing, debossing, and branding for premium packaging, stationery, invitations, and corporate gifting.'
        },
        {
          q: 'Can you develop exclusive paper designs for luxury brands?',
          a: 'Yes. As a supplier of handmade paper for luxury packaging, we design exclusive papers with textures and finishes for luxury brands wanting unique packaging solutions.'
        },
        {
          q: 'Is custom color matching available?',
          a: 'Yes. We offer accurate color matching utilizing eco-friendly pigments to ensure that your handmade papers match your branding and packaging needs.'
        },
        {
          q: 'Can you manufacture products under our private label?',
          a: 'Yes. As a leading eco-friendly paper manufacturer, we offer private label manufacturing with personalized packaging, branding, and product specs to businesses throughout the world.'
        },
      ]
    },
    {
      id: 'faq-2',
      category: 'ABOUT QUALITY & CERTIFICATIONS ',
      items: [
        {
          q: 'How do you maintain consistent product quality?',
          a: 'The organization conducts extensive quality inspections for each batch of its handmade paper products that to confirm thickness, texture, colour consistency, strength and finishing is perfect to guarantee the highest level of quality in every product.'
        },
        {
          q: 'Is your handmade paper suitable for premium packaging?',
          a: 'Yes. Our sustainable handmade paper was developed specifically for luxury packaging, premium stationery products, gift boxes, shopping bags and high-quality branding.'
        },
        {
          q: 'Do your products meet international quality standards?',
          a: 'Yes. As an environmentally responsible paper manufacturer we have a very strict production process with corresponding checks during all stages of production. We strive to produce consistent, high-quality products to fulfill the needs of both domestic and international customers.'
        },
        {
          q: 'Do you inspect products before shipment?',
          a: 'Absolutely! Each and every order is examined and evaluated by a person prior to the shipment of an order to make sure that it meets the quality standards of our company and the specifications provided by the customer.'
        },
        {
          q: 'Why do luxury brands choose your handmade paper?',
          a: 'We are a top-tier handmade paper supplier for luxury packaging. We consistently provide our luxury brand customers with premium handmade paper and a wide variety of customization options. In addition, we guarantee consistent product quality and long-term durability from our handmade paper products.'
        }
      ]
    },
    {
      id: 'faq-3',
      category: 'ABOUT BUSINESS PARTNERSHIPS',
      items: [
        {
          q: 'Do you work with wholesalers and distributors?',
          a: 'Yes. We mainly serve the needs of international importers, wholesalers, distributors and large-scale companies looking for reliable sellers of eco-friendly handmade paper. We focused on large quantity export orders, with stable quality, customized service and reliable shipping all over the world.'
        },
        {
          q: 'Can you supply bulk orders for international markets?',
          a: 'Yes, being an eco-friendly handmade paper exporter; we can export bulk orders while maintaining uniformity of quality, proper packaging and prompt delivery.'
        },
        {
          q: 'Do you support long-term business partnerships?',
          a: 'Our company supports the creation of long-term business relations by providing competitive pricing on large wholesale production, dependable production capacity, customized solutions and fast customer service.'
        },
         {
          q: 'Which industries do you serve? ',
          a: 'Companies in the following industries purchase handmade paper products including packaging, luxury goods, publishers, custom stationery, gift products, designers, and corporate clients across the globe.'
        },
         {
          q: 'Why should businesses choose your company?',
          a: 'Reliable eco-friendly paper manufacturer with global experience in sustainable handmade paper, luxury packaging solutions, customization and exports.'
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
            style={{ fontFamily: 'MainFont, sans-serif' }}
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
                      style={{ fontFamily: 'MainFont, sans-serif' }}
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