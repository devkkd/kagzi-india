import React from 'react'
import Hero from '@/components/Hero'
import SliderSection from '@/components/SliderSection'
import FeaturesSection from '@/components/FeaturesSection'
import FamilyLegacy from '@/components/FamilyLegacy'
import PaperMakingProcess from '@/components/PaperMakingProcess'
import FeaturesSection2 from '@/components/FeaturesSection2'
import BrowseCollection from '@/components/BrowseCollection'
import OurProducts from '@/components/OurProducts'
import ForBusinesses from '@/components/ForBusinesses'
import Testimonials from '@/components/Testimonials'
import BrandPartners from '@/components/BrandPartners'
import QuoteSection from '@/components/QuoteSection'
import FAQ from '@/components/FAQ'
import OurProductsServer from '@/components/OurProductsServer'
import DocumentarySection from '@/components/DocumentarySection'

export const metadata = {
  title: "Handmade Paper in India | Decorative & Eco-Friendly Paper | Kagzi India",
  description: "Discover premium handmade paper, decorative paper, and eco-friendly paper products by Kagzi India. Explore sustainable handmade paper sheets in unique textures, colors, and designs.",
}

export default function page() {
  return (
    <div>
      <Hero/>
      <SliderSection/>
      <FeaturesSection/>
      <FamilyLegacy/>
      {/* <PaperMakingProcess/> */}
      <FeaturesSection2/>
      <BrowseCollection/>
      <OurProducts/>
      <ForBusinesses/>
      <Testimonials/>
      <BrandPartners/>
      <QuoteSection/>
      <DocumentarySection videoUrl="https://www.youtube.com/watch?v=YOUR_VIDEO_ID" />
      <FAQ/>
    </div>
  )
}
