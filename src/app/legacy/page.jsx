import React from 'react'
import HistoryTimeline from '@/components/HistoryTimeline'
import BrandPartners from '@/components/BrandPartners'
import QuoteSection from '@/components/QuoteSection'
import FAQ from '@/components/FAQ'
import WeMake from '@/components/WeMake'

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