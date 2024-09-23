import { FormInstance } from "antd"
import {Dispatch, SetStateAction } from "react"

export type SignUPType = {
    fullName:string,
    businessEmail:string,
    password:string,
    mobile:string,
    role:string,
    countryCode:string
}
export type loginType = {
    businessEmail:string,
    password:string,
}

export type signupType2 = {
    companyName:string,
    businessType:string,
    country:string,
    city:string,
    state:string,
    pincode:string,
    website:string,
    contactpersonName:string,
    mobileNumber:string,
    yearOfIncorporation:string,
    annualTurnover:string,
    annualVolumeTuesByOcean:string,
    annualVolumeMtByAir:string,
    emergencyContactNumber:string,
    emergencyContactEmail:string,
  }

  export interface signupotp {
    setSteps:Dispatch<SetStateAction<number>>
    ,f:FormInstance<any>
    ,token:any,
    setToken:Dispatch<SetStateAction<null>>,
    value:any
  }

  export type CountryListType = {
    label: string,
    value: string,
    emoji: string,
    desc: string,
    id:string,
    currency:string,
    currency_symbol:string
  }