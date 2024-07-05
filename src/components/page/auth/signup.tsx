"use client"
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox, Space, Divider, message } from 'antd';
import { assetsRootPath } from '@/components/utils';
import FormItem from 'antd/es/form/FormItem';
import Password from 'antd/es/input/Password';
import {  useWatch } from 'antd/es/form/Form';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Title from 'antd/es/typography/Title';
import { useRouter } from 'next/navigation';
import UnAuthHOC from '@/components/supportcomponents/auth/UnAuthHOC';
import { signUPEndPoint } from '@/network/endpoints';
import { SignUPType } from '@/types/defaults';

const {useForm} = Form

const SignUpUI = () => {
    const router = useRouter()
    const [form] = useForm()
    const role = useWatch("role",{form,preserve: true,})
    const [steps, setSteps] = useState<number>(0)

    const handleClick = (value:String) => {
        form.setFieldValue("role", value)
    };
    const handleFinish=(value:SignUPType)=> { 
      signUPEndPoint(value)
      .then(r=>{
        if(r.code){

        }else{ message.error(r?.message)}
      })
      .catch(r=>{
        console.log(r.message);
        
      })
      // setSteps(i=>i+1)

    }
    useEffect(()=>{
      if(!role){
        form.setFieldValue("role","exporter/importer")
      }
      
    },[])
    
  return (
    <motion.div
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.4 }} 
    >
    <div className="signup-form">
      <div className="freightant-logo d-flex justify-content-center my-2 mb-3">
        <img src={assetsRootPath +"image/logos/vector.png"} alt="Freightant Logo" width={"70%"} height={"50"} />
      </div>
      {steps===0&&<div className="freightant-login">
      <h3>Sign Up</h3>
      <Form layout="vertical" form={form} onFinish={handleFinish}>
        <FormItem className='mb-2' label="Full Name" name={"fullName"} rules={[{required:true,message:"Field Required"}]}>
          <Input placeholder="Enter your full name" />
        </FormItem>
        <FormItem className='mb-2' label="Business Email" name={"businessEmail"} rules={[{required:true,message:"Field Required"}]}>
          <Input placeholder="Enter your business email" />
        </FormItem>
        <FormItem className='mb-2' label="Password" name={"password"} rules={[{required:true,message:"Field Required"}]}>
          <Password placeholder="Enter a password" />
        </FormItem>
        <FormItem className='mb-2' label="Phone Number">
          <Input placeholder="Enter your phone number" />
        </FormItem>
        <FormItem className='mb-2' label="Join As" name={"role"} rules={[{required:true,message:"Field Required"}]}>
            <Space>
                <Button type={role==="exporter/importer"?"primary":"default"} onClick={() => handleClick('exporter/importer')}>
                    Exporter/ Importer
                </Button>
                <Button type={role==="FF"?"primary":"default"} onClick={() => handleClick('FF')}>
                    Freight Forwarder
                </Button>
            </Space>
        </FormItem>
        <FormItem>
          <Checkbox>I agree to all Terms & Conditions</Checkbox>
        </FormItem>
        <Button htmlType="submit" type="primary" block shape="round">Sign Up</Button>
      </Form>
      <Divider>or</Divider>
        <p>
          Already have account?{' '}
          <Link href="/auth/signin" className="signup-link">
            LogIn
          </Link>
        </p>
      </div>}
      {steps===1&&<SignUpOTPUI setSteps={setSteps} />}
      {steps===2&&<SignUpCongratsUI />}
    </div>
    </motion.div>
  );
};

export default UnAuthHOC(SignUpUI);

const SignUpOTPUI:React.FC<{setSteps:Dispatch<SetStateAction<number>>}> =({setSteps}) =>{
  const [otp, setotp] = useState<String>("")
  const handleFinish = ()=>{
    setSteps(i=>i+1)
  } 
    useEffect(() => {
      console.log(otp);
      
    }, [otp])
    
    return(
        <div>
            <div className="freightant-logo d-flex justify-content-center my-2 mb-3">
                <img src={assetsRootPath + "image/auth/messagesent.png"} alt="otp Sent" />
            </div>
            <div className="freightant-logo d-flex flex-column justify-content-center align-items-center my-2 mb-3">
                <Title className='text-primary2 text-center' level={3}>Verification Code has been sent</Title>
                <p className="text-mute text-center">Please check your inbox and enter the verification code to verify your email id</p>                
                <div className="my-4">
                    <Input.OTP length={6} onChange={i=>setotp(i)} />
                </div>
                <Button disabled={otp?.length<5} type="primary" block shape='round' className='col-12' onClick={handleFinish}>Verify Now</Button>
                <Button type="link">Resend Code</Button>
            </div>
        </div>
    )
}
const SignUpCongratsUI =() =>{
    return(
        <div className='my-5'>
            <motion.div
                variants={variants}
                animate="big" // Start in the "big" state
                initial="small" 
                className="freightant-logo d-flex justify-content-center my-2 mb-3">
                <img src={assetsRootPath + "image/auth/tick.png"} alt="otp Sent" />
            </motion.div>
            <div className="freightant-logo d-flex flex-column justify-content-center align-items-center my-2 mb-3">
                <Title className='text-primary2 text-center' level={3}>Congratulations</Title>
                <p className="text-mute text-center">Your email id is verified successfully . Continue to the application.</p>
                <Button type="primary" block shape='round' className='col-12'>Continue</Button>
            </div>
        </div>
    )
}

const variants = {
    small: {
      scale: 0.5, // Start small
      rotate: 0, // No initial rotation
    },
    big: {
      scale: 1, // Grow to full size
      rotate: 360, // Rotate 360 degrees
      transition: {
        duration: 1, // Animation duration in seconds
        ease: 'easeInOut', // Animation timing function
        repeat: Infinity, repeatDelay: 1  // Repeat the animation indefinitely
      },
    },
  };