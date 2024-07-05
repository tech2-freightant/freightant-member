"use client"
import React, { useState, useEffect, DispatchWithoutAction, SetStateAction, Dispatch } from 'react';
import { Form, Input, Checkbox, Select, InputNumber, Button, Space, Layout, Steps, Row, Col, message, Upload, Radio } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import OnboardUserUI from './layout';
import { assetsRootPath } from '@/components/utils';
import { InboxOutlined } from '@ant-design/icons';
import { signUPEndPoint2 } from '@/network/endpoints';
import UnAuthHOC, { AuthHOC } from '@/components/supportcomponents/auth/UnAuthHOC';

const OnPageUI = () => {
    const [currentStep, setCurrentStep] = useState<number>(0)
    
    return (
        <OnboardUserUI sideUI={<SideUI step={currentStep} />}>
            <div className={currentStep===0?"":"d-none"}>
                <KYCForm setCurrentStep={setCurrentStep} />
            </div>
            <div className={currentStep===1?"":"d-none"}>
                <KYCUploadForm setCurrentStep={setCurrentStep} />
            </div>
            <div className={currentStep===0?"":"d-none"}>
                {/* <KYCForm /> */}
            </div>
        </OnboardUserUI>
    )
}

export default AuthHOC(OnPageUI)

const SideUI = ({step}:{step:number}) => {
    return (
        <div className='p-1 p-md-3'>
            <div className="d-none d-md-block freightant-logo d-flex justify-content-center my-2 mb-5">
                <img src={assetsRootPath + "image/logos/vector.png"} alt="Freightant Logo" width={"90%"} height={"35"} />
            </div>
            <Steps
                className='py-2'
                style={{ minHeight: "50vh" }}
                direction="vertical"
                current={step}
                items={[
                    {
                        title: 'Company Details',
                        description: "",
                    },
                    {
                        title: 'Kyc Documents',
                        description: "",
                    },
                    {
                        title: 'Add Branch (Optional)',
                        description: "",
                    },
                ]}
            />
        </div>
    );
}

const KYCForm = ({setCurrentStep}:{setCurrentStep:Dispatch<SetStateAction<number>>}) => {
    const [form] = Form.useForm();
    const [countryList, setCountryList] = useState()

    // Simulate fetching country options (replace with actual API call)
    useEffect(() => {
        const fetchCountries = async () => {
            const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags'); // Replace with your API endpoint
            const countries = await response.json();
            setCountryList(countries.map((country:any) => ({
                label: country.name.official,
                value: country.name.common,
                emoji: country.flags.png,
                desc: country.name.common,
              })));
            

        };
        fetchCountries();
    }, []);

    const onFinish = (values: any) => {
        // setCurrentStep(i=>++i)
        console.log('Success:', values);
        signUPEndPoint2(values)
        .then(r=>{
            console.log(r);
            
        })
        .catch(r=>{
            console.log(r);
            
        })
        // Submit form data to your backend here
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const layout = {
    };

    return (
        <Form
            {...layout}
            layout='vertical'
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >   
            <h3 className="text-primary2 fw-bolder">KYC Details - Exporter / Importer - India</h3>
            <Row gutter={[16,8]} justify={"center"}>
                <Col xs={22} md={24}>
                    <Form.Item label="Company Name" className='col-12 col-md-8' required name="companyName" rules={[{required:true,message:"Field Required"}]}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={22} md={24}>
                    <Form.Item label="Business Type" name="businessType" rules={[{required:true,message:"Field Required"}]}>
                            <Radio.Group>
                                <Radio value="Manufacture">Manufacture</Radio>
                                <Radio value="Trader">Trader</Radio>
                            </Radio.Group>
                    </Form.Item>
                </Col>
                <Col xs={22} sm={22} md={12} lg={12}>
                    <Form.Item label="IEC Code" required name="iecCode" >
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={22} sm={22} md={12} lg={12}>

                    <Form.Item label="GST Number" name="gstNumber">
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={22} sm={22} md={12} lg={12}>
                    <Form.Item label="Country" name="country" rules={[{required:true,message:"Field Required"}]}>
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
                <Col xs={22} sm={22} md={12} lg={12}>
                    <Form.Item label="State" name="state" rules={[{required:true,message:"Field Required"}]}>
                        <Input/>
                    </Form.Item>
                </Col>
                <Col xs={22} sm={22} md={12} lg={12}>
                    <Form.Item label="City" name="city" rules={[{required:true,message:"Field Required"}]}>
                        <Input/>
                    </Form.Item>
                </Col>
                <Col xs={22} sm={22} md={12} lg={12}>
                    <Form.Item label="pincode" name="pincode" rules={[{required:true,message:"Field Required"}]}>
                        <Input/>
                    </Form.Item>
                </Col>
                <Col xs={22} sm={22} md={12} lg={12}>
                    <Form.Item label="Registered Office Address" name="registeredOfficeAddress">
                        <Input.TextArea  rows={2} />
                    </Form.Item>
                </Col>
                <Col xs={22} sm={22} md={12} lg={12}>
                    <Form.Item label="Website" name="website" rules={[{required:true,message:"Field Required"}]}>
                        <Input  />
                    </Form.Item>
                </Col>

                <Col xs={22} sm={22} md={12} lg={12}>
                    <Form.Item label="Name [Point of Contact / EXIM / Logistics Team]" required name="contactpersonName" rules={[{required:true,message:"Field Required"}]}>
                        <Input  />
                    </Form.Item>
                </Col>
                <Col xs={22} sm={22} md={12} lg={12}>
                    <Form.Item label="Email ID [Point of Contact / EXIM / Logistics Team]" required name="contactEmail">
                        <Input  type="email" />
                    </Form.Item>
                </Col>
                <Col xs={22} sm={22} md={12} lg={12}>
                    <Form.Item label="Mobile No [Point of Contact / EXIM / Logistics Team]" required name="mobileNumber" rules={[{required:true,message:"Field Required"}]}>
                        <Input  />
                    </Form.Item>
                </Col>          

                <Col xs={22} sm={22} md={12} lg={12}>
                    <Form.Item label="Year of Company Incorporation" required name="yearOfIncorporation" rules={[{required:true,message:"Field Required"}]}>
                        <Input type="number"  />
                    </Form.Item>
                </Col>

                <Col xs={22} sm={22} md={12} lg={12}>
                    <Form.Item label="Annual Turnover in Last FY" name="annualTurnover" rules={[{required:true,message:"Field Required"}]}>
                        <Input   addonAfter="₹" /> 
                    </Form.Item>
                </Col>

                <Col xs={22} sm={22} md={12} lg={12}>
                    <Form.Item label="Annual Volume (TEUs) by Ocean in Last FY" name="annualVolumeTuesByOcean" rules={[{required:true,message:"Field Required"}]}>
                        <Input type="number"  addonAfter="TEUs" /> 
                    </Form.Item>
                </Col>

                <Col xs={22} sm={22} md={12} lg={12}>
                    <Form.Item label="Annual Volume (MT) by Air in Last FY" name="annualVolumeMTByAir" rules={[{required:true,message:"Field Required"}]}>
                        <Input type="number"  addonAfter="MT" /> 
                    </Form.Item>
                </Col>

                <Col xs={22} sm={22} md={12} lg={12}>
                    <Form.Item label="Escalation/Emergency Contact Numbers" name="emergencyContactNumber" rules={[{required:true,message:"Field Required"}]}>
                        <Input  />
                    </Form.Item>
                </Col>

                <Col xs={22} sm={22} md={12} lg={12}>
                    <Form.Item label="Escalation/Emergency Email IDs" name="emergencyContactEmail" rules={[{required:true,message:"Field Required"}]}>
                        <Input  />
                    </Form.Item>
                </Col>
                
                <Col span={24} className='px-5'>
                    <Form.Item className='col-10 col-md-8 mx-auto'>
                        <Button shape="round" size="large" type="primary" block htmlType="submit">
                            Next
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

const KYCUploadForm = ({setCurrentStep}:{setCurrentStep:Dispatch<SetStateAction<number>>}) => {
        const [form] = Form.useForm();

    const onFinish = (values:any) => {
        console.log('Success:', values);
        // Handle form submission here
    };

    const onFinishFailed = (errorInfo:any) => {
        console.log('Failed:', errorInfo);
    };

    const beforeUpload = (file:File) => {
        const isJpgOrPdf = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'application/pdf';
        if (!isJpgOrPdf) {
            message.error('You can only upload JPG or PDF files!');
        }
        return isJpgOrPdf;
    };

    const uploadProps = {
        name: 'file',
        multiple: false,
        beforeUpload,
        maxCount:1,
    };

    const layout = {};

    const responsiveItemLayout = {
        xs: 24,
        sm: 24,
        md: 12,
        lg: 12,
        xl: 12,
    };

    return (
          <Form {...layout} layout="vertical" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            {/* Upload KYC Documents - India */}
            <h3 className='fw-bolder text-primary2'>Upload KYC Documents - India</h3>
      
            <Row gutter={[16,0]}>
              {/* IEC Copy */}
              <Col {...responsiveItemLayout}>
                <Form.Item label="IEC Copy" required>
                    <Upload {...uploadProps} className="upload-0" >
                      <Button block icon={<InboxOutlined />}>Click to upload</Button>
                    </Upload>
                </Form.Item>
              </Col>
      
              {/* GST Copy */}
              <Col {...responsiveItemLayout}>
                <Form.Item label="GST Copy" required>
                  <Form.Item {...layout}>
                    <Upload {...uploadProps} className="upload-0">
                      <Button block icon={<InboxOutlined />}>Click to upload</Button>
                    </Upload>
                  </Form.Item>
                </Form.Item>
              </Col>
            </Row>
      
            <Row gutter={[16,0]}>
              {/* Company PAN Copy */}
              <Col {...responsiveItemLayout}>
                <Form.Item label="Company PAN Copy" required>
                  <Form.Item {...layout}>
                    <Upload {...uploadProps} className="upload-0">
                      <Button block icon={<InboxOutlined />}>Click to upload</Button>
                    </Upload>
                  </Form.Item>
                </Form.Item>
              </Col>
      
              {/* Company Registration Certificate */}
              <Col {...responsiveItemLayout}>
                <Form.Item label="Company Registration Certificate" required>
                  <Form.Item {...layout}>
                    <Upload {...uploadProps} className="upload-0">
                      <Button block icon={<InboxOutlined />}>Click to upload</Button>
                    </Upload>
                  </Form.Item>
                </Form.Item>
              </Col>
            </Row>
      
            <Row gutter={[16,0]}>
              {/* Trade License */}
              <Col {...responsiveItemLayout}>
                <Form.Item label="Trade License" required>
                  <Form.Item {...layout}>
                    <Upload {...uploadProps} className="upload-0">
                      <Button block icon={<InboxOutlined />}>Click to upload</Button>
                    </Upload>
                  </Form.Item>
                </Form.Item>
              </Col>
               {/* Director's/Partner's ID Card */}
        <Col {...responsiveItemLayout}>
          <Form.Item label="Director's/Partner's ID Card (Passport/DL/Aadhar)" required>
            <Form.Item {...layout}>
              <Upload {...uploadProps} className="upload-0">
                <Button block icon={<InboxOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
          </Form.Item>
        </Col>

        {/* Proof of Business Address */}
        <Col {...responsiveItemLayout}>
          <Form.Item label="Proof of Business Address (Utility Bill/Lease agreement)" required>
            <Form.Item {...layout}>
              <Upload {...uploadProps} className="upload-0">
                <Button block icon={<InboxOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form >
  
    )
}

