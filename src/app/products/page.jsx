import React, { Suspense } from 'react'
import Shop from '@/components/Shop'
import BrandPartners from '@/components/BrandPartners'
import QuoteSection from '@/components/QuoteSection'
import FAQ from '@/components/FAQ'


export const metadata = {
  title: "Handmade Paper Collection for Brands & Buyers | Kagzi India",
  description: "Deckle edge sheets, leather notebooks, decorative items and party favours. Discover sustainable handmade paper goods by Kagzi India and request a bulk quote.",
  keywords: [
    "handmade paper products manufacturer",  
    "bulk handmade paper supplier",
    "handmade notebook manufacturer",
    " handmade journal manufacturer",
    "wholesale decorative paper",
  ],
};

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