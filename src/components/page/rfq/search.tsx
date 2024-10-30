"use client"
import { Button, Card, Col, Collapse, ConfigProvider, Form, Input, Rate, Row, Select, Space, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { importIncotermOptions, incotermOptions, modeOfShipmentOptions, tradeTypeOptions } from './options';
import { strings } from '@/components/strings';
import { useWatch } from 'antd/es/form/Form';
import { layParams3 } from './post';
import { DownloadOutlined, DownOutlined, SearchOutlined } from '@ant-design/icons';
import LocodeSelect from '@/components/supportcomponents/customcomponents/locodeselect';
import { CountrySelect, CountrySelectV2, StateSelectV4 } from '@/components/supportcomponents/customcomponents/stateselect';
import { locodeFormatedString, validateMessages } from '@/components/utils';
import { getRfQ, locodeById } from '@/network/endpoints';
import useSWR from 'swr';
import dayjs from 'dayjs';
import Link from 'next/link';

function RfqSearchUI() {
  const [form] = Form.useForm()
  const [FormLoading, setFormLoading] = useState(false)

  const [SrcLocation, setSrcLocation] = useState("")
  const [DesLocation, setDesLocation] = useState("")
  const modeOfShipment = useWatch("modeOfShipment",form)
  const tradeType = useWatch("tradeType",form)
  const incoterm = useWatch("incoterm",{form,preserve:true})
  const freeTimeLP = useWatch("freeTimeLP",{form,preserve:true})

  const [RfqList, setRfqList] = useState([])
  const handleSubmit = (values:any) => {
    setFormLoading(true)
    getRfQ(values)
    .then(r=>{
      if(r.code){
        setRfqList(r.data)
      }
      
    })
    .catch(r=>{
      console.log(r);
      
    })
    .finally(() => {
      setFormLoading(false);
    })
  };
  return (
    <div className={`bg-shade min-vh-100`} >
      <Row justify={"center"} gutter={[8,8]} className='mx-0 py-5'>
        <Col sm={23} md={20} lg={18} xxl={15} className="px-5 my-2">
          <Input placeholder="Search Input" variant="filled" size="large" prefix={<SearchOutlined />} />
        </Col>
        <Col sm={23} md={20} lg={18} xxl={15}>
          <Card className="border-primary2">
            <h4 className='text-primary2 text-center'>Filter by</h4>
            <Form 
              form={form}
              onFinish={handleSubmit}
              layout="vertical"
              validateMessages={validateMessages}
            >
              <Row gutter={[16,8]}>
                <Col span={24}>
                  <Form.Item name={"modeOfShipment"} rules={[{required:true}]} label={<h6 className="text-primary2">Mode of Shipment</h6>}>
                    <Row gutter={[16, 16]}>
                      {modeOfShipmentOptions.map((e: string) => (
                        <Col {...layParams3} key={e}>
                          <Button size="large" block shape="round" style={{ textWrap: "wrap", lineHeight: 1 }} type={modeOfShipment === e ? "primary" : "default"} onClick={() => {
                            form.setFieldValue("modeOfShipment", e)
                            form.setFieldValue("cargoDetail", {})
                          }}>{e}</Button>
                        </Col>
                      ))}
                    </Row>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name={"tradeType"} rules={[{required:true}]} label={<h6 className="text-primary2 m-0">Trade Type</h6>} layout="horizontal">
                    <Row gutter={[16, 16]}>
                      {tradeTypeOptions.map((e: string) => (<Col key={e} {...layParams3}><Button size="large" block shape="round" style={{ textWrap: "wrap", lineHeight: 1 }} type={tradeType === e ? "primary" : "default"} onClick={() => {
                        form.setFieldValue("tradeType", e)
                        form.setFieldValue(["addOnService", "status"], true)
                        form.setFieldValue("incoterm", e !== strings.import ? incotermOptions[0] : importIncotermOptions[0])

                      }}>{e}</Button></Col>))}
                    </Row>
                  </Form.Item>
                </Col>
                <Col {...lParams}>
                  <Form.Item  name={["origin","country"]} label={<h6 className="m-0 text-primary2">Origin Country</h6>}>
                    <CountrySelectV2
                      {...{className:"border rounded-pill",variant:"borderless"}}
                      onChange={(e:any)=>{
                        setSrcLocation(e.id)
                        form.setFieldsValue({origin:{country:e.name,state:[]}})
                      }}
                      
                    />
  
                  </Form.Item>                
                </Col>
                <Col {...lParams}>
                  <Form.Item name={["origin","state"]} label={<h6 className="m-0 text-primary2">Origin State/Province</h6>}>
                    <StateSelectV4
                    {...{className:"border rounded-3",variant:"borderless",mode:"multiple"}}
                    countryId={SrcLocation} onChange={(e:any)=>{}} />
                  </Form.Item>                
                </Col>
                <Col {...lParams}>
                  <Form.Item  name={["destination","country"]} label={<h6 className="m-0 text-primary2">Dest. Country</h6>}>
                    <CountrySelectV2
                    {...{className:"border rounded-pill",variant:"borderless"}}
                      onChange={(e:any)=>{
                        setDesLocation(e.id)
                        form.setFieldsValue({destination:{country:e.name,state:[]}})
                      }}
                    />
                    </Form.Item>
                </Col>
                <Col {...lParams}>
                  <Form.Item name={["destination","state"]} label={<h6 className="m-0 text-primary2">Dest. State/Province</h6>}>
                    <StateSelectV4
                      {...{ className: "border rounded-3", variant: "borderless", mode: "multiple" }}
                      countryId={DesLocation} onChange={(e: any) => {}} />
                  </Form.Item>                
                </Col>
                <ConfigProvider 
                  theme={{
                      "components": {
                        "Select": {
                          "multipleItemBg": "#F3F6FF",
                          multipleItemHeight:32,
                          "colorText": "#6A37F4",
                          multipleItemBorderColor: "#6937f46c"
                        }
                      }
                  }}
                >
                <Col sm={22} md={12}>
                  <Form.Item name={"portOfLoading"} label={<h6 className="m-0 text-primary2">Port of Loading</h6>}>
                    <LocodeSelect
                      change={()=>{}}
                      wholeValue={(e:any)=>{form.setFieldValue("portOfLoading",e.map((v:any)=>`${v.value}`))}}
                      mode="multiple"
                    />
                  </Form.Item>
                </Col>
                <Col sm={22} md={12}>
                  <Form.Item name={"portOfUnLoading"} label={<h6 className="m-0 text-primary2">Port of Discharge</h6>}>
                    <LocodeSelect
                      change={()=>{}}
                      wholeValue={(e: any) => { form.setFieldValue("portOfUnLoading",e.map((v:any)=>`${v.value}`)) }}
                      mode="multiple"
                    />
                  </Form.Item>
                </Col>
                </ConfigProvider>
              </Row>
              <Form.Item rootClassName="d-flex justify-content-center">
                <Button size="large" className="px-5" type="primary" htmlType="submit" shape="round" loading={FormLoading}>
                  Search
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        {RfqList.length > 0 &&
          <Col sm={23} md={20} lg={18} xxl={15}>
          <h4 className='text-primary2 text-center'>{RfqList.length} live RFQs</h4>
          </Col>
        }
        <ConfigProvider
          theme={{
            "components": {
              "Select": {
                "multipleItemBg": "#F3F6FF",
                multipleItemHeight: 32,
                "colorText": "#6A37F4",
                multipleItemBorderColor: "#6937f46c"
              },
              "Input": {
                colorBgContainerDisabled: "rgb(243,246,255)",
                colorTextDisabled: "rgba(69, 17, 151, 1)",
                "colorBorder": "rgb(243,246,255)",
                borderRadius:48,
              },
              "Collapse": {
                "headerBg": "rgba(255,255,255,0.02)",
                padding:0,
                contentPadding:0,
              },
              "Form": {
                "labelColor": "rgb(10,0,73)"
              },
              "Card":{
                colorTextHeading:"rgba(69, 17, 151, 1)",
              },
              Table:{
                colorTextHeading:"rgba(69, 17, 151, 1)",
                headerBg: "rgb(243,246,255)",
                padding:10,
                fontSize:13,
                borderColor:"#A89CF7",
              }
            }
          }}
        >
          {RfqList.map((i:any) =>
            <Col key={i?._id} sm={23} md={20} lg={18} xxl={15}>
              <RFQCard rfqData={i} />
            </Col>
          )}
        </ConfigProvider>
      </Row>
    </div>
  )
}

export default RfqSearchUI

export const RFQCard = ({ rfqData ,showSubmit}:{rfqData:any,showSubmit?:boolean}) => {
  const [form] = Form.useForm();
  const {
    _id,
    modeOfShipment,
    tradeType,
    incoterm,
    freeTimeLP,
    freeTimeDP,
    readyDate,
    cargoDetail,
    loadingPort,
    dischargePort,
    loadingPortObj,
    dischargePortObj,
    organization,
    paymentTerms,
    remarks,
    container,
    addOnService,
    placeOfLoading,
    placeOfUnLoading
  } = rfqData;

  const [isExpanded, setIsExpanded] = useState(false);
  useEffect(()=>{
    form.setFieldsValue(rfqData)
  },[])
  return (
    <Form
      form={form}
    >
      <Card title={`RFQ ID: ${"rfqId"}`} styles={{header:{borderBottomWidth:0}}}>
        <Row gutter={[16, 8]} className='my-3'>
          <Col span={8}>
            <Form.Item name={"modeOfShipment"} label={"Mode of Shipment"}>
                <Input disabled className='text-center' />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name={"tradeType"} label={"Trade Type"}>
                <Input disabled className='text-center' />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name={"incoterm"} label={"Incoterm"}>
                <Input disabled className='text-center' />
            </Form.Item>
          </Col>
          {
            freeTimeLP&&
          <Col span={12} className=''>
            <Form.Item label="Free time required at POL">
              <Input value={freeTimeLP+` Days`} disabled className='text-center'/>
            </Form.Item>
          </Col>
          }
          {
            freeTimeDP&&
          <Col span={12} className=''>
            <Form.Item label="Free time required at POD">
              <Input value={freeTimeDP+` Days`} disabled className='text-center'/>
            </Form.Item>
          </Col>
          }
          {
            loadingPort&&
          <Col span={12}>
            <Form.Item label="Port of Loading" layout="vertical">
              <PortUI i={loadingPortObj} />
            </Form.Item>
          </Col>
          }
          {
            dischargePort&&
          <Col span={12}>
            <Form.Item label="Port of Loading" layout="vertical">
                <PortUI i={dischargePortObj} />
            </Form.Item>
          </Col>
          }
          {
            (placeOfLoading && !loadingPort)&&
          <Col span={12}>
            <Form.Item label="Place of Loading" layout="vertical">
              <Input className='rounded-2' value={`${placeOfLoading?.address}, ${placeOfLoading?.city}, ${placeOfLoading?.state}, ${placeOfLoading?.country}`} />
            </Form.Item>
          </Col>
          }
          {
            (placeOfUnLoading && !dischargePort)&&
          <Col span={12}>
            <Form.Item label="Place of Loading" layout="vertical">
              <Input className='rounded-2' value={`${placeOfUnLoading?.address}, ${placeOfUnLoading?.city}, ${placeOfUnLoading?.state}, ${placeOfUnLoading?.country}`} />
            </Form.Item>
          </Col>
          }
        </Row>
        <Collapse bordered={false} defaultActiveKey={[]}>
          <Collapse.Panel showArrow={false} header={<Button shape="round">View Details</Button>} key="1">
            { (cargoDetail?.category?cargoDetail?.category:[]).length>0&&
              <Card title={"Cargo Details"} styles={{ header: { borderBottom: 0 }, body: { padding: 10 } }}
              className="my-2"
                extra={<p className='m-0 p-1 border text-primary1 rounded-2'>Cargo Ready Date: {dayjs(readyDate).format("DD/MM/YY")}</p>}
              >
                {
                    <Row gutter={[16, 16]} className='my-3'>
                      <Col {...lParams}>
                        <Form.Item label={`Cargo Category`} layout="vertical">
                          <Input value={cargoDetail?.category} disabled className='text-center' />
                        </Form.Item>
                      </Col>
                      <Col {...lParams}>
                        <Form.Item label={"Hs Code"} layout="vertical">
                          <Input disabled className='text-center' />
                        </Form.Item>

                      </Col>
                      <Col {...lParams}>
                        <Form.Item label={"Volume"} layout="vertical">
                          <Input value={cargoDetail?.totalCBM} disabled className='text-center' />
                        </Form.Item>
                      </Col>
                      <Col {...lParams}>
                        <Form.Item label={"Weight"} layout="vertical">
                          <Input value={cargoDetail?.totalGrossWeight || cargoDetail?.weight} disabled className='text-center' />
                      </Form.Item>                        
                      </Col>
                      {
                        (cargoDetail?.packageDetail?cargoDetail?.packageDetail:[]).length > 0 &&
                        <Col sm={24} md={22} lg={12}>
                          <Table className='my-2' bordered dataSource={
                            (cargoDetail?.packageDetail?cargoDetail?.packageDetail:[])
                            .map((i:any,iIndex:number)=>({
                              key:i?._id,
                              package:iIndex+1,
                              dimensions:`L:${i?.dimensions?.length} ${cargoDetail?.measurement1}, B:${i?.dimensions?.breadth} ${cargoDetail?.measurement1}, H:${i?.dimensions?.height} ${cargoDetail?.measurement1}`,
                              weight:`${i?.weight} ${cargoDetail?.measurement2}`,
                            }))
                          } columns={columns} pagination={false} />
                        </Col>
                      }
                    </Row>
                }
              </Card>
            }
            {(container?container:[]).length>0&&
              <Card title={"Container Details"} className="my-2" styles={{header:{borderBottom:0},body:{padding:10}}}
                extra={<p className='m-0 p-1 border text-primary1 rounded-2'>Cargo Ready Date: {dayjs(container?.[0]?.readyDate).format("DD/MM/YY")}</p>}
              >
                {
                  (container?container:[]).map((i: any, index: number) => (
                    <Row gutter={[16, 16]} key={index} className='my-3'>
                      <Col {...lParams}>
                        <Form.Item label={!index?`Container`:null} layout="vertical">
                          <Input value={i?.cargo?.category.join()} disabled className='text-center' />
                        </Form.Item>
                      </Col>
                      <Col {...lParams}>
                        <Form.Item label={!index?"Hs Code":null} layout="vertical">
                          <Input disabled className='text-center' />
                        </Form.Item>
                        
                      </Col>
                      <Col {...lParams}>
                        <Form.Item label={!index?"Container Type":null} layout="vertical">
                          <Input value={`${i?.name} x ${i?.quantity}`} disabled className='text-center' />
                        </Form.Item>
                        { i?.cargo?.gaugeStatus&&
                          <input value={i?.cargo?.gaugeStatus} disabled className='text-center rounded-2 border p-1 my-3 d-inline text-primary1' />
                        }
                      </Col>
                      <Col {...lParams}>
                        <Form.Item label={!index?"Weight/Container":null} layout="vertical">
                          <Input value={`${i?.cargo?.weight} MT`} disabled className='text-center' />
                        </Form.Item>
                        { i?.cargo?.gaugeStatus&&
                          <input value={`L:${i?.cargo?.dimensions?.length} mm,B:${i?.cargo?.dimensions?.breadth} mm,H:${i?.cargo?.dimensions?.height} mm`} disabled className='text-center rounded-2 border p-1 my-2 d-inline text-primary1 my-3' />
                        }
                      </Col>
                    </Row>
                  ))
                }
              </Card>
            }
            {
              (addOnService && addOnService.status)&&            
              <Card title={`Add on Services at port of loading ${tradeType===strings.export?"[POL]":"[POD]"}`} styles={{header:{borderBottom:0},body:{padding:10}}} className="my-2">
                <Row gutter={[16,8]}>
                  <Col span={24}>
                    <Form.Item>
                      <Space size={"large"}>
                        {(addOnService.services?addOnService.services:[]).map((service :string,iIndex:number)=>(
                          <Input key={service+iIndex} value={service} disabled className='rounded-2 text-center' />
                        ))}
                      </Space>
                    </Form.Item>
                  </Col>
                    {
                      addOnService.placeOfLoading &&
                      <Col span={24}>
                        <Form.Item label={"Place of Loading"}>
                          <Input value={`${addOnService?.placeOfLoading?.address}, ${addOnService?.placeOfLoading?.city}, ${addOnService?.placeOfLoading?.state}, ${addOnService?.placeOfLoading?.country}`} disabled className='text-center' />
                        </Form.Item>
                      </Col>
                    }
                    {
                      addOnService.placeOfUnLoading &&
                      <Col span={24}>
                        <Form.Item label={"Place of UnLoading"}>
                          <Input value={`${addOnService?.placeOfUnLoading?.address}, ${addOnService?.placeOfUnLoading?.city}, ${addOnService?.placeOfUnLoading?.state}, ${addOnService?.placeOfUnLoading?.country}`} disabled className='text-center' />
                        </Form.Item>
                      </Col>
                    }
                    {
                      addOnService.stuffingLocationType&&
                      <Col span={12}>
                        <Form.Item label={"Stuffing Location"}>
                          <Input value={addOnService?.stuffingLocationType} disabled className='text-center' />
                        </Form.Item>
                      </Col>
                    }
                      <Col span={12}>
                    {
                      (addOnService.truckType?addOnService.truckType:[]).length>0&&
                        <Form.Item label={"Truck/Trailer Type"}>
                          {
                            (addOnService.truckType?addOnService.truckType:[]).map((truckType:any,iIndex:number)=>(
                              <Input key={truckType.typee+iIndex} value={`${truckType.typee} * ${truckType.quantity}`} disabled className='text-center my-1' />
                            ))
                          }
                        </Form.Item>
                    }
                      </Col>
                    {
                      addOnService.eSeal&&
                      <Col sm={8} span={6}>
                        <Form.Item label={"E Seal Facility"}>
                          <Input value={addOnService.eSeal?"Yes":"No"} disabled className='text-center' />
                        </Form.Item>
                      </Col>
                    }
                    {
                      <Col sm={16} span={7}>
                          <Space wrap>
                            <Form.Item label={"Insurance"}>
                              <Input value={addOnService.insuranceRequired?"Yes":"No"} disabled className='text-center' />
                            </Form.Item>
                            {addOnService.insuranceRequired&&<div className='pb-2'><input value={`Cargo Value: `+addOnService.cargoValue +` USD`} disabled className='text-center rounded-2 border p-1 mb-3 text-primary1' /></div>}
                          </Space>
                      </Col>
                    }
                    {
                      (addOnService.miscServices?addOnService.miscServices:[]).length>0&&
                      <Col sm={24} span={11}>
                        <Form.Item label={"Misc Services"}>
                          <Input.TextArea rows={1} value={addOnService.miscServices.join()+ `${addOnService.miscServices.includes(strings.others)?", "+addOnService?.miscOtherValue:""}`} disabled className='text-center text-wrap' />
                        </Form.Item>
                      </Col>
                    }
                </Row>
              </Card>
            }
            <Card>
              <Form.Item label={"Payment Terms"}>
                <Input value={paymentTerms} disabled className='text-center text-wrap' />
              </Form.Item>
              <Form.Item label={"Remarks"}>
                <Input value={remarks} disabled className='text-center text-wrap' />
              </Form.Item>
            </Card>
            <Card className='my-2'>
              <Row gutter={[16,16]}>
                <Col span={24}>
                  <Space size={"large"} align="center">
                    <h5 className="text-primary3">Exporter : <span className="border p-1 rounded">{organization?.companyName}</span></h5>
                    <div className="pb-2">
                      <Input value={organization?.businessType} disabled/>
                    </div>
                  </Space>
                </Col>
                <Col span={24}>
                  <div className='d-flex gap-2 align-items-center'>
                    {organization?.starExportHouseRating&& <Rate disabled value={organization?.starExportHouseRating}/>}
                    {organization?.exportPromotionOrganisationMembership&& 
                      <>
                      <Input value={"AEO"} disabled style={{width:"70px"}} className='text-center'/>
                      <Input value={organization?.exportPromotionOrganisationMembership} disabled style={{width:"50%"}} className='text-center' />
                      </>
                    }
                  </div>
                </Col>
                  {organization?.pointSalesPricingTeam&& 
                  <>
                  {
                    (organization?.pointSalesPricingTeam?.name?organization.pointSalesPricingTeam?.name:[]).map((r:any,iIndex:number)=>(
                    <Col span={24} key={iIndex}>
                      <Space>
                        {iIndex===0&& <p className="m-0">POC</p>}
                        <Input value={organization?.pointSalesPricingTeam?.name?.[iIndex]} disabled className='text-center' />
                        <Input value={organization?.pointSalesPricingTeam?.email?.[iIndex]} disabled className='text-center' />
                        <Input value={organization?.pointSalesPricingTeam?.mobile?.[iIndex]} disabled className='text-center' />

                      </Space>
                    </Col>

                    ))
                  }
                  </>
                  }
              </Row>
            </Card>
            <Col span={24} className='my-2'>
              {!showSubmit&&<div className="d-flex justify-content-between mx-0">
                <Button icon={<DownloadOutlined className="fw-bold fs-5 text-primary2"/>} >Download as pdf</Button>
                <Link target="_blank" href={"/rfq/quotation?rfq="+_id}>
                  <Button type="primary" >Submit quotation</Button>
                </Link>
              </div>}
            </Col>
          </Collapse.Panel>
        </Collapse>
      </Card>
    </Form>
  );
};

const lParams={
  sm:24,
  md:12,
  lg:6,
  xl:6,
  xxl:6
}

const TextUI = ({children}: {children?:string})=> <span className='bg-shade text-primary1 p-1 px-3 rounded-pill'>{children}</span>
export const PortUI = ({i,...props}:{i:any,props?:any})=>{
  
  return (
    <ConfigProvider
    theme={{
      "components": {
        "Input": {
          colorBgContainerDisabled: "rgb(243,246,255)",
          colorTextDisabled: "rgba(69, 17, 151, 1)",
          "colorBorder": "rgb(243,246,255)",
          borderRadius:48,
        },}}}>
          <Input {...props} disabled className='border rounded-2 bg-light' value={locodeFormatedString(i)}/>
        </ConfigProvider>
        )
}
const columns = [
  {
    title: 'Package',
    dataIndex: 'package',
    key: 'package',
  },
  {
    title: 'Dimensions',
    dataIndex: 'dimensions',
    key: 'dimensions',
  },
  {
    title: 'Weight',
    dataIndex: 'weight',
    key: 'weight',
  },
];