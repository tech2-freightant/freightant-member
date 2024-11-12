"use client"
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
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
    const [form] = Form.useForm()
    const [formLoading, setformLoading] = useState(false)
    const handleFinish=(user:{email:string,password:String})=> { 
        setformLoading(true)
        signIn("credentials",{email:user.email,password:user.password,redirect:false}).then((r)=> {  
            if(r?.ok && r?.status!==401){
                router.replace("/")
            }else{
                message.error(r?.error)
                // if("User does not exist"== r?.error){
                //     router.push("/auth/signup")
                // }
            }
        }).catch((err)=> {
            console.log("err ", err.message);            
        }).finally(()=>{setformLoading(false)});
    }
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
                    <h3 className="text-center">Login</h3>
                    <Form layout="vertical" onFinish={handleFinish}>
                        <Form.Item label="Business email" name={"email"}
                            rules={[
                                {type:"email",message:"Please enter a valid email address"},
                                {required:true},
                            ]}
                        >
                            <Input placeholder="Enter your business email" />
                        </Form.Item>
                        <Form.Item label="Password" name={"password"}>
                            <Input.Password placeholder="Enter your password" />
                        </Form.Item>
                        <a href="#" className="float-end mb-2">
                            Forgot Password?
                        </a>
                            <Button htmlType="submit" type="primary" block shape="round" loading={formLoading}>Login</Button>
                        
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
