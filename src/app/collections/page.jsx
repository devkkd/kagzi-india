import React from 'react'
import CuratedCollections from '@/components/CuratedCollections'
import BrandPartners from '@/components/BrandPartners'
import QuoteSection from '@/components/QuoteSection'
import FAQ from '@/components/FAQ'

export const metadata = {
  title: "Handmade Paper Collections for Luxury Packaging & Gifts",
  description: "Explore Kagzi India handmade paper collections: cotton rag sheets, notebooks, boxes and luxury packaging paper, custom made for brands and wholesale buyers.",
  keywords: [
    "handmade paper for luxury packaging",
    "luxury packaging paper supplier",
    "handmade packaging paper supplier",
    "cotton rag paper supplier",
    "deckle edge paper wholesale",
  ],
};

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
