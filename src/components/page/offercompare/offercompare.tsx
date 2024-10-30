"use client"
import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Typography, Select, DatePicker, Button, Form, Space, Spin, Result } from 'antd';
import { PortUI } from '../rfq/search';
import { shippingLinesOptiopns, sortOptions } from '../rfq/options';
import { layParams3 } from '../rfq/post';
import LocodeSelect from '@/components/supportcomponents/customcomponents/locodeselect';
import useSWR from 'swr';
import { getQuotationByRfqId, getRfQById } from '@/network/endpoints';
import QuotationCard from '@/components/supportcomponents/offercompare/quotationCard';

const OfferCompare = ({id}:{id?:any}) => {
  const [form] = Form.useForm();
  const {data:d,isLoading,error} = useSWR(id,getQuotationByRfqId)
  const [rfq, setrfq] = useState<any>({})
  const [offers, setoffers] = useState([])
  
  const sortBy = Form.useWatch("sortBy",{form,preserve:true});
  const licenses = Form.useWatch("licenses",{form,preserve:true});
  const transhipmentPorts = Form.useWatch("transhipmentPorts",{form,preserve:true});
  const shippingLine = Form.useWatch("shippingLine",{form,preserve:true});


  const handleSortByChange = (value:any) => {
    form.setFieldValue("sortBy",value);
  };

  const handleFormSubmit = () => {
    // Handle form submission here
    form.validateFields()
      .then(values => {
        console.log('Form values:', values);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  useEffect(() => {
      let fa =async ()=>{
        let rfq = await getRfQById(id);
        if(rfq?.code){
         setrfq(rfq?.data)      
        }
      }
      fa()
      if(d?.data){
        setoffers(d?.data)
      }
  }, [d])
  useEffect(()=>{
    if(sortOptions[0] === sortBy){
        setoffers((o)=>{
            let a = [...o]
            a.sort((a:any,b:any)=> +a?.inclusiveFrightLocal - +b?.inclusiveFrightLocal)
            return a
        })
    }
    if(sortOptions[1] === sortBy){
        setoffers((o)=>{
            let a = [...o]
            a.sort((a:any,b:any)=> +a?.totallandedCost - +b?.totallandedCost)
            return a
        })
    }
    if(sortOptions[2] === sortBy){
        setoffers((o)=>{
            let a = [...o]
            a.sort((a:any,b:any)=> +a?.totallandedCost - +b?.totallandedCost)
            return a
        })
    }
    if(sortOptions[3] === sortBy){
        setoffers((o)=>{
            let a = [...o]
            a.sort((a:any,b:any)=> a?.noOfTransShipmentPorts -b?.noOfTransShipmentPorts)
            console.log(a.map((i:any)=>i?.noOfTransShipmentPorts));
            return a
        })
    }
    
  },[sortBy])
  
  useEffect(()=>{
    if(transhipmentPorts){
        setoffers((o)=>{
            let a = [...o]
            a.filter((qu:any)=> (qu?.transShipmentPorts?qu?.transShipmentPorts:[]).filter((port:any)=>JSON.stringify(port)===transhipmentPorts).length>0)
            console.log(transhipmentPorts);
            
            a.forEach((qu:any)=> {
                console.log((qu?.transShipmentPorts?qu?.transShipmentPorts:[]).map((port:any)=>port));                
            })
            
            
            return a
        })
    }
  },[transhipmentPorts])
  
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center p-5">
        <Spin />
      </div>
    )
  }
  if (!d?.code) {
    return (
      <div className="d-flex justify-content-center align-items-center p-5">
        <Result status={"error"} subTitle={id?error?.message:"Please Enter Correct ID"} />
      </div>
    )
  }
  
  return (
    <div className={`bg-shade min-vh-100`} >
        <Row justify={"center"} gutter={[8,8]} className='mx-0 py-1'>
            <Col sm={23} md={20} lg={18} xxl={18} className="px-5 my-2">
            <Form form={form} layout="vertical">
                    <Card>
                    <div className="col-12 col-md-10 col-lg-6 mx-auto">                        
                        <p className='text-primary2 fs-5 fw-bolder'>RFQ number : <span className="fw-light p-2 border rounded-pill">{id}</span> </p>
                    </div>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                              <div className="d-flex flex-column gap-2">
                                  <span className='fw-semibold fs-5'>Port of Landing</span>
                                  {rfq?.loadingPortObj?
                                  <PortUI i={rfq?.loadingPortObj?rfq?.loadingPortObj:""} />:
                                  <div className="p-1 border rounded-2">{`${rfq?.placeOfLoading?.address}, ${rfq?.placeOfLoading?.city}, ${rfq?.placeOfLoading?.state}, ${rfq?.placeOfLoading?.country}`}</div>
                                  }
                              </div>
                        </Col>
                        <Col span={12}>
                            <div className="d-flex flex-column gap-2">
                                <span className='fw-semibold fs-5'>Port of UnLanding</span>
                                {rfq?.loadingPortObj?
                                    <PortUI i={rfq?.dischargePortObj?rfq?.dischargePortObj:""} />:
                                  <div className="p-1 border rounded-2">{`${rfq?.placeOfUnLoading?.address}, ${rfq?.placeOfUnLoading?.city}, ${rfq?.placeOfUnLoading?.state}, ${rfq?.placeOfLoading?.country}`}</div>
                                  }
                            </div>
                        </Col>
                    
                        <Col span={24}>
                            <Form.Item rules={[{ required: true }]} label={"Sort By"} layout="vertical">
                                <Row gutter={[16, 16]}>
                                    {sortOptions.map((e: string) => (
                                        <Col sm={8} md={6} key={e}>
                                            <Button size="large" className="p-1" block shape="round" style={{ textWrap: "wrap", lineHeight: 1 }} type={sortBy === e ? "primary" : "default"} onClick={() => {
                                                form.setFieldValue("sortBy",e);
                                            }}>{e}</Button>
                                        </Col>
                                    ))}
                                </Row>
                            </Form.Item>
                        </Col>

                        <Col span={5}>
                            <Form.Item rules={[{ required: true }]} name={"shippingLine"} label={`Shipping Line`}>
                                <Select options={shippingLinesOptiopns} />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item rules={[{ required: true }]} label={`Transhipment Ports`}>
                                <LocodeSelect 
                                change={(e:any)=>{}}
                                wholeValue={(e:any)=>{form.setFieldValue("transhipmentPorts",JSON.stringify(e.title))}}
                                />
                            </Form.Item>
                            <Form.Item noStyle name={"transhipmentPorts"} />
                        </Col>
                        <Col span={6}>
                            <Form.Item rules={[{ required: true }]} name={"licenses"} label={`Licenses/Certifications`}>
                                <Select options={[]} />
                            </Form.Item>
                        </Col>
                        
                        <Col span={8}>
                            <Form.Item label="ETD">
                                <Space>
                                    <Form.Item rules={[{ required: true }]} name={"from"}  layout="horizontal">
                                        <DatePicker placeholder='From'/>
                                    </Form.Item>
                                    <Form.Item rules={[{ required: true }]} name={"to"}  layout="horizontal">
                                        <DatePicker placeholder='To'/>
                                    </Form.Item>

                                </Space>
                            </Form.Item>
                        </Col>
                    </Row>
                    </Card>
            </Form>

            </Col>
        </Row>
        <Row gutter={[8,8]} justify={"center"} className='p-5'>
            {(offers?offers:[]).map((i:any)=>(
                <Col sm={23} md={20} lg={18} xxl={18} key={i._id}>
                    <QuotationCard quotation={i}/>
                </Col>
            ))}
        </Row>
        <Row gutter={[8,8]} justify={"center"} className='p-5'>
                {(!isLoading && offers.length<1)&&
                <Col sm={23} md={20} lg={18} xxl={18} >
                    <Card>
                        <p>No Quotation Founds</p>
                    </Card>
                </Col>}
        </Row>

    </div>
  );
};

export default OfferCompare;