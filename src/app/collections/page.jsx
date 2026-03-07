import React from 'react'
import CuratedCollections from '@/components/CuratedCollections'
import BrandPartners from '@/components/BrandPartners'
import QuoteSection from '@/components/QuoteSection'
import FAQ from '@/components/FAQ'

export default function page() {
  return (
    <div>
      <CuratedCollections />
      <BrandPartners />
      <QuoteSection />
      <FAQ />
    </div>
  )
}
