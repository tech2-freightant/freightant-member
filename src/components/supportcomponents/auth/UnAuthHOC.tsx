"use client"
import { DefaultSessionLocal, getSessionCache } from '@/network/endpoints'
import { Spin } from 'antd'
import { useSession } from 'next-auth/react'
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
            <Spin />;
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