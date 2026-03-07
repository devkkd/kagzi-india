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



export default function page() {
  return (
    <div>
      <Hero/>
      <SliderSection/>
      <FeaturesSection/>
      <FamilyLegacy/>
      <PaperMakingProcess/>
      <FeaturesSection2/>
      <BrowseCollection/>
      <OurProducts/>
      <ForBusinesses/>
      <Testimonials/>
      <BrandPartners/>
      <QuoteSection/>
      <FAQ/>
    </div>
  )
}
