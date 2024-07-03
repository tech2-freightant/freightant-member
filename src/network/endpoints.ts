import { ISODateString } from "next-auth";
import instance from "./instance";
import { getSession } from "next-auth/react";
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
    return tmp
}
