import { ISODateString } from "next-auth";
import instance from "./instance";
import { getSession } from "next-auth/react";
import type { SignUPType, loginType, signupType2 } from "@/types/defaults";

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
      console.log("hi");
      
        return user
    }
    let tmp = await getSession()
    console.log("h",tmp);
    
    user = {user:tmp?.user,expires: tmp?.expires}
    return user
}

export const signUPEndPoint = async({
  fullName,
  businessEmail,
  password,
  role,
}:SignUPType) =>{
    return instance.post("user/signup/p1",{fullName,businessEmail,password,role})
    .then(r=>({data:r.data,code:true,message:""}))
    .catch((error:any) =>({message:error.response.data.message,code:false}) 
    )
}
export const signUPEndPoint2 = async(v:signupType2) =>{
    let user = await getSessionCache()  
    console.log(user);
    
    return instance.put("user/signup/p2",v,{headers:{Authorization: "Bearer " + user?.user?.email}})
    .then(r=>({data:r.data,code:true,message:""}))
    .catch((error:any) =>({message:error.response.data.message,code:false}) 
    )
}
export const signUPEndPoint3 = async(v:any) =>{
    let user = await getSessionCache()  
    console.log(user);
    
    return instance.put("user/signup/p3",v,{headers:{Authorization: "Bearer " + user?.user?.email,"Content-Type":"multipart/form-data"}})
    .then(r=>({data:r.data,code:true,message:""}))
    .catch((error:any) =>({message:error.response.data.message,code:false}) 
    )
}
export const loginEndPoint = async({
  businessEmail,
  password,
}:loginType) =>{
    return instance.post("user/login",{businessEmail,password})
    .then(r=>({data:r.data,code:true,message:""}))
    .catch((error:any) =>({message:error.response.data.message,code:false,data:null}) 
    )
}