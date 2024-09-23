import OceanFreightForm from '@/components/page/rfq/quotation'
import React from 'react'

function Page({searchParams}: {searchParams: { [key: string]: string | string[] | undefined }})  {
  if (searchParams?.rfq){
    return (
      <OceanFreightForm id={searchParams?.rfq}/>
    )  
  }
  return (
    <OceanFreightForm/>
  )
}

export default Page