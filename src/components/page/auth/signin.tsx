"use client"
import React, { useEffect } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { assetsRootPath } from "@/components/utils";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { signIn } from 'next-auth/react';
import FormItem from 'antd/es/form/FormItem';
import { getSessionCache } from '@/network/endpoints';
import UnAuthHOC from '@/components/supportcomponents/auth/UnAuthHOC';
import { useRouter } from 'next/navigation';

const SignInUI = () => {
    const router = useRouter()
    const handleFinish=(user:{email:string,password:String})=> { 
        signIn("credentials",{email:user.email,password:user.password,redirect:false}).then((r)=> {
            console.log(r);            
            if(r?.ok || r?.status){
                router.replace("/")
            }
        }).catch((err)=> {
            console.log("err ", err.message);
            
        });
    }
    useEffect(() => {
        getSessionCache().then(session=>{
            console.log(session);
        })
    },[])
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <div className="freightant-landing">
                <div className="freightant-logo d-flex justify-content-center my-2 mb-5">
                    <img src={assetsRootPath + "image/logos/vector.png"} alt="Freightant Logo" width={"70%"} height={"50"} />
                </div>
                <div className="freightant-login">
                    <h3>Login</h3>
                    <Form layout="vertical" onFinish={handleFinish}>
                        <Form.Item label="Business email" name={"email"}>
                            <Input placeholder="Enter your business email" />
                        </Form.Item>
                        <Form.Item label="Password" name={"password"}>
                            <Input.Password placeholder="Enter your password" />
                        </Form.Item>
                        <a href="#" className="float-end mb-2">
                            Forgot Password?
                        </a>
                            <Button htmlType="submit" type="primary" block shape="round">Login</Button>
                        
                    </Form>
                    <div className="freightant-signup mt-1">
                        <p>
                            Don&apos;t have an account?{' '}
                            <Link href="/auth/signup" className="signup-link">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default UnAuthHOC(SignInUI);
