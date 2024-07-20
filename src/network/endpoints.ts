import { ISODateString } from "next-auth";
import instance from "./instance";
import { getSession } from "next-auth/react";
import type { SignUPType, loginType, signupType2 } from "@/types/defaults";
import axios from "axios";

export interface DefaultSessionLocal {
    user?: {
      name?: string | null
      email?: string | null
      image?: string | null
    }
    expires?: ISODateString
  }
let user: DefaultSessionLocal = {}

export const getSessionCache= async()=>{
    if(user?.user?.name){
        return user
    }
    let tmp = await getSession()
    
    user = {user:tmp?.user,expires: tmp?.expires}
    return user
}

export const signUPEndPoint = async({
  fullName,
  businessEmail,
  password,
  role,
  mobile,
  countryCode
}:SignUPType) =>{
    return instance.post("auth/register",{fullName,businessEmail,password,role,mobile,countryCode})
    .then(r=>({data:r.data,code:true,message:""}))
    .catch((error:any) =>({message:error.response.data.message,code:false}) 
    )
}
export const signUPEndPoint2 = async(v:signupType2) =>{
    let user = await getSessionCache()  
    
    return instance.put("user/signup/p2",v,{headers:{Authorization: "Bearer " + user?.user?.email,"Content-Type":"multipart/form-data"}})
    .then(r=>({data:r.data,code:true,message:""}))
    .catch((error:any) =>({message:error.response.data.message,code:false}) 
    )
}
export const signUPEndPoint3 = async(v:any) =>{
    let user = await getSessionCache()  
    
    return instance.put("user/signup/p3",v,{headers:{Authorization: "Bearer " + user?.user?.email}})
    .then(r=>({data:r.data,code:true,message:""}))
    .catch((error:any) =>({message:error.response.data.message,code:false}) 
    )
}
export const signUPEndPoint4 = async(v:any) =>{
    let user = await getSessionCache()  
    
    return instance.post("user/signup/p4",{updatedBranches:v},{headers:{Authorization: "Bearer " + user?.user?.email}})
    .then(r=>({data:r.data,code:true,message:""}))
    .catch((error:any) =>({message:error.response.data.message,code:false}) 
    )
}
export const loginEndPoint = async({
  businessEmail,
  password,
}:loginType) =>{
    return instance.post("/auth/login",{email:businessEmail,password})
    .then(r=>({data:r.data,code:true,message:""}))
    .catch((error:any) =>({message:error.response.data.message,code:false,data:null}) 
    )
}

export const registerOtp = async(businessEmail:string,name:string) =>{
    return instance.post("otp/registerotp",{businessEmail,name})
    .then(r=>({data:r.data.data,code:true,message:""}))
    .catch((error:any) =>({message:error.response.data.message,code:false,data:null}))
}

export const verifyOtp = async(businessEmail:string,otp:String,token:String) =>{
    return instance.post("otp/otpverify",{businessEmail,otp,token})
    .then(r=>({data:r.data.data,code:true,message:""}))
    .catch((error:any) =>({message:error.response.data.message,code:false,data:null}))
}
export async function getCountry(){
    try {
      const response = await axios("/api/location/country"); // Replace "location/countries" with your actual endpoint
      return { data: response.data.data, code: true, message: "" };
    } catch (error: any) {
      return { message: error.response?.data?.message || "Error fetching countries", code: false, data: null };
    }
  }
  
export async function getCountryFromName(countryname?: string){
    try {
      const response = await axios.post(`/api/location/country`,{name:countryname}); // Replace with your endpoint for states by country ID
      return { data: response.data.data, code: true, message: "" };
    } catch (error: any) {
      return { message: error.response?.data?.message || "Error fetching states", code: false, data: null };
    }
  }
export async function getStates(countryId?: string){
    try {
      const response = await axios(`/api/location/state?${countryId}`); // Replace with your endpoint for states by country ID
      return { data: response.data.data, code: true, message: "" };
    } catch (error: any) {
      return { message: error.response?.data?.message || "Error fetching states", code: false, data: null };
    }
  }
export async function getStatesFromCountry(countryname?: string){
    try {
      const response = await axios.post(`/api/location/state`,{q:countryname}); // Replace with your endpoint for states by country ID
      return { data: response.data.data, code: true, message: "" };
    } catch (error: any) {
      return { message: error.response?.data?.message || "Error fetching states", code: false, data: null };
    }
  }
  
export async function getCity(stateId?: string){
    try {
      const response = await axios(`/api/location/city?${stateId}`); // Replace with your endpoint for cities by state ID
      return { data: response.data.data, code: true, message: "" };
    } catch (error: any) {
      return { message: error.response?.data?.message || "Error fetching cities", code: false, data: null };
    }
  }
export async function uploadFile(upload: any){
    try {
      let user = await getSessionCache()  
      const response = await instance.post(`/user/upload`,upload,{headers:{Authorization: "Bearer " + user?.user?.email,"Content-Type":"multipart/form-data"}})
      return { data: response.data, code: true, message: "" };
    } catch (error: any) {
      return { message: error.response?.data?.message || "Error fetching cities", code: false, data: null };
    }
  }
export async function getOrg(){
    try {
      let user = await getSessionCache()  
      const response = await instance(`/user/org`,{headers:{Authorization: "Bearer " + user?.user?.email}})
      return { data: response.data.data, code: true, message: "" };
    } catch (error: any) {
      return { message: error.response?.data?.message || "Error fetching cities", code: false, data: null };
    }
  }
export async function getUser(){
    try {
      let user = await getSessionCache()  
      const response = await instance(`/user/user`,{headers:{Authorization: "Bearer " + user?.user?.email}})
      return { data: response.data.data, code: true, message: "" };
    } catch (error: any) {
      return { message: error.response?.data?.message || "Error fetching cities", code: false, data: null };
    }
  }