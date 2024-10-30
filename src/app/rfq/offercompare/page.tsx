import OfferCompare from '@/components/page/offercompare/offercompare'
import React from 'react'

function Page({searchParams}: {searchParams: { [key: string]: string | string[] | undefined }})  {
    if (searchParams?.rfq){
      return (
        <OfferCompare id={searchParams?.rfq}/>
      )  
    }
    return (
      <OfferCompare/>
    )
}

export default Page