"use client"
import React, { useContext, useEffect, useReducer, useState } from 'react'
import OnboardUserUI, { RFQUserUI } from '../onboarduser/layout'
import { Button, Card, Cascader, Checkbox, Col, DatePicker, Dropdown, Form, Input, Radio, Row, Select, Space, Switch, Typography } from 'antd'
import { strings } from '@/components/strings'
import { DimsOptions, WeightOptions, cargoCategoryOptions, crossBorderTruckCargoOptions, gaugestatusOptions, imoClassOptions, importIncotermOptions, incotermOptions, miscServices, modeOfShipmentOptions, packageTypeOptions, paymentTermOptions, reeferCargoOptions, reeferContainersOptions, specialCargoOptions, specialContainersOptions, standardCargoOptions, standardContainersOptions, stuffingLocationTypeOptions, tradeTypeOptions, truckTrailerType } from './options'
import { useForm, useWatch } from 'antd/es/form/Form'
import LocodeSelect from '@/components/supportcomponents/customcomponents/locodeselect'
import { CloseOutlined, DeleteFilled, EyeOutlined, PlusCircleFilled } from '@ant-design/icons'
import { CustomFormUpload, CustomFormUploadV3 } from '../onboarduser/freightforwader'
import { updateArray } from '@/components/utils'
import { CitySelectV2, CitySelectV3, CountrySelect, StateSelectV3 } from '@/components/supportcomponents/customcomponents/stateselect'
import dayjs from 'dayjs'
import { ContextRFQ, RFQSideUI } from './sideUI'


function PostRfQ() {
  const [currentStep, setCurrentStep] = useState<number>(0)
  const updateCount=(e:number)=>{
    if(e<currentStep){
        setCurrentStep(e)
    }
}
  return (
      <RFQUserUI sideUI={<RFQSideUI step={currentStep} updateSteps={updateCount} />}>
        <PostRFQUI />   
      </RFQUserUI>
  )
}



export default PostRfQ
const defaultValue = {
  freeTimeDP:10,
  freeTimeLP:10,
  pointOfContact:[{}],
  container:[{
    type:strings.standardContainers,
    name:strings['20ft'],
    quantity:1,
    seats:1,
    readyDate:dayjs(Date.now()),
    cargo:{
      type:standardCargoOptions[0]
    }
  }],
  addOnService:{
    status:true
  },
  modeOfShipment:modeOfShipmentOptions[0],
  tradeType:tradeTypeOptions[0],
  incoterm:incotermOptions[0]
}
const PostRFQUI=()=>{
  const {state,dispatch}=useContext(ContextRFQ)
  const [containerData,setContainerData] = useState<any>()
  const [form] = useForm()
  const modeOfShipment = useWatch("modeOfShipment",form)
  const tradeType = useWatch("tradeType",form)
  const incoterm = useWatch("incoterm",{form,preserve:true})
  const freeTimeLP = useWatch("freeTimeLP",{form,preserve:true})
  const freeTimeDP = useWatch("freeTimeDP",{form,preserve:true})
  const showContact = useWatch("showContact",{form,preserve:true})
  const container = useWatch("container",{form,preserve:true})
  const addOnService = useWatch("addOnService",{form,preserve:true})
  const cargoDetail = useWatch("cargoDetail",form)
  const paymentTerms = useWatch("paymentTerms",form)
  
  const [countryID, setCountryID] = useState("")
  const [stateID, setStateID] = useState("")

  const updateSteps=(stepTitle:string) =>dispatch({ type: 'UPDATE_STEP_STATUS', payload: { title: stepTitle, status: 'finish',description:"Completed" } });
  useEffect(()=>{
    console.log(form.getFieldsError([
      modeOfShipment,
      tradeType,
      incoterm,
      freeTimeLP,
      freeTimeDP,
      showContact,
      container,
      addOnService,
      cargoDetail,
      paymentTerms,
    ]))
  },[
    modeOfShipment,
    tradeType,
    incoterm,
    freeTimeLP,
    freeTimeDP,
    showContact,
    container,
    addOnService,
    cargoDetail,
    paymentTerms,
  ])
  const handleTruckTrailer =(e:string)=>{
    let a = [...(addOnService?.truckType?addOnService?.truckType:[])]
    form.setFieldValue(["addOnService","truckType"],[...a,...[{type:e,quantity:1}]])
  }
  const onFinished = (e:any)=>{
    console.log(e);
  }
  useEffect(()=>{
    // console.log(form.getFieldValue("addOnService"));    
  },[addOnService])
  
  useEffect(()=>{
    form.setFieldsValue(defaultValue)
  },[])
    return (
      <Form 
        form={form}
        onFinish={onFinished}
      >
        <Row gutter={[16,16]} justify="space-around">
          <Col span={24}>
            <Card title="Mode of Shipment" styles={{title:{color:strings.textPrimary1},header:{borderBottom:0},body:{padding:"10px"}}}>
              <Row gutter={[16,16]}>
                {modeOfShipmentOptions.map((e:string)=>(
                  <Col {...layParams3}>
                    <Button size="large" block shape="round" style={{textWrap:"wrap",lineHeight:1}} type={modeOfShipment===e?"primary":"default"} onClick={()=>{
                      form.setFieldValue("modeOfShipment",e)
                      form.setFieldValue("cargoDetail",{})
                      }}>{e}</Button>
                  </Col>
                ))}
                <Form.Item rules={[{required:true}]} name={"modeOfShipment"} />
              </Row>
            </Card>
          </Col>
          <Col span={24}>
            <Card title="Trade Type" styles={{title:{color:strings.textPrimary1},header:{borderBottom:0},body:{padding:"10px"}}}>
                <Row gutter={[16,16]}>
                  {tradeTypeOptions.map((e:string)=>(<Col {...layParams3}><Button size="large" block shape="round" style={{textWrap:"wrap",lineHeight:1}} type={tradeType===e?"primary":"default"} onClick={()=>{
                    form.setFieldValue("tradeType",e)
                    form.setFieldValue(["addOnService","status"],true)
                    form.setFieldValue("incoterm",e!==strings.import?incotermOptions[0]:importIncotermOptions[0])

                  }}>{e}</Button></Col>))}
                </Row>
              <Form.Item rules={[{required:true}]} name={"tradeType"} />
            </Card>
          </Col>
          <Col span={24}>
            <Card title="Incoterm" styles={{title:{color:strings.textPrimary1},header:{borderBottom:0},body:{padding:"10px"}}}>
            { tradeType === strings.export&&
            <Row gutter={[16,16]} justify={"center"}>
              {incotermOptions.map((e:string)=>(<Col {...layParams3}><Button size="large" block shape="round" style={{textWrap:"wrap",lineHeight:1}} type={incoterm===e?"primary":"default"} onClick={()=>{form.setFieldValue("incoterm",e)}}>{e}</Button></Col>))}
            </Row>
            }
            { tradeType === strings.import&&
            <Row gutter={[16,16]} justify={"center"}>
              {importIncotermOptions.map((e:string)=>(<Col {...layParams3}><Button size="large" block shape="round" style={{textWrap:"wrap",lineHeight:1}} type={incoterm===e?"primary":"default"} onClick={()=>{form.setFieldValue("incoterm",e)}}>{e}</Button></Col>))}
            </Row>
            }
              <Form.Item rules={[{required:true}]} name={"incoterm"} />
            </Card>
          </Col>
          <Col span={24}>
            <Card title="Port Pair" styles={{title:{color:strings.textPrimary1},header:{borderBottom:0}}}
              extra={modeOfShipment!==strings.seaFCL&&
                (<Space size={"small"} className='border rounded-pill px-2'>
                  <Form.Item label="Cargo Readiness Date" required={false} name={"readyDate"} rules={[{required:true}]} className="my-0">
                    <DatePicker onChange={(e,r)=>form.setFieldValue("readyDate",dayjs(r.toString()))} size="small" styles={{}} style={{ border: 0, fontSize: "10px", paddingRight: "2px", paddingLeft: "2px" }} className='rounded-pill' />
                  </Form.Item>
                </Space>)}
            >
              <Row justify={"space-between"} gutter={[8,8]} className="ms-2 my-2">
                <Col span={24}>
                  {
                    (tradeType === strings.import && incoterm===strings.EXW)&&
                    (
                      <>
                        
                        <p>Place of Loading , Origin Factory / warehouse address</p>
                        <Row gutter={[8, 0]} justify={"center"} className='px-2' style={{ width: "90%" }}>
                          <Col {...layParams2}>
                            <CountrySelect
                              f={form}
                              name={["placeOfLoading", "country"]}
                              onChange={(e: any) => setCountryID(e)}
                              label=""
                              required={true}
                            />
                          </Col>
                          <Col {...layParams2}>
                            <StateSelectV3
                              f={form}
                              name={["placeOfLoading", "state"]}
                              onChange={(e: any) => setStateID(e)}
                              label=""
                              countryId={countryID}
                              required={true}
                            />
                          </Col>
                          <Col {...layParams2}>
                            <CitySelectV3
                              f={() => { }}
                              name={["placeOfLoading", "city"]}
                              onChange={(e: any) => form.setFieldValue(["placeOfLoading", "city"], e)}
                              label=""
                              stateId={stateID}
                            />
                          </Col>
                          <Col span={24}>
                            <Form.Item name={["placeOfLoading", "address"]} rules={[{required: true}]}>
                              <Input.TextArea
                                placeholder="Full Address"
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                      </>
                    )
                  }
                </Col>
                <Col {...layParams} lg={13}>
                  <Form.Item  label="Port of Loading" className='pb-4' name={"loadingPort"} layout="vertical" rules={[{required:true}]}>
                    <LocodeSelect change={(e:any)=>form.setFieldValue("loadingPort",e)} />
                  </Form.Item>
                </Col>
                <Col {...layParams}>                  
                  {(modeOfShipment===strings.seaFCL||modeOfShipment===strings.crossBorderTrucking)&&
                  <Space>
                    <Form.Item label={<Typography.Text >Free time required at POL</Typography.Text>} layout="vertical">
                      <Space className='border rounded p-1'>
                        <Button onClick={()=>form.setFieldValue("freeTimeLP",+freeTimeLP-1<1?1:+freeTimeLP-1)} size="small" type="primary">-</Button>
                          <span className="mx-3" style={{textWrap:"nowrap"}}>
                            <Form.Item name={"freeTimeLP"} noStyle>
                              <Input type="number" className="border-0" style={{display:"contents"}} />
                            </Form.Item>
                            {freeTimeLP} days
                            </span>
                        <Button onClick={()=>form.setFieldValue("freeTimeLP",+freeTimeLP+1)} size="small" type="primary">+</Button>
                      </Space>
                    </Form.Item>
                  </Space>}
                </Col>
                <Col {...layParams} lg={13}>
                  <Form.Item  name={"dischargePort"} className="py-3" label={"Port of Discharge"} layout="vertical" rules={[{required:true}]}>
                    <LocodeSelect change={(e:any)=>form.setFieldValue("dischargePort",e)} />
                  </Form.Item>
                </Col>
                <Col {...layParams}>                  
                  {(modeOfShipment===strings.seaFCL||modeOfShipment===strings.crossBorderTrucking)&&
                  <Space>
                    <Form.Item  label={<Typography.Text >Free time required at POD</Typography.Text>} layout="vertical">
                      <Space className='border rounded p-1'>
                        <Button onClick={()=>form.setFieldValue("freeTimeDP",+freeTimeDP-1<1?1:+freeTimeDP-1)} size="small" type="primary">-</Button>
                          <span className="mx-3" style={{textWrap:"nowrap"}}>
                            <Form.Item name={"freeTimeDP"} noStyle>
                              <Input type="number" className="border-0" style={{display:"contents"}} />
                            </Form.Item>
                            {freeTimeDP} days
                          </span>
                        <Button onClick={()=>form.setFieldValue("freeTimeDP",+freeTimeDP+1)} size="small" type="primary">+</Button>
                      </Space>
                    </Form.Item>
                  </Space>}
                </Col>
              </Row>
                {(
                  incoterm === strings.dap ||
                  incoterm === strings.dpu ||
                  incoterm === strings.ddp 
                )&&
                  <>
                    <p className='ms-2 mt-3'>Place of Unloading , Destination Factory / warehouse address</p>
                    <Row gutter={[8,8]} justify={"center"} className='px-2' style={{ width: "100%" }}>
                      <Col {...layParams2}>
                        <CountrySelect
                          f={form}
                          name={["placeOfUnLoading", "country"]}
                          onChange={(e: any) => setCountryID(e)}
                          label=""
                        />
                      </Col>
                      <Col {...layParams2}>
                        <StateSelectV3
                          f={form}
                          name={["placeOfUnLoading", "state"]}
                          onChange={(e: any) => setStateID(e)}
                          label=""
                          countryId={countryID}
                        />
                      </Col>
                      <Col {...layParams2}>
                        <CitySelectV3
                          f={() => { }}
                          name={["placeOfUnLoading", "city"]}
                          onChange={(e: any) => form.setFieldValue(["placeOfUnLoading", "city"], e)}
                          label=""
                          stateId={stateID}
                        />
                      </Col>
                      <Col span={24}>
                        <Form.Item name={["placeOfUnLoading", "address"]} rules={[{required: true}]}>
                          <Input.TextArea
                            placeholder="Full Address"
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </>
                }
            </Card>
          </Col>
          {//CargoDetail
            (modeOfShipment === strings.seaLCL || modeOfShipment === strings.air) &&
              <Col span={24}>
                <Card title="Cargo Details" styles={{ title: { color: strings.textPrimary1 }, header: { borderBottom: 0 } }} >
                  <Row gutter={[16, 16]} className='mx-1 mx-md-2'>
                    <Col {...layParams}>
                      <Form.Item name={"cargoDetail"}>
                        {specialCargoOptions.map((e: string) => (<Button block shape="round" style={{ maxWidth: "12em", minWidth: "10em", textWrap: "wrap", lineHeight: 1 }} type={cargoDetail?.type === e ? "primary" : "default"} onClick={() => {
                          form.setFieldValue(["cargoDetail", "type"], e)
                        }}>{e}</Button>))}
                      </Form.Item>
                    </Col>
                    <Col {...layParams}>
                      <Form.Item name={["cargoDetail", "packageType"]} label="Enter details by" layout="vertical">
                        <Radio.Group options={packageTypeOptions} value={cargoDetail?.packageType} onChange={(e) => {
                          form.setFieldValue(["cargoDetail", "packageType"], e.target.value), console.log(e.target.value);
                          if (e.target.value === strings.totalCargo) {
                            form.setFieldValue(["cargoDetail", "packageQuantity"], 0)
                          }
                        }} />
                      </Form.Item>
                    </Col>
                    <Col {...layParams}>
                      <Form.Item name={["cargoDetail", "category"]} label="Cargo Category" layout="vertical">
                        <Cascader maxTagCount="responsive" showCheckedStrategy={"SHOW_CHILD"} multiple placeholder="Select cargo category" options={cargoCategoryOptions.map((i: any) => ({ label:<p className='m-0'>{`${i.range[0]}-${i.range[1]} `} {i.label}</p>, value: i.label, children: (i.children ? i.children : []).map((p: any) => ({ label:<p className='m-0'>{`${p.range} `} {p.label}</p>, value: p.range })) }))} />
                      </Form.Item>
                    </Col>
                    <Col {...layParams}>
                      <Form.Item name={["cargoDetail", "hsCode"]} label="Cargo HS Code" layout="vertical">
                        <Select placeholder="Search by HS code or type description" mode="tags" />
                      </Form.Item>
                    </Col>
                    <Col {...layParams}>
                      {
                        cargoDetail?.packageType === strings.perPackage &&
                        <Form.Item label={`Number of Packages`} name={["cargoDetail", "packageQuantity"]} rules={[{ required: true }]} layout="vertical">
                          <Space className='border rounded p-1'>
                            <Button onClick={() => form.setFieldValue(["cargoDetail", "packageQuantity"], +cargoDetail?.packageQuantity - 1 < 1 ? 1 : +cargoDetail?.packageQuantity - 1)} size="small" type="primary">-</Button>
                            <span className="mx-4">{cargoDetail?.packageQuantity ? cargoDetail?.packageQuantity : 0}</span>
                            <Button onClick={() => form.setFieldValue(["cargoDetail", "packageQuantity"], +(cargoDetail?.packageQuantity ? cargoDetail?.packageQuantity : 0) + 1)} size="small" type="primary">+</Button>
                          </Space>
                        </Form.Item>
                      }
                    </Col>
                    <Col {...layParams}>
                      <Form.Item label="Units of Measurement" layout="vertical">
                        <Space.Compact style={{ width: "100%" }}>
                          <Select options={DimsOptions.map(d => ({ labe: d, value: d }))} placeholder="Dimension" onChange={e => form.setFieldValue(["cargoDetail", "measurement1"], e)} />
                          <Select options={WeightOptions.map(d => ({ labe: d, value: d }))} placeholder="Weight" onChange={e => form.setFieldValue(["cargoDetail", "measurement2"], e)} />
                        </Space.Compact>
                      </Form.Item>
                    </Col>
                    {
                      Array.from(Array(cargoDetail?.packageQuantity ? cargoDetail?.packageQuantity : 0)).map((o, p) => (
                        <Col span={24} className='my-3 py-2'>
                          <Row gutter={[8, 16]}>
                            <Col {...layParams}>
                              <Form.Item name={["cargo", "namepackageDetail", p]} label={`Package ${p + 1} Dimensions (in mm)`} rules={[{ required: true }]} layout="vertical">
                                <Space.Compact>
                                  <Form.Item name={"dimensionsL"}>
                                    <Input placeholder="L" style={{ textAlign: "center" }} />
                                  </Form.Item>
                                  <Form.Item name={"dimensionsB"}>
                                    <Input placeholder="B" style={{ textAlign: "center" }} />
                                  </Form.Item>
                                  <Form.Item name={"dimensionsH"}>
                                    <Input placeholder="H" style={{ textAlign: "center" }} />
                                  </Form.Item>
                                </Space.Compact>
                              </Form.Item>
                            </Col>
                            <Col {...layParams}>
                              <Form.Item name={["cargo", "namepackageDetail", p, "grossWeight"]} label={`Gross Weight/Package`} rules={[{ required: true }]} layout="vertical">
                                <Input placeholder="Weight" style={{ textAlign: "center" }} />
                              </Form.Item>
                            </Col>
                          </Row>
                        </Col>
                      ))
                    }
                    <Col {...layParams}>
                      <Form.Item name={["cargoDetail", "totalGrossWeight"]} rules={[{ required: true }]} label="Total Gross Weight" layout="vertical">
                        <Input placeholder="Kg" />
                      </Form.Item>
                    </Col>
                    <Col {...layParams}>
                      <Form.Item name={["cargoDetail", "totalCBM"]} rules={[{ required: true }]} label="Total CBM" layout="vertical">
                        <Input placeholder="Enter Here" />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>
              </Col>
          }
          {//CargoDetail Cross Border Truck
            (modeOfShipment === strings.crossBorderTrucking) &&
              <Col span={24}>
                <Card title="Cargo Details" styles={{ title: { color: strings.textPrimary1 }, header: { borderBottom: 0 } }} >
                  <div className=" d-flex flex-column gap-2 my-2">
                    <Form.Item name={["cargoDetail", "type"]}>
                      <Space wrap>
                        {crossBorderTruckCargoOptions.map((e: string) => (<Button block shape="round" style={{ maxWidth: "12em", minWidth: "10em", textWrap: "wrap", lineHeight: 1 }} type={cargoDetail?.type === e ? "primary" : "default"} onClick={() => {
                          form.setFieldValue(["cargoDetail", "type"], e)
                        }}>{e}</Button>))}
                      </Space>
                    </Form.Item>
                  </div>
                  <Row gutter={[8, 24]}>
                    <Col {...layParams}>
                      <Form.Item rules={[{ required:true }]} name={["cargoDetail", "category"]} label="Cargo Category" layout="vertical">
                        <Cascader maxTagCount="responsive" showCheckedStrategy={"SHOW_CHILD"} multiple placeholder="Select cargo category" options={cargoCategoryOptions.map((i: any) => ({ label:<p className='m-0'>{`${i.range[0]}-${i.range[1]}`} {i.label}</p>, value: i.label, children: (i.children ? i.children : []).map((p: any) => ({ label:<p className='m-0'>{`${p.range} `} {p.label}</p>, value: p.label })) }))} />
                      </Form.Item>
                    </Col>
                    <Col {...layParams}>
                      <Form.Item  name={["cargoDetail", "hsCode"]} label="Cargo HS Code" layout="vertical">
                        <Select placeholder="Search by HS code or type description" mode="tags" />
                      </Form.Item>
                    </Col>
                    <Col {...layParams}>
                      <Form.Item rules={[{ required:true }]} name={["cargoDetail", "weight"]} label="Total Weight" layout="vertical">
                        <Input />
                      </Form.Item>
                    </Col>


                    {(cargoDetail?.type === strings.odc || cargoDetail?.type===strings.general) &&
                        <Col {...layParams}>
                          <Form.Item rules={[{ required:true }]} name={["cargoDetail", "totalCBM"]} label="Total CBM" layout="vertical">
                            <Input />
                          </Form.Item>
                        </Col>
                    }
                    {cargoDetail?.type === strings.hazardous &&
                      <>
                        <Col {...layParams}>
                          <Form.Item rules={[{ required:true }]} name={["cargoDetail", "imoClass"]} label="IMO Class" layout="vertical">
                            <Select options={imoClassOptions.map((i: any) => ({ label: i, value: i }))} placeholder="Select Class" />
                          </Form.Item>
                        </Col>
                        <Col {...layParams}>
                          <Form.Item rules={[{ required:true }]} name={["cargoDetail", "unNumber"]} label="UN Number" layout="vertical">
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col {...layParams}>
                          <Form.Item rules={[{ required:true }]} name={["cargoDetail", "packagingMaterial"]} label="Packaging Material" layout="vertical">
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col {...layParams}>
                          <CustomFormUploadV3 f={form} name={["cargoDetail", "msdsDocument"]} label={"Upload MSDS Document"} />
                        </Col>
                      </>
                    }
                    {
                      cargoDetail?.type === strings.odc &&
                      <>
                        <Col {...layParams}>
                          <Form.Item label={`Total Dimensions (in FT)`} rules={[{ required: true }]} layout="vertical">
                            <Space.Compact>
                              <Form.Item name={["cargoDetail","dimensionsL"]}>
                                <Input placeholder="L" style={{ textAlign: "center" }} />
                              </Form.Item>
                              <Form.Item name={["cargoDetail","dimensionsB"]}>
                                <Input placeholder="B" style={{ textAlign: "center" }} />
                              </Form.Item>
                              <Form.Item name={["cargoDetail","dimensionsH"]}>
                                <Input placeholder="H" style={{ textAlign: "center" }} />
                              </Form.Item>
                            </Space.Compact>
                          </Form.Item>
                        </Col>
                      </>
                    }
                    <Col span={24}>
                      <Form.List name={["cargoDetail", "truckType"]}>
                        {(fields, { add, remove }) => (
                          <Row gutter={[8, 24]}>
                            <Col span={24}>
                              <h4 className="text-primary2">Truck Detail</h4>
                              <Form.Item name={["cargoDetail", "truckType"]} label="Truck/Trailer Type" rules={[{
                                required:cargoDetail?.truckType?false:true
                              }]} />
                            </Col>
                            {fields.map((field, iIndex) => (
                              <>
                                <Col {...layParams}>
                                  <Form.Item rules={[{ required: true }]} name={[field.name, "type"]}  layout="vertical">
                                    <Input disabled />
                                  </Form.Item>
                                </Col>
                                <Col {...layParams}>
                                  <Form.Item rules={[{ required: true }]} name={[field.name, "quantity"]}  layout="vertical">
                                    <Space>
                                      <Space.Compact className='rounded border d-flex align-items-center px-1 w-50'>
                                        <Button onClick={() => form.setFieldValue(["cargoDetail", "truckType", field.name, "quantity"], +(cargoDetail?.truckType?.[field.name]?.quantity == 1 ? 1 : +cargoDetail?.truckType?.[field.name]?.quantity -1))} size="small" type="primary">-</Button>
                                        <Input placeholder="Enter Width" className="border-0 text-center" value={cargoDetail?.truckType?.[field.name]?.quantity ? cargoDetail?.truckType?.[field.name]?.quantity : 0}/>
                                        <Button onClick={() => form.setFieldValue(["cargoDetail", "truckType", field.name, "quantity"], +(cargoDetail?.truckType?.[field.name]?.quantity ? cargoDetail?.truckType?.[field.name]?.quantity : 0) + 1)} size="small" type="primary">+</Button>
                                      </Space.Compact>
                                      <Button onClick={() => remove(iIndex)} size="small" shape="round"><CloseOutlined className="text-danger fw-bold" /></Button>
                                    </Space>
                                  </Form.Item>
                                </Col>
                              </>
                            ))}
                            <Dropdown
                              menu={{ items: truckTrailerType.map(o => ({ ...o, children: o.children.map(p => ({ ...p, onClick: () => add({ type: p.label, quantity: 1 }) })) })) }}
                            >
                              <Button shape="round" >
                                <PlusCircleFilled className="text-primary1 fs-5" /> Add Truck/Trailer Type
                              </Button>
                            </Dropdown>
                          </Row>
                        )}
                      </Form.List>
                    </Col>
                  </Row>
                  
                    
                  
                </Card>
              </Col>
          }
          {modeOfShipment===strings.seaFCL&&
            <Form.List name={"container"}>
              {(fields, { add, remove }) => (
                <>
                  {
                    fields.map(({ key, name},iIndex) => (
                      <Col span={24}>
                        <Card
                          title="Container Details"
                          styles={{ title: { color: strings.textPrimary1 }, header: { borderBottom: 0 }, body: { padding: "10px" } }}
                          extra={
                            iIndex===0?
                            (<Space size={"small"} className='border rounded-pill px-1'>
                              <Form.Item label="Cargo Readiness Date" required={false} name={[name,"readyDate"]} rules={[{required:true}]} className="my-0">
                                <DatePicker onChange={(e,r)=>form.setFieldValue(["container",name,"readyDate"],dayjs(r.toString()))} size="small" styles={{}} style={{ border: 0, fontSize: "10px", paddingRight: "2px", paddingLeft: "2px" }} className='rounded-pill' />
                              </Form.Item>
                            </Space>):
                            <Button onClick={() => remove(iIndex)} shape="round">Delete <CloseOutlined className="text-danger fw-bold" /> </Button>
                          }
                        >
                          <div className="m-3">
                            <p className='m-0 text-primary2 mt-3'>Standard Dry Containers</p>
                            <Row gutter={[16,16]}>
                              {standardContainersOptions.map((e: string) => (<Col {...layParams3}><Button size="large" block shape="round" style={{textWrap: "wrap", lineHeight: 1 }} type={container[name]?.name === e ? "primary" : "default"} onClick={() => {
                                form.setFieldValue(["container",name, "type"], strings.standardContainers)
                                form.setFieldValue(["container",name, "name"], e)
                                form.setFieldValue(["container",name, "cargo"], {
                                  type:standardCargoOptions[0],
                                  category:container[name]?.cargo?.category,
                                  hsCode:container[name]?.cargo?.hsCode,
                                  weight:container[name]?.cargo?.weight,
                                })
                              }}>{e}</Button></Col>))}
                            </Row>
                            <p className='m-0 text-primary2 mt-3'>Special Containers</p>
                            <Row gutter={[16,16]}>
                              {specialContainersOptions.map((e: string) => (<Col {...layParams3}><Button size="large" block shape="round" style={{textWrap: "wrap", lineHeight: 1 }} type={container[name]?.name === e ? "primary" : "default"} onClick={() => {
                                form.setFieldValue(["container",name, "type"], strings.specialContainers)
                                form.setFieldValue(["container",name, "name"], e)
                                form.setFieldValue(["container",name, "cargo"], {
                                  type:specialCargoOptions[0],
                                  category:container[name]?.cargo?.category,
                                  hsCode:container[name]?.cargo?.hsCode,
                                  weight:container[name]?.cargo?.weight,
                                })
                              }}>{e}</Button></Col>))}
                            </Row>
                            <p className='m-0 text-primary2 mt-3'>Reefer Containers</p>
                            <Row gutter={[16,16]}>
                              {reeferContainersOptions.map((e: string) => (<Col {...layParams3}><Button size="large" block shape="round" style={{textWrap: "wrap", lineHeight: 1 }} type={container[name]?.name === e ? "primary" : "default"} onClick={() => {
                                form.setFieldValue(["container",name, "type"], strings.reeferContainers)
                                form.setFieldValue(["container",name, "name"], e)
                                form.setFieldValue(["container",name, "cargo"], {
                                  type:reeferCargoOptions[0],
                                  category:container[name]?.cargo?.category,
                                  hsCode:container[name]?.cargo?.hsCode,
                                  weight:container[name]?.cargo?.weight,
                                })
                              }}>{e}</Button></Col>))}
                            </Row>
                            <p className='m-0 mt-3'>Number of Container(s)</p>
                            <Space className='border rounded p-1'>
                              <Button onClick={() => form.setFieldValue(["container",name, "quantity"], +container[name]?.quantity - 1 < 1 ? 1 : +container[name]?.quantity - 1)} size="small" type="primary">-</Button>
                                <span className="mx-4">{container[name]?.quantity?container[name]?.quantity:0}</span>
                              <Button onClick={() => form.setFieldValue(["container",name, "quantity"], +(container[name]?.quantity?container[name]?.quantity:0) + 1)} size="small" type="primary">+</Button>
                            </Space>
                              <Form.Item name={[name,"quantity"]} rules={[{required:true}]} />
                            <div className=" d-flex flex-column gap-2 my-2">
                              <h6 className="text-primary2 mb-2">Cargo Details</h6>
                              {container[name]?.type===strings.standardContainers&&<Space wrap>
                                {standardCargoOptions.map((e: string) => (<Button block shape="round" style={{ maxWidth: "12em", minWidth: "10em", textWrap: "wrap", lineHeight: 1 }} type={container[name]?.cargo?.type === e ? "primary" : "default"} onClick={() => {
                                  form.setFieldValue(["container",name,"cargo", "type"], e)
                                }}>{e}</Button>))}
                              </Space>}
                              {container[name]?.type===strings.specialContainers&&<Space wrap>
                                {specialCargoOptions.map((e: string) => (<Button block shape="round" style={{ maxWidth: "12em", minWidth: "10em", textWrap: "wrap", lineHeight: 1 }} type={container[name]?.cargo?.type === e ? "primary" : "default"} onClick={() => {
                                  form.setFieldValue(["container",name,"cargo", "type"], e)
                                }}>{e}</Button>))}
                              </Space>}
                              {container[name]?.type===strings.reeferContainers&&<Space wrap>
                                {reeferCargoOptions.map((e: string) => (<Button block shape="round" style={{ maxWidth: "12em", minWidth: "10em", textWrap: "wrap", lineHeight: 1 }} type={container[name]?.cargo?.type === e ? "primary" : "default"} onClick={() => {
                                  form.setFieldValue(["container",name,"cargo", "type"], e)
                                }}>{e}</Button>))}
                              </Space>}
                            </div>
                            <Row gutter={[8, 24]}>
                              <Col {...layParams}>
                                <Form.Item rules={[{ required:true }]} name={[name,"cargo","category"]} label="Cargo Category" layout="vertical">
                                  <Cascader  maxTagCount="responsive" showCheckedStrategy={"SHOW_CHILD"} multiple placeholder="Select cargo category" options={cargoCategoryOptions.map((i: any) => ({ label:<p className='m-0'>{`${i.range[0]}-${i.range[1]}`} {i.label}</p>, value: i.label,children:(i.children?i.children:[]).map((p:any)=>({label:<p className='m-0'>{`${p.range} `} {p.label}</p>,value:p.label})) }))} />
                                </Form.Item>
                              </Col>
                              <Col {...layParams}>
                                <Form.Item rules={[{ required:true }]} name={[name,"cargo","hsCode"]} label="Cargo HS Code" layout="vertical">
                                  <Select placeholder="Search by HS code or type description" mode="tags" />
                                </Form.Item>
                              </Col>
                              <Col {...layParams}>
                                <Form.Item rules={[{ required:true }]} name={[name,"cargo","weight"]} label="Weight/Container (MT)" layout="vertical">
                                  <Input />
                                </Form.Item>
                              </Col>

                              {container[name]?.cargo?.type===strings.hazardous&&
                              <>
                                <Col {...layParams}>
                                  <Form.Item rules={[{ required:true }]} name={[name,"cargo","imoClass"]} label="IMO Class" layout="vertical">
                                    <Select options={imoClassOptions.map((i: any) => ({ label: i, value: i }))} placeholder="Select Class" />
                                  </Form.Item>
                                </Col>
                                <Col {...layParams}>
                                  <Form.Item rules={[{ required:true }]} name={[name,"cargo","unNumber"]} label="UN Number" layout="vertical">
                                    <Input />
                                  </Form.Item>
                                </Col>
                                <Col {...layParams}>
                                  <Form.Item rules={[{ required:true }]} name={[name,"cargo","packagingMaterial"]} label="Packaging Material" layout="vertical">
                                    <Input />
                                  </Form.Item>
                                </Col>
                                <Col {...layParams}>
                                  <CustomFormUploadV3 required f={form} name={[name,"cargo","msdsDocument"]} label={"Upload MSDS Document"} />
                                </Col>
                              </>
                              }


                              {container[name]?.type===strings.reeferContainers&&
                              <>
                                <Col {...layParams}>
                                  <Form.Item rules={[{ required:true }]} name={[name,"cargo","temperature"]} label="Temperature Degree (C)" layout="vertical">
                                    <Input />
                                  </Form.Item>
                                </Col>
                                <Col {...layParams}>
                                  <Form.Item  name={[name,"cargo","humidity"]} label="Humidity" layout="vertical">
                                    <Input />
                                  </Form.Item>
                                </Col>
                                <Col {...layParams}>
                                  <Form.Item rules={[{ required:true }]} name={[name,"cargo","remarks"]} label="Remarks" layout="vertical">
                                    <Input />
                                  </Form.Item>
                                </Col>
                              </>
                              }


                              {(container[name]?.type===strings.specialContainers && !container[name]?.name.includes("ISO")) &&
                              <>
                                <Col span={24}>
                                  <Space wrap>
                                    {gaugestatusOptions.map((e: string) => (<Button block shape="round" style={{ maxWidth: "12em", minWidth: "10em", textWrap: "wrap", lineHeight: 1 }} type={container[name]?.cargo?.gaugeStatus === e ? "primary" : "default"} onClick={() => {
                                      form.setFieldValue(["container",name,"cargo", "gaugeStatus"], e)
                                    }}>{e}</Button>))}
                                  </Space>
                                  <Form.Item name={[name,"cargo","gaugeStatus"]} layout="vertical" />
                                </Col>
                                <Col {...layParams}>
                                  <Form.Item name={[name,"cargo","dimensionsL"]} label="Dimensions(L) in mm" layout="vertical">
                                    <Input />
                                  </Form.Item>
                                </Col>
                                <Col {...layParams}>
                                  <Form.Item name={[name,"cargo","dimensionsB"]} label="Dimensions(B) in mm" layout="vertical">
                                    <Input />
                                  </Form.Item>
                                </Col>
                                <Col {...layParams}>
                                  <Form.Item name={[name,"cargo","dimensionsH"]} label="Dimensions(H) in mm" layout="vertical">
                                    <Input />
                                  </Form.Item>
                                </Col>
                              </>
                              }

                            </Row>
                            {
                              fields.length===iIndex+1&&
                                <Button onClick={()=>add({})} size="large"  className="my-5 py rounded-pill">
                                 <PlusCircleFilled className="text-primary1 fs-5" /> Add Container Type
                                </Button>
                            }
                          </div>
                        </Card>
                      </Col>
                    ))
                  }
                </>
              )}
            </Form.List>
          }
          <Col span={24}>
            <Card title="Add on Services at Port of loading [ POL ]" classNames={{body:"px-4"}} styles={{title:{color:strings.textPrimary1},header:{borderBottom:0},body:{padding:"10px"}}}
                extra={
                  modeOfShipment!==strings.crossBorderTrucking&&
                  <Form.Item label="" name={["addOnService","status"]} className="my-2">
                    <Switch checked={addOnService?.status} onChange={(e:any)=>form.setFieldValue("addOnService",{status:e})} />
                  </Form.Item>
                }
            >
              {addOnService?.status&&
              <div className='mb-5'>
                <Form.Item name={["addOnService", "services"]}>
                  <Space wrap>                    
                    <Space>
                      <Checkbox
                        checked={(addOnService?.services ? addOnService?.services : []).includes(strings.customsClearnace)}
                        onChange={() => form.setFieldValue(["addOnService", "services"], updateArray((addOnService?.services ? addOnService?.services : []), strings.customsClearnace))}
                      />
                      <Button
                        type={(addOnService?.services ? addOnService?.services : []).includes(strings.customsClearnace) ? "primary" : "default"}
                        onClick={() => form.setFieldValue(["addOnService", "services"], updateArray((addOnService?.services ? addOnService?.services : []), strings.customsClearnace))}
                      >{strings.customsClearnace}</Button>
                    </Space>
                    {modeOfShipment!==strings.crossBorderTrucking&&
                    <>
                      <Space>
                        <Checkbox
                          checked={(addOnService?.services ? addOnService?.services : []).includes(strings.cfsHandling)}
                          onChange={() => form.setFieldValue(["addOnService", "services"], updateArray((addOnService?.services ? addOnService?.services : []), strings.cfsHandling))}
                        />
                        <Button
                          type={(addOnService?.services ? addOnService?.services : []).includes(strings.cfsHandling) ? "primary" : "default"}
                          onClick={() => form.setFieldValue(["addOnService", "services"], updateArray((addOnService?.services ? addOnService?.services : []), strings.cfsHandling))}
                        >{strings.cfsHandling}</Button>
                      </Space>
                      <Space>
                        <Checkbox
                          checked={(addOnService?.services ? addOnService?.services : []).includes(strings.doorToPortTrucking)}
                          onChange={() => form.setFieldValue(["addOnService", "services"], updateArray((addOnService?.services ? addOnService?.services : []), strings.doorToPortTrucking))}
                        />
                        <Button
                          type={(addOnService?.services ? addOnService?.services : []).includes(strings.doorToPortTrucking) ? "primary" : "default"}
                          onClick={() => form.setFieldValue(["addOnService", "services"], updateArray((addOnService?.services ? addOnService?.services : []), strings.doorToPortTrucking))}
                        >{strings.doorToPortTrucking}</Button>
                      </Space>
                    </>
                    }
                  </Space>
                </Form.Item>
                {modeOfShipment!==strings.crossBorderTrucking&&
                <>
                  <Form.Item name={["addOnService", "eSeal"]} label="E Seal Facility" initialValue={false} className="my-2">
                    <Checkbox checked={addOnService?.eSeal === true} onChange={() => form.setFieldValue(["addOnService", "eSeal"], true)}>Yes</Checkbox>
                    <Checkbox checked={addOnService?.eSeal === false} onChange={() => form.setFieldValue(["addOnService", "eSeal"], false)}>No</Checkbox>
                  </Form.Item>
                  <Form.Item name={["addOnService", "stuffingLocationType"]} label="Stuffing Location Type" initialValue={false} style={{ width: "100%" }}>
                    {stuffingLocationTypeOptions.map((e: string) => (<Button block shape="round" style={{ maxWidth: "11em", margin: 2, lineHeight: 1, fontSize: "12px" }} type={addOnService?.stuffingLocationType === e ? "primary" : "default"} onClick={() => { form.setFieldValue(["addOnService", "stuffingLocationType"], e) }}>{e}</Button>))}
                  </Form.Item>
                </>
                }
                <p className='mt-3'> Place of Loading , Origin Factory / warehouse address</p>
                <Form.Item name={["addOnService", "placeOfLoading"]} noStyle />
                <Row gutter={[8, 0]} style={{ width: "100%" }}>
                  {modeOfShipment!==strings.crossBorderTrucking&&
                  <>
                    <Col {...layParams2}>
                      <CountrySelect
                        f={form}
                        name={["addOnService", "placeOfLoading", "country"]}
                        onChange={(e: any) => setCountryID(e)}
                        label=""
                      />
                    </Col>
                    <Col {...layParams2}>
                      <StateSelectV3
                        f={form}
                        name={["addOnService", "placeOfLoading", "state"]}
                        onChange={(e: any) => setStateID(e)}
                        label=""
                        countryId={countryID}
                      />
                    </Col>
                    <Col {...layParams2}>
                      <CitySelectV3
                        f={() => { }}
                        name={["addOnService", "placeOfLoading", "city"]}
                        onChange={(e: any) => form.setFieldValue(["addOnService", "placeOfLoading", "city"], e)}
                        label=""
                        stateId={stateID}
                      />
                    </Col>
                  </>
                  }
                  <Col span={24}>
                    <Form.Item name={["addOnService", "placeOfLoading", "address"]}>
                      <Input.TextArea
                        placeholder="Full Address"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <p className="my-2">Truck/Trailer Type</p>
                <Space direction="vertical">
                  {(addOnService?.truckType ? addOnService?.truckType : []).map((i: any, name: number) => (
                    <Space size={"large"} wrap>
                      <Input disabled value={i.type} style={{ width: "19.5em" }} />
                      <div className="border p-1 rounded">
                        <Button onClick={() => form.setFieldValue(["addOnService", "truckType", name, "quantity"], +addOnService?.truckType?.[name]?.quantity - 1 < 1 ? 1 : +addOnService?.truckType?.[name]?.quantity - 1)} size="small" type="primary">-</Button>
                        <span className="mx-3">{addOnService?.truckType?.[name]?.quantity ? addOnService?.truckType?.[name]?.quantity : 0}</span>
                        <Button onClick={() => form.setFieldValue(["addOnService", "truckType", name, "quantity"], +(addOnService?.truckType?.[name]?.quantity ? addOnService?.truckType?.[name]?.quantity : 0) + 1)} size="small" type="primary">+</Button>
                      </div>
                      <Button danger onClick={() => form.setFieldValue(
                        ["addOnService", "truckType"],
                        (addOnService?.truckType ? addOnService?.truckType : []).filter((i:any,index:number)=>index!==name)
                      )} size="small">X</Button>
                    </Space>
                  ))}
                </Space>
                <Form.Item className="my-3">
                  <Dropdown
                    menu={{ items: truckTrailerType.map(o => ({ ...o, children: o.children.map(p => ({ ...p, onClick: () => handleTruckTrailer(p.label) })) })) }}
                  >
                    <Button shape="round" >
                      <PlusCircleFilled className="text-primary1 fs-5" /> Add Truck/Trailer Type
                    </Button>
                  </Dropdown>
                </Form.Item>
                <Form.Item name={["addOnService", "insuranceRequired"]} label="Insurance Required" initialValue={false} className="mb-4" layout={modeOfShipment===strings.crossBorderTrucking?`vertical`:`horizontal`}>
                    <Checkbox checked={addOnService?.insuranceRequired === true} onChange={() => form.setFieldValue(["addOnService", "insuranceRequired"], true)}>Yes</Checkbox>
                    <Checkbox checked={addOnService?.insuranceRequired === false} onChange={() => form.setFieldValue(["addOnService", "insuranceRequired"], false)}>No</Checkbox>
                </Form.Item>
                {addOnService?.insuranceRequired &&
                  <Form.Item name={["addOnService", "cargoValue"]} className="col-12 col-md-10 col-lg-8 col-xl-6" label="Enter Cargo value" layout={modeOfShipment===strings.crossBorderTrucking?`vertical`:`horizontal`}>
                    <Input type="number" addonAfter="USD" />
                  </Form.Item>
                }
                <Form.Item name={["addOnService", "miscServices"]} label="Misc Services" layout="vertical" className='py-1 py-md-2'>
                  <Select mode="multiple" options={miscServices.map(i => ({ label: i, value: i }))} />
                </Form.Item>
                {(addOnService?.miscServices?addOnService?.miscServices:[]).includes(strings.others)&&
                  <Form.Item name={["addOnService", "miscOtherValue"]} rules={[{ required: true }]} label="Misc Other Service Name" className="py-1 py-md-3" layout="vertical">
                    <Input placeholder="Service Name" />
                  </Form.Item>
                }
              </div>}
            </Card>
          </Col>
          <Col span={24}>
            <Card title="Payment Terms" classNames={{body:"px-4"}} styles={{title:{color:strings.textPrimary1},header:{borderBottom:0}}}>
              <Form.Item  name={"paymentTerms"}>
                <Select placeholder="Select payment terms" options={paymentTermOptions.map(i=>({label:i.days,value:i.title}))} />
              </Form.Item>
              {
                paymentTerms===strings.others&&
                <Form.Item name={"otherPaymentTerms"} rules={[{required:true}]} label="Other Payment Terms" layout="vertical">
                  <Input placeholder="Payment Terms" />
                </Form.Item>
              }
            </Card>
          </Col>
          <Col span={24}>
            <Card title="Remarks" classNames={{body:"px-4"}} styles={{title:{color:strings.textPrimary1},header:{borderBottom:0},body:{padding:"10px"}}}>
              <Form.Item rules={[{required:true}]} name={"remarks"}>
                <Input.TextArea placeholder="Preferred Shipping lines (If any ) / Preferred routes (If any) etc ."/>
              </Form.Item>
            </Card>
          </Col>
          <Col span={24}>
            <Card title="Point of Contact" classNames={{body:"px-4"}} styles={{title:{color:strings.textPrimary1},header:{borderBottom:0},body:{padding:"10px"}}}
                extra={
                  <Form.Item label="Show contact details with RFQ" name="showContactDetails" className="my-2">
                  <Switch checkedChildren={"Yes"} unCheckedChildren={"No"} checked={showContact} onChange={(e:any)=>{
                    form.setFieldValue("showContact",e)
                    form.setFieldValue("pointOfContact",[])
                    }} />
                </Form.Item>
                }
            >
              {showContact&&<Form.List name={"pointOfContact"}>
                  {(fields, { add, remove }) => (
                    <>
                      {
                        fields.map(( field, iIndex ) => (
                          <div className='d-flex gap-2 my-3'>
                            <Form.Item label="Name" name={[field.name,"name"]} layout="vertical" rules={[{ required: true}]}>
                              <Input />
                            </Form.Item>
                            <Form.Item label="Mobile No." name={[field.name,"mobile"]} layout="vertical">
                              <Input />
                            </Form.Item>
                            <Form.Item label="Email ID" name={[field.name,"email"]} layout="vertical">
                              <Input />
                            </Form.Item>
                            <Form.Item label=" " layout="vertical">
                              <Button shape="circle" size="small" onClick={()=>remove(iIndex)} danger className='fw-bold' >-</Button>
                            </Form.Item>
                          </div>
                        ))
                          
                      }
                      <br />
                    <Button onClick={add}  className="my-4 rounded-pill">
                     <PlusCircleFilled className="text-primary1 fs-5" /> Add POC
                    </Button>
                    </>
                  )
                  }                    
                </Form.List>                                        }
            </Card>
          </Col>
          <Col span={24}>
            <div className="col-11 col-md-9 col-lg-7 col-xl-6 mx-auto d-flex justify-content-center">
              <Space size={"small"} className='border rounded-pill px-2'>
                <Form.Item label="RFQ closing date" required={false} name={"closingDate"} rules={[{required:true}]} className="my-0">
                  <DatePicker variant="borderless" onChange={(e,r)=>form.setFieldValue("closingDate",dayjs(r.toString()))} size="small" styles={{}} style={{ paddingRight: "2px", paddingLeft: "2px" }} className='rounded-pill' />
                </Form.Item>
              </Space>
            </div>
          </Col>
          <Col span={24}>
            <div className="col-11 col-md-9 col-lg-7 col-xl-6 mx-auto d-flex justify-content-center">
              <Typography.Link>Preview RFQ <EyeOutlined/></Typography.Link> 
            </div>
          </Col>
          <Col span={24}>
            <div className="col-11 col-md-9 col-lg-7 col-xl-6 mx-auto">
              <Button type="primary" htmlType="submit" block size="large" shape="round">Submit</Button>
            </div>
          </Col>
          
        </Row>  
      </Form>
    )
}

const layParams ={
  xs:24, sm:24, md:12, lg:11
}
const layParams2 ={
  xs:24, sm:24, md:8, lg:8
}
const layParams3 ={
  xs:24, sm:24, md:12, lg:8,xl:6
}