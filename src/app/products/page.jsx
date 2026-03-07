import React from 'react'
import Shop from '@/components/Shop'
import BrandPartners from '@/components/BrandPartners'
import QuoteSection from '@/components/QuoteSection'
import FAQ from '@/components/FAQ'

export default function page() {
    return (
        <div>
            <Shop />
            <BrandPartners />
            <QuoteSection />
            <FAQ />
        </div>
    )
}
