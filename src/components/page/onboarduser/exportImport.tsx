"use client"
import React, { useState, useEffect, DispatchWithoutAction, SetStateAction, Dispatch } from 'react';
import { Form, Input, Checkbox, Select, InputNumber, Button, Space, Layout, Steps, Row, Col, message, Upload, Radio, Rate, Card, Spin } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import OnboardUserUI from './layout';
import { assetsRootPath, validateMessages } from '@/components/utils';
import {  UploadOutlined,} from '@ant-design/icons';
import { getCountry, getCountryFromName, getOrg, getUser, signUPEndPoint2, signUPEndPoint3, signUPEndPoint4 } from '@/network/endpoints';
import UnAuthHOC, { AuthHOC } from '@/components/supportcomponents/auth/UnAuthHOC';
import { FormInstance, useWatch } from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import { hashCountry } from '@/components/utils/hashcountry';
import StateSelect, { CitySelect, CitySelectV2, StateSelectV2 } from '@/components/supportcomponents/customcomponents/stateselect';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { CountryListType } from '@/types/defaults';
import { CustomFormUpload } from './freightforwader';
import { FormRules } from '@/components/strings';

const ExportImportUI = () => {
    const [currentStep, setCurrentStep] = useState<number>(0)
    const {push} = useRouter()
    const {data, error,isLoading} = useSWR("/",getUser)
    useEffect(()=>{
        if(data?.data?.user.role==="FF"){
            push("/onboarduser")
        }
    },[data])

    if(isLoading){
        return(
            <div className="d-flex justify-content-center align-items-center p-5">
              <Spin />
            </div>
        )
    }
    return (
        <OnboardUserUI sideUI={<SideUI step={currentStep} />}>
            <div className={currentStep === 0 ? "" : "d-none"} style={{transition:"all 0.5"}}>
                <KYCForm setCurrentStep={setCurrentStep} />
            </div>
            <div className={currentStep === 1 ? "" : "d-none"}>
                <KYCUploadForm step={currentStep} setCurrentStep={setCurrentStep} />
            </div>
            <div className={currentStep === 2 ? "" : "d-none"}>
                <BranchDetailsForm currentStep={currentStep} setCurrentStep={setCurrentStep} title={"Branch Details - Exporter/Importer"} />
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

const KYCForm = ({ setCurrentStep }: {setCurrentStep: Dispatch<SetStateAction<number>> }) => {
    const [form] = Form.useForm();
    const [countryList, setCountryList] = useState<CountryListType[]>([])

    const [countryId, setCountryId] = useState("")
    const [stateId, setStateId] = useState("")
    const [Currency, setCurrency] = useState("₹")
    const handleCountrySelect = (e: any) => {
        setCountryId((countryList ? countryList : []).filter((state: any) => state.desc === e)[0].id)
        setCurrency((countryList ? countryList : []).filter((state: any) => state.desc === e)[0].currency_symbol)
    }

    // Simulate fetching country options (replace with actual API call)
    useEffect(() => {
        const fetchCountries = async () => {
            const response = await getCountry() 
            const countries = await response.data;

            setCountryList(countries.map((country: any) => ({
                desc: country.name,
                value: country.name,
                ...country
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

    const layout = {};

    return (
        <Form
            {...layout}
            layout='vertical'
            form={form}
            onFinish={onFinish}
            autoComplete="off"
            validateMessages={validateMessages}
        >
            <h3 className="text-primary2 fw-bolder mb-5">KYC Details - Exporter / Importer - {+countryId === 101?"India":"Global"}</h3>
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
                    <Form.Item label="IEC Code" name="iec" rules={[{ required: true,  }]}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={22} sm={22} md={12} lg={12}>
                    <Form.Item label={<>{+countryId === 101?"GST Number":"Company Registration Number"}</>} name={+countryId === 101?"gst":"registration"} rules={[{ required: true,  }]}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={22} sm={22} md={12} lg={12}>
                    <Form.Item label="Country" name="country" rules={[{ required: true,  }]}>
                        <Select
                            showSearch
                            allowClear
                            onChange={handleCountrySelect}
                            options={countryList}
                            optionRender={(option) => (
                                <Space>
                                    {option.data.emoji}
                                    {option.data.desc}
                                </Space>
                            )}
                        />
                    </Form.Item>
                </Col>
                <Col xs={22} sm={22} md={12} lg={12}>
                    <StateSelect label={+countryId === 101 ? "State" : "Select State/ Province"} name="state" f={form} onChange={(e: any) => setStateId(e)} countryId={countryId} />
                </Col>
                <Col xs={22} sm={22} md={12} lg={12}>
                    <CitySelect label="City" name="city" onChange={form} f={form} stateId={stateId} />
                </Col>
                <Col xs={22} sm={22} md={12} lg={12}>
                    <Form.Item label="pincode" name="pincode" rules={[{ required: true},FormRules.pincodes]}>
                        <Input type="number" />
                    </Form.Item>
                </Col>
                <Col xs={22} sm={22} md={24} lg={24}>
                    <Form.Item label="Registered Office Address" name="registeredOfficeAddress" rules={[{ required: true,  }]}>
                        <Input.TextArea rows={2} />
                    </Form.Item>
                </Col>
                <Col xs={22} sm={22} md={12} lg={12}>
                    <Form.Item label="Website" name="website" rules={[{ required: true,  }]}>
                        <Input />
                    </Form.Item>
                </Col>

                <Col xs={22} sm={22} md={12} lg={12}>
                    <Form.Item label="Name [Point of Contact / EXIM / Logistics Team]" required name={["pointSalesPricingTeam","name"]} rules={[{ required: true,  }]}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={22} sm={22} md={12} lg={12}>
                    <Form.Item label="Email ID [Point of Contact / EXIM / Logistics Team]" required name={["pointSalesPricingTeam",`email`]}>
                        <Input type="email" />
                    </Form.Item>
                </Col>
                <Col xs={22} sm={22} md={12} lg={12}>
                    <Form.Item label="Mobile No [Point of Contact / EXIM / Logistics Team]" required name={["pointSalesPricingTeam",`mobile`]} rules={[{ required: true,  }]}>
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
                        <Input addonAfter={Currency} />
                    </Form.Item>
                </Col>

                <Col xs={22} sm={22} md={12} lg={12}>
                    <Form.Item label="Annual Volume (TEUs) by Ocean in Last FY" name="annualVolumeTuesByOcean" rules={[{ required: true,  }]}>
                        <Input type="number" addonAfter="TEUs" />
                    </Form.Item>
                </Col>

                <Col xs={22} sm={22} md={12} lg={12}>
                    <Form.Item label="Annual Volume (MT) by Air in Last FY" name="annualVolumeMtByAir" rules={[{ required: true,  }]}>
                        <Input type="number" addonAfter="MT" />
                    </Form.Item>
                </Col>

                <Col xs={22} sm={22} md={12} lg={12}>
                    <Form.Item label="Escalation/Emergency Contact Numbers" name="emergencyContactNumber" rules={[{ required: true,  }]}>
                        <Select mode={"tags"} showSearch={false} />
                    </Form.Item>
                </Col>

                <Col xs={22} sm={22} md={12} lg={12}>
                    <Form.Item label="Escalation/Emergency Email IDs" name="emergencyContactEmail" rules={[{ required: true,  }]}>
                        <Select mode={"tags"} showSearch={false} />
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

const KYCUploadForm = ({ setCurrentStep ,step}: {step:number, setCurrentStep: Dispatch<SetStateAction<number>> }) => {
    const [form] = Form.useForm();
    const AEO = useWatch("AEO", { form });
    const SEHC = useWatch("SEHC", { form });
    const {data, error,isLoading} = useSWR("/?"+step,getUser)

    const onFinish = (values: any) => {
        let a:any = {}
        
        signUPEndPoint3(values)
        .then(r=>{
            if(r.code){
                setCurrentStep(i=>++i)                
            }
        })
        .catch(r=>{
            console.log("err ",r);
        })
    };
    
    const onFinishFailed = (errorInfo: any) => {
        
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
           {data?.data?.user.countryCode===91&& 
           <>
            <h3 className='fw-bolder text-primary2 mb-4'>Upload KYC Documents - India</h3>

                <Row gutter={[48, 0]} className='mt-2'>
                    {/* IEC Copy */}
                    <Col {...responsiveItemLayout}>
                        <CustomFormUpload required style f={form} label="IEC Copy" name={"iec"} />
                    </Col>

                    {/* GST Copy */}
                    <Col {...responsiveItemLayout}>
                        <CustomFormUpload required style f={form} label="GST Copy" name={"gst"}/>
                    </Col>
                </Row>

                <Row gutter={[48, 0]}>
                    {/* Company PAN Copy */}
                    <Col {...responsiveItemLayout}>
                        <CustomFormUpload required style f={form} label="Company PAN Copy" name={"pan"} />
                    </Col>

                    {/* Company Registration Certificate */}
                    <Col {...responsiveItemLayout}>
                        <CustomFormUpload required style f={form} label="Company Registration Certificate" name={"registrationCertificate"} />
                    </Col>
                </Row>

                <Row gutter={[48, 0]}>
                    {/* Trade License */}
                    <Col {...responsiveItemLayout}>
                        <CustomFormUpload required style f={form} label="Trade License" name={"tradeLicense"} />
                    </Col>
                    {/* Director's/Partner's ID Card */}
                    <Col {...responsiveItemLayout}>
                        <CustomFormUpload required style f={form} label="Director's/Partner's ID Card (Passport/DL/Aadhar)" name={"aadhaar"} />
                    </Col>

                    {/* Proof of Business Address */}
                    <Col {...responsiveItemLayout}>
                    <CustomFormUpload required style f={form} label="Proof of Business Address (Utility Bill/Lease agreement)" name={"proofOfBussiness"}/>
                    </Col>
                </Row>

                <FormItem label="Export promotion organization membership certificate ( APEDA / MPEDA / CAPEXIL etc)">
                    <Row gutter={[48, 0]}>
                        <Col {...responsiveItemLayout} >
                            <Form.Item name={"exportPromotionOrganisationMembership"}>
                                <Select showSearch options={indianExportOrganizations.map(i=>({key:i,label:i,value:i}))} />
                            </Form.Item>
                        </Col>
                        <Col {...responsiveItemLayout} >
                            <CustomFormUpload required style f={form} label={""}  name={"exportPromotionOrganisationMembershipDocument"}/>
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
                            <CustomFormUpload required style f={form} label={""} name={"aeo"} />
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
                                <Form.Item name={"starExportHouseRating"} label="Star Export House Certification">
                                    <Rate />
                                </Form.Item>
                            </Col>
                            <Col {...responsiveItemLayout} >
                                <CustomFormUpload required style f={form} label={""} name={"starExportHouse"} />
                            </Col>
                        </>
                    }

                </Row>

            </>
            }
            {data?.data?.user.countryCode!==91&&
                <KYCUploadFormGlobal f={form} />
            }
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

const KYCUploadFormGlobal = ({ f }: { f: FormInstance<any> }) => {
    const [fileList, setFileList] = useState([]);
    const AEO = useWatch("AEO", { form:f });

    return (
        <div className='p-2'>
            <h3 className='text-primary2 my-4'>Upload KYC documents [ Global ]</h3>
            <Row gutter={16}>
                <Col xs={24} sm={24} md={12} lg={12}>
                    <CustomFormUpload required style f={f} name={"iec"} label={"Import / Export license"} />
                </Col>
                <Col xs={24} sm={24} md={12} lg={12}>
                    <CustomFormUpload required style f={f} name={"registrationCertificate"} label={"Company Registration certificate"} />
                </Col>
                <Col xs={24} sm={24} md={12} lg={12}>
                    <CustomFormUpload required style f={f} name={"taxRegistrationCopy"} label={"Tax registration Copy"} />
                </Col>
                <Col xs={24} sm={24} md={12} lg={12}>
                    <CustomFormUpload required style f={f} name={"directorNationalId"} label={"Director’s / Partner’s National ID ( Passport / DL / SSN )"} />
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={24} sm={24} md={12} lg={12}>
                    <CustomFormUpload required style f={f} name={"ProofBusinessAddress"} label={"Proof of business address (Utility Bill/Lease agreement)"} />
                </Col>
                <Col xs={24} sm={24} md={12} lg={12}>
                    <CustomFormUpload required style f={f} name={"chamberOfCommerceTradeAssociation"} label={"Chamber of Commerce / Trade Association certificate"} />
                </Col>
            </Row>
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
                            <CustomFormUpload required style f={f} label={""} name={"aeo"} />
                        </Col>}
                </Row>
        </div>
    );
};

export  const BranchDetailsForm = ({ setCurrentStep,title ,currentStep}: {currentStep:number, setCurrentStep: Dispatch<SetStateAction<number>>,title:string }) => {
    const [formData, setFormData] = useState([{ key: 0 }]);
    const [form] = Form.useForm();
    const {push} = useRouter()
    const [org, setOrg] = useState(null);
    const [countryId, setCountryId] = useState("");
    const [stateId, setStateId] = useState("")
    const [dataList,setDataList] = useState([{}])
    const onFinish = (value:any) => {
        console.log(value);
        let errors:string[] = []
        value.branches.forEach((i:any,index:number)=>{
            i.contactPersonEmail.forEach((element:string) => {
                if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(element)){
                  errors.push(`branch ${index} Invalid Email`)
                }
              })
        });
        value.branches.forEach((i:any,index:number)=>{
            i.contactPersonPhone.forEach((element:string) => {
                if(!/^\d{10}$/.test(element)){
                  errors.push(`branch ${index} Invalid Phone`)
                }
              })
        });
        dataList.forEach((element:any) => {
            if(!element?.state || !element.city){
                errors.push("State and City are required")
            }
        })
        if(errors.length>0){
          errors.forEach((i=>message.error(i)))
          return
        }
        let finalData  = value.branches.map((element:any,index:number) =>({...element,...dataList[index]}))
        signUPEndPoint4(finalData)
        .then(r=>{
            if(r.code){
                push("/")
            }
        })
        .catch(r=>{console.log(r)
        })
        
        
    }

    useEffect(() => {
      const fetchData = async () => {
        const fetchedOrg = await getOrg(); 
        if(fetchedOrg.code){
          setOrg(fetchedOrg.data);
          setCountryId(hashCountry[fetchedOrg.data.country].id)
        }
      };
      fetchData();
    }, [currentStep]);
    
    
    return (
      <Form layout="vertical" initialValues={{"branches":[{}]}} validateMessages={validateMessages} form={form} onFinish={onFinish}>
        <h3 className={`text-primary2`}>{title}</h3>
        <Form.List name="branches">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field,index) => (
                <Card key={field.key+1} title={`Branch ${index+1}`} className='my-2' extra={field.key>0&&<Button onClick={()=>{remove(field.key),setDataList(i=>i.filter((i,iIndex)=>iIndex!==index))}} shape="round">Delete <span className='text-danger'>X</span> </Button>}>
                  
                  <Row gutter={16}>
                    <Col {...responsiveItemLayout}>
                      <StateSelectV2
                        props={{...field}}
                        name={index}
                        label="Select Branch State/Province"
                        countryId={countryId}
                        f={setDataList} 
                        onChange={(e:any)=>setStateId(e)}
                      />
                    </Col>
                    <Col {...responsiveItemLayout}>
                    <CitySelectV2
                        props={{...field}}
                        name={index}
                        label="Select Branch State/Province"
                        stateId={stateId}
                        f={setDataList}
                        onChange={form} />
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
                        name={[field.name, 'contactPersonName']}
                        label="Name [Point of Contact/EXIM/Logistics Team]"
                        rules={[{required:true}]}
                      >
                        <Input placeholder="Enter Name" />
                      </FormItem>
                    </Col>
                    <Col {...responsiveItemLayout}>
                      <FormItem
                        {...field}
                        name={[field.name, 'contactPersonEmail']}
                        rules={[
                            {required:true}
                        ]}
                        label="Email ID [Point of Contact/EXIM/Logistics Team]"
                      >
                        <Select placeholder="Enter Email" mode="tags"/>
                      </FormItem>
                    </Col>
                    <Col {...responsiveItemLayout}>
                      <FormItem
                        {...field}
                        name={[field.name, 'contactPersonPhone']}
                        label="Mobile No [Point of Contact/EXIM/Logistics Team]"
                        rules={[
                            {required:true}
                        ]}
                      >
                        <Select mode="tags" placeholder="Enter Mobile No" />
                      </FormItem>
                    </Col>
                  </Row>
                    {fields.length===index+1&&<Button shape="round" onClick={()=>{add(),setDataList(i=>[...i,...[{}]])}}>
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
  