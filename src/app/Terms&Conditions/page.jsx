import BrandPartners from '@/components/BrandPartners'
import FAQ from '@/components/FAQ'
import QuoteSection from '@/components/QuoteSection'
import TermsConditions from '@/components/TermsConditions'
import React from 'react'

export default function page() {
    return (
        <div>
            <TermsConditions/>
            <BrandPartners />
            <QuoteSection />
            <FAQ />
        </div>
    )
}
