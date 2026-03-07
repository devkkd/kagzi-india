import BrandPartners from '@/components/BrandPartners'
import FAQ from '@/components/FAQ'
import PrivacyPolicy from '@/components/PrivacyPolicy'
import QuoteSection from '@/components/QuoteSection'
import React from 'react'

export default function page() {
    return (
        <div>
            <PrivacyPolicy/>
            <BrandPartners />
            <QuoteSection />
            <FAQ />
        </div>
    )
}
