"use client"
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Table, Button, Input, Select, Typography, Card, DatePicker, TimePicker, ConfigProvider, Form, Row, Radio, Col, Result, Spin, Space, Checkbox, Modal, message, Timeline } from 'antd';
import { ContextRFQQuata, initialStateRFQQuata, reducerRFQQuata, RFQQuataSideUI } from './quotationSideUI';
import { RFQUserUI } from '../onboarduser/layout';
import { DashOutlined, DeleteOutlined, EyeFilled, MinusOutlined, PlusCircleFilled, PlusOutlined } from '@ant-design/icons';
import Link from 'next/link';
import useSWR from 'swr';
import { getCurrecyByContryName, getExchangeRates, getRfQById, postQuotation } from '@/network/endpoints';
import { strings } from '@/components/strings';
import { PortUI, RFQCard } from './search';
import CustomTable, { DragHandle } from '@/components/supportcomponents/rfq/editableTable';
import { airlinesOptions, freightCostHead, freightTitle, modeOfShipmentOptions, paymentTermOptions, polChargeOptions, polOptions, shippingLinesOptiopns, unitsOption, uomSeaFcl } from './options';
import LocodeSelect from '@/components/supportcomponents/customcomponents/locodeselect';
import { getPaymentCode, locodeFormatedString, validateData } from '@/components/utils';
import { AuthHOC } from '@/components/supportcomponents/auth/UnAuthHOC';
import PostSuccessModal from '@/components/supportcomponents/rfq/postSuccessModal';

const {Column, ColumnGroup} = Table
const defaultValues = {
  "polFreeTimeStatus":true,
  "podFreeTimeStatus":true,
  "paymentTermsStatus":true,
  noOfTransShipmentPorts:0,
  pointOfContact:[]
}
const OceanFreightForm=({id}:{id?:string | string[] | undefined})=>{
        const [currentStep, setCurrentStep] = useState<number>(0)
        const [state, dispatch] = useReducer(reducerRFQQuata, initialStateRFQQuata);

        const {data,isLoading,error} = useSWR(id, getRfQById,{dedupingInterval:1000})
        
        const updateCount=(e:number)=>{
          if(e<currentStep){
              setCurrentStep(e)
          }
      }
      

      if (isLoading) {
        return (
          <div className="d-flex justify-content-center align-items-center p-5">
            <Spin />
          </div>
        )
      }
      if (!data?.code) {
        return (
          <div className="d-flex justify-content-center align-items-center p-5">
            <Result status={"error"} subTitle={data?.message} />
          </div>
        )
      }
        return (
          <ContextRFQQuata.Provider value={{ state, dispatch }}>
            <RFQUserUI sideUI={<RFQQuataSideUI step={currentStep} updateSteps={updateCount} />}>
            { !isLoading&&id?
              <ConfigProvider
                  theme={{
                      components:{
                          "Input": {
                              colorBgContainerDisabled: "rgb(243,246,255)",
                              colorTextDisabled: "rgba(69, 17, 151, 1)",
                          },
                          "Form": {
                              "labelColor": "rgb(10,0,73)",
                              fontSize:16
                          },
                          "Card": {
                              colorTextHeading: "rgba(69, 17, 151, 1)",
                              headerFontSize:18,
                              padding:10,
                          },
                          Table: {
                              colorTextHeading: "rgba(69, 17, 151, 1)",
                              headerBg: "rgb(243,246,255)",
                              cellPaddingInline: 5,
                              cellPaddingBlock:10,
                              fontSize: 13,
                              borderColor: "#A89CF7",
                          }
                      }
                  }}
              >
                <FormUI id={id} rfq={data?.data} />   
              </ConfigProvider>
              :
              <Card styles={{body:{paddingBottom:20}}}>
                <Result status={"error"} title="No RFQ Found" extra={<Link href={"/rfq/search"}>Search RFQs</Link>} />
              </Card>
            }
            </RFQUserUI>
          </ContextRFQQuata.Provider>
            
        )
}
const FormUI = ({id,rfq}:{rfq:any,id:any}) => {
  const [previewModalOpen, setPreviewModalOpen] = useState(false)
  const [Loading, setLoading] = useState(false)
  const [SuccessModal, setSuccessModal] = useState(false)

  const {state,dispatch} = useContext(ContextRFQQuata)

  const [form] = Form.useForm();
  const [freightData, setFreightData] = useState<any>([]);
  const [polChargesData, setPolChargesData] = useState<any>([]);
  const [podChargesData, setPodChargesData] = useState<any>([]);
  const [freightActive, setfreightActive] = useState<number>(-1)
  const [polActive, setpolActive] = useState<number>(-1)
  const [podActive, setpodActive] = useState<number>(-1)
  const {data:exchangeRates} = useSWR("/",getExchangeRates)
  const [currencyCode, setCurrencyCode] = useState("")

  const [LoadingCountryCurrency, setLoadingCountryCurrency] = useState("")
  const [UnLoadingCountryCurrency, setUnLoadingCountryCurrency] = useState("")
  
  const updateSteps=(stepTitle:string|React.ReactNode) =>dispatch({ type:'UPDATE_STEP_STATUS', payload: { title: stepTitle, status: 'finish',description:"Completed" } });
  const updateQuantity =(value:any,iIndex:number,i=0)=>{
    let items = (rfq?.container?rfq?.container:[]).filter((o:any)=>o.name==value)
    if(items.length>0){
      form.setFieldValue(["freightCharge",iIndex,"unit"],items[0].quantity)
      handleInputChange(iIndex,"quantity",items[0].quantity,i)
      handleInputChange(iIndex,"unit",value,i)
    }else{
      handleInputChange(iIndex,"quantity",1,i)
      handleInputChange(iIndex,"unit",value,i)
    }
  }
  // 0 freight charge, 1 polCharge, 2 podCharge,
  const handleInputChange = (id:number,name:string,value:any,type:number=0)=>{
    if(type===1){    
      setPolChargesData((o:any)=>{
        let i = [...o]
        i[id][name]=value
        if("rate" === name){
          i[id]["amount"] =  value*i[id]?.quantity
        }
        return [...i]
      })
      return
    }
    if(type===2){    
      setPodChargesData((i:any)=>{
        i[id][name]=value
        if("rate" === name){
          i[id]["amount"] = value*i[id]?.quantity
        }
        return [...i]
      })
      return
    }
    setFreightData((o:any)=>{
      let i = [...o]
      
      i[id][name]=value
      if("rate" === name){
        i[id]["amount"] = value*i[id]?.quantity
      }
      return [...i]
    })
  }
  
  useEffect(() => {
    
    let inclusiveFright = 0;
    freightData.forEach((i:any)=>{
      if(i?.currency ==="USD"){
        inclusiveFright = +inclusiveFright + +i["amount"]
      }else {
        if (i?.amount > 0 && i?.currency) {
          const conversionRate = +exchangeRates?.data[i?.currency].toFixed(2);
          inclusiveFright = +inclusiveFright + (i.amount / conversionRate) * exchangeRates?.data["USD"]
        }
      }
    })
      form.setFieldValue("inclusiveFrightDollar",inclusiveFright.toFixed(2))
      form.setFieldValue("inclusiveFrightLocal",(inclusiveFright*(exchangeRate?exchangeRate:1)).toFixed(2))
    
    let totalpol = 0;
    polChargesData.forEach((i:any)=>{
      if(i?.currency ==="USD"){
        totalpol = +totalpol + +i["amount"]
      }else{
        if(i?.amount>0 && i?.currency){
          const conversionRate = +exchangeRates?.data[i?.currency].toFixed(2);
          totalpol =+totalpol + (i.amount / conversionRate) * exchangeRates?.data["USD"]
        }
        }
    })
    form.setFieldValue("polChargeDollar",totalpol.toFixed(2))
    form.setFieldValue("polChargeLocal",(totalpol*(exchangeRate?exchangeRate:1)).toFixed(2))
    
    let totalpod = 0;
    podChargesData.forEach((i:any)=>{
      if(i?.currency ==="USD"){
        totalpod += i["amount"]
      }else{
        if(i?.currency && i?.amount>0){
          const conversionRate = +exchangeRates?.data[i?.currency].toFixed(2);
          totalpod =+totalpod + (i.amount / conversionRate) * exchangeRates?.data["USD"]
        }
      }
    })
    if(totalpod>0){
      form.setFieldValue("podChargeDollar",totalpod.toFixed(2))
      form.setFieldValue("podChargeLocal",(totalpod*(exchangeRate?exchangeRate:1)).toFixed(2))
    }

    let totalLanded = inclusiveFright+totalpol+totalpod
    
    if(totalLanded>0){
      form.setFieldValue("totallandedCost",(totalLanded*(exchangeRate?exchangeRate:1)).toFixed(2))
    }
    
  }, [freightData,polChargesData,podChargesData])
  
  // SS
  const [transshipmentPorts, setTransshipmentPorts] = useState([]);
  const [etd, setEtd] = useState(new Date());

  const noOfTransShipmentPorts = Form.useWatch("noOfTransShipmentPorts",form)
  const paymentTermsStatus = Form.useWatch("paymentTermsStatus",form)
  const paymentTermsDeclineValue = Form.useWatch("paymentTermsDeclineValue",form)
  const shippingLine = Form.useWatch("shippingLine",form)
  const polFreeTimeStatus = Form.useWatch("polFreeTimeStatus",form)
  const podFreeTimeStatus = Form.useWatch("podFreeTimeStatus",form)
  const polFreeTimeDeclineValue = Form.useWatch("polFreeTimeDeclineValue",form)
  const podFreeTimeDeclineValue = Form.useWatch("podFreeTimeDeclineValue",form)
  const exchangeRate = Form.useWatch("exchangeRate",form)
  const siCutOff = Form.useWatch("siCutOff",form)
  const termsCondition = Form.useWatch("termsCondition",form)
  const quotationValidityDate = Form.useWatch("quotationValidityDate",form)
  const transitTime = Form.useWatch("transitTime",form)

  useEffect(() => {
    let value = form.getFieldsValue()
    if(validateData(freightData,"Freight").length<1 && freightData.length>0){
      updateSteps(initialStateRFQQuata[0].title)
    }
    if(validateData(polChargesData,"Freight").length<1 && polChargesData.length>0){
      updateSteps(initialStateRFQQuata[1].title)
    }
    if(validateData(podChargesData,"Freight").length<1 && podChargesData.length>0){
      updateSteps(initialStateRFQQuata[2].title)
    }
    if(shippingLine && 
        etd && 
        value["portCutOff"]["date"] && 
        value["portCutOff"]["time"] &&
        value["siCutOff"]["date"] &&
        value["siCutOff"]["time"]
    ){
      updateSteps(initialStateRFQQuata[3].title)
    }
    let cp = 0;
    if(!polFreeTimeStatus && polFreeTimeDeclineValue) cp++
    if(!podFreeTimeStatus && podFreeTimeDeclineValue) cp++
    if(polFreeTimeStatus) cp++
    if(podFreeTimeStatus) cp++
    if(cp === 2) updateSteps(initialStateRFQQuata[4].title)

    if(quotationValidityDate){
      updateSteps(initialStateRFQQuata[5].title)
    }
    if(!paymentTermsStatus && paymentTermsDeclineValue){
      updateSteps(initialStateRFQQuata[6].title)
    }
    if(paymentTermsStatus){
      updateSteps(initialStateRFQQuata[6].title)
    }
    if(termsCondition){
      updateSteps(initialStateRFQQuata[7].title)
    }

  },[
    freightData,
    polChargesData,
    podChargesData,
    shippingLine,
    etd,
    siCutOff,
    polFreeTimeStatus,
    polFreeTimeDeclineValue,
    podFreeTimeStatus,
    podFreeTimeDeclineValue,
    quotationValidityDate,
    paymentTermsStatus,
    paymentTermsDeclineValue,
    termsCondition
  ])

  const handleTransshipmentPortChange = (value:any, index:any) => {
    const updatedPorts:any = [...transshipmentPorts];
    updatedPorts[index] = value;
    setTransshipmentPorts(updatedPorts);
  };

  const handleAddRow = (section:any) => {
    switch (section) {
      case 'oceanFreight':
        setFreightData([...freightData, {key:generateRandomNumber(4),  costHead :null,unit:null,quantity:"",currency:"USD",rate:"",amount:0}]);
        break;
      case 'polCharges':
        setPolChargesData([...polChargesData, {key:generateRandomNumber(4),costCategory:null,  costHead :null,unit:"",quantity:"",currency:"",rate:"",amount:0}]);
        break;
      case 'podCharges':
        setPodChargesData([...podChargesData, {key:generateRandomNumber(4),costCategory:null,  costHead :null,unit:"",quantity:"",currency:"",rate:"",amount:0}]);
        break;
      default:
        break;
    }
  };

  const calculateTotalLandedCost = () => {
    // Implement logic to calculate total landed cost based on all data
    return 350000; // Example: Placeholder value
  };

  useEffect(() => {
    if(rfq?.loadingPortObj?.currency){
      setCurrencyCode(rfq?.loadingPortObj?.currency)
      form.setFieldValue("podCurrencyCode",rfq?.dischargePortObj?.currency)
      form.setFieldValue("polCurrencyCode",rfq?.loadingPortObj?.currency)
    }
    else{
      getCurrecyByContryName(rfq?.placeOfLoading?.country)
      .then(r=>{
        setCurrencyCode(Object.keys(r.data)[0])      
        form.setFieldValue("polCurrencyCode",Object.keys(r.data)[0])
        setLoadingCountryCurrency(Object.keys(r.data)[0])
      })
      .catch(r=>{});
      if(rfq?.modeOfShipment === strings.crossBorderTrucking){
        getCurrecyByContryName(rfq?.placeOfUnLoading?.country)
        .then(r=>{
          setUnLoadingCountryCurrency(Object.keys(r.data)[0])
          console.log(Object.keys(r.data));
          console.log(Object.keys(r.data)[0]);          
          form.setFieldValue("podCurrencyCode",Object.keys(r.data)[0])
        })
        .catch(r=>{})        
      }
    }
    form.setFieldsValue({...defaultValues,rfq:rfq?._id})
  }, [])

  useEffect(() => {
    if(exchangeRates){
      form.setFieldValue("exchangeRate", exchangeRates?.data[currencyCode])
    }
    return () => {}
  }, [currencyCode,exchangeRates])
  
  
  const formFinish = (value:any) => {
    let dts = {...value}
    dts.etd = value["etd"].format("YYYY-MM-DD")
    dts.quotationValidityDate = value["quotationValidityDate"].format("YYYY-MM-DD")
    dts.portCutOff ={date: value["portCutOff"]["date"].format("YYYY-MM-DD"),time: value["portCutOff"]["time"].format("HH:mm")}
    if(rfq?.modeOfShipment !== strings.air ){
      dts.siCutOff ={date: value["siCutOff"]["date"].format("YYYY-MM-DD"),time: value["siCutOff"]["time"].format("HH:mm")}
    }
    dts.shippingLine = Array.isArray(value["shippingLine"]) ? value["shippingLine"][0] : value["shippingLine"]
    dts.transShipmentPorts = transshipmentPorts
    if(freightData.length < 1){
      message.error("Please add at least one freight row")
      return
    }

    let freightError = validateData(freightData,"Freight")
    let polError = validateData(polChargesData,"POL")
    let podError = validateData(podChargesData,"POD")
    console.log(polError,podError);
    
    let errors = [...freightError,...podError,...polError]
    if(errors.length>0){
      errors.forEach(i=>message.error(i))
      return
    }
    dts.freightData = (freightData?freightData:[]).map((i:any)=>({...i,costHead:[i.costHead]?.[0]}))
    dts.polChargesData = (polChargesData?polChargesData:[]).map((i:any)=>({...i,costHead:i.costHead?.[0],costCategory:[i.costCategory]?.[0]}))
    dts.podChargesData = (podChargesData?podChargesData:[]).map((i:any)=>({...i,costHead:i.costHead?.[0],costCategory:[i.costCategory]?.[0]}))
    if(dts.airline){
      if(dts.airline.length>0 && Array.isArray(dts.airline)){
        dts.airline = dts.airline[0]
      }
    }
    
    setLoading(true)
    postQuotation(dts)
    .then((r:any)=>{
      console.log(r);      
      if(r.code){
        setSuccessModal(true)
      }
    })
    .catch((r:any)=>{
      console.log(r.data);
      
    }).finally(()=>{
      setLoading(false)
    });
  }
  
  return (
    <Form form={form} layout="vertical" onFinish={formFinish}>
        <Row gutter={[16,16]}>
          <Col span={24}>
          <Space  >
            <Form.Item className='mb-1' name={"rfq"}>
              <Input value={id} disabled className='border rounded-pill p-1 fs-6' />
            </Form.Item>
            <Form.Item className='mb-1'>
              <Input value={rfq?.modeOfShipment} disabled className='border rounded-pill p-1  text-center' />
            </Form.Item>
            <Form.Item className='mb-1'>
              <Input value={rfq?.tradeType} disabled className='border rounded-pill p-1  text-center' />
            </Form.Item>
            <Form.Item className='mb-1'>
              <Input value={rfq?.incoterm} disabled className='border rounded-pill p-1  text-center' />
            </Form.Item>
            <Form.Item noStyle name={"polCurrencyCode"}/>
            <Form.Item noStyle name={"podCurrencyCode"}/>
          </Space>
          </Col>
          {
            rfq?.loadingPort&&
          <Col span={12}>
            <Form.Item label="Port of Loading" layout="vertical">
              <PortUI i={rfq?.loadingPortObj} />
            </Form.Item>
          </Col>
          }
          {
            rfq?.dischargePort&&
          <Col span={12}>
            <Form.Item label="Port of UnLoading" layout="vertical">
                <PortUI i={rfq?.dischargePortObj} />
            </Form.Item>
          </Col>
          }
          {
            (rfq?.placeOfLoading && !rfq?.loadingPort)&&
          <Col span={12}>
            <Form.Item label="Place of Loading" layout="vertical">
              <Input className='rounded-2' value={`${rfq?.placeOfLoading?.address}, ${rfq?.placeOfLoading?.city}, ${rfq?.placeOfLoading?.state}, ${rfq?.placeOfLoading?.country}`} />
            </Form.Item>
          </Col>
          }
          {
            (rfq?.placeOfUnLoading && !rfq?.dischargePort)&&
          <Col span={12}>
            <Form.Item label="Place of UnLoading" layout="vertical">
              <Input className='rounded-2' value={`${rfq?.placeOfUnLoading?.address}, ${rfq?.placeOfUnLoading?.city?rfq?.placeOfUnLoading?.city:""}, ${rfq?.placeOfUnLoading?.state}, ${rfq?.placeOfUnLoading?.country}`} />
            </Form.Item>
          </Col>
          }
            <Col span={24}>
              <Space>
                <Form.Item name={"exchangeRate"} label="Exchange Rates" className='my-2' layout="horizontal">
                  <Input readOnly addonBefore={"USD/"+currencyCode} />
                </Form.Item>
              </Space>
            </Col>
            <Col span={24}>
                <Card rootClassName=''>
                    <div className='d-flex flex-column gap-3'>
                        <Card title={
                          <Space>
                            {freightTitle(rfq?.modeOfShipment)}
                              {(rfq?.container?rfq?.container:[]).length>0?
                              rfq?.container.map((i:any)=>(<Button type="primary" key={`${i?.name}*${i?.quantity}`} className="rounded-pill">{i?.name}*{i?.quantity}</Button>))
                              :null
}
                            </Space> } styles={{header:{ borderBottom: 0 }}}
                          extra={
                            null
                          }
                          >
                            <CustomTable dataSource={freightData}
                              columns={[
                                {
                                  key: 'sort',
                                  align: 'center',
                                  width: 30,
                                  render: (_:any,record:any,index:number) =>(
                                    <Space size="small">
                                      <DragHandle />
                                      <Button className="p-0" type="link" disabled={freightData[index]?.costHead?.length===0} onClick={()=>setFreightData(deleteAtIndex(freightData,index))}>
                                        <DeleteOutlined />
                                      </Button>
                                    </Space>
                                      ),
                                },
                                {
                                  title: "Cost heads",
                                  dataIndex: "costHead",
                                  key: "costHead",
                                  width:250,
                                  className:"text-wrap",
                                  render:(_:any,record:any,index:number)=>(
                                      <Select 
                                      style={{maxWidth:"250px"}}
                                      onFocus={()=>setfreightActive(record.key)}                                      
                                      onBlur={()=>setfreightActive(-1)}
                                      mode={freightActive===record.key?"tags":undefined}
                                      onChange={(value, options) => {                                        
                                        handleInputChange(index,"costHead",value[value.length-1])
                                      }}
                                      value={freightData[index]?.costHead}
                                      className='w-100 text-wrap' variant="borderless" 
                                      options={freightCostHead(rfq?.modeOfShipment)}
                                      maxCount={1}
                                      dropdownStyle={{width:"320px",fontSize:9}}
                                      placeholder="" />
                                  )
                                },
                                {
                                  title: "Units",
                                  key: "units",
                                  children: [
                                    {
                                      title: "",
                                      dataIndex: "unit",
                                      key: "ch1",
                                      width:100,
                                      render:(_:any,record:any,index:number)=>(
                                          <Select className='w-100 text-wrap' value={freightData[index].unit} variant="borderless" options={
                                            unitsOption(rfq?.modeOfShipment)
                                          } placeholder="" onChange={e=>updateQuantity(e,index)}/>
                                        )
                                    },
                                    {
                                      title: "",
                                      dataIndex: "quantity",
                                      key: "ch2",
                                      width:50,
                                      render:(_:any,record:any,index:number)=>(
                                          <Input className='p-0 m-0 text-center' variant="borderless" value={freightData[index].quantity} onChange={(e:any)=>handleInputChange(
                                            index,
                                            "quantity",
                                            e.target.value
                                          )} />
                                        )
                                    },
                                  ],
                                },
                                {
                                  title: "Currency",
                                  dataIndex: "currency",
                                  key: "currency",
                                  className:"text-center",
                                  render:()=>("USD")
                                },
                                {
                                  title: "Rate",
                                  dataIndex: "rate",
                                  key: "rate",
                                  width:75,
                                  render:((_:any,record:any,index:number)=>(
                                    <Input placeholder="Rate" disabled={!freightData[index].unit} variant="outlined" className="p-1 text-center" value={freightData[index].rate} onChange={e=>handleInputChange(index,"rate",e.target.value)}/>
                                  ))
                                },
                                {
                                  title: "Amount",
                                  dataIndex: "amount",
                                  key: "amount",   
                                  className:"text-center",
                                },
                              ]}
                              setDataSource={setFreightData}
                            >
                                
                            </CustomTable>
                            <Button className='my-2' shape="round" icon={<PlusCircleFilled className="text-primary1 fs-5" />} onClick={() => handleAddRow('oceanFreight')}>Add New Row</Button>
                            <Col sm={22} md={12}>
                              <Form.Item  label={"Total Landed Cost"} layout="horizontal">
                                <Space>
                                  <Form.Item name={"inclusiveFrightDollar"} noStyle>
                                    <Input disabled className="rounded-pill bg-shade text-primary1" variant="borderless" style={{width:"150px"}} addonBefore={"USD"} />
                                  </Form.Item>
                                  <Form.Item name={"inclusiveFrightLocal"} noStyle>
                                    <Input disabled className="rounded-pill bg-shade text-primary1" variant="borderless" style={{width:"150px"}} addonBefore={currencyCode} />
                                  </Form.Item>
                                </Space>
                              </Form.Item>
                            </Col>
                        </Card>
                        { (rfq?.incoterm !== strings.FOB)&&
                        <Card title="Port of Loading [POL] Charges" styles={{ header: { borderBottom: 0 } }}>
                            <CustomTable dataSource={polChargesData}
                              columns={[
                                {
                                  key: 'sort',
                                  align: 'center',
                                  width: 30,
                                  render: (_:any,record:any,index:number) =>(
                                    <Space size="small">
                                      <DragHandle />
                                      <Button className="p-0" type="link" disabled={polChargesData[index]?.costHead?.length===0} onClick={()=>setPolChargesData(deleteAtIndex(polChargesData,index))}>
                                        <DeleteOutlined />
                                      </Button>
                                    </Space>
                                      ),
                                },
                                {
                                  title: "Cost Category",
                                  dataIndex: "costCategory",
                                  key: "costCategory",
                                  width:150,
                                  className:"text-wrap",
                                  render:(_:any,record:any,index:number)=>(
                                      <Select className='w-100' value={polChargesData[index]?.costCategory} variant="borderless" options={polOptions(rfq?.modeOfShipment)} placeholder="" onChange={e=>handleInputChange(index,"costCategory",e,1)}/>)
                                },
                                {
                                  title: "Cost heads",
                                  dataIndex: "costHead",
                                  key: "costHead",
                                  width:"230px",
                                  className:"text-wrap p-1",
                                  render:(_:any,record:any,index:number)=>(
                                      <Select
                                      onFocus={()=>setpolActive(record.key)}                                      
                                      onBlur={()=>setpolActive(-1)}
                                      mode={polActive===record.key?"tags":undefined}
                                      maxCount={1}
                                      style={{maxWidth:"205px"}}
                                      className='w-100' variant="borderless" options={polChargeOptions(polChargesData[index]?.costCategory)} placeholder=""
                                      value={polChargesData[index]?.costHead}
                                      onChange={(value, options) => {                                                 
                                        handleInputChange(index,"costHead",value,1)
                                      }}
                                      dropdownStyle={{width:"300px",fontSize:9}}
                                      maxTagTextLength={12}
                                      />
                                  )
                                },
                                {
                                  title: "Receipt",
                                  dataIndex: "receipted",
                                  key: "costHead",
                                  width:30,
                                  className:"text-wrap",
                                  render:(_:any,record:any,index:number)=>(
                                    <div className="w-100 d-flex justify-content-center">
                                      <Checkbox                                      
                                      className=''
                                      value={polChargesData[index]?.receipted}
                                      onChange={(value) => {      
                                        handleInputChange(index,"receipted",value,1)
                                      }}/>
                                    </div>
                                  )
                                },
                                {
                                  title: "Units",
                                  dataIndex: "units",
                                  key: "units",
                                  children: [
                                    {
                                      title: "",
                                      dataIndex: "costHeads",
                                      key: "ch1",
                                      width:100,
                                      render:(_:any,record:any,index:number)=>(
                                          <Select className='w-100 text-wrap' value={polChargesData[index]?.unit} variant="borderless" 
                                          style={{maxWidth:"70px"}}
                                          options={
                                            unitsOption(rfq?.modeOfShipment)
                                          } placeholder=""
                                          dropdownStyle={{width:"240px"}}
                                          onChange={e=>updateQuantity(e,index,1)}/>
                                        )
                                    },
                                    {
                                      title: "",
                                      dataIndex: "costHeads",
                                      key: "quantity",
                                      width:60,
                                      className: "text-center",
                                      render:(_:any,record:any,index:number)=>(
                                          <Input className='p-0 m-0 text-center' variant="borderless" value={polChargesData[index]?.quantity} onChange={(e:any)=>handleInputChange(
                                            index,
                                            "quantity",
                                            e.target.value,
                                            1
                                          )} />
                                        )
                                    },
                                  ],
                                },
                                {
                                  title: "Currency",
                                  dataIndex: "currency",
                                  key: "currency",
                                  className:"p-0",
                                  render:(_:any,record:any,index:number)=>(
                                    <Select rootClassName="p-0 m-0" placeholder="Select" dropdownStyle={{ width: "102px" }} options={getCurrencyOPtion(rfq?.loadingPortObj?.currency,LoadingCountryCurrency).map((i:any)=>({label:i,value:i}))}
                                      disabled={!polChargesData[index].unit}
                                      onChange={e => {
                                        handleInputChange(index,"currency",e,1)
                                      }}
                                    />)
                                },
                                {
                                  title: "Rate",
                                  dataIndex: "rate",
                                  key: "rate",
                                  render:((_:any,record:any,index:number)=>(
                                    <Input disabled={!polChargesData[index].unit} placeholder="Rate" variant="outlined" className="p-1" value={polChargesData[index].rate} onChange={e=>handleInputChange(index,"rate",e.target.value,1)}/>
                                  ))
                                },
                                {
                                  title: "Amount",
                                  dataIndex: "amount",
                                  key: "amount",   
                              
                                },
                              ]}
                              setDataSource={setPolChargesData}
                            />
                                
                            <Button className='my-2' shape="round" icon={<PlusCircleFilled className="text-primary1 fs-5" />}  onClick={() => handleAddRow('polCharges')}>Add New Row</Button>
                            <div className="col-12 col-md-8 col-lg-6">
                              <Form.Item name={"polRemark"}>
                                <Input placeholder='Enter Remarks & T&C (If any)' />
                              </Form.Item>
                            </div>
                            <Col sm={22} md={12}>
                            <Form.Item label={"Port of Loading [POL] charges"} layout="horizontal">
                                <Space>
                                  <Form.Item name={"polChargeLocal"} noStyle>
                                    <Input disabled className="rounded-pill bg-shade text-primary1" variant="borderless" style={{width:"150px"}} addonBefore={currencyCode} />
                                  </Form.Item>
                                </Space>
                              </Form.Item>
                            </Col>
                        </Card>
                        }
                        {!((rfq?.incoterm?rfq?.incoterm:"").toLowerCase().includes("c"))&&
                        <Card title="Port of Discharge [POD] Charges" styles={{ header: { borderBottom: 0 } }}>
                            <CustomTable dataSource={podChargesData}
                              columns={[
                                {
                                  key: 'sort',
                                  align: 'center',
                                  width: 30,
                                  render: (_:any,record:any,index:number) =>(
                                    <Space size="small">
                                      <DragHandle />
                                      <Button className="p-0" type="link" disabled={podChargesData[index]?.costHead?.length===0} onClick={()=>setPodChargesData(deleteAtIndex(podChargesData,index))}>
                                        <DeleteOutlined />
                                      </Button>
                                    </Space>
                                      ),
                                },
                                {
                                  title: "Cost Category",
                                  dataIndex: "costCategory",
                                  key: "costCategory",
                                  width:150,
                                  className:"text-wrap",
                                  render:(_:any,record:any,index:number)=>(
                                      <Select className='w-100' value={podChargesData[index]?.costCategory} variant="borderless" options={polOptions(rfq?.modeOfShipment)} placeholder="" onChange={e=>handleInputChange(index,"costCategory",e,2)}/>)
                                },
                                {
                                  title: "Cost heads",
                                  dataIndex: "costHead",
                                  key: "costHead",
                                  width:"230px",
                                  className:"text-wrap",
                                  render:(_:any,record:any,index:number)=>(
                                      <Select
                                      onFocus={()=>setpolActive(record.key)}                                      
                                      onBlur={()=>setpolActive(-1)}
                                      mode={polActive===record.key?"tags":undefined}
                                      maxCount={1}
                                      style={{maxWidth:"205px"}}
                                      className='w-100' variant="borderless" options={polChargeOptions(podChargesData[index]?.costCategory)} placeholder=""
                                      value={podChargesData[index]?.costHead}
                                      onChange={(value, options) => {                                                 
                                        handleInputChange(index,"costHead",value,2)
                                      }}
                                      dropdownStyle={{width:"300px",fontSize:9}}
                                      maxTagTextLength={12}
                                      />
                                  )
                                },
                                {
                                  title: "Receipted",
                                  dataIndex: "receipted",
                                  key: "costHead",
                                  width:50,
                                  className:"text-wrap",
                                  render:(_:any,record:any,index:number)=>(
                                    <div className="w-100 d-flex justify-content-center">
                                      <Checkbox                                      
                                      className=''
                                      checked={podChargesData[index]?.receipted}
                                      onChange={(value) => {      
                                        handleInputChange(index,"receipted",value,2)
                                      }}/>
                                    </div>
                                  )
                                },
                                {
                                  title: "Units",
                                  dataIndex: "units",
                                  key: "units",
                                  children: [
                                    {
                                      title: "",
                                      dataIndex: "costHeads",
                                      key: "ch1",
                                      width:100,
                                      render:(_:any,record:any,index:number)=>(
                                          <Select className='w-100 text-wrap' value={podChargesData[index]?.unit} variant="borderless"
                                          style={{maxWidth:"70px"}}
                                          options={
                                            unitsOption(rfq?.modeOfShipment)
                                          } placeholder=""
                                          dropdownStyle={{width:"240px"}}
                                          onChange={e=>updateQuantity(e,index,2)}/>
                                        )
                                    },
                                    {
                                      title: "",
                                      dataIndex: "costHeads",
                                      key: "ch2",
                                      width:40,
                                      render:(_:any,record:any,index:number)=>(
                                          <Input className='p-0 m-0' variant="borderless" value={podChargesData[index]?.quantity} onChange={(e:any)=>handleInputChange(
                                            index,
                                            "quantity",
                                            e.target.value,
                                            2
                                          )} />
                                        )
                                    },
                                  ],
                                },
                                {
                                  title: "Currency",
                                  dataIndex: "currency",
                                  key: "currency",
                                  render:(_:any,record:any,index:number)=>(
                                    <Select placeholder="Select" dropdownStyle={{ width: "102px" }} options={getCurrencyOPtion(rfq?.dischargePortObj?.currency,UnLoadingCountryCurrency).map((i:any)=>({label:i,value:i}))}
                                    disabled={!podChargesData[index].unit}
                                    onChange={e => {
                                        handleInputChange(index,"currency",e,2)
                                      }}
                                    />
                                  )
                                },
                                {
                                  title: "Rate",
                                  dataIndex: "rate",
                                  key: "rate",
                                  render:((_:any,record:any,index:number)=>(
                                    <Input disabled={!podChargesData[index].unit} placeholder="Rate" variant="outlined" className="p-1" value={podChargesData[index].rate} onChange={e=>handleInputChange(index,"rate",e.target.value,2)}/>
                                  ))
                                },
                                {
                                  title: "Amount",
                                  dataIndex: "amount",
                                  key: "amount",   
                              
                                },
                              ]}
                              setDataSource={setPodChargesData}
                            />
                            
                            <Button className='my-2' shape="round" icon={<PlusCircleFilled className="text-primary1 fs-5" />}  onClick={() => handleAddRow('podCharges')}>Add New Row</Button>
                            <div className="col-12 col-md-8 col-lg-6">
                              <Form.Item rules={[{required:true}]} name={"podRemark"}>
                                <Input placeholder='Enter Remarks & T&C (If any)' />
                              </Form.Item>
                            </div>
                            <Col sm={22} md={12}>
                            <Form.Item label={"Port of unLoading [POD] charges"} layout="horizontal">
                                <Space>
                                  <Form.Item name={"podChargeDollar"} noStyle>
                                    <Input disabled className="rounded-pill bg-shade text-primary1" variant="borderless" style={{width:"150px"}} addonBefore={"USD"} />
                                  </Form.Item>
                                  <Form.Item name={"podChargeLocal"} noStyle>
                                    <Input disabled className="rounded-pill bg-shade text-primary1" variant="borderless" style={{width:"150px"}} addonBefore={UnLoadingCountryCurrency} />
                                  </Form.Item>
                                </Space>
                              </Form.Item>
                            </Col>
                        </Card>
                        }
                        <div className="col-12 col-md-8 col-lg-6">
                          <Form.Item name={"totallandedCost"} label={"Total Landed Cost"} className='d-inline' layout="horizontal">
                              <Input disabled value={calculateTotalLandedCost()} addonBefore={currencyCode} className='d-inline' />
                          </Form.Item>
                        </div>
                    </div>
                </Card>
            </Col>
            {rfq?.modeOfShipment !== strings.crossBorderTrucking &&
            <Col span={24}>
                <Card title="Shipping Line Details" styles={{ header: { borderBottom: 0 } }}>
                    <Row gutter={[16,16]}>
                          <Col sm={24} md={12}>
                        {rfq?.modeOfShipment === strings.air?

                          <Form.Item rules={[{required:true}]} name={"airline"} label={`Airline`} layout="horizontal">
                                <Select mode={"tags"} maxCount={1}  options={airlinesOptions.map((o:any)=>({...o,value:o?.label}))} onChange={(val,option:any)=>{
                                  form.setFieldValue("scac", option[0]?.extra)
                                }}/>
                            </Form.Item>
                        :
                        <>
                          <Form.Item rules={[{required:true}]} name={"shippingLine"} label={`Shipping Line`} layout="horizontal">
                                <Select mode={"tags"} maxCount={1} value={shippingLine}  options={shippingLinesOptiopns.map((o:any)=>({...o,label:`${o?.value} - ${o?.label}`}))} onChange={(val,option:any)=>{
                                  form.setFieldValue("scac", option[0]?.extra)
                                }}/>
                            </Form.Item>
                            <Form.Item name={"scac"} noStyle/>
                        </>
                          }
                        </Col>
                        <Col sm={24} md={12}>
                            <Form.Item name={"noOfTransShipmentPorts"} label={`Transshipment ${rfq?.modeOfShipment === strings.air?"Airports":"Ports"}`} layout="horizontal">
                                <Input placeholder={noOfTransShipmentPorts}
                                  className='text-center'
                                    addonBefore={<MinusOutlined onClick={e=>form.setFieldValue("noOfTransShipmentPorts",noOfTransShipmentPorts>0?noOfTransShipmentPorts-1:0)} />} 
                                    addonAfter={<PlusOutlined onClick={e=>form.setFieldValue("noOfTransShipmentPorts",noOfTransShipmentPorts<15?noOfTransShipmentPorts+1:15)} />}
                                    />
                            </Form.Item>
                        </Col>
                        <Col span={24} className='border rounded-2 border-primary2 p-2'>
                            <div className="d-flex justify-content-between">
                            <h5 className='text-primary2'>Transshipment {rfq?.modeOfShipment === strings.air?"Airports":"Ports"}</h5>
                            <Form.Item name={"transitTime"} label={`Transit time`} layout="horizontal">
                                <Input placeholder={noOfTransShipmentPorts}
                                  className='text-center'
                                    addonBefore={<MinusOutlined onClick={e=>form.setFieldValue("transitTime",transitTime>0?transitTime-1:0)} />} 
                                    addonAfter={<PlusOutlined onClick={e=>form.setFieldValue("transitTime",transitTime?transitTime+1:1)} />}
                                    />
                            </Form.Item>
                            </div>
                            <Space style={{minWidth:"400px"}}>
                              <Timeline
                                style={{ padding: 10, margin: 10 }}
                                mode="left"
                                rootClassName=''
                                items={
                                  [ 
                                    ...[{ label: `Port of Loading`, children: rfq?.loadingPortObj?<PortUI {...{style:{minWidth:"300px",maxWidth:"370px"}}} i={rfq?.loadingPortObj} /> :
                                      <Input.TextArea style={{minWidth:"300px",maxWidth:"370px"}} className='rounded-2' value={`${rfq?.placeOfLoading?.address}, ${rfq?.placeOfLoading?.city}, ${rfq?.placeOfLoading?.state}, ${rfq?.placeOfLoading?.country}`} />
                                    }],
                                    ...Array.from({length:noOfTransShipmentPorts}).map((port, index) => ({ 
                                      label: `T/S Port ${index + 1}`, 
                                      children: (
                                        <Form.Item name={["transShipmentPorts", index]} layout="horizontal">
                                          <LocodeSelect
                                            {...{style:{minWidth:"300px",maxWidth:"370px"}}}
                                            change={() => { }}
                                            wholeValue={(value: any) => handleTransshipmentPortChange(value.title, index)}
                                          />
                                        </Form.Item>
                                      ) 
                                    })),
                                    ...[{ label: `Port of Discharge`, children:rfq?.dischargePortObj? <PortUI {...{style:{minWidth:"300px",maxWidth:"370px"}}} i={rfq?.dischargePortObj} /> 
                                    :
                                    <Input.TextArea style={{minWidth:"300px",maxWidth:"370px"}} className='rounded-2' value={`${rfq?.placeOfUnLoading?.address}, ${rfq?.placeOfUnLoading?.city}, ${rfq?.placeOfUnLoading?.state}, ${rfq?.placeOfUnLoading?.country}`} />
                                    }],
                                  ]
                                }
                              />
                            </Space>
                        </Col>
                        <Col span={24}>
                            <Form.Item rules={[{required:true}]} name={"etd"} label={`ETD`} layout="horizontal">
                                <DatePicker  />
                            </Form.Item>
                        </Col>
                        {
                          rfq?.modeOfShipment !== strings.air &&
                          <Col span={24}>
                              <Form.Item label={`SI Cut off Date & Time`} layout="horizontal">
                                  <Space>
                                  <Form.Item rules={[{required:true}]} name={["siCutOff","date"]} >
                                    <DatePicker/>
                                  </Form.Item>
                                  <Form.Item rules={[{required:true}]} name={["siCutOff","time"]} >
                                    <TimePicker/>
                                  </Form.Item>
                                  </Space>
                              </Form.Item>
                          </Col>
                        }
                        <Col span={24}>
                            <Form.Item label={`Port Cut off Date & Time`} layout="horizontal">
                              <Space>
                                <Form.Item rules={[{required:true}]} name={["portCutOff", "date"]} >
                                  <DatePicker />
                                </Form.Item>
                                <Form.Item rules={[{required:true}]} name={["portCutOff", "time"]} >
                                  <TimePicker />
                                </Form.Item>
                              </Space>
                            </Form.Item>
                        </Col>
                    </Row>
                </Card>
            </Col>
            }
            <Col span={24}>
                  <Card styles={{body:{paddingBottom:9}}}>
                    <ConfigProvider theme={{components:{Input:{colorFillAlter:"#6A37F4",colorFill:"#FFFFF"}}}}>
                      <Row gutter={[8, 16]}>
                          <Col span={16}>
                              <Form.Item name={"polFreeTimeStatus"} label={`POL Free Time`} layout="horizontal">
                                <Radio.Group>                                    
                                    <Radio value={true}>Accept RFQ Terms [{rfq?.freeTimeLP} Days]</Radio>
                                    <Radio value={false}>Change Free Time</Radio>
                                </Radio.Group>
                              </Form.Item>
                          </Col>
                          { !polFreeTimeStatus &&
                            <Col span={7}>
                                <Form.Item name={"polFreeTimeDeclineValue"}  layout="horizontal">
                                  <Input className="text-center"
                                      
                                      addonBefore={<MinusOutlined className="text-light" onClick={e=>form.setFieldValue("polFreeTimeDeclineValue",polFreeTimeDeclineValue>0?polFreeTimeDeclineValue-1:0)} />}
                                    addonAfter={<PlusOutlined className="text-light" onClick={e=>form.setFieldValue("polFreeTimeDeclineValue",polFreeTimeDeclineValue<150?polFreeTimeDeclineValue+1:14)} />}
                                  defaultValue={10} type="number"/>
                                </Form.Item>
                            </Col>
                          }
                          <Col span={16}>
                              <Form.Item name={"podFreeTimeStatus"} label={`POD Free Time`} layout="horizontal">
                                <Radio.Group>                                    
                                <Radio value={true}>Accept RFQ Terms [{rfq?.freeTimeDP} Days]</Radio>
                                <Radio value={false}>Change Free Time</Radio>
                                </Radio.Group>
                              </Form.Item>
                          </Col>
                          { !podFreeTimeStatus &&
                            <Col span={7}>
                                  
                                <Form.Item name={"podFreeTimeDeclineValue"}  layout="horizontal">
                                  <Input className="text-center"
                                    addonBefore={<MinusOutlined className="text-light" onClick={e=>form.setFieldValue("podFreeTimeDeclineValue",podFreeTimeDeclineValue>0?podFreeTimeDeclineValue-1:0)} />} 
                                    addonAfter={<PlusOutlined className="text-light" onClick={e=>form.setFieldValue("podFreeTimeDeclineValue",podFreeTimeDeclineValue<150?podFreeTimeDeclineValue+1:14)} />}
                                    defaultValue={10} type="number"/>
                                  </Form.Item>
                            </Col>
                          }
                      </Row>
                      </ConfigProvider>
                  </Card>
            </Col>
            <Col span={24}>
                <Card styles={{body:{paddingBottom:9}}}>
                    <Form.Item rules={[{required:true}]} name={"quotationValidityDate"} label={"Quotation Validity Date"}>
                        <DatePicker />
                    </Form.Item>
                </Card>
            </Col>
            <Col span={24}>
                <Card styles={{body:{paddingBottom:9}}}>
                    <Form.Item rules={[{required:true}]} name={"paymentTermsStatus"} label={`Payments Term`} layout="horizontal">
                        <Radio.Group>
                          <Radio value={true}>Accept RFQ Terms [{getPaymentCode(rfq?.paymentTerms)}]</Radio>
                          <Radio value={false}>Change Payment Terms</Radio>
                        </Radio.Group>
                    </Form.Item>
                    
                    {!paymentTermsStatus&&
                    <Form.Item name={"paymentTermsDeclineValue"} label={`Payments Term`}>
                      <Select placeholder="Select payment terms" options={paymentTermOptions.map(i=>({key:i.title,label:`${i.title} - ${i.days}`,value:`${i.title} - ${i.days}`}))} />
                    </Form.Item>
                    }
                    {
                      (paymentTermsDeclineValue?paymentTermsDeclineValue:"").includes(strings.others)&&
                      <Form.Item name={"otherPaymentTerms"} rules={[{required:true}]} label="Other Payment Terms" layout="vertical">
                        <Input placeholder="Payment Terms" />
                      </Form.Item>
                    }
                </Card>
            </Col>
            <Col span={24}>
                <Card title="Terms & Conditions" styles={{ header: { borderBottom: 0 } }}>
                    <Form.Item rules={[{required:true}]} name={"termsCondition"}>
                        <Input placeholder='Enter Here' className='rounded-2'/>
                    </Form.Item>
                </Card>
            </Col>
            <Col span={24}>
                <Card title="Point of Contact" styles={{ header: { borderBottom: 0 }, }}>
                <Form.List name={"pointOfContact"}>
                    {(fields, { add, remove }) => (
                      <>
                        {
                          fields.map(( field, iIndex ) => (
                            <div className='d-flex gap-2 my-3' key={iIndex+"poc"}>
                              <Form.Item label="Name" name={[field.name,"name"]} layout="vertical" rules={[{ required: true}]}>
                                <Input placeholder='Name' className='rounded-2' />
                              </Form.Item>
                              <Form.Item label="Mobile No." rules={[{required:true},{min:10,max:10,message: 'Please enter correct number'}]} name={[field.name,"mobile"]} layout="vertical">
                                <Input placeholder='Mobile' className='rounded-2' />
                              </Form.Item>
                              <Form.Item label="Email ID" rules={[{required:true},{type:"email",message: 'Please enter correct email'}]} name={[field.name,"email"]} layout="vertical">
                                <Input placeholder='Email' className='rounded-2' />
                              </Form.Item>
                              <Form.Item layout="vertical" label={" "}>
                                <Button shape="circle" size="small" onClick={()=>remove(iIndex)} danger className='fw-bold' >-</Button>
                              </Form.Item>
                            </div>
                          ))
                            
                        }
                        <br />
                      <Button onClick={()=>add({name:""})}  className="my-4 rounded-pill">
                        <PlusCircleFilled className="text-primary1 fs-5" /> Add POC
                      </Button>
                      </>
                    )
                    }                    
                  </Form.List>   
                </Card>
            </Col>               
            <Col span={24}>
                <div className="col-12 col-md-8 col-lg-6 mx-auto">
                  <Button  type="link" onClick={()=>setPreviewModalOpen(true)} size="large" block shape="round">Preview Offer <EyeFilled/></Button>
                </div>
                <div className="col-12 col-md-8 col-lg-6 mx-auto">
                  <Button loading={Loading} htmlType="submit" type="primary" size="large" block shape="round">Submit quotation</Button>
                </div>
            </Col>             
            <Modal open={previewModalOpen} onCancel={()=>setPreviewModalOpen(i=>!i)} width={1000} onClose={()=>setPreviewModalOpen(i=>!i)} footer={<Button onClick={()=>setPreviewModalOpen(i=>!i)}>Close</Button>}>
                <RFQCard rfqData={rfq} showSubmit />
            </Modal>
            <Modal open={SuccessModal} footer={null} closable={false}>
              <PostSuccessModal id={""} message="Quotation Submitted" />
            </Modal>
        </Row>
    </Form>
  );
};

export default AuthHOC(OceanFreightForm);
function generateRandomNumber(length:number):number {
  const chars = '0123456789';
  let randomString = '';
  for (let i = 0; i < length; i++) {
    randomString += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return +randomString;   

}

let getCurrencyOPtion = (currency:string,second:string) =>["USD", currency?currency:second]

function deleteAtIndex(arr:any, index:number) {
  // Check if the index is valid
  if (index < 0 || index >= arr.length) {
      return arr; // Return the original array if index is out of bounds
  }
  // Create a new array without the element at the specified index
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}