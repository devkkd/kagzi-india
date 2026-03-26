import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import RootedInJaipur from '@/components/RootedInJaipur';
import SeveralThings from '@/components/SeveralThings';
import AboutValues from '@/components/AboutValues';
import PackagingWarehouse from '@/components/PackagingWarehouse';
import WithUs from '@/components/WithUs';
import BrandPartners from '@/components/BrandPartners';
import QuoteSection from '@/components/QuoteSection';
import FAQ from '@/components/FAQ';

const OurStoryHero = () => {
  return (
    <section className="w-full">

      {/* Top Text Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pb-20">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5 lg:gap-8">

          {/* Left Column: Title */}
          <div className="flex flex-col flex-1">
            <span className="text-xs leading-tight font-medium text-gray-900 mb-6">
              Our Story
            </span>

            <h1
              className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-[1.2]"
              style={{ fontFamily: 'MainFont, sans-serif' }}
            >
              We Don't Just <span className="text-[#860000]">Make Paper,</span><br className="hidden sm:block" />
              We Keep a <span className="text-[#860000]">Tradition Alive</span>
            </h1>
          </div>

          {/* Right Column: Description */}
          <div className="flex-1 lg:max-w-xl lg:pt-8">
            <p className="text-sm leading-tight text-gray-900 font-medium">
              <span className="font-bold">Since 1990,</span> from a workshop on the banks of Sanganer's ancient paper quarter, we have been making paper the old way by hand, with conscience, for the world.
            </p>
          </div>

        </div>
      </div>

      {/* Full-Width Image Section with Floating WhatsApp Button */}
      <div className="w-full relative">
        <img
          src="/images/banner/about1.png"
          alt="Kagzi India Facility"
          className="w-full h-[400px] sm:h-[500px] lg:h-[600px] object-cover"
        />

        {/* Floating WhatsApp Button */}
        <a
          href="https://wa.me/919928424518" // You can replace this with the actual WhatsApp link
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 bg-[#25D366] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#1ebe5d] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl z-10 hover:-translate-y-1"
        >
          <FaWhatsapp size={20} />
          WhatsApp
        </a>
      </div>
      <RootedInJaipur />
      <SeveralThings />
      <AboutValues/>
      <PackagingWarehouse />
      <WithUs/>
      <BrandPartners/>
      <QuoteSection/>
      <FAQ/>
    </section>
  );
};

export default OurStoryHero;