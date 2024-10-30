"use client"
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox, Space, Divider, message, Row, Col, Select, Typography } from 'antd';
import { assetsRootPath, errorMessage, validateMessages } from '@/components/utils';
import Password from 'antd/es/input/Password';
import {  FormInstance, useWatch } from 'antd/es/form/Form';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Title from 'antd/es/typography/Title';
import { useRouter } from 'next/navigation';
import UnAuthHOC from '@/components/supportcomponents/auth/UnAuthHOC';
import { registerOtp, signUPEndPoint, verifyOtp } from '@/network/endpoints';
import { SignUPType, signupotp } from '@/types/defaults';
import instance from '@/network/instance';
import { signIn } from 'next-auth/react';

const {useForm} = Form



const SignUpUI = () => {
    const router = useRouter()
    const [form] = useForm()
    const role = useWatch("role",{form,preserve: true,})
    const [steps, setSteps] = useState<number>(0)
    const [token, setToken] = useState(null)
    const [countryList, setCountryList] = useState()
    const [formloading, setFormLoading] = useState(false)
    const [formValue, setFormValue] = useState({})

    const [submittable, setSubmittable] = React.useState<boolean>(false);
    const values = Form.useWatch([], form);
  
    React.useEffect(() => {
      form
        .validateFields({ validateOnly: true })
        .then(() => setSubmittable(true))
        .catch(() => setSubmittable(false));
    }, [form, values]);

    // Simulate fetching country options (replace with actual API call)
    useEffect(() => {
        const fetchCountries = async () => {
            const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,idd,currency'); // Replace with your API endpoint
            const countries = await response.json();
            console.log(countries);
            
            setCountryList(countries.map((country: any) => ({
                label: `${country.idd.root}${country?.idd.suffixes.length>1?"":country?.idd.suffixes[0]}`,
                value: `${country.idd.root}${country?.idd.suffixes.length>1?"":country?.idd.suffixes[0]}`,
                emoji: country.flags.png,
                desc: `${country.idd.root}${country?.idd.suffixes.length>1?"":country?.idd.suffixes[0]}`,
                cstmName: `${country.idd.root}${country?.idd.suffixes.length>1?"":country?.idd.suffixes[0]}-${country?.name.common}`
            })));


        };
        fetchCountries();
    }, []);

    const handleClick = (value:String) => {
        form.setFieldValue("role", value)
    };
    const handleFinish=(value:SignUPType)=> {
      setFormLoading(true);
      setFormValue(value);
      registerOtp(value.businessEmail,value.fullName)
      .then(r=>{
        if(r.code){
          setToken(r.data.token)
          setSteps(i=>++i)
          message.success("OTP Sent")
        }else{
          message.error(r?.message)
        }
      })
      .catch(r=>{
        
      }).finally(()=>setFormLoading(false))
      
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
        <Form.Item className='mb-2' label="Business Email" name={"businessEmail"}
          rules={[
            {type:"email",message:"Please enter a valid email address"},
            {required:true},
        ]}
        >
          <Input placeholder="Enter your business email" />
        </Form.Item>
        <Form.Item className='mb-2' label="Password" name={"password"} 
          rules={[{required:true},
            {
              pattern:/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!&#$%\-_=+<>])([a-zA-Z0-9!#$%\-_=+<>]+)$/,
              message: `Password should contain at least one lower case letter, upper case letter, number and special characters`
           },
           {min:8,max:16,message: "Passwords must be between 8 to 16 characters"}
          ]}>
          <Password placeholder="Enter a password" />
        </Form.Item>
          <Form.Item label="Enter Phone number">
        <Row gutter={[8,0]}>
          <Col span={8}>
            <Form.Item className='mb-2' name={"countryCode"}  rules={[{required:true,}]}>
              <Select
                  showSearch
                  allowClear
                  optionFilterProp={"cstmName"}
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
          <Col span={16}>
            <Form.Item className='mb-2' name={"mobile"} rules={[{required:true},{min:10,max:10,message: 'Please enter correct number'}]}>
              <Input placeholder="Enter your phone number" />
            </Form.Item>
          </Col>
        </Row>
          </Form.Item>
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
            <Checkbox value={"accept"}>I agree to all Terms & Conditions</Checkbox>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item >
          <Button
            disabled={!submittable}
            htmlType="submit" 
            loading={formloading} 
            type="primary" 
            block 
            shape="round">Sign Up</Button>
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
      {steps===1&&<SignUpOTPUI setSteps={setSteps} f={form} token={token} setToken={setToken} value={formValue} />}
      {steps===2&&<SignUpCongratsUI f={formValue} />}
    </div>
    </motion.div>
  );
};

export default UnAuthHOC(SignUpUI);

const SignUpOTPUI:React.FC<signupotp> =({setSteps,f,token,setToken,value}) =>{
  const [otp, setotp] = useState<String>("")
  const [resentCounters, setResentCounters] = useState<number>(0)
  const [formloading, setFormLoading] = useState(false)

  const handleResendOTP = ()=>{
    registerOtp(f.getFieldValue("businessEmail"),f.getFieldValue("fullName"))
    .then(r=>{
      if(r.code){
        setToken(r.data.token)
        message.success("New OTP Sent")
      }else{
        message.error(r?.message)
      }
    })
  }
  const handleFinish = ()=>{
    setFormLoading(true)
    verifyOtp(f.getFieldValue("businessEmail"),otp,token)
    .then(r=>{
      if(r.code){
        signUPEndPoint(value)
        .then(r=>{
          if(r.code){
            setSteps(i=>++i)
          }else{         
            message.error(r?.message)
          }
        })
        .catch(r=>{
          console.log(r.message);        
        }).finally(()=>setFormLoading(false))
      }
    })
    .catch(r=>{
      console.log(r);
    }).finally(()=>setFormLoading(false))
  } 
    useEffect(() => {
      if(token){
        setResentCounters(60)
      }
      return()=>{}
    }, [token])
    useEffect(() => {
      let resent = setInterval(()=>{          
        if(resentCounters>0){
          setResentCounters(prev=>prev-1)
        } else{
          setResentCounters(0)
          clearInterval(resent)
        }
      },1000)
      return()=>{
        clearInterval(resent)
      }
    },[resentCounters])
    
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
                <Button loading={formloading} disabled={otp?.length<5} type="primary" block shape='round' className='col-12 mb-2' onClick={handleFinish}>Verify Now</Button>
                {resentCounters>0?
                <Typography.Text className="text-muted">Resend OTP in {resentCounters} seconds</Typography.Text> :
                <Button type="link" onClick={handleResendOTP}>Resend Code</Button>}
            </div>
        </div>
    )
}
const SignUpCongratsUI =({f}:{f:any}) =>{
  const [loading,setLoading] = useState(true)
  const router = useRouter()
  const {businessEmail,password} = f

    useEffect(() =>{
      signIn("credentials",{email:businessEmail,password:password,redirect:false}).then((r)=> {  
          if(r?.ok && r?.status!==401){
              setLoading(false)
          }else{
              message.error(r?.error)
          }
      }).catch((err)=> {
          console.log("err ", err.message);            
      });
    },[])
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
                <Button disabled={loading} onClick={()=>router.replace(`/onboarduser${f.role==="FF"?"":"/exporter"}`)} type="primary" block shape='round' className='col-12'>Continue</Button>
            </div>
        </div>
    )
}

const variants = {
    small: {
      scale: 0.5,
      rotate: 0,
      opacity:0
    },
    big: {
      scale: 1,
      rotate: 360,
      opacity:1,
      transition: {
        duration: 1,
        ease: 'easeInOut',
        repeat: Infinity, repeatDelay: 1
      },
    },
  };

  export const variants2 = {
    small: {
      scale: 0.5,
      rotate: 0,
      opacity:0
    },
    big: {
      scale: 1,
      rotate: 360,
      opacity:1,
      transition: {
        duration: 1.2,
        ease: 'easeInOut',
        repeat: Infinity, repeatDelay: 5
      },
    },
  };