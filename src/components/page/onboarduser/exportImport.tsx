"use client"
import React, { useState, useEffect, DispatchWithoutAction, SetStateAction, Dispatch } from 'react';
import { Form, Input, Checkbox, Select, InputNumber, Button, Space, Layout, Steps, Row, Col, message, Upload, Radio, Rate, Card } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import OnboardUserUI from './layout';
import { assetsRootPath, validateMessages } from '@/components/utils';
import { InboxOutlined } from '@ant-design/icons';
import { signUPEndPoint2, signUPEndPoint3 } from '@/network/endpoints';
import UnAuthHOC, { AuthHOC } from '@/components/supportcomponents/auth/UnAuthHOC';
import { useWatch } from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';

const ExportImportUI = () => {
    const [currentStep, setCurrentStep] = useState<number>(0)

    return (
        <OnboardUserUI sideUI={<SideUI step={currentStep} />}>
            <div className={currentStep === 0 ? "" : "d-none"} style={{transition:"all 0.5"}}>
                <KYCForm setCurrentStep={setCurrentStep} />
            </div>
            <div className={currentStep === 1 ? "" : "d-none"}>
                <KYCUploadForm setCurrentStep={setCurrentStep} />
            </div>
            <div className={currentStep === 2 ? "" : "d-none"}>
                <BranchDetailsForm setCurrentStep={setCurrentStep} title={"Branch Details - Exporter/Importer"} />
            </div>
        </OnboardUserUI>
    )
}

export default AuthHOC(ExportImportUI)

export const SideUI = ({ step }: { step: number }) => {
    return (
        <div className='p-1 p-md-3'>
            <div className="d-none d-md-block freightant-logo d-flex justify-content-center my-2 mb-5">
                <img src={assetsRootPath + "image/logos/vector.png"} alt="Freightant Logo" height={"35"} />
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
        signUPEndPoint2(values)
            .then(r => {
                if(r.code){
                    setCurrentStep(i => ++i)
                }
            })
            .catch(r => {
                console.log(r);
            })
    };

    const layout = {
    };

    return (
        <Form
            {...layout}
            layout='vertical'
            form={form}
            onFinish={onFinish}
            autoComplete="off"
            validateMessages={validateMessages}
        >
            <h3 className="text-primary2 fw-bolder mb-5">KYC Details - Exporter / Importer - India</h3>
            <Row gutter={[16, 8]} justify={"center"}>
                <Col xs={22} md={24}>
                    <Form.Item label="Company Name" className='col-12 col-md-8' required name="companyName" rules={[{ required: true,  }]}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={22} md={24}>
                    <Form.Item label="Business Type" name="businessType" rules={[{ required: true,  }]}>
                        <Radio.Group>
                            <Radio value="Manufacturer">Manufacturer</Radio>
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
                    <Form.Item label="Country" name="country" rules={[{ required: true,  }]}>
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
                    <Form.Item label="State" name="state" rules={[{ required: true,  }]}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={22} sm={22} md={12} lg={12}>
                    <Form.Item label="City" name="city" rules={[{ required: true,  }]}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={22} sm={22} md={12} lg={12}>
                    <Form.Item label="pincode" name="pincode" rules={[{ required: true,  }]}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={22} sm={22} md={24} lg={24}>
                    <Form.Item label="Registered Office Address" name="registeredOfficeAddress">
                        <Input.TextArea rows={2} />
                    </Form.Item>
                </Col>
                <Col xs={22} sm={22} md={12} lg={12}>
                    <Form.Item label="Website" name="website" rules={[{ required: true,  }]}>
                        <Input />
                    </Form.Item>
                </Col>

                <Col xs={22} sm={22} md={12} lg={12}>
                    <Form.Item label="Name [Point of Contact / EXIM / Logistics Team]" required name="contactpersonName" rules={[{ required: true,  }]}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={22} sm={22} md={12} lg={12}>
                    <Form.Item label="Email ID [Point of Contact / EXIM / Logistics Team]" required name="contactEmail">
                        <Input type="email" />
                    </Form.Item>
                </Col>
                <Col xs={22} sm={22} md={12} lg={12}>
                    <Form.Item label="Mobile No [Point of Contact / EXIM / Logistics Team]" required name="mobileNumber" rules={[{ required: true,  }]}>
                        <Input />
                    </Form.Item>
                </Col>

                <Col xs={22} sm={22} md={12} lg={12}>
                    <Form.Item label="Year of Company Incorporation" required name="yearOfIncorporation" rules={[{ required: true,  }]}>
                        <Input type="number" />
                    </Form.Item>
                </Col>

                <Col xs={22} sm={22} md={12} lg={12}>
                    <Form.Item label="Annual Turnover in Last FY" name="annualTurnover" rules={[{ required: true,  }]}>
                        <Input addonAfter="₹" />
                    </Form.Item>
                </Col>

                <Col xs={22} sm={22} md={12} lg={12}>
                    <Form.Item label="Annual Volume (TEUs) by Ocean in Last FY" name="annualVolumeTuesByOcean" rules={[{ required: true,  }]}>
                        <Input type="number" addonAfter="TEUs" />
                    </Form.Item>
                </Col>

                <Col xs={22} sm={22} md={12} lg={12}>
                    <Form.Item label="Annual Volume (MT) by Air in Last FY" name="annualVolumeMTByAir" rules={[{ required: true,  }]}>
                        <Input type="number" addonAfter="MT" />
                    </Form.Item>
                </Col>

                <Col xs={22} sm={22} md={12} lg={12}>
                    <Form.Item label="Escalation/Emergency Contact Numbers" name="emergencyContactNumber" rules={[{ required: true,  }]}>
                        <Input />
                    </Form.Item>
                </Col>

                <Col xs={22} sm={22} md={12} lg={12}>
                    <Form.Item label="Escalation/Emergency Email IDs" name="emergencyContactEmail" rules={[{ required: true,  }]}>
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

const KYCUploadForm = ({ setCurrentStep }: { setCurrentStep: Dispatch<SetStateAction<number>> }) => {
    const [form] = Form.useForm();
    const AEO = useWatch("AEO", { form });
    const SEHC = useWatch("SEHC", { form });

    const onFinish = (values: any) => {
        console.log('Success:', values);
        // setCurrentStep(i=>++i)
        let a:any = {}
        Object.keys(values).forEach(key=>{
            a[key] = values[key]?.file?values[key]?.file.originFileObj:values[key]
        })
        signUPEndPoint3(a)
        .then(r=>{
            console.log(r);
        })
        .catch(r=>{
            console.log("err ",r);
        })
    };
    
    const onFinishFailed = (errorInfo: any) => {
        // setCurrentStep(i=>++i)
        console.log('Failed:', errorInfo);
    };

    const beforeUpload = (file: File) => {
        const isJpgOrPdf = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'application/pdf';
        if (!isJpgOrPdf) {
            message.error('You can only upload JPG or PDF files!');
        }
        return isJpgOrPdf;
    };

    const uploadProps = {
        name: 'file',
        multiple: false,
        beforeUpload,
        maxCount: 1,
    };

    const layout = {};



    return (
        <Form {...layout} validateMessages={validateMessages} layout="vertical" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            {/* Upload KYC Documents - India */}
            <h3 className='fw-bolder text-primary2 mb-4'>Upload KYC Documents - India</h3>

            <Row gutter={[48, 0]} className='mt-2'>
                {/* IEC Copy */}
                <Col {...responsiveItemLayout}>
                    <Form.Item label="IEC Copy" name={"iec"} rules={[{required:true}]}>
                        <Upload {...uploadProps} className="upload-0" >
                            <Button block icon={<InboxOutlined />}>Click to upload</Button>
                        </Upload>
                    </Form.Item>
                </Col>

                {/* GST Copy */}
                <Col {...responsiveItemLayout}>
                    <Form.Item label="GST Copy" name={"gst"} rules={[{required:true}]}>                        
                            <Upload {...uploadProps} className="upload-0">
                                <Button block icon={<InboxOutlined />}>Click to upload</Button>
                            </Upload>                        
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={[48, 0]}>
                {/* Company PAN Copy */}
                <Col {...responsiveItemLayout}>
                    <Form.Item label="Company PAN Copy" name={"pan"} rules={[{required:true}]}>                        
                            <Upload {...uploadProps} className="upload-0">
                                <Button block icon={<InboxOutlined />}>Click to upload</Button>
                            </Upload>                        
                    </Form.Item>
                </Col>

                {/* Company Registration Certificate */}
                <Col {...responsiveItemLayout}>
                    <Form.Item label="Company Registration Certificate" name={"registration"} rules={[{required:true}]}>                        
                            <Upload {...uploadProps} className="upload-0">
                                <Button block icon={<InboxOutlined />}>Click to upload</Button>
                            </Upload>                        
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={[48, 0]}>
                {/* Trade License */}
                <Col {...responsiveItemLayout}>
                    <Form.Item label="Trade License" name={"tradeLicense"} rules={[{required:true}]}>                        
                            <Upload {...uploadProps} className="upload-0">
                                <Button block icon={<InboxOutlined />}>Click to upload</Button>
                            </Upload>                        
                    </Form.Item>
                </Col>
                {/* Director's/Partner's ID Card */}
                <Col {...responsiveItemLayout}>
                    <Form.Item label="Director's/Partner's ID Card (Passport/DL/Aadhar)" name={"aadhaar"} rules={[{required:true}]}>                        
                            <Upload {...uploadProps} className="upload-0">
                                <Button block icon={<InboxOutlined />}>Click to upload</Button>
                            </Upload>                        
                    </Form.Item>
                </Col>

                {/* Proof of Business Address */}
                <Col {...responsiveItemLayout}>
                    <Form.Item label="Proof of Business Address (Utility Bill/Lease agreement)" name={"proofOfBussiness"}>
                            <Upload {...uploadProps} className="upload-0">
                                <Button block icon={<InboxOutlined />}>Click to upload</Button>
                            </Upload>                        
                    </Form.Item>
                </Col>
            </Row>

            <FormItem label="Export promotion organization membership certificate ( APEDA / MPEDA / CAPEXIL etc)">
                <Row gutter={[48, 0]}>
                    <Col {...responsiveItemLayout} >
                        <Form.Item >
                            <Select options={indianExportOrganizations.map(i=>({key:i,label:i,value:i}))} />
                        </Form.Item>
                    </Col>
                    <Col {...responsiveItemLayout} >
                        <Form.Item >
                            <Upload {...uploadProps} className="upload-0">
                                <Button block icon={<InboxOutlined />}>Click to upload</Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>
            </FormItem>
            <Row gutter={[48, 0]}>
                <Col span={24} >
                    <Form.Item name={"AEO"} label="AEO Certificate">
                        <Radio.Group optionType="default">
                            <Radio.Button value="Yes">Yes</Radio.Button>
                            <Radio.Button value="No">No</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </Col>
                {AEO === "Yes" &&
                    <Col {...responsiveItemLayout} >
                        <Form.Item name={"aeo"} rules={[{required:true}]}>
                            <Upload {...uploadProps} className="upload-0">
                                <Button block icon={<InboxOutlined />}>Click to upload</Button>
                            </Upload>
                        </Form.Item>
                    </Col>}
            </Row>
            <Row gutter={[48, 0]}>
                <Col span={24} >
                    <Form.Item name={"SEHC"} label="Star Export House Certification">
                        <Radio.Group optionType="default">
                            <Radio.Button value="Yes">Yes</Radio.Button>
                            <Radio.Button value="No">No</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </Col>
                {SEHC === "Yes" &&
                    <>
                        <Col span={24} >
                            <Form.Item name={""} label="Star Export House Certification">
                                <Rate />
                            </Form.Item>
                        </Col>
                        <Col {...responsiveItemLayout} >
                            <Form.Item name={"starExportHouse"} rules={[{required:true}]}>
                                <Upload {...uploadProps} className="upload-0">
                                    <Button block icon={<InboxOutlined />}>Click to upload</Button>
                                </Upload>
                            </Form.Item>
                        </Col>
                    </>
                }

            </Row>

            <Col span={24} className='px-5'>
                <Form.Item className='col-10 col-md-8 mx-auto'>
                    <Button shape="round" size="large" type="primary" block htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Col>
        </Form >

    )
}

export  const BranchDetailsForm = ({ setCurrentStep,title }: { setCurrentStep: Dispatch<SetStateAction<number>>,title:string }) => {
    const [formData, setFormData] = useState([{ key: 0 }]); // Initial state with one branch
  
    return (
      <Form layout="vertical" initialValues={{"branches":[{"city":""}]}} validateMessages={validateMessages}>
        <h3 className={`text-primary2`}>{title}</h3>
        <Form.List name="branches">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field,index) => (
                <Card key={field.key+1} title={`Branch ${field.key+1}`} className='my-2' extra={field.key>0&&<Button onClick={()=>remove(field.key)} shape="round">Delete <span className='text-danger'>X</span> </Button>}>
                  
                  <Row gutter={16}>
                    <Col {...responsiveItemLayout}>
                      <FormItem
                        {...field}
                        name={[field.name, 'stateProvince']}
                        label="Select Branch State/Province"
                        rules={[{required:true}]}
                      >
                        <Select>
                          <Select.Option value="IN-MH">Maharashtra</Select.Option>
                          <Select.Option value="IN-TN">Tamil Nadu</Select.Option>
                          {/* Add more options as needed */}
                        </Select>
                      </FormItem>
                    </Col>
                    <Col {...responsiveItemLayout}>
                      <FormItem
                        {...field}
                        name={[field.name, 'city']}
                        label="Select Branch City"
                        rules={[{required:true}]}
                      >
                        <Select>
                          <Select.Option value="city1">Select here</Select.Option>
                          {/* Add more options as needed */}
                        </Select>
                      </FormItem>
                    </Col>                  
                    <Col {...responsiveItemLayout}>
                      <FormItem
                        {...field}
                        name={[field.name, 'address']}
                        label="Branch Address"
                        rules={[{required:true}]}
                      >
                        <Input.TextArea placeholder="Enter Address" />
                      </FormItem>
                    </Col>
                    <Col {...responsiveItemLayout}>
                      <FormItem
                        {...field}
                        name={[field.name, 'contactName']}
                        label="Name [Point of Contact/EXIM/Logistics Team]"
                        rules={[{required:true}]}
                      >
                        <Input placeholder="Enter Name" />
                      </FormItem>
                    </Col>
                    <Col {...responsiveItemLayout}>
                      <FormItem
                        {...field}
                        name={[field.name, 'email']}
                        rules={[
                            {type:"email",message:"Please enter a valid email address"},
                            {required:true}
                        ]}
                        label="Email ID [Point of Contact/EXIM/Logistics Team]"
                      >
                        <Input type="email" placeholder="Enter Email" />
                      </FormItem>
                    </Col>
                    <Col {...responsiveItemLayout}>
                      <FormItem
                        {...field}
                        name={[field.name, 'mobileNo']}
                        label="Mobile No [Point of Contact/EXIM/Logistics Team]"
                        rules={[
                            {min:10,max:10,message: 'Please enter correct number'},
                            {required:true}
                        ]}
                      >
                        <Input placeholder="Enter Mobile No" />
                      </FormItem>
                    </Col>
                  </Row>
                    {fields.length===index+1&&<Button shape="round" onClick={add}>
                      Add Branch
                    </Button>}
                </Card>
              ))}
              
            </>
          )}
        </Form.List>
        <Form.Item className='mx-5 px-2'>
            <Button block type="primary" shape="round" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    );
  };

export   const responsiveItemLayout = {
    xs: 24,
    sm: 24,
    md: 12,
    lg: 12,
    xl: 12,
};

const indianExportOrganizations = [
    "Apparel Export Promotion Council",
    "Basic Chemicals, Pharmaceuticals & Cosmetics EPC (CHEMEXCIL)",
    "Carpet Export Promotion Council",
    "Cashew Export Promotion Council of India",
    "CAPEXIL",
    "Cotton Textiles Export Promotion Council",
    "Council for Leather Exports",
    "EEPC INDIA (Formerly Engineering Export Promotion Council)",
    "Electronics & Computer Software EPC",
    "Export Promotion Council for Handicrafts",
    "Export Promotion Council for EOUS & SEZS",
    "Federation of Indian Export Organisations (FIEO)",
    "Gem & Jewellery Export Promotion Council (CJEPC)",
    "Handloom Export Promotion Council",
    "Indian Oilseeds & Produce Export Promotion Council",
    "Indian Silk Export Promotion Council",
    "Jute Products Development and Export Promotion Council (JPDEPC)",
    "Pharmaceuticals Export Promotion Council",
    "Plastics Export Promotion Council",
    "Powerloom Development & Export Promotion Council",
    "Project Exports Promotion Council of India",
    "Services Export Promotion Council (SEPC)",
    "Shellac & Forest Products Export Promotion Council",
    "Sports Goods Export Promotion Council (SQEPC)",
    "Synthetic & Rayon Textiles Export Promotion Council",
    "Telecom Equipment and Services Export Promotion Council (TEPC)",
    "Wool Industry Export Promotion Council",
    "Wool & Woollens Export Promotion Council",
    "Coffee Board",
    "Coir Board",
    "Rubber Board",
    "Spices Board",
    "Tea Board",
    "Tobacco Board",
    "Agricultural and Processed Food Products Export Development Authority (APEDA)",
    "Coconut Development Board",
    "Marine Products Export Development Authority (MPEDA)",
    "Other"
];
  