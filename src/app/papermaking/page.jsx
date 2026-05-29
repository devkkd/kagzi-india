import PineappleInnovation from '@/components/PineappleInnovation'
import CelluloseInfo from '@/components/CelluloseInfo'
import CottonData from '@/components/CottonData'
import PaperMakingIntro from '@/components/PaperMakingIntro'
import React from 'react'
import PineappleScience from '@/components/PineappleScience'
import ExtractFibreSteps from '@/components/ExtractFibreSteps'
import Stages from '@/components/Stages'
import PaperDifferences from '@/components/PaperDifferences'

export const metadata = {
  title: "Leading Handmade Paper Manufacturer & Decorative Paper Supplier | Kagzi India",
  description: "Trusted handmade paper manufacturer offering decorative paper, recycled paper products, journals, notebooks, and customized paper solutions for global businesses.",
}

export default function page() {
  return (
    <div>
        <PaperMakingIntro/>
        <CottonData/>
        <CelluloseInfo/>
        <PineappleInnovation/>
        <PineappleScience/>
        <ExtractFibreSteps/>
        <Stages/>
        <PaperDifferences/>
    </div>
  )
}
