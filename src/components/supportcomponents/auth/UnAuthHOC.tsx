"use client"
import { DefaultSessionLocal, getSessionCache, verifytoken } from '@/network/endpoints'
import instance from '@/network/instance'
import { Spin } from 'antd'
import { signOut, useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function UnAuthHOC(WrappedComponent: React.FC) {
  const Auth =(props:any)=>{
    const [session, setSession] = useState<DefaultSessionLocal>()
    const [loading, setLoading] = useState<boolean>(true)
    const pathname = usePathname()
    
    const router= useRouter()
    useEffect(()=>{
      getSessionCache()
      .then(session=>{
        if(session?.user){
          console.log(session);
          
          setSession(session)
          if(pathname.includes("signin") || pathname.includes("signup")){
            router.replace("/")
          }
        }else{
          setLoading(false)          
          if(!pathname.includes("signin") || !pathname.includes("signup")){
            if (pathname.includes("signin")) {              
              router.replace("/auth/signin")
            }else if(pathname.includes("signup")){
              router.replace("/auth/signup")
            }else{}
          }
        }
      })
      .catch(()=>{
        setLoading(false)
        if(!pathname.includes("signin") || !pathname.includes("signup")){
          router.replace("/auth/signin")
        }
      })
      .finally()
    },[])
    if(loading){
        return (
          <div className="d-flex justify-content-center align-items-center">
            <Spin />
          </div>
        )        
    }
    if(session?.user || !loading){
      return <WrappedComponent {...props} />
    }
  }
  return Auth
}
export function AuthHOC(WrappedComponent: React.FC) {
  const Auth =(props:any)=>{
    const [session, setSession] = useState<DefaultSessionLocal>()
    const [loading, setLoading] = useState<boolean>(true)
    const pathname = usePathname()
    
    const router= useRouter()
    useEffect(()=>{
      // getSessionCache()
      // .then(session=>{
      //   if(session?.user){
      //     setSession(session)
      //     setLoading(false)
      //   }else{
      //     router.replace("/auth/signin")
      //   }
      // })
      // .catch(()=>{
      //   router.replace("/auth/signin")
      // })
      let checkLogin = async()=>{
        let cacheSessions = await getSessionCache()
        let vtoken = await verifytoken()
        console.log(vtoken);
        
        if(vtoken.code){
          setSession(cacheSessions)
          setLoading(false)
        }else{
          signOut({callbackUrl:"/auth/signin"})
        }
      }
      checkLogin()
    },[])
    if(loading){
        return (
          <div className="d-flex justify-content-center align-items-center p-5">
            <Spin />
          </div>
        )        
    }
    if(session?.user || !loading){
      return <WrappedComponent {...props} />
    }
  }
  return Auth
}

export default UnAuthHOC