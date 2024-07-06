"use client"
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox, Space, Divider, message, Row, Col, Select } from 'antd';
import { assetsRootPath, errorMessage, validateMessages } from '@/components/utils';
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

    const [countryList, setCountryList] = useState()

    // Simulate fetching country options (replace with actual API call)
    useEffect(() => {
        const fetchCountries = async () => {
            const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags'); // Replace with your API endpoint
            const countries = await response.json();
            setCountryList(countries.map((country: any) => ({
                label: country.name.official,
                value: country.name.official,
                emoji: country.flags.png,
                desc: country.name.common,
            })));


        };
        fetchCountries();
    }, []);

    const handleClick = (value:String) => {
        form.setFieldValue("role", value)
    };
    const handleFinish=(value:SignUPType)=> { 
      signUPEndPoint(value)
      .then(r=>{
        if(r.code){
          setSteps(i=>++i)
          message.success("success")
        }else{ 
          if (r?.message === "User already exists") {
            form.validateFields(["businessEmail"])
            .then((values) => {
              console.log('Email and Name validated:', values);
            })
            .catch((errorInfo) => {
              console.error('Validation Failed:', errorInfo);
            });
          }else{
            message.error(r?.message)
          }
        }
      })
      .catch(r=>{
        console.log(r.message);
        
      })
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
        <img src={assetsRootPath +"image/logos/vector.png"} alt="Freightant Logo" height={"50"} />
      </div>
      {steps===0&&<div className="freightant-login">
      <h3 className="text-center">Sign Up</h3>
      <Form validateMessages={validateMessages} layout="vertical" form={form} onFinish={handleFinish}>
        <Form.Item className='mb-2' label="Full Name" name={"fullName"} rules={[{required:true}]}>
          <Input placeholder="Enter your full name" />
        </Form.Item>
        <Form.Item className='mb-2' label="Business Email" name={"businessEmail"} rules={[{required:true}]}>
          <Input placeholder="Enter your business email" />
        </Form.Item>
        <Form.Item className='mb-2' label="Password" name={"password"} rules={[{required:true}]}>
          <Password placeholder="Enter a password" />
        </Form.Item>
        <Row gutter={[16,0]}>
          <Col>
            <Form.Item className='mb-2' name={"countryCode"} label="Enter Phone number" rules={[{required:true,}]}>
              <Select
                  showSearch
                  allowClear
                  options={countryList}
                  optionRender={(option) => (
                      <Space>
                          <img src={option.data.emoji} width={20} height={20} />
                          {option.data.desc}
                      </Space>
                  )}
              />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item className='mb-2' name={"phone"} rules={[{required:true,}]}>
              <Input placeholder="Enter your phone number" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item className='mb-2' label="Join As" name={"role"} rules={[{required:true}]}>
            <Space>
                <Button type={role==="exporter/importer"?"primary":"default"} onClick={() => handleClick('exporter/importer')}>
                    Exporter/ Importer
                </Button>
                <Button type={role==="FF"?"primary":"default"} onClick={() => handleClick('FF')}>
                    Freight Forwarder
                </Button>
            </Space>
        </Form.Item>
        <Form.Item name={"TOC"} rules={[{required:true , message:"Accept Terms and Conditions"}]}>
          <Checkbox.Group>
            <Checkbox>I agree to all Terms & Conditions</Checkbox>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item >
          <Button htmlType="submit" type="primary" block shape="round">Sign Up</Button>
        </Form.Item>
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