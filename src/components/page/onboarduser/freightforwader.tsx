"use client"
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import OnboardUserUI from './layout'
import { BranchDetailsForm, SideUI, responsiveItemLayout } from './exportImport'
import { Button, Card, Checkbox, Col, DatePicker, Form, FormInstance, Input, Radio, Row, Select, Space, Upload, message } from 'antd'
import { InboxOutlined, UploadOutlined } from '@ant-design/icons'
import { validateMessages } from '@/components/utils'
import { getCountry, getSessionCache, signUPEndPoint2, signUPEndPoint3, uploadFile } from '@/network/endpoints'
import { AuthHOC } from '@/components/supportcomponents/auth/UnAuthHOC'
import StateSelect, { CitySelect } from '@/components/supportcomponents/customcomponents/stateselect'
import { useWatch } from 'antd/es/form/Form'
import { CountryListType } from '@/types/defaults'
import { FormRules, strings } from '@/components/strings'
import { useRouter, useSearchParams } from 'next/navigation'

function Freightforwader() {
    const [currentStep, setCurrentStep] = useState<number>(0)

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
                <BranchDetailsForm currentStep={currentStep} setCurrentStep={setCurrentStep} title={"Branch Details - Freight Forwarder"} />
            </div>
        </OnboardUserUI>
  )
}

export default AuthHOC(Freightforwader)

const KYCForm = ({ setCurrentStep }: { setCurrentStep: Dispatch<SetStateAction<number>> }) => {
  const {push} = useRouter()
    const [form] = Form.useForm();
  const [countryList, setCountryList] = useState<CountryListType[]>([])

  const [countryId, setCountryId] = useState("")
  const [stateId, setStateId] = useState("")
  const [Currency, setCurrency] = useState("₹")
  const handleCountrySelect=(e:any)=>{
    setCountryId((countryList?countryList:[]).filter((state:any) => state.desc === e)[0].id)
    setCurrency((countryList?countryList:[]).filter((state:any) => state.desc === e)[0].currency_symbol)
  }

  // Simulate fetching country options (replace with actual API call)
  useEffect(() => {
      const fetchCountries = async () => {
          const response = await getCountry() // Replace with your API endpoint
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
        let errors:string[] = []
      values.emergencyContactEmail.forEach((element:string) => {
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(element)){
          errors.push("Invalid Email")
        }
      });
      values.emergencyContactNumber.forEach((element:string) => {
        if(!/^\d{10}$/.test(element)){
          errors.push("Invalid Phone Number")
        }
      })
      if(errors.length>0){
        errors.forEach((i=>message.error(i)))
        return
      }
      
      signUPEndPoint2(values)
        .then(r => {
            if(r.code){
                if(+countryId!==101){
                    push("?global="+values.country)
                }
                setCurrentStep(i => ++i)
            }
        })
        .catch(r => {
            console.log(r);
        })
  };

  const onFinishFailed = (errorInfo: any) => {};

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
          validateMessages={validateMessages}
      >
          <h3 className="text-primary2 fw-bolder mb-5">KYC Details - Freight forwarder - {+countryId===101?"India":"Global"}</h3>
          <Row gutter={[16, 8]} justify={"center"}>
              <Col xs={22} md={24}>
                  <Form.Item label="Company Name" className='col-12 col-md-8' required name="companyName" rules={[{ required: true, message: "Field Required" }]}>
                      <Input />
                  </Form.Item>
              </Col>
              <Col xs={22} sm={22} md={12} lg={12}>
                  <CustomFormUpload name={"companyLogo"} style label={"Upload Company Logo"} f={form} />
              </Col>
              <Col xs={22} sm={22} md={12} lg={12}>
                  {+countryId===101?
                    <Form.Item label="GST Number" name="gst" rules={[{required:true}]}>
                        <Input />
                    </Form.Item>:
                    <Form.Item label="Company Registration Number" name="registration" rules={[{required:true}]}>
                        <Input />
                    </Form.Item>
                  }
              </Col>
              <Col xs={22} sm={22} md={12} lg={12}>
                  <Form.Item label="Country" name="country" rules={[{ required: true}]}>
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
                  <StateSelect label={+countryId===101?"State":"Select State/ Province"} name="state" f={form} onChange={(e:any)=>setStateId(e)} countryId={countryId}/>
              </Col>
              <Col xs={22} sm={22} md={12} lg={12}>
                  <CitySelect label="City" name="city" onChange={form} f={form} stateId={stateId}/>
              </Col>
              <Col xs={22} sm={22} md={12} lg={12}>
                  <Form.Item label="pincode" name="pincode" rules={[{ required: true }]}>
                      <Input type="number" />
                  </Form.Item>
              </Col>
              <Col xs={22} sm={22} md={24} lg={24}>
                  <Form.Item label="Registered Office Address" name="registeredOfficeAddress">
                      <Input.TextArea rows={2} />
                  </Form.Item>
              </Col>
              <Col xs={22} sm={22} md={12} lg={12}>
                  <Form.Item label="Website" name="website" rules={[{ required: true }]}>
                      <Input />
                  </Form.Item>
              </Col>

              <Col xs={22} sm={22} md={12} lg={12}>
                  <Form.Item label="Name [Point of Contact / EXIM / Logistics Team]" name={["pointSalesPricingTeam","name"]} rules={[{ required: true }]}>
                      <Input />
                  </Form.Item>
              </Col>
              <Col xs={22} sm={22} md={12} lg={12}>
                  <Form.Item label="Email ID [Point of Contact / EXIM / Logistics Team]" name={["pointSalesPricingTeam","email"]}>
                      <Input type="email" />
                  </Form.Item>
              </Col>
              <Col xs={22} sm={22} md={12} lg={12}>
                  <Form.Item label="Mobile No [Point of Contact / EXIM / Logistics Team]" name={["pointSalesPricingTeam","mobile"]} rules={[{ required: true },FormRules.mobile]}>
                      <Input type="number" />
                  </Form.Item>
              </Col>

              <Col xs={22} sm={22} md={12} lg={12}>
                  <Form.Item label="Year of Company Incorporation" name="yearOfIncorporation" rules={[{ required: true }]}>
                      <Input type="number" />
                  </Form.Item>
              </Col>

              <Col xs={22} sm={22} md={12} lg={12}>
                  <Form.Item label="Annual Turnover in Last FY" name="annualTurnover" rules={[{ required: true }]}>
                      <Input type='number' addonAfter={<p className='p-0 m-0'>{Currency}</p>} />
                  </Form.Item>
              </Col>

              <Col xs={22} sm={22} md={12} lg={12}>
                  <Form.Item label="Annual Volume (TEUs) by Ocean in Last FY" name="annualVolumeTuesByOcean" rules={[{ required: true }]}>
                      <Input type="number" addonAfter="TEUs" />
                  </Form.Item>
              </Col>

              <Col xs={22} sm={22} md={12} lg={12}>
                  <Form.Item label="Annual Volume (MT) by Air in Last FY" name="annualVolumeMtByAir" rules={[{ required: true }]}>
                      <Input type="number" addonAfter="MT" />
                  </Form.Item>
              </Col>

              <Col xs={22} sm={22} md={12} lg={12}>
                  <Form.Item label="Escalation/Emergency Contact Numbers" name="emergencyContactNumber" rules={[{ required: true }]}>
                      <Select mode={"tags"} showSearch={false} />
                  </Form.Item>
              </Col>

              <Col xs={22} sm={22} md={12} lg={12}>
                  <Form.Item label="Escalation/Emergency Email IDs" name="emergencyContactEmail" rules={[{ required: true }]}>
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

const LicenseForm = ({name,label,isLicense,f}:{name:any,label:String,isLicense?:boolean,f:FormInstance<any>}) => {
    const [fileList, setFileList] = useState([]);
    const status = useWatch(["userdocuments",name,"status"],f);
    const onChange = (e:any) => f.setFieldValue(["userdocuments",name,"file"],e.file.originFileObj)

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
                <Form.Item name={["userdocuments",name,"status"]} initialValue={false} valuePropName="checked">
                    <Checkbox value={true} className='d-flex align-items-center px-0'><p className='text-wrap text-primary1 fw-bolder px-1 my-0'>{label}</p></Checkbox>
                </Form.Item>
            </Col>
            <Col {...layoutProps.style1}>
                <Form.Item rules={[{required:status}]} name={["userdocuments",name,"licenseNo"]} label={<p className='p-0 m-0 text-muted'>{!isLicense?"License No.":"Certificate No."}</p>} >
                <Input disabled={!status} />
                </Form.Item>
            </Col>
            <Col {...layoutProps.style1}>
                <Form.Item rules={[{required:status}]} name={["userdocuments",name, "file"]} label={<p className='p-0 m-0 text-muted'>Upload</p>}>
                <Upload
                    onChange={onChange}
                    multiple
                    accept=".pdf,.doc,.docx"
                    className='upload-0'
                >
                    <Button disabled={!status} block icon={<UploadOutlined/>}>Upload File</Button>
                </Upload>
                </Form.Item>
            </Col>
            <Col {...layoutProps.style1}>
                <Form.Item rules={[{required:status}]} name={["userdocuments",name, "validTill"]} label={<p className='p-0 m-0 text-muted'>Valid Till</p>}>
                <DatePicker disabled={!status} style={{minWidth:'100%'}} />
                </Form.Item>
            </Col>
        </Row>
    );
  };
  
  const Licenses = ({ setCurrentStep }: { setCurrentStep: Dispatch<SetStateAction<number>> }) => {
    const param = useSearchParams()
    const [global,setGlobal] = useState<boolean>(false)
    const [form] = Form.useForm();
    const onFinish=async(value:any) => {
        let errorLists = []
        let minDoc = false
        console.log(value);
        
        let a = Object.keys(value.userdocuments).map(async(i)=>{
            if(value.userdocuments[i]?.status){
                value.userdocuments[i].file = await uploadFile({ file: value.userdocuments[i].file,cname:i}).then((r:any)=>r?.data.file)
                minDoc = true
            }
        })
        let updated = await Promise.all(a)
        
        
        if(!minDoc){
            errorLists.push("Please upload at least one document.")
        }
        if(errorLists.length>0){
            errorLists.forEach((error)=>{
                message.error(error)
            })
            return
        }
        
        signUPEndPoint3(value)
        .then(r=>{
            if(r.code){
                setCurrentStep(i=>++i)
            }
        })
        .catch(r=>{console.log(r)
        })    
    }
    useEffect(() => {
        setGlobal(param.get("global")?false:true);
    },[param])
    return (
      <div>
        <h2 className="text-primary2">Upload licenses/Certifications</h2>
        <Form layout="vertical"
            form={form}
            onFinish={onFinish}
        >
        <Card className='m-1 my-3'>
          <LicenseForm f={form} name={"mtoMultimodalTransportLicense"} label={"MTO / Multimodal transport license"} />
          <LicenseForm f={form} name={"iata"} label={"IATA"} />
          <LicenseForm f={form} name={"fiata"} label={"FIATA"} />
          <LicenseForm f={form} name={"fmcFreightForwarder"} label={"FMC [ Freight Forwarder ]"} />
          <LicenseForm f={form} name={"nvooc"} label={"NVOCC"} />
        </Card>
        <Card className='m-1 my-2'>
          <LicenseForm f={form} isLicense name={"customsAssociationMembership"} label={"Forwarder / Customs Association Membership"} />        
          <LicenseForm f={form} isLicense name={"chamberOfCommerceTradeAssociation"} label={"Chamber of Commerce / Trade association"} />        
          <LicenseForm f={form} isLicense name={"wca"} label={"WCA"} />        
          <LicenseForm f={form} isLicense name={"jctrans"} label={"JC Trans"} />        
        </Card>
        <Card className='m-1 my-2'>
          <LicenseForm f={form} name={"customLicense"} label={"Custom License"} />        
          <LicenseForm f={form} name={"aeo"} label={"AEO"} />        
          <LicenseForm f={form} name={"dgHaz"} label={"DG / Haz Cargo"} />        
          <LicenseForm f={form} name={"tapa"} label={"TAPA"} />        
          <LicenseForm f={form} name={"basc"} label={"BASC"} />        
          <LicenseForm f={form} name={"ctpat"} label={"C-TPAT"} />        
          <LicenseForm f={form} name={"iso9001"} label={"ISO 9001"} />        
        </Card>
        {global?
        <KYCUploadFormIndia f={form}/>:
         <KYCUploadFormGlobal f={form}/>}
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
                <CustomFormUpload required style f={f} name={"gst"} label={"GST Certificate"}/>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
                <CustomFormUpload required style f={f} name={"pan"} label={"Company PAN Copy"}/>
            </Col>
        </Row>
        <Row gutter={16}>
            <Col xs={24} sm={24} md={12} lg={12}>
                <CustomFormUpload required style f={f} name={"registrationCertificate"} label={"Company Registration Certificate"} />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
                <CustomFormUpload required style f={f} name={"tradeLicense"} label={"Trade License"}/>
            </Col>
        </Row>
        <Row gutter={16}>
            <Col xs={24} sm={24} md={12} lg={12}>
                <CustomFormUpload required style f={f} name={"directorNationalId"} label={"Director's/Partner's ID Card (Passport/DL/Aadhar)"}/>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
                <CustomFormUpload required style f={f} name={"ProofBusinessAddress"} label={"Proof of business address (Utility Bill/Lease agreement)"}/>
            </Col>
        </Row>
    </div>
  );
};
const KYCUploadFormGlobal = ({f}:{f:FormInstance<any>}) => {
  const [fileList, setFileList] = useState([]);
  const onUploadChange = (info:any) => {
      // setFileList(info.fileList);
    };
    
    return (
        <div className='p-2'>
        <h3 className='text-primary2 my-4'>Upload KYC documents [ Global ]</h3>
        <Row gutter={16}>
            <Col xs={24} sm={24} md={12} lg={12}>
            <CustomFormUpload required style f={f} name={"registrationCertificate"} label={"Company Registration certificate"}/>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
                <CustomFormUpload required style f={f} name={"taxRegistrationCopy"} label={"Tax registration Copy"}/>
            </Col>
        </Row>
        <Row gutter={16}>
            <Col xs={24} sm={24} md={12} lg={12}>
                <CustomFormUpload required style f={f} name={"directorNationalId"} label={"Director’s / Partner’s National ID ( Passport / DL / SSN )"} />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
                <CustomFormUpload required style f={f} name={"ProofBusinessAddress"} label={"Proof of business address (Utility Bill/Lease agreement)"}/>
            </Col>
        </Row>
    </div>
  );
};

const CustomFormUpload =({f,name,label,style=false,maxCount=1 ,required=false}:{required?:boolean,maxCount?:number,style?:boolean,label:any,name:any,f:FormInstance<any>}) => {
    const [token,setToken] = useState<any>("")
    useEffect(()=>{
        getSessionCache()
        .then(r=>setToken(r.user?.email))
        .catch(r=>{})
    },[])
    const props = {
        onChange:({file}:any)=>{
            
            if(file.status=="done"){                
                f.setFieldValue(style?name:[name,"file"],file.response.file)
            }
        },
        maxCount
      };
    return(
        <Form.Item name={name} rules={[{required}]} label={<p className='p-0 m-0 text-muted'>{label}</p>}>
            <Upload {...props}  className={`upload-0`}
                action={strings.uploadEndPoint}
                name="file"
                data={{cname:name}}
                headers={{Authorization: 'Bearer ' +token}}
            >
            <Button block icon={<UploadOutlined/>}>Upload File</Button>
            </Upload>
        </Form.Item>
    )
}