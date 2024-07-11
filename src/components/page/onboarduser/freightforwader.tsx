"use client"
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import OnboardUserUI from './layout'
import { BranchDetailsForm, SideUI, responsiveItemLayout } from './exportImport'
import { Button, Card, Checkbox, Col, DatePicker, Form, FormInstance, Input, Radio, Row, Select, Space, Upload, message } from 'antd'
import { InboxOutlined, UploadOutlined } from '@ant-design/icons'
import { validateMessages } from '@/components/utils'
import { signUPEndPoint2, signUPEndPoint3 } from '@/network/endpoints'

function Freightforwader() {
    const [currentStep, setCurrentStep] = useState<number>(2)

    return (
        <OnboardUserUI sideUI={<SideUI step={currentStep} />}>
            <div className={currentStep === 0 ? "" : "d-none"} style={{transition:"all 0.5"}}>
              <KYCForm setCurrentStep={setCurrentStep}/>
            </div>
            <div className={currentStep === 1 ? "" : "d-none"}>
                <Licenses setCurrentStep={setCurrentStep} />
                {/* <KYCUploadForm setCurrentStep={setCurrentStep} /> */}
            </div>
            <div className={currentStep === 2 ? "" : "d-none"}>
                <BranchDetailsForm setCurrentStep={setCurrentStep} title={"Branch Details - Freight Forwarder"} />
            </div>
        </OnboardUserUI>
  )
}

export default Freightforwader

const KYCForm = ({ setCurrentStep }: { setCurrentStep: Dispatch<SetStateAction<number>> }) => {
  const [form] = Form.useForm();
  const [countryList, setCountryList] = useState()

  // Simulate fetching country options (replace with actual API call)
  useEffect(() => {
      const fetchCountries = async () => {
          const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags'); // Replace with your API endpoint
          const countries = await response.json();
          setCountryList(countries.map((country: any) => ({
              label: country.name.official,
              value: country.name.common,
              emoji: country.flags.png,
              desc: country.name.common,
          })));


      };
      fetchCountries();
  }, []);

  const onFinish = (values: any) => {
      setCurrentStep(i => ++i)
      console.log('Success:', values);
      signUPEndPoint2(values)
          .then(r => {
              console.log(r);

          })
          .catch(r => {
              console.log(r);

          })
      // Submit form data to your backend here
  };

  const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
      setCurrentStep(i => ++i)
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
          <h3 className="text-primary2 fw-bolder mb-5">KYC Details - Freight forwarder - India</h3>
          <Row gutter={[16, 8]} justify={"center"}>
              <Col xs={22} md={24}>
                  <Form.Item label="Company Name" className='col-12 col-md-8' required name="companyName" rules={[{ required: true, message: "Field Required" }]}>
                      <Input />
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
                  <Form.Item label="Country" name="country" rules={[{ required: true, message: "Field Required" }]}>
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
                  <Form.Item label="State" name="state" rules={[{ required: true, message: "Field Required" }]}>
                      <Input />
                  </Form.Item>
              </Col>
              <Col xs={22} sm={22} md={12} lg={12}>
                  <Form.Item label="City" name="city" rules={[{ required: true, message: "Field Required" }]}>
                      <Input />
                  </Form.Item>
              </Col>
              <Col xs={22} sm={22} md={12} lg={12}>
                  <Form.Item label="pincode" name="pincode" rules={[{ required: true, message: "Field Required" }]}>
                      <Input />
                  </Form.Item>
              </Col>
              <Col xs={22} sm={22} md={24} lg={24}>
                  <Form.Item label="Registered Office Address" name="registeredOfficeAddress">
                      <Input.TextArea rows={2} />
                  </Form.Item>
              </Col>
              <Col xs={22} sm={22} md={12} lg={12}>
                  <Form.Item label="Website" name="website" rules={[{ required: true, message: "Field Required" }]}>
                      <Input />
                  </Form.Item>
              </Col>

              <Col xs={22} sm={22} md={12} lg={12}>
                  <Form.Item label="Name [Point of Contact / EXIM / Logistics Team]" required name="contactpersonName" rules={[{ required: true, message: "Field Required" }]}>
                      <Input />
                  </Form.Item>
              </Col>
              <Col xs={22} sm={22} md={12} lg={12}>
                  <Form.Item label="Email ID [Point of Contact / EXIM / Logistics Team]" required name="contactEmail">
                      <Input type="email" />
                  </Form.Item>
              </Col>
              <Col xs={22} sm={22} md={12} lg={12}>
                  <Form.Item label="Mobile No [Point of Contact / EXIM / Logistics Team]" required name="mobileNumber" rules={[{ required: true, message: "Field Required" }]}>
                      <Input />
                  </Form.Item>
              </Col>

              <Col xs={22} sm={22} md={12} lg={12}>
                  <Form.Item label="Year of Company Incorporation" required name="yearOfIncorporation" rules={[{ required: true, message: "Field Required" }]}>
                      <Input type="number" />
                  </Form.Item>
              </Col>

              <Col xs={22} sm={22} md={12} lg={12}>
                  <Form.Item label="Annual Turnover in Last FY" name="annualTurnover" rules={[{ required: true, message: "Field Required" }]}>
                      <Input addonAfter="₹" />
                  </Form.Item>
              </Col>

              <Col xs={22} sm={22} md={12} lg={12}>
                  <Form.Item label="Annual Volume (TEUs) by Ocean in Last FY" name="annualVolumeTuesByOcean" rules={[{ required: true, message: "Field Required" }]}>
                      <Input type="number" addonAfter="TEUs" />
                  </Form.Item>
              </Col>

              <Col xs={22} sm={22} md={12} lg={12}>
                  <Form.Item label="Annual Volume (MT) by Air in Last FY" name="annualVolumeMTByAir" rules={[{ required: true, message: "Field Required" }]}>
                      <Input type="number" addonAfter="MT" />
                  </Form.Item>
              </Col>

              <Col xs={22} sm={22} md={12} lg={12}>
                  <Form.Item label="Escalation/Emergency Contact Numbers" name="emergencyContactNumber" rules={[{ required: true, message: "Field Required" }]}>
                      <Input />
                  </Form.Item>
              </Col>

              <Col xs={22} sm={22} md={12} lg={12}>
                  <Form.Item label="Escalation/Emergency Email IDs" name="emergencyContactEmail" rules={[{ required: true, message: "Field Required" }]}>
                      <Input />
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

const LicenseForm = ({name,label,isLicense,f}:{name:any,label:String,isLicense?:boolean,f:FormInstance<any>}) => {
    const [fileList, setFileList] = useState([]);
    
    const onChange = (e:any) => f.setFieldValue([name,"file"],e.file.originFileObj)

    const layoutProps = {
        style1:{
            xs:24,
            sm:24,
            md:8,
            lg:6,
        }
    }
    return (
        <Row gutter={[8,8]}>            
            <Col xs={24} sm={24} md={24} lg={6} className='px-0'>
                <Form.Item name={[name,"status"]} initialValue={false} valuePropName="checked">
                    <Checkbox value={true} className='d-flex align-items-center px-0'><p className='text-wrap text-primary1 fw-bolder px-1 my-0'>{label}</p></Checkbox>
                </Form.Item>
            </Col>
            <Col {...layoutProps.style1}>
                <Form.Item name={[name,"licenseNo"]} label={<p className='p-0 m-0 text-muted'>{!isLicense?"License No.":"Certificate No."}</p>} >
                <Input />
                </Form.Item>
            </Col>
            <Col {...layoutProps.style1}>
                <Form.Item name={[name, "file"]} label={<p className='p-0 m-0 text-muted'>Upload</p>}>
                <Upload
                    onChange={onChange}
                    multiple
                    accept=".pdf,.doc,.docx"
                    className='upload-0'
                >
                    <Button block icon={<UploadOutlined/>}>Upload File</Button>
                </Upload>
                </Form.Item>
            </Col>
            <Col {...layoutProps.style1}>
                <Form.Item name={[name, "validTill"]} label={<p className='p-0 m-0 text-muted'>Valid Till</p>}>
                <DatePicker />
                </Form.Item>
            </Col>
        </Row>
    );
  };
  
  const Licenses = ({ setCurrentStep }: { setCurrentStep: Dispatch<SetStateAction<number>> }) => {
    const [form] = Form.useForm();
    const onFinish=(value:any) => {
        console.log(value);        
    }
    return (
      <div>
        <h2 className="text-primary2">Upload licenses/Certifications</h2>
        <Form layout="vertical"
            form={form}
            onFinish={onFinish}
        >
        <Card className='m-1 my-3'>
          <LicenseForm f={form} name={"MTO / Multimodal transport license"} label={"MTO / Multimodal transport license"} />
          <LicenseForm f={form} name={"IATA"} label={"IATA"} />
          <LicenseForm f={form} name={"FIATA"} label={"FIATA"} />
          <LicenseForm f={form} name={"FMC [ Freight Forwarder ]"} label={"FMC [ Freight Forwarder ]"} />
          <LicenseForm f={form} name={"NVOCC"} label={"NVOCC"} />
        </Card>
        <Card className='m-1 my-2'>
          <LicenseForm f={form} isLicense name={"Forwarder / Customs Association Membership"} label={"Forwarder / Customs Association Membership"} />        
          <LicenseForm f={form} isLicense name={"WCA"} label={"WCA"} />        
          <LicenseForm f={form} isLicense name={"JC Trans"} label={"JC Trans"} />        
        </Card>
        <Card className='m-1 my-2'>
          <LicenseForm f={form} name={"Custom License"} label={"Custom License"} />        
          <LicenseForm f={form} name={"AEO"} label={"AEO"} />        
          <LicenseForm f={form} name={"BASC"} label={"BASC"} />        
          <LicenseForm f={form} name={"C-TPAT"} label={"C-TPAT"} />        
        </Card>
        <KYCUploadFormIndia f={form}/>
        <Col span={24} className='px-5'>
            <Form.Item className='col-10 col-md-8 mx-auto'>
                <Button shape="round" size="large" type="primary" block htmlType="submit">
                    Next
                </Button>
            </Form.Item>
        </Col>
        </Form>
      </div>
    );
  };

const KYCUploadFormIndia = ({f}:{f:FormInstance<any>}) => {
  const [fileList, setFileList] = useState([]);
  const onUploadChange = (info:any) => {
      // setFileList(info.fileList);
    };
    
    return (
        <div className='p-2'>
        <h3 className='text-primary2 my-4'>Upload KYC documents [ INDIA ]</h3>
        <Row gutter={16}>
            <Col xs={24} sm={24} md={12} lg={12}>
            <CustomFormInput f={f} name={"GST Certificate"} label={"GST Certificate"}/>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
                <CustomFormInput f={f} name={"Company PAN Copy"} label={"Company PAN Copy"}/>
            </Col>
        </Row>
        <Row gutter={16}>
            <Col xs={24} sm={24} md={12} lg={12}>
                <CustomFormInput f={f} name={"Company Registration Certificate"} label={"Company Registration Certificate"} />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
                <CustomFormInput f={f} name={"Trade License"} label={"Trade License"}/>
            </Col>
        </Row>
        <Row gutter={16}>
            <Col xs={24} sm={24} md={12} lg={12}>
            <CustomFormInput f={f} name={"Director's/Partner's ID Card (Passport/DL/Aadhar)"} label={"Director's/Partner's ID Card (Passport/DL/Aadhar)"}/>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
            <CustomFormInput f={f} name={"Proof of business address (Utility Bill/Lease agreement)"} label={"Proof of business address (Utility Bill/Lease agreement)"}/>
            </Col>
        </Row>
    </div>
  );
};

const CustomFormInput =({f,name,label}:{label:any,name:any,f:FormInstance<any>}) => {
    const onChange = (e:any) => f.setFieldValue([name,"file"],e.file.originFileObj)
    return(
        <Form.Item name={name} label={<p className='p-0 m-0 text-muted'>{label}</p>}>
            <Upload  className={`upload-0`}>
            <Button block icon={<UploadOutlined/>}>Upload File</Button>
            </Upload>
        </Form.Item>
    )
}