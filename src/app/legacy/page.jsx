import React from 'react'
import HistoryTimeline from '@/components/HistoryTimeline'
import BrandPartners from '@/components/BrandPartners'
import QuoteSection from '@/components/QuoteSection'
import FAQ from '@/components/FAQ'
import WeMake from '@/components/WeMake'

export const metadata = {
  title: "Handmade Paper Manufacturer & Exporter, India | Kagzi India",
  description: "Cotton rag paper, deckle edges and hand bound pieces, all handmade in Jaipur. Kagzi India is a trusted handmade paper supplier for wholesale buyers.",
  keywords: [
    "handmade paper from India",
    " handmade paper",
    "handmade paper manufacturer India",
  ],
};

export default function page() {
    return (
        <div>
            <HistoryTimeline />
            <WeMake/>
            <BrandPartners />
            <QuoteSection />
            <FAQ />
        </div>
    )
}