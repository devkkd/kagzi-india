"use client";
import React, { useState, useEffect } from 'react';

const HistoryTimeline = () => {
  const [activeId, setActiveId] = useState('sec-1');

  // Exact data from your prompt
  const historyData = [
    {
      id: 'sec-1',
      navTitle: '3500 BC',
      sub: '3500 BC - Egypt',
      title: 'Papyrus: Where Paper Began',
      desc: "Before modern handmade paper, the ancient Egyptians created papyrus — the world’s earliest writing material made from natural plant fibres.\nThis invention laid the foundation for today’s paper products, inspiring centuries of craftsmanship, creativity, and the evolution of sustainable paper making across civilizations.",
      img: '/images/legacy/legacy1.svg'
    },
    {
      id: 'sec-2',
      navTitle: '2500 BC',
      sub: '2500 BC - Europe & Asia',
      title: 'Parchment: Skin as Manuscript',
      desc: "When papyrus became scarce, Europe and Asia turned to animal skin for writing and record keeping.\nParchment — made from goat, sheep, or calf hide through a labour-intensive process — became an important material for manuscripts, royal records, vintage diary making, leather journal covers, and handmade paper collections.\nThe famous Codex Gigas, one of the largest medieval manuscripts, was created using the skin of 160 donkeys, reflecting the rich history behind paper products, journal notebook traditions, and hand craft bookmaking.",
      img: '/images/legacy/legacy2.svg'
    },
    {
      id: 'sec-3',
      navTitle: '105 AD',
      sub: '105 AD - China',
      title: 'The Birth of True Paper',
      desc: "The oldest surviving writing paper was discovered in Fangmatan, Gansu Province, China, dating back to the Western Han Dynasty.\nLater, Cai Lun improved the art of papermaking using bark, hemp, rags, and fishnets, laying the foundation for modern handmade paper and recycled paper techniques.\nBy 740 AD, China had printed the world’s first newspaper on mulberry paper, influencing the future of paper products, decorative paper, craft paper, and paper for art and craft across the world.",
      img: '/images/legacy/legacy3.svg'
    },
    {
      id: 'sec-4',
      navTitle: '6TH CENTURY AD',
      sub: '6th Century AD - Japan',
      title: 'Washi: Paper Elevated to Art',
      desc: "Approximately 500 years after China, the craft crossed to Korea and then to Japan through a Korean monk named Don-cho. What Japan did with it transformed papermaking into an art form.\nWashi — made from the inner bark fibres of three native plants — became not just a material but a cultural philosophy. Light, strong, luminous, and deeply revered, it inspired generations of artisans and modern paper company traditions around the world.\nToday, the legacy of handmade paper continues through sustainable practices like recycled paper, eco-friendly paper to make crafts, luxury stationery, and handmade in India paper products that blend heritage with creativity.",
      img: '/images/legacy/legacy4.svg'
    },
    {
      id: 'sec-5',
      navTitle: '715 AD',
      sub: '715 AD - The Arab World',
      title: 'Kagaz: A Word is Born',
      desc: "After the Battle of Talas, Arab forces defeated the Chinese army and obtained the closely guarded secret of papermaking. The craft spread across the Arab world, and the paper produced there became known as Kagaz - derived from the Urdu word Kavas, meaning paper.\nThe craftsmen who made it were called Kagzis. The name we carry today.",
      img: '/images/legacy/legacy5.svg'
    },
    {
      id: 'sec-6',
      navTitle: '1420 - 1470 CE',
      sub: '1420 - 1470 CE - India',
      title: 'Arrival in the Subcontinent',
      desc: "Handmade paper first arrived in India through Kashmir, introduced from Samarkand by King Zain-ul-Abidin. This early tradition of hand made paper and craft handmade techniques later inspired many handmade products and decorative paper styles still valued today.\nWhen Emperor Babur established Mughal rule in 1526, he brought master papermakers from Bukhara and Balkh. Their skills helped expand the paper company culture, paper mill paper mill production, and luxury paper & card craftsmanship across the region.",
      img: '/images/legacy/legacy6.svg'
    },
    {
      id: 'sec-7',
      navTitle: '1600 CE',
      sub: '1600 CE - Sanganer, Jaipur',
      title: 'The Kagzi Community Finds its Home',
      desc: "Handmade paper first arrived in India through Kashmir, introduced from Samarkand by King Zain-ul-Abidin.\nWhen Emperor Babur established Mughal rule in 1526, he brought master papermakers from Bukhara and Balkh.\nThe craft flourished - becoming a major centre of production and a precious export commodity across Rajasthan, Uttar Pradesh, Madhya Pradesh, Bihar, West Bengal, Maharashtra, and Karnatka.",
      img: '/images/legacy/legacy7.svg'
    },
    {
      id: 'sec-8',
      navTitle: '1724 - 1936 CE',
      sub: '1724 - 1936 CE - Sanganer Institutionalised',
      title: 'Royal Recognition & Resilience',
      desc: "By the late 19th century, the community faced severe financial hardship, exploited by moneylenders. But history pivoted when Mahatma Gandhi recognised the importance of handmade paper as part of his Swadeshi Movement - buying paper in bulk from Kagzi artisans for his Ashram and associates.\nIn 1936, an order issued by Mr. B. Chemt John, Resident Commissioner of Rajputana, mandated the use of Sanganeri Kagaz in all governmental legal documents - setting fixed rates and bypassing exploitative middlemen. The official gazette of Jaipur published this on September 15, 1936. The craft was protected. The community survived.\nAfter independence, the Khadi and Village Industries Commission (KVIC) formally included handmade paper in its list of crafts to be promoted.",
      img: '/images/legacy/legacy8.svg'
    },
    {
      id: 'sec-9',
      navTitle: '1960',
      sub: '1960 - Kagzi Industries',
      title: 'Our Chapter Begins',
      desc: "Founded in Sanganer, Jaipur, Kagzi Industries was established to carry this living tradition into a global marketplace — with innovation, sustainability, and absolute respect for the craft. As a handmade in India paper company, we create handmade products using recycled paper.\nWe are not the beginning of this story. We are its latest, proudest chapter.",
      img: '/images/legacy/legacy9.svg'
    }
  ];

  // ScrollSpy Logic: Update active timeline item based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = historyData.map(item => document.getElementById(item.id));

      let currentActive = activeId;
      sectionElements.forEach(section => {
        if (section) {
          const rect = section.getBoundingClientRect();
          // Adjust offset to trigger active state when section hits the upper third of screen
          if (rect.top <= 200 && rect.bottom >= 200) {
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
  }, [activeId, historyData]);

  // Click to scroll smoothly to a specific section
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for sticky headers
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

  // Helper to color the first word of the title red if it contains a colon
  const renderStyledTitle = (title) => {
    if (title.includes(':')) {
      const parts = title.split(':');
      return (
        <>
          <span className="text-[#860000]">{parts[0]}:</span> {parts[1]}
        </>
      );
    }
    return title;
  };

  return (
    <section className="w-full py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-20 gap-8">
          <div className="flex flex-col flex-1">
            <span className="text-xs leading-tight font-medium text-gray-900 mb-6">
              The History of Paper
            </span>
            <h2
              className="text-4xl sm:text-5xl lg:text-[3.5rem] text-gray-900 leading-[1.1]"
              style={{ fontFamily: 'MainFont, sans-serif' }}
            >
              A Craft <span className="text-[#860000]">3,500 Years</span><br className="hidden sm:block" />
              in the <span className="text-[#860000]">Making</span>
            </h2>
          </div>
          <div className="flex-1 lg:max-w-xl lg:pt-10">
            <p className="text-sm leading-tight text-gray-900 font-medium">
              <span className="font-bold">The story of handmade paper</span> is the story of civilization itself - carried across continents, refined across centuries, and kept alive today in the workshops of Sanganer, Jaipur.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row relative gap-10 lg:gap-20">

          {/* =========================================
              LEFT COLUMN: STICKY TIMELINE NAV
              ========================================= */}
          {/* Mobile: Horizontal scrollable menu. Desktop: Vertical sticky timeline */}
          <div className="lg:w-1/4 sticky top-[80px] z-30 lg:h-max bg-[#FAF6F1] lg:bg-transparent pb-4 lg:pb-0 border-b border-gray-300 lg:border-none">

            <div className="relative flex lg:flex-col overflow-x-auto lg:overflow-visible gap-6 lg:gap-8 py-2 hide-scrollbar">

              {/* Vertical line (Desktop only) */}
              <div className="hidden lg:block absolute left-[11px] top-4 bottom-4 w-[1px] bg-gray-300 z-0"></div>

              {historyData.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="relative flex items-center cursor-pointer group whitespace-nowrap lg:whitespace-normal z-10"
                  >
                    {/* Circle Indicator (Desktop only) */}
                    <div className="hidden lg:flex w-6 h-6 absolute left-0 items-center justify-center">
                      <div className={`rounded-full transition-all duration-300 ${isActive ? 'w-6 h-6 bg-[#860000]' : 'w-2 h-2 bg-gray-400 group-hover:bg-[#860000]'}`}></div>
                    </div>

                    {/* Nav Text */}
                    <span className={`lg:ml-12 text-lg lg:text-xl transition-all duration-300 ${isActive ? 'text-[#860000] font-bold' : 'text-gray-700 font-medium group-hover:text-[#860000]'}`}
                      style={{ fontFamily: 'MainFont, sans-serif' }}
                    >
                      {item.navTitle}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* =========================================
              RIGHT COLUMN: SCROLLABLE CONTENT
              ========================================= */}
          <div className="lg:w-3/4 flex flex-col gap-24 lg:gap-32 pb-20">
            {historyData.map((item) => (
              <div key={item.id} id={item.id} className="flex flex-col scroll-mt-32">

                {/* Subheading */}
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4"
                  style={{ fontFamily: 'MainFont, sans-serif' }}
                >
                  {item.sub}
                </h3>

                {/* Main Heading */}
                <h4
                  className="text-3xl sm:text-4xl lg:text-[3rem] text-gray-900 leading-[1.1] mb-8"
                  style={{ fontFamily: 'MainFont, sans-serif' }}
                >
                  {renderStyledTitle(item.title)}
                </h4>

                {/* Description Paragraphs */}
                <div className="flex flex-col gap-4 mb-10 max-w-3xl">
                  {item.desc.split('\n').map((paragraph, idx) => (
                    <p key={idx} className="text-sm leading-tight text-gray-900">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Associated Grouped Image */}
                <div className="w-full rounded-sm overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title.replace(':', '')}
                    className="w-full h-auto object-cover"
                  />
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
    </section>
  );
};

export default HistoryTimeline;