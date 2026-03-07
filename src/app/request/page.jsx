import BrandPartners from '@/components/BrandPartners'
import CustomRange from '@/components/CustomRange'
import EnquiryForm from '@/components/EnquiryForm'
import FAQ from '@/components/FAQ'
import QuoteSection from '@/components/QuoteSection'
import RequestQuote from '@/components/RequestQuote'
import SubmitProcess from '@/components/SubmitProcess'
import React from 'react'

export default function page() {
    return (
        <div>
            <RequestQuote />
            <EnquiryForm />
            <SubmitProcess />
            <CustomRange />
            <BrandPartners />
            <QuoteSection />
            <FAQ />

        </div>
    )
}
