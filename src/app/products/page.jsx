import React, { Suspense } from 'react'
import Shop from '@/components/Shop'
import BrandPartners from '@/components/BrandPartners'
import QuoteSection from '@/components/QuoteSection'
import FAQ from '@/components/FAQ'

function ProductsContent() {
    return (
        <>
            <Shop />
            <BrandPartners />
            <QuoteSection />
            <FAQ />
        </>
    )
}

export default function Page() {
    return (
        <div>
            <Suspense fallback={<div>Loading products...</div>}>
                <ProductsContent />
            </Suspense>
        </div>
    )
}