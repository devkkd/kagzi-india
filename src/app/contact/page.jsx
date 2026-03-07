import BrandPartners from '@/components/BrandPartners'
import ComeSeeUs from '@/components/ComeSeeUs'
import ContactForm from '@/components/ContactForm'
import CustomRange from '@/components/CustomRange'
import FAQ from '@/components/FAQ'
import LovetoHear from '@/components/LovetoHear'
import QuoteSection from '@/components/QuoteSection'
import React from 'react'

export default function page() {
    return (
        <div>
            <LovetoHear />
            <ContactForm/>
            <ComeSeeUs/>
            <CustomRange />
            <BrandPartners />
            <QuoteSection />
            <FAQ />
        </div>
    )
}
