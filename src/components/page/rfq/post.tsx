"use client"
import React, { useContext, useEffect, useReducer, useState } from 'react'
import OnboardUserUI, { RFQUserUI } from '../onboarduser/layout'
import { Button, Card, Cascader, Checkbox, Col, ConfigProvider, DatePicker, Dropdown, Form, Input, Modal, Radio, Row, Select, Space, Switch, Typography, message } from 'antd'
import { strings } from '@/components/strings'
import { DimsOptions, WeightOptions, cargoCategoryOptions, crossBorderTruckCargoOptions, destuffingLocationTypeOptions, gaugestatusOptions, imoClassOptions, importIncotermOptions, incotermOptions, miscServices, modeOfShipmentOptions, packageTypeOptions, paymentTermOptions, reeferCargoOptions, reeferContainersOptions, specialCargoOptions, specialContainersOptions, standardCargoOptions, standardContainersOptions, stuffingLocationTypeOptions, tradeTypeOptions, truckTrailerType } from './options'
import { useForm, useWatch } from 'antd/es/form/Form'
import LocodeSelect from '@/components/supportcomponents/customcomponents/locodeselect'
import { CloseOutlined, DeleteFilled, EyeOutlined, PlusCircleFilled } from '@ant-design/icons'
import { CustomFormUpload, CustomFormUploadV3 } from '../onboarduser/freightforwader'
import { CBMCalculate, getCountryId, updateArray } from '@/components/utils'
import { CitySelectV2, CitySelectV3, CountrySelect, StateSelectV3 } from '@/components/supportcomponents/customcomponents/stateselect'
import dayjs from 'dayjs'
import { ContextRFQ, RFQSideUI, initialStateRFQ, reducerRFQ } from './sideUI'
import { postRfQ } from '@/network/endpoints'
import PostSuccessModal from '@/components/supportcomponents/rfq/postSuccessModal'
import { AuthHOC } from '@/components/supportcomponents/auth/UnAuthHOC'
import { RFQCard } from './search'


function PostRfQ() {
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [state, dispatch] = useReducer(reducerRFQ, initialStateRFQ);

  const updateCount = (e: number) => {
    if (e < currentStep) {
      setCurrentStep(e)
    }
  }
  return (
    <ContextRFQ.Provider value={{ state, dispatch }}>
      <RFQUserUI sideUI={<RFQSideUI step={currentStep} updateSteps={updateCount} />}>
        <PostRFQUI />
      </RFQUserUI>
    </ContextRFQ.Provider>

  )
}



export default AuthHOC(PostRfQ)
const defaultValue = {
  freeTimeDP: 10,
  freeTimeLP: 10,
  pointOfContact: [{}],
  readyDate: dayjs(Date.now()),
  container: [{
    typee: strings.standardContainers,
    name: strings['20ft'],
    quantity: 1,
    seats: 1,
    cargo: {
      typee: standardCargoOptions[0]
    }
  }],
  addOnService: {
    status: false
  },
  modeOfShipment: modeOfShipmentOptions[0],
}
const PostRFQUI = () => {
  const [formLoading, setformLoading] = useState(false)
  const [SuccessModal, setSuccessModal] = useState(false)

  const [prviewModal, setPrviewModal] = useState(false)
  const [formValue, setformValue] = useState({})

  const [Id, setId] = useState("")
  const { state, dispatch } = useContext(ContextRFQ)
  const [containerData, setContainerData] = useState<any>()
  const [form] = useForm()
  const modeOfShipment = useWatch("modeOfShipment",{ form, preserve: true })
  const tradeType = useWatch("tradeType",{ form, preserve: true })
  const incoterm = useWatch("incoterm", { form, preserve: true })
  const freeTimeLP = useWatch("freeTimeLP", { form, preserve: true })
  const freeTimeDP = useWatch("freeTimeDP", { form, preserve: true })
  const showContact = useWatch("showContact", { form, preserve: true })
  const container = useWatch("container", { form, preserve: true })
  const addOnService = useWatch("addOnService", { form, preserve: true })
  const placeOfLoading = useWatch("placeOfLoading", { form, preserve: true })
  const placeOfUnLoading = useWatch("placeOfUnLoading", { form, preserve: true })
  const cargoDetail = useWatch("cargoDetail",{ form, preserve: true })
  const paymentTerms = useWatch("paymentTerms",{ form, preserve: true })
  const dischargePort = useWatch("dischargePort",{ form, preserve: true })

  const [countryID, setCountryID] = useState("")
  const [stateID, setStateID] = useState("")

  const updateSteps = (stepTitle: string | React.ReactNode) => dispatch({ type: 'UPDATE_STEP_STATUS', payload: { title: stepTitle, status: 'finish', description: "Completed" } });
  const checkHSCode = (name: any, value: string[]) => /^-?\d+$/.test(value[value.length - 1]) ? form.setFieldValue(name, value) : (message.error("Enter Correct HS Code"), value.pop(), form.setFieldValue(name, value))
  const calculateCBM = (name: string[], typeArray: boolean = false) => {
    let unit = form.getFieldValue(["cargoDetail", "measurement1"])
    if (typeArray) {
      let v = form.getFieldValue(name)
      let cbm = 0;
      let gw = 0
      v.forEach((element: any) => {
        let { dimensions, weight } = element
        console.log(dimensions);

        cbm = +cbm + +CBMCalculate(
          dimensions.length ? dimensions.length : 1
          , dimensions.breadth ? dimensions.breadth : 1
          , dimensions.height ? dimensions.height : 1
          , unit)
        gw = +gw + +weight ? weight : 0
      });
      form.setFieldValue(["cargoDetail", "totalCBM"], cbm)
      // form.setFieldValue(["cargoDetail","totalGrossWeight"],gw)
      return

    }
    let l = form.getFieldValue([...name, ...["length"]]);
    let b = form.getFieldValue([...name, ...["breadth"]]);
    let h = form.getFieldValue([...name, ...["height"]]);

    if (l && b && h) {
      form.setFieldValue(["cargoDetail", "totalCBM"], CBMCalculate(l ? l : 1, b ? b : 1, h ? h : 1, unit))
    }
  }
  const calculateTotalGrossWeight = (name: string[]) => {
    let v = form.getFieldValue(name)
    let gw = 0
    v.forEach((element: any) => {
      let { dimensions, weight } = element
      gw = +gw + +(weight ? weight : 0)
    });
    form.setFieldValue(["cargoDetail", "totalGrossWeight"], gw)
    return
  }
  useEffect(() => {

    if (modeOfShipment) {
      updateSteps(initialStateRFQ[0].title)
    }
    if (paymentTerms) {
      updateSteps(initialStateRFQ[6].title)
    }
    if (form.getFieldValue("remarks")) {
      updateSteps(initialStateRFQ[7].title)
    }
    if (modeOfShipment === strings.seaFCL) {
      if (container.length > 0) {
        if (container[0]?.cargo?.weight && container[0]?.cargo?.typee && container[0]?.quantity) {
          updateSteps(initialStateRFQ[4].title)
        }
      }
    }
    if (cargoDetail?.typee && cargoDetail?.truckType) {
      updateSteps(initialStateRFQ[4].title)
    }
    if (showContact) {
      let pointOfContact = form.getFieldValue("pointOfContact") ? form.getFieldValue("pointOfContact") : []
      if (pointOfContact.length > 0) {
        if (pointOfContact[0]?.name && pointOfContact[0]?.email && pointOfContact[0]?.mobile) {
          updateSteps(initialStateRFQ[8].title)
        }
      }
    }
    if (addOnService?.status) {
      if (addOnService?.truckType?.length > 0) {
        updateSteps(initialStateRFQ[5].title)
      }
      updateSteps(initialStateRFQ[5].title)
    }
    if (tradeType) updateSteps(initialStateRFQ[1].title)
    if (incoterm) updateSteps(initialStateRFQ[2].title)
    let o = form.getFieldsValue(["dischargePort", "loadingPort"])
    if (o.dischargePort !== undefined && o.loadingPort !== undefined) updateSteps(initialStateRFQ[3].title)
    o = form.getFieldsValue(["placeOfLoading", "placeOfUnLoading"])
    if (o.placeOfLoading !== undefined && o.placeOfUnLoading !== undefined) updateSteps(initialStateRFQ[3].title)
    if (tradeType) updateSteps(initialStateRFQ[1].title)
    setformValue(i=>({...form.getFieldsValue()}))
  }, [
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
    dischargePort
  ])
  const handleTruckTrailer = (e: string) => {

    let a = [...(addOnService?.truckType ? addOnService?.truckType : [])]
    form.setFieldValue(["addOnService", "truckType"], [...a, ...[{ typee: e, quantity: 1 }]])
  }
  const onFinished = () => {
    console.log("ca");
    
    let formValues = form.getFieldsValue()
    setformLoading(true)
    let e = { ...formValues }
    console.log(e);

    postRfQ(e).then(r => {
      console.log(r);
      if (r.code) {
        setSuccessModal(true)
        setId(r.data._id)
      }

    })
      .catch(r => {
        console.log({ error: r.message });

      }).finally(() => { setformLoading(false) });
  }

  const FinishFailed = (errorFields: any) => {
    if (errorFields?.errorFields.length < 3) {
      errorFields?.errorFields.forEach((field: any) => {
        message.error(field.errors[0])
      })
    }
  }
  useEffect(() => {
    setCountryID(`${getCountryId(placeOfLoading?.country)}`);
  }, [placeOfLoading])
  useEffect(() => {
    setCountryID(`${getCountryId(placeOfUnLoading?.country)}`);
  }, [placeOfUnLoading])  
  useEffect(() => {
    form.setFieldsValue(defaultValue)
  }, [])
  // useEffect(() => {
  //   console.log(formValue);    
  // }, [formValue])
  return (
    <>
      <Form
        form={form}
        onFinish={onFinished}
        onFinishFailed={FinishFailed}
        layout='vertical'
        
      >
        <Row gutter={[16, 16]} justify="space-around">
          <Col span={24}>
            <Card title="Mode of Shipment" styles={{ title: { color: strings.textPrimary1 }, header: { borderBottom: 0 }, body: { padding: "10px" } }}>
              <Row gutter={[16, 16]}>
                {modeOfShipmentOptions.map((e: string) => (
                  <Col {...layParams3} key={e}>
                    <Button size="large" block shape="round" style={{ textWrap: "wrap", lineHeight: 1 }} type={modeOfShipment === e ? "primary" : "default"} onClick={() => {
                      form.setFieldValue("modeOfShipment", e)
                      form.setFieldValue("cargoDetail", {})
                    }}>{e}</Button>
                  </Col>
                ))}
                <Form.Item rules={[{ required: true, message: "Field Required" }]} name={"modeOfShipment"} />
              </Row>
            </Card>
          </Col>
          <Col span={24}>
            <Card title="Trade Type" styles={{ title: { color: strings.textPrimary1 }, header: { borderBottom: 0 }, body: { padding: "10px" } }}>
              <Row gutter={[16, 16]}>
                {tradeTypeOptions.map((e: string) => (<Col key={e} {...layParams3}><Button size="large" block shape="round" style={{ textWrap: "wrap", lineHeight: 1 }} type={tradeType === e ? "primary" : "default"} onClick={() => {
                  form.setFieldValue("tradeType", e)
                  form.setFieldValue(["addOnService", "status"], true)
                  form.setFieldValue("incoterm", e !== strings.import ? incotermOptions[0] : importIncotermOptions[0])

                }}>{e}</Button></Col>))}
              </Row>
              <Form.Item rules={[{ required: true }]} name={"tradeType"} />
            </Card>
          </Col>
          <Col span={24}>
            <Card title="Incoterm" styles={{ title: { color: strings.textPrimary1 }, header: { borderBottom: 0 }, body: { padding: "10px" } }}>
              {(tradeType === strings.export || !tradeType) &&
                <Row gutter={[16, 16]} justify={"center"}>
                  {incotermOptions.map((e: string) => (<Col key={e} {...layParams3}><Button size="large" block shape="round" style={{ textWrap: "wrap", lineHeight: 1 }} type={incoterm === e ? "primary" : "default"} onClick={() => { form.setFieldValue("incoterm", e) }}>{e}</Button></Col>))}
                </Row>
              }
              {tradeType === strings.import &&
                <Row gutter={[16, 16]} justify={"center"}>
                  {importIncotermOptions.map((e: string) => (<Col key={e} {...layParams3}><Button size="large" block shape="round" style={{ textWrap: "wrap", lineHeight: 1 }} type={incoterm === e ? "primary" : "default"} onClick={() => { form.setFieldValue("incoterm", e) }}>{e}</Button></Col>))}
                </Row>
              }
              <Form.Item rules={[{ required: true }]} name={"incoterm"} />
            </Card>
          </Col>
          <Col span={24}>
            <Card title="Port Pair" styles={{ title: { color: strings.textPrimary1 }, header: { borderBottom: 0 } }}
              extra={modeOfShipment !== strings.seaFCL &&
                (<Space size={"small"} >
                  <Form.Item className='border rounded-pill px-2 mt-1' label="Cargo Readiness Date" required={false} name={"readyDate"} rules={[{ required: true }]} layout="horizontal">
                    <DatePicker onChange={(e, r) => form.setFieldValue("readyDate", dayjs(r.toString()))} size="small" styles={{}} style={{ border: 0, fontSize: "10px", paddingRight: "2px", paddingLeft: "2px" }} className='rounded-pill' />
                  </Form.Item>
                </Space>)}
            >
              <Row justify={"space-between"} gutter={[8, 8]} className="ms-2 my-2">
                <Col span={24}>
                  {
                    ((tradeType === strings.import && (incoterm === strings.EXW || incoterm === strings.FCA)) ||
                      modeOfShipment === strings.crossBorderTrucking
                    ) &&
                    (
                      <>
                        <p>Place of Loading , Origin Factory / warehouse address</p>
                        <Row gutter={[8, 0]} justify={"center"} className='px-2' style={{ width: "90%" }}>
                          <Col {...layParams2}>
                            <CountrySelect
                              f={form}
                              name={["placeOfLoading", "country"]}
                              onChange={(e: any) => { setCountryID(e); form.setFieldsValue({ placeOfLoading: { state: null, city: null, address: null } }) }}
                              required={true}
                            />
                          </Col>
                          <Col {...layParams2}>
                            <StateSelectV3
                              f={form}
                              name={["placeOfLoading", "state"]}
                              onChange={(e: any) =>{
                                 setStateID(e)
                                 form.setFieldValue(["placeOfLoading", "city"],null)
                                }}
                              label=""
                              countryId={`${getCountryId(placeOfLoading?.country)}`}
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
                            <Form.Item name={["placeOfLoading", "address"]} rules={[{ required: true }]}>
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
                {modeOfShipment !== strings.crossBorderTrucking &&
                  <>
                    <Col {...layParams} lg={13}>
                      <Form.Item label="Port of Loading" name={"loadingPort"} layout="vertical" rules={[{ required: true }]}>
                        <LocodeSelect
                          change={(e: any) => form.setFieldValue("loadingPort", e)}
                          wholeValue={(e: any) => form.setFieldValue("loadingPortObj", e?.title)}
                          changeLocation={(country: string, state: string) => {
                            form.setFieldValue(["placeOfLoading", "country"], country)
                            // form.setFieldValue(["placeOfLoading", "state"], state)
                            form.setFieldValue(["addOnService", "placeOfLoading"], {country,state:null,city:null})

                          }}
                        />
                      </Form.Item>
                      <Form.Item name={"loadingPortObj"} noStyle />
                      <Form.Item name={"placeOfLoading"} noStyle />
                    </Col>
                    <Col {...layParams}>
                      {(modeOfShipment === strings.seaFCL || modeOfShipment === strings.crossBorderTrucking) &&
                        <Space>
                          <Form.Item label={<Typography.Text >Free time required at POL</Typography.Text>} layout="vertical">
                            <Space className='border rounded p-1'>
                              <Button onClick={() => form.setFieldValue("freeTimeLP", +freeTimeLP - 1 < 1 ? 1 : +freeTimeLP - 1)} size="small" type="primary">-</Button>
                              <span className="mx-3" style={{ textWrap: "nowrap" }}>
                                <Form.Item name={"freeTimeLP"} noStyle>
                                  <Input  type="number" className="border-0" style={{ display: "contents" }} />
                                </Form.Item>
                                {freeTimeLP} days
                              </span>
                              <Button onClick={() => form.setFieldValue("freeTimeLP", +freeTimeLP + 1)} size="small" type="primary">+</Button>
                            </Space>
                          </Form.Item>
                        </Space>}
                    </Col>
                    <Col {...layParams} lg={13}>
                      <Form.Item name={"dischargePort"} label={"Port of Discharge"} layout="vertical" rules={[{ required: true }]}>
                        <LocodeSelect
                          change={(e: any) => form.setFieldValue("dischargePort", e)}
                          wholeValue={(e: any) => form.setFieldValue("dischargePortObj", e?.title)}
                          changeLocation={(country: string, state: string) => {
                            form.setFieldsValue({ placeOfUnLoading: { country } })
                            form.setFieldValue(["addOnService", "placeOfUnLoading"], {country,state:"",city:""})
                          }}
                        />
                      </Form.Item>
                      <Form.Item name={"dischargePortObj"} noStyle />
                      <Form.Item name={"placeOfUnLoading"} noStyle />
                    </Col>
                    <Col {...layParams}>
                      {(modeOfShipment === strings.seaFCL || modeOfShipment === strings.crossBorderTrucking) &&
                        <Space>
                          <Form.Item name={"freeTimeDP"} label={<Typography.Text >Free time required at POD</Typography.Text>} layout="vertical">
                            <Space className='border rounded p-1'>
                              <Button onClick={() => form.setFieldValue("freeTimeDP", +freeTimeDP - 1 < 1 ? 1 : +freeTimeDP - 1)} size="small" type="primary">-</Button>
                              <span className="mx-3" style={{ textWrap: "nowrap" }}>
                                <Form.Item name={"freeTimeDP"} noStyle>
                                  <Input type="number" className="border-0" style={{ display: "contents" }} />
                                </Form.Item>
                                {freeTimeDP} days
                              </span>
                              <Button onClick={() => form.setFieldValue("freeTimeDP", +freeTimeDP + 1)} size="small" type="primary">+</Button>
                            </Space>
                          </Form.Item>
                        </Space>}
                    </Col>
                  </>
                }
                <Col span={24}>
                  {(
                    incoterm === strings.dap ||
                    incoterm === strings.dpu ||
                    incoterm === strings.ddp ||
                    modeOfShipment === strings.crossBorderTrucking
                  ) &&
                    <>
                      <p>Place of Unloading , Destination Factory / warehouse address</p>
                      <Row gutter={[8, 0]} justify={"center"} className='px-2' style={{ width: "90%" }}>
                        <Col {...layParams2}>
                          <CountrySelect
                            f={form}
                            name={["placeOfUnLoading", "country"]}
                            onChange={(e: any) => { setCountryID(i=>e); form.setFieldsValue({ placeOfUnLoading: { state: null, city: null, address: null } }) }}
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
                          <Form.Item name={["placeOfUnLoading", "address"]} rules={[{ required: true }]}>
                            <Input.TextArea
                              placeholder="Full Address"
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    </>
                  }
                </Col>
              </Row>

            </Card>
          </Col>
          {//CargoDetail
            (modeOfShipment === strings.seaLCL || modeOfShipment === strings.air) &&
            <Col span={24}>
              <Card title="Cargo Details" styles={{ title: { color: strings.textPrimary1 }, header: { borderBottom: 0 } }} >
                <Row gutter={[8, 0]} className='mx-1 mx-md-2'>
                  <Col {...layParams}>
                    <Form.Item name={"cargoDetail"}>
                      {specialCargoOptions.map((e: string) => (<Button key={e} block shape="round" style={{ maxWidth: "12em", minWidth: "10em", textWrap: "wrap", lineHeight: 1 }} type={cargoDetail?.typee === e ? "primary" : "default"} onClick={() => {
                        form.setFieldValue(["cargoDetail", "typee"], e)
                      }}>{e}</Button>))}
                    </Form.Item>
                  </Col>
                  <Col {...layParams}>
                    <Form.Item name={["cargoDetail", "packageType"]} label="Enter details by" layout="vertical">
                      <Radio.Group options={packageTypeOptions} value={cargoDetail?.packageType} onChange={(e) => {
                        form.setFieldValue(["cargoDetail", "packageType"], e.target.value)
                        if (e.target.value === strings.totalCargo) {
                          form.setFieldValue(["cargoDetail", "packageQuantity"], 0)
                        }
                      }} />
                    </Form.Item>
                  </Col>
                  <Col span={22}>
                    <Form.Item name={["cargoDetail", "category"]} label="Cargo Category" layout="vertical">
                      <Select suffixIcon={<></>} optionFilterProp="label" mode="multiple" placeholder="Select cargo category" options={cargoCategoryOptions.map((i: any) => ({ label: `${i.range[0]}-${i.range[1]} ${i.label}`, options: (i.children ? i.children : []).map((p: any) => ({ label: `${p.range} ${p.label}`, value: `${p.range} ${p.label}` })) }))} />
                    </Form.Item>
                  </Col>
                  <Col {...layParams}>
                    <Form.Item name={["cargoDetail", "hsCode"]} label="Cargo HS Code" layout="vertical">
                      <Select placeholder="Search by HS code or type description" notFoundContent="Enter New HS Code"
                        onChange={e => checkHSCode(["cargoDetail", "hsCode"], e)} mode="tags" />
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
                    <Form.Item label="Units of Measurement" layout="vertical" name={"cargoDetail"}>
                      <Space.Compact style={{ width: "100%" }}>
                        <Form.Item name={"measurement1"} noStyle>
                          <Select options={DimsOptions.map(d => ({ labe: d, value: d }))} placeholder="Dimension" onChange={e => form.setFieldValue(["cargoDetail", "measurement1"], e)} />
                        </Form.Item>
                        <Form.Item name={"measurement2"} noStyle>
                          <Select options={WeightOptions.map(d => ({ labe: d, value: d }))} placeholder="Weight" onChange={e => form.setFieldValue(["cargoDetail", "measurement2"], e)} />
                        </Form.Item>
                      </Space.Compact>
                    </Form.Item>
                  </Col>
                  {
                    Array.from(Array(cargoDetail?.packageQuantity ? cargoDetail?.packageQuantity : 0)).map((o, p) => (
                      <Col span={24} key={p + "qq"}>
                        <Row gutter={[8, 8]}>
                          <Col {...layParams}>
                            <Form.Item label={`Package ${p + 1} Dimensions (in ${cargoDetail?.measurement1 ? cargoDetail?.measurement1 : "MM"})`} rules={[{ required: true }]} layout="vertical">
                              <Space.Compact>
                                <Form.Item name={["cargoDetail", "packageDetail", p, "dimensions", "length"]}>
                                  <Input placeholder="L" style={{ textAlign: "center" }} onChange={() => calculateCBM(["cargoDetail", "packageDetail"], true)} />
                                </Form.Item>
                                <Form.Item name={["cargoDetail", "packageDetail", p, "dimensions", "breadth"]}>
                                  <Input placeholder="B" style={{ textAlign: "center" }} onChange={() => calculateCBM(["cargoDetail", "packageDetail"], true)} />
                                </Form.Item>
                                <Form.Item name={["cargoDetail", "packageDetail", p, "dimensions", "height"]}>
                                  <Input placeholder="H" style={{ textAlign: "center" }} onChange={() => calculateCBM(["cargoDetail", "packageDetail"], true)} />
                                </Form.Item>
                              </Space.Compact>
                            </Form.Item>
                          </Col>
                          <Col {...layParams}>
                            <Form.Item name={["cargoDetail", "packageDetail", p, "weight"]} label={`Gross Weight/Package`} rules={[{ required: true }]} layout="vertical">
                              <Input placeholder="Weight" style={{ textAlign: "center" }} onChange={() => calculateTotalGrossWeight(["cargoDetail", "packageDetail"])} />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Col>
                    ))
                  }
                  <Col {...layParams}>
                    <Form.Item name={["cargoDetail", "totalCBM"]} rules={[{ required: true }]} label="Total CBM" layout="vertical">
                      <Input placeholder="Enter Here" />
                    </Form.Item>
                  </Col>
                  <Col {...layParams}>
                    <Form.Item name={["cargoDetail", "totalGrossWeight"]} rules={[{ required: true }]} label="Total Gross Weight" layout="vertical">
                      <Input placeholder="Kg" />
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
                  <Form.Item name={["cargoDetail", "typee"]}>
                    <Space wrap>
                      {crossBorderTruckCargoOptions.map((e: string) => (<Button key={e} block shape="round" style={{ maxWidth: "12em", minWidth: "10em", textWrap: "wrap", lineHeight: 1 }} type={cargoDetail?.typee === e ? "primary" : "default"} onClick={() => {
                        form.setFieldValue(["cargoDetail", "typee"], e)
                        form.setFieldValue(["cargoDetail", "totalCBM"], undefined)
                      }}>{e}</Button>))}
                    </Space>
                  </Form.Item>
                </div>
                <Row gutter={[8, 0]}>
                  <Col span={22}>
                    <Form.Item rules={[{ required: true }]} name={["cargoDetail", "category"]} label="Cargo Category" layout="vertical">
                      <Select suffixIcon={<></>} optionFilterProp="label" mode="multiple" placeholder="Select cargo category" options={cargoCategoryOptions.map((i: any) => ({ label: `${i.range[0]}-${i.range[1]} ${i.label}`, options: (i.children ? i.children : []).map((p: any) => ({ label: `${p.range} ${p.label}`, value: `${p.range} ${p.label}` })) }))} />
                    </Form.Item>
                  </Col>
                  <Col {...layParams}>
                    <Form.Item name={["cargoDetail", "hsCode"]} label="Cargo HS Code" layout="vertical">
                      <Select placeholder="Search by HS code or type description" notFoundContent="Enter New HS Code"
                        value={["cargoDetail", "hsCode"]}
                        onChange={e => checkHSCode(["cargoDetail", "hsCode"], e)} mode="tags" />
                    </Form.Item>
                  </Col>
                  <Col {...layParams}>
                    <Form.Item rules={[{ required: true }]} name={["cargoDetail", "weight"]} label="Total Weight" layout="vertical">
                      <Input  />
                    </Form.Item>
                  </Col>


                  {(cargoDetail?.typee === strings.odc || cargoDetail?.typee === strings.general) &&
                    <Col {...layParams}>
                      <Form.Item rules={[{ required: true }]} name={["cargoDetail", "totalCBM"]} label="Total CBM" layout="vertical">
                        <Input />
                      </Form.Item>
                    </Col>
                  }
                  {cargoDetail?.typee === strings.hazardous &&
                    <>
                      <Col {...layParams}>
                        <Form.Item rules={[{ required: true }]} name={["cargoDetail", "imoClass"]} label="IMO Class" layout="vertical">
                          <Select options={imoClassOptions.map((i: any) => ({ label: i, value: i }))} placeholder="Select Class" />
                        </Form.Item>
                      </Col>
                      <Col {...layParams}>
                        <Form.Item rules={[{ required: true }]} name={["cargoDetail", "unNumber"]} label="UN Number" layout="vertical">
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col {...layParams}>
                        <Form.Item rules={[{ required: true }]} name={["cargoDetail", "packagingMaterial"]} label="Packaging Material" layout="vertical">
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col {...layParams}>
                        <CustomFormUploadV3 f={form} name={["cargoDetail", "msdsDocument"]} label={"Upload MSDS Document"} />
                      </Col>
                    </>
                  }
                  {
                    cargoDetail?.typee === strings.odc &&
                    <>
                      <Col {...layParams}>
                        <Form.Item label={`Total Dimensions (in MT)`} rules={[{ required: true }]} layout="vertical">
                          <Space.Compact>
                            <Form.Item name={["cargoDetail", "dimensions", "length"]}>
                              <Input placeholder="L" style={{ textAlign: "center" }} />
                            </Form.Item>
                            <Form.Item name={["cargoDetail", "dimensions", "breadth"]}>
                              <Input placeholder="B" style={{ textAlign: "center" }} />
                            </Form.Item>
                            <Form.Item name={["cargoDetail", "dimensions", "height"]}>
                              <Input placeholder="H" style={{ textAlign: "center" }} onChange={() => calculateCBM(["cargoDetail", "dimensions"])} />
                            </Form.Item>
                          </Space.Compact>
                        </Form.Item>
                      </Col>
                    </>
                  }
                  <Col span={24}>
                    <Form.List name={["cargoDetail", "truckType"]}>
                      {(fields, { add, remove }) => (
                        <Row gutter={[8, 0]}>
                          <Col span={24}>
                            <h6 className="text-primary2">Truck Details</h6>
                            <Form.Item name={["cargoDetail", "truckType"]} label="Truck/Trailer Type" rules={[{
                              required: cargoDetail?.truckType ? false : true
                            }]}>
                              {fields.map((field, iIndex) => (
                                <Row gutter={[8, 0]} key={iIndex + "Ctt"}>
                                  <Col {...layParams} lg={13} md={18}  >
                                    <Form.Item rules={[{ required: true }]} name={[field.name, "typee"]} layout="vertical">
                                      <Input value={cargoDetail?.truckType?.[field.name]?.typee} />
                                    </Form.Item>
                                  </Col>
                                  <Col sm={20} md={20} lg={10} xl={9} xxl={8}>
                                    <Form.Item rules={[{ required: true }]} name={[field.name, "quantity"]} layout="vertical">
                                      <Space>
                                        <Space.Compact className='rounded border d-flex align-items-center px-1'>
                                          <Button onClick={() => form.setFieldValue(["cargoDetail", "truckType", field.name, "quantity"], +(cargoDetail?.truckType?.[field.name]?.quantity == 1 ? 1 : +cargoDetail?.truckType?.[field.name]?.quantity - 1))} size="small" type="primary">-</Button>
                                          <Input placeholder="Enter Width" className="border-0 text-center" value={cargoDetail?.truckType?.[field.name]?.quantity ? cargoDetail?.truckType?.[field.name]?.quantity : 0} />
                                          <Button onClick={() => form.setFieldValue(["cargoDetail", "truckType", field.name, "quantity"], +(cargoDetail?.truckType?.[field.name]?.quantity ? cargoDetail?.truckType?.[field.name]?.quantity : 0) + 1)} size="small" type="primary">+</Button>
                                        </Space.Compact>
                                        <Button onClick={() => remove(iIndex)} size="small" shape="round"><CloseOutlined className="text-danger fw-bold" /></Button>
                                      </Space>
                                    </Form.Item>
                                  </Col>
                                </Row>
                              ))}
                            </Form.Item>
                          </Col>
                          <Dropdown
                            menu={{ items: truckTrailerType.map(o => ({ ...o, children: o.children.map(p => ({ ...p, onClick: () => add({ typee: p.label, quantity: 1 }) })) })) }}
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
          {/* Contaioner Section */}
          {modeOfShipment === strings.seaFCL &&
            <Col span={24}>
              <Form.List name={"container"}>
                {(fields, { add, remove }) => (
                  <Row gutter={[8, 8]} className='px-1'>
                    {
                      fields.map(({ key, name }, iIndex) => (
                        <Col span={24} key={iIndex + "cnt"}>
                          <Card
                            title="Container Details"
                            styles={{ title: { color: strings.textPrimary1 }, header: { borderBottom: 0 }, body: { padding: "10px" } }}
                            extra={
                              iIndex === 0 ?
                                (<Space size={"small"} className='pt-2'>
                                  <Form.Item className='border rounded-pill px-2' label="Cargo Readiness Date" required={false} name={[name, "readyDate"]} rules={[{ required: true }]} layout="horizontal">
                                    <DatePicker onChange={(e, r) => form.setFieldValue("readyDate", dayjs(r.toString()))} size="small" styles={{}} style={{ border: 0, fontSize: "10px", paddingRight: "2px", paddingLeft: "2px" }} className='rounded-pill' />
                                  </Form.Item>
                                </Space>) :
                                <Button onClick={() => remove(iIndex)} shape="round">Delete <CloseOutlined className="text-danger fw-bold" /> </Button>
                            }
                          >
                            <Row className="m-3" gutter={[8, 8]}>
                              <Col span={24}>
                                <Form.Item label={<p className='m-0 text-primary2'>Standard Dry Containers</p>}>
                                  <Row gutter={[16, 16]}>
                                    {standardContainersOptions.map((e: string) => (<Col key={e} {...layParams3}><Button size="large" block shape="round" style={{ textWrap: "wrap", lineHeight: 1 }} type={container[name]?.name === e ? "primary" : "default"} onClick={() => {
                                      form.setFieldValue(["container", name, "typee"], strings.standardContainers)
                                      form.setFieldValue(["container", name, "name"], e)
                                      form.setFieldValue(["container", name, "cargo"], {
                                        typee: standardCargoOptions[0],
                                        category: container[name]?.cargo?.category,
                                        hsCode: container[name]?.cargo?.hsCode,
                                        weight: container[name]?.cargo?.weight,
                                      })
                                    }}>{e}</Button></Col>))}
                                  </Row>
                                </Form.Item>
                              </Col>
                              <Col span={24}>
                                <Form.Item label={`Special Containers`} layout="vertical">
                                  <Row gutter={[16, 16]}>
                                    {specialContainersOptions.map((e: string) => (<Col key={e} {...layParams3}><Button size="large" block shape="round" style={{ textWrap: "wrap", lineHeight: 1 }} type={container[name]?.name === e ? "primary" : "default"} onClick={() => {
                                      form.setFieldValue(["container", name, "typee"], strings.specialContainers)
                                      form.setFieldValue(["container", name, "name"], e)
                                      form.setFieldValue(["container", name, "cargo"], {
                                        typee: specialCargoOptions[0],
                                        category: container[name]?.cargo?.category,
                                        hsCode: container[name]?.cargo?.hsCode,
                                        weight: container[name]?.cargo?.weight,
                                      })
                                    }}>{e}</Button></Col>))}
                                  </Row>
                                </Form.Item>
                              </Col>
                              <Col span={24}>
                                <Form.Item label={<p className='m-0 text-primary2'>Reefer Containers</p>}>
                                  <Row gutter={[16, 16]}>
                                    {reeferContainersOptions.map((e: string) => (<Col key={e} {...layParams3}><Button size="large" block shape="round" style={{ textWrap: "wrap", lineHeight: 1 }} type={container[name]?.name === e ? "primary" : "default"} onClick={() => {
                                      form.setFieldValue(["container", name, "typee"], strings.reeferContainers)
                                      form.setFieldValue(["container", name, "name"], e)
                                      form.setFieldValue(["container", name, "cargo"], {
                                        typee: reeferCargoOptions[0],
                                        category: container[name]?.cargo?.category,
                                        hsCode: container[name]?.cargo?.hsCode,
                                        weight: container[name]?.cargo?.weight,
                                      })
                                    }}>{e}</Button></Col>))}
                                  </Row>
                                </Form.Item>
                              </Col>
                              <Col span={24}>
                                <Form.Item label={`Number of Container(s)`} name={[name, "quantity"]} rules={[{ required: true }]} layout="vertical">
                                  <Space className='border rounded p-1'>
                                    <Button onClick={() => form.setFieldValue(["container", name, "quantity"], +container[name]?.quantity - 1 < 1 ? 1 : +container[name]?.quantity - 1)} size="small" type="primary">-</Button>
                                    <span className="mx-4">{container[name]?.quantity ? container[name]?.quantity : 0}</span>
                                    <Button onClick={() => form.setFieldValue(["container", name, "quantity"], +(container[name]?.quantity ? container[name]?.quantity : 0) + 1)} size="small" type="primary">+</Button>
                                  </Space>
                                </Form.Item>
                              </Col>
                              <Col span={24}>
                                <div className=" d-flex flex-column gap-2 my-2">
                                  <h6 className="text-primary2 mb-2">Cargo Details</h6>
                                  {container[name]?.typee === strings.standardContainers && <Space wrap>
                                    {standardCargoOptions.map((e: string) => (<Button key={e} block shape="round" style={{ maxWidth: "12em", minWidth: "10em", textWrap: "wrap", lineHeight: 1 }} type={container[name]?.cargo?.typee === e ? "primary" : "default"} onClick={() => {
                                      form.setFieldValue(["container", name, "cargo", "typee"], e)
                                    }}>{e}</Button>))}
                                  </Space>}
                                  {container[name]?.typee === strings.specialContainers && <Space wrap>
                                    {specialCargoOptions.map((e: string) => (<Button key={e} block shape="round" style={{ maxWidth: "12em", minWidth: "10em", textWrap: "wrap", lineHeight: 1 }} type={container[name]?.cargo?.typee === e ? "primary" : "default"} onClick={() => {
                                      form.setFieldValue(["container", name, "cargo", "typee"], e)
                                    }}>{e}</Button>))}
                                  </Space>}
                                  {container[name]?.typee === strings.reeferContainers && <Space wrap>
                                    {reeferCargoOptions.map((e: string) => (<Button key={e} block shape="round" style={{ maxWidth: "12em", minWidth: "10em", textWrap: "wrap", lineHeight: 1 }} type={container[name]?.cargo?.typee === e ? "primary" : "default"} onClick={() => {
                                      form.setFieldValue(["container", name, "cargo", "typee"], e)
                                    }}>{e}</Button>))}
                                  </Space>}
                                </div>
                              </Col>
                              <Col span={24}>
                                <Row gutter={[8, 0]}>
                                  <Col span={22} sm={24}>
                                    <Form.Item rules={[{ required: true }]} name={[name, "cargo", "category"]} label="Cargo Category" layout="vertical">
                                      <Select suffixIcon={<></>} optionFilterProp="label" mode="multiple" placeholder="Select cargo category" options={cargoCategoryOptions.map((i: any) => ({ label: `${i.range[0]}-${i.range[1]} ${i.label}`, options: (i.children ? i.children : []).map((p: any) => ({ label: `${p.range} ${p.label}`, value: `${p.range} ${p.label}` })) }))} />
                                    </Form.Item>
                                  </Col>
                                  <Col {...layParams}>
                                    <Form.Item name={[name, "cargo", "hsCode"]} label="Cargo HS Code" layout="vertical">
                                      <Select suffixIcon={<></>} showSearch={false} placeholder="Enter HS code " notFoundContent=""
                                        onChange={e => checkHSCode(["container", name, "cargo", "hsCode"], e)} mode="tags" />
                                    </Form.Item>
                                  </Col>
                                  <Col {...layParams}>
                                    <Form.Item rules={[{ required: true }]} name={[name, "cargo", "weight"]} label="Weight/Container (MT)" layout="vertical">
                                      <Input type={"number"} />
                                    </Form.Item>
                                  </Col>

                                  {container[name]?.cargo?.typee === strings.hazardous &&
                                    <>
                                      <Col {...layParams}>
                                        <Form.Item rules={[{ required: true }]} name={[name, "cargo", "imoClass"]} label="IMO Class" layout="vertical">
                                          <Select options={imoClassOptions.map((i: any) => ({ label: i, value: i }))} placeholder="Select Class" />
                                        </Form.Item>
                                      </Col>
                                      <Col {...layParams}>
                                        <Form.Item rules={[{ required: true }]} name={[name, "cargo", "unNumber"]} label="UN Number" layout="vertical">
                                          <Input />
                                        </Form.Item>
                                      </Col>
                                      <Col {...layParams}>
                                        <Form.Item rules={[{ required: true }]} name={[name, "cargo", "packagingMaterial"]} label="Packaging Material" layout="vertical">
                                          <Input />
                                        </Form.Item>
                                      </Col>
                                      <Col {...layParams}>
                                        <CustomFormUploadV3 required f={form} name={[name, "cargo", "msdsDocument"]} label={"Upload MSDS Document"} />
                                      </Col>
                                    </>
                                  }


                                  {container[name]?.typee === strings.reeferContainers &&
                                    <>
                                      <Col {...layParams}>
                                        <Form.Item rules={[{ required: true }]} name={[name, "cargo", "temperature"]} label="Temperature Degree (C)" layout="vertical">
                                          <Input />
                                        </Form.Item>
                                      </Col>
                                      <Col {...layParams}>
                                        <Form.Item name={[name, "cargo", "humidity"]} label="Humidity" layout="vertical">
                                          <Input />
                                        </Form.Item>
                                      </Col>
                                      <Col {...layParams}>
                                        <Form.Item name={[name, "cargo", "remarks"]} label="Remarks" layout="vertical">
                                          <Input />
                                        </Form.Item>
                                      </Col>
                                    </>
                                  }
                                  {(container[name]?.typee === strings.specialContainers && !container[name]?.name.includes("ISO")) &&
                                    <>
                                      <Col span={24}>
                                        <Form.Item name={[name, "cargo", "gaugeStatus"]} layout="vertical" >
                                          <Space wrap>
                                            {gaugestatusOptions.map((e: string) => (<Button key={e} block shape="round" style={{ maxWidth: "12em", minWidth: "10em", textWrap: "wrap", lineHeight: 1 }} type={container[name]?.cargo?.gaugeStatus === e ? "primary" : "default"} onClick={() => {
                                              form.setFieldValue(["container", name, "cargo", "gaugeStatus"], e)
                                            }}>{e}</Button>))}
                                          </Space>
                                        </Form.Item>
                                      </Col>
                                      <Col {...layParams}>
                                        <Form.Item name={[name, "cargo", "dimensions", "length"]} label="Dimensions(L) in mm" layout="vertical">
                                          <Input />
                                        </Form.Item>
                                      </Col>
                                      <Col {...layParams}>
                                        <Form.Item name={[name, "cargo", "dimensions", "breadth"]} label="Dimensions(B) in mm" layout="vertical">
                                          <Input />
                                        </Form.Item>
                                      </Col>
                                      <Col {...layParams}>
                                        <Form.Item name={[name, "cargo", "dimensions", "height"]} label="Dimensions(H) in mm" layout="vertical">
                                          <Input />
                                        </Form.Item>
                                      </Col>
                                    </>
                                  }
                                </Row>
                              </Col>
                              {
                                fields.length === iIndex + 1 &&
                                <Button onClick={() => add({})} size="large" className="rounded-pill">
                                  <PlusCircleFilled className="text-primary1 fs-5" /> Add Container Type
                                </Button>
                              }
                            </Row>
                          </Card>
                        </Col>
                      ))
                    }
                  </Row>
                )}
              </Form.List>
            </Col>
          }
          {
            tradeType === strings.export &&
            <Col span={24}>
              <Card title="Add on Services at Port of loading [ POL ]" classNames={{ body: "px-4" }} styles={{ title: { color: strings.textPrimary1 }, header: { borderBottom: 0, paddingTop: "12px" }, body: { padding: "10px" } }}
                extra={
                  modeOfShipment !== strings.crossBorderTrucking &&
                  <Form.Item label="" name={["addOnService", "status"]} className="my-2">
                    <Switch checkedChildren={"Yes"} unCheckedChildren={"No"} checked={addOnService?.status} onChange={(e: any) => form.setFieldValue("addOnService", { status: e })} />
                  </Form.Item>
                }
              >
                {addOnService?.status &&
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
                        {modeOfShipment !== strings.crossBorderTrucking &&
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
                    {modeOfShipment !== strings.crossBorderTrucking &&
                      <>
                        <Form.Item name={["addOnService", "eSeal"]} label="E Seal Facility"  className="my-2" layout="horizontal">
                          <Checkbox checked={addOnService?.eSeal === true} onChange={() => form.setFieldValue(["addOnService", "eSeal"], true)}>Yes</Checkbox>
                          <Checkbox checked={addOnService?.eSeal === false} onChange={() => form.setFieldValue(["addOnService", "eSeal"], false)}>No</Checkbox>
                        </Form.Item>
                        <Form.Item name={["addOnService", "stuffingLocationType"]} label="Stuffing Location Type"  style={{ width: "100%" }} layout="horizontal">
                          <Space>
                            {stuffingLocationTypeOptions.map((e: string, iIndex) => (<Button key={iIndex + "cBSt"} block shape="round" style={{ margin: 2, lineHeight: 1, fontSize: "12px" }} type={addOnService?.stuffingLocationType === e ? "primary" : "default"} onClick={() => { form.setFieldValue(["addOnService", "stuffingLocationType"], e) }}>{e}</Button>))}
                          </Space>
                        </Form.Item>
                      </>
                    }
                    {modeOfShipment !== strings.crossBorderTrucking &&
                      <>
                        
                        <Form.Item label={((addOnService?.services?addOnService?.services:[]).includes(strings.doorToPortTrucking)?"*":"")+"Place of Loading , Origin Factory / warehouse address"} rules={[{ required: (addOnService?.services?addOnService?.services:[]).includes(strings.doorToPortTrucking) }]}>
                          <Row gutter={[8, 0]} style={{ width: "100%" }}>
                            <Col {...layParams2}>
                              <CountrySelect
                                f={form}
                                name={["addOnService", "placeOfLoading", "country"]}
                                onChange={(e: any) => { setCountryID(e); form.setFieldsValue({ addOnService: { placeOfLoading: { state: null, city: null, address: null } } }) }}
                              />
                            </Col>
                            <Col {...layParams2}>
                              <StateSelectV3
                                f={form}
                                name={["addOnService", "placeOfLoading", "state"]}
                                onChange={(e: any) =>{
                                   setStateID(e)
                                   form.setFieldValue(["addOnService", "placeOfLoading", "city"],null)
                                  }}
                                label=""
                                countryId={`${getCountryId(addOnService?.placeOfLoading?.country)}`}
                                required={(addOnService?.services ? addOnService?.services : []).includes(strings.doorToPortTrucking)}
                              />
                            </Col>
                            <Col {...layParams2}>
                              <CitySelectV3
                                f={() => { }}
                                name={["addOnService", "placeOfLoading", "city"]}
                                onChange={(e: any) => form.setFieldValue(["addOnService", "placeOfLoading", "city"], e)}
                                label=""
                                stateId={stateID}
                                required={(addOnService?.services ? addOnService?.services : []).includes(strings.doorToPortTrucking)}
                              />
                            </Col>
                            <Col span={24}>
                              <Form.Item name={["addOnService", "placeOfLoading", "address"]} rules={[{ required: (addOnService?.services ? addOnService?.services : []).includes(strings.doorToPortTrucking) }]}>
                                <Input.TextArea
                                  placeholder="Full Address"
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                        </Form.Item>
                      </>
                    }
                    {
                      modeOfShipment !== strings.crossBorderTrucking &&
                      <>
                        <p className="my-2">Truck/Trailer Type</p>
                        <Space direction="vertical">
                          {(addOnService?.truckType ? addOnService?.truckType : []).map((i: any, name: number) => (
                            <Space key={name + "ctt"} size={"large"}>
                              <Form.Item name={["addOnService", "truckType", name, "typee"]} rules={[{ required: true }]} className='mt-3'>
                                <Input value={i.typee} style={{ width: "19.5em" }} onChange={e => form.setFieldValue(["addOnService", "truckType", name, "typee"], e.target.value)} />
                              </Form.Item>
                              <Space.Compact className="border p-1 rounded">
                                <Button onClick={() => form.setFieldValue(["addOnService", "truckType", name, "quantity"], +addOnService?.truckType?.[name]?.quantity - 1 < 1 ? 1 : +addOnService?.truckType?.[name]?.quantity - 1)} size="small" type="primary">-</Button>
                                <p className="mx-3 my-0" style={{ width: "9px" }} >{addOnService?.truckType?.[name]?.quantity ? addOnService?.truckType?.[name]?.quantity : 0}</p>
                                <Button onClick={() => form.setFieldValue(["addOnService", "truckType", name, "quantity"], +(addOnService?.truckType?.[name]?.quantity ? addOnService?.truckType?.[name]?.quantity : 0) + 1)} size="small" type="primary">+</Button>
                                <Form.Item name={["addOnService", "truckType", name, "quantity"]} noStyle />
                              </Space.Compact>
                              <Button danger onClick={() => form.setFieldValue(
                                ["addOnService", "truckType"],
                                (addOnService?.truckType ? addOnService?.truckType : []).filter((i: any, index: number) => index !== name)
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
                      </>
                    }
                    <Form.Item name={["addOnService", "insuranceRequired"]} label="Insurance Required"  className="mb-4" layout={modeOfShipment === strings.crossBorderTrucking ? `vertical` : `horizontal`}>
                      <Checkbox checked={addOnService?.insuranceRequired === true} onChange={() => form.setFieldValue(["addOnService", "insuranceRequired"], true)}>Yes</Checkbox>
                      <Checkbox checked={addOnService?.insuranceRequired === false} onChange={() => form.setFieldValue(["addOnService", "insuranceRequired"], false)}>No</Checkbox>
                    </Form.Item>
                    {addOnService?.insuranceRequired &&
                      <Form.Item name={["addOnService", "cargoValue"]} className="col-12 col-md-10 col-lg-8 col-xl-6" label="Enter Cargo value" layout={modeOfShipment === strings.crossBorderTrucking ? `vertical` : `horizontal`}>
                        <Input type="number" addonAfter="USD" />
                      </Form.Item>
                    }
                    <Form.Item name={["addOnService", "miscServices"]} label="Misc Services" layout="vertical" >
                      <Select mode="multiple" options={miscServices.map(i => ({ label: i, value: i }))} />
                    </Form.Item>
                    {(addOnService?.miscServices ? addOnService?.miscServices : []).includes(strings.others) &&
                      <Form.Item name={["addOnService", "miscOtherValue"]} rules={[{ required: true }]} label="Misc Other Service Name">
                        <Input placeholder="Service Name" />
                      </Form.Item>
                    }
                  </div>}
              </Card>
            </Col>
          }
          {
            tradeType === strings.import &&
            <Col span={24}>
              <Card title="Add on Services at Port of loading [ POD ]" classNames={{ body: "px-4" }} styles={{ title: { color: strings.textPrimary1 }, header: { borderBottom: 0, paddingTop: "12px" }, body: { padding: "10px" } }}
                extra={
                  modeOfShipment !== strings.crossBorderTrucking &&
                  <Form.Item label="" name={["addOnService", "status"]} className="my-2">
                    <Switch checkedChildren={"Yes"} unCheckedChildren={"No"} checked={addOnService?.status} onChange={(e: any) => form.setFieldValue("addOnService", { status: e })} />
                  </Form.Item>
                }
              >
                {addOnService?.status &&
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
                        {modeOfShipment !== strings.crossBorderTrucking &&
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
                              >{"Port to Door Trucking"}</Button>
                            </Space>
                          </>
                        }
                      </Space>
                    </Form.Item>
                    {modeOfShipment !== strings.crossBorderTrucking &&
                      <>
                        <Form.Item name={["addOnService", "eSeal"]} label="DPD Facility [ Direct Port Delivery ]">
                          <Checkbox checked={addOnService?.eSeal === true} onChange={() => form.setFieldValue(["addOnService", "eSeal"], true)}>Yes</Checkbox>
                          <Checkbox checked={addOnService?.eSeal === false} onChange={() => form.setFieldValue(["addOnService", "eSeal"], false)}>No</Checkbox>
                        </Form.Item>
                        <Form.Item name={["addOnService", "stuffingLocationType"]} label="De Stuffing Location Type" style={{ width: "100%" }}>
                          {destuffingLocationTypeOptions.map((e: string, iIndex) => (<Button key={iIndex + "cbt"} block shape="round" style={{ margin: 2, lineHeight: 1, fontSize: "12px" }} type={addOnService?.stuffingLocationType === e ? "primary" : "default"} onClick={() => { form.setFieldValue(["addOnService", "stuffingLocationType"], e) }}>{e}</Button>))}
                        </Form.Item>
                      </>
                    }
                    {modeOfShipment !== strings.crossBorderTrucking &&
                      <>
                        <p className='mt-3'> Place of Unloading , Destination Factory / warehouse address</p>
                        <Form.Item name={["addOnService", "placeOfUnLoading"]} noStyle />
                        <Row gutter={[8, 0]} style={{ width: "100%" }}>
                          <Col {...layParams2}>
                            <CountrySelect
                              f={form}
                              name={["addOnService", "placeOfUnLoading", "country"]}
                              onChange={(e: any) => { setCountryID(e); form.setFieldsValue({ addOnService: { placeOfUnLoading: { state: null, city: null, address: null } } }) }}
                            />
                          </Col>
                          <Col {...layParams2}>
                            <StateSelectV3
                              f={form}
                              name={["addOnService", "placeOfUnLoading", "state"]}
                              onChange={(e: any) => {
                                form.setFieldValue(["addOnService", "placeOfUnLoading", "city"],null)
                                setStateID(e)}}
                              label=""
                              countryId={countryID}
                            />
                          </Col>
                          <Col {...layParams2}>
                            <CitySelectV3
                              f={() => { }}
                              name={["addOnService", "placeOfUnLoading", "city"]}
                              onChange={(e: any) => form.setFieldValue(["addOnService", "placeOfUnLoading", "city"], e)}
                              label=""
                              stateId={stateID}
                            />
                          </Col>
                          <Col span={24}>
                            <Form.Item name={["addOnService", "placeOfUnLoading", "address"]}>
                              <Input.TextArea
                                placeholder="Full Address"
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                      </>
                    }
                    {
                      modeOfShipment !== strings.crossBorderTrucking &&
                      <>
                        <p className="my-2">Truck/Trailer Type</p>
                        <Space direction="vertical">
                          {(addOnService?.truckType ? addOnService?.truckType : []).map((i: any, name: number) => (
                            <Space size={"large"} wrap key={name + "tty"}>
                              <Form.Item name={["addOnService", "truckType", name, "typee"]} rules={[{ required: true }]} className='mt-3'>
                                <Input value={i.typee} style={{ width: "19.5em" }} onChange={e => form.setFieldValue(["addOnService", "truckType", name, "typee"], e.target.value)} />
                              </Form.Item>
                              <Space.Compact className="border p-1 rounded">
                                <Button onClick={() => form.setFieldValue(["addOnService", "truckType", name, "quantity"], +addOnService?.truckType?.[name]?.quantity - 1 < 1 ? 1 : +addOnService?.truckType?.[name]?.quantity - 1)} size="small" type="primary">-</Button>
                                <p className="mx-3 my-0" style={{ width: "9px" }} >{addOnService?.truckType?.[name]?.quantity ? addOnService?.truckType?.[name]?.quantity : 0}</p>
                                <Button onClick={() => form.setFieldValue(["addOnService", "truckType", name, "quantity"], +(addOnService?.truckType?.[name]?.quantity ? addOnService?.truckType?.[name]?.quantity : 0) + 1)} size="small" type="primary">+</Button>
                              </Space.Compact>
                              <Button danger onClick={() => form.setFieldValue(
                                ["addOnService", "truckType"],
                                (addOnService?.truckType ? addOnService?.truckType : []).filter((i: any, index: number) => index !== name)
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
                      </>
                    }
                    <Form.Item name={["addOnService", "insuranceRequired"]} label="Insurance Required" className="mb-4" layout={modeOfShipment === strings.crossBorderTrucking ? `vertical` : `horizontal`}>
                      <Checkbox checked={addOnService?.insuranceRequired === true} onChange={() => form.setFieldValue(["addOnService", "insuranceRequired"], true)}>Yes</Checkbox>
                      <Checkbox checked={addOnService?.insuranceRequired === false} onChange={() => form.setFieldValue(["addOnService", "insuranceRequired"], false)}>No</Checkbox>
                    </Form.Item>
                    {addOnService?.insuranceRequired &&
                      <Form.Item name={["addOnService", "cargoValue"]} className="col-12 col-md-10 col-lg-8 col-xl-6" label="Enter Cargo value" layout={modeOfShipment === strings.crossBorderTrucking ? `vertical` : `horizontal`}>
                        <Input type="number" addonAfter="USD" />
                      </Form.Item>
                    }
                    <Form.Item name={["addOnService", "miscServices"]} label="Misc Services" layout="vertical" >
                      <Select mode="multiple" options={miscServices.map(i => ({ label: i, value: i }))} />
                    </Form.Item>
                    {(addOnService?.miscServices ? addOnService?.miscServices : []).includes(strings.others) &&
                      <Form.Item name={["addOnService", "miscOtherValue"]} rules={[{ required: true }]} label="Misc Other Service Name" layout="vertical">
                        <Input placeholder="Service Name" />
                      </Form.Item>
                    }
                  </div>}
              </Card>
            </Col>
          }
          <Col span={24}>
            <Card title="Payment Terms" classNames={{ body: "px-4" }} styles={{ title: { color: strings.textPrimary1 }, header: { borderBottom: 0 } }}>
              <Form.Item name={"paymentTerms"}>
                <Select placeholder="Select payment terms" options={paymentTermOptions.map(i => ({ key: i.title, label: `${i.title} - ${i.days}`, value: `${i.title} - ${i.days}` }))} />
              </Form.Item>
              {
                (paymentTerms ? paymentTerms : "").includes(strings.others) &&
                <Form.Item name={"otherPaymentTerms"} rules={[{ required: true }]} label="Other Payment Terms" layout="vertical">
                  <Input placeholder="Payment Terms" />
                </Form.Item>
              }
            </Card>
          </Col>
          <Col span={24}>
            <Card title="Remarks" classNames={{ body: "px-4" }} styles={{ title: { color: strings.textPrimary1 }, header: { borderBottom: 0 }, body: { padding: "10px" } }}>
              <Form.Item name={"remarks"}>
                <Input.TextArea placeholder="Preferred Shipping lines (If any ) / Preferred routes (If any) etc ." />
              </Form.Item>
            </Card>
          </Col>
          <Col span={24}>
            <Card title="Point of Contact" classNames={{ body: "px-4" }} styles={{ title: { color: strings.textPrimary1 }, header: { borderBottom: 0, paddingTop: "12px" }, body: { padding: "10px" } }}
              extra={
                <Form.Item label="Show contact details with RFQ" name="showContactDetails" layout="horizontal">
                  <Switch checkedChildren={"Yes"} unCheckedChildren={"No"} checked={showContact} onChange={(e: any) => {
                    form.setFieldValue("showContact", e)
                    form.setFieldValue("pointOfContact", [{ name: "", email: "", mobile: "" }])
                  }} />
                </Form.Item>
              }
            >
              {showContact && <Form.List name={"pointOfContact"}>
                {(fields, { add, remove }) => (
                  <>
                    {
                      fields.map((field, iIndex) => (
                        <div className='d-flex gap-2 my-1' key={iIndex + "poc"}>
                          <Form.Item label="Name" name={[field.name, "name"]} layout="vertical" rules={[{ required: true }]}>
                            <Input />
                          </Form.Item>
                          <Form.Item label="Mobile No." rules={[{ required: true }, { min: 10, max: 10, message: 'Please enter correct number' }]} name={[field.name, "mobile"]} layout="vertical">
                            <Input />
                          </Form.Item>
                          <Form.Item label="Email ID" rules={[{ required: true }, { type: "email", message: 'Please enter correct email' }]} name={[field.name, "email"]} layout="vertical">
                            <Input />
                          </Form.Item>
                          <Form.Item layout="vertical" label=" ">
                            <Button shape="circle" size="small" onClick={() => remove(iIndex)} danger className='fw-bold' >-</Button>
                          </Form.Item>
                        </div>
                      ))

                    }
                    <br />
                    <Button onClick={() => add({ name: "" })} className="rounded-pill">
                      <PlusCircleFilled className="text-primary1 fs-5" /> Add POC
                    </Button>
                  </>
                )
                }
              </Form.List>}
            </Card>
          </Col>
          <Col span={24}>
            <div className="col-11 col-md-9 col-lg-7 col-xl-6 mx-auto d-flex justify-content-center">
              <Space size={"small"} className='border rounded-pill px-2'>
                <Form.Item label="RFQ closing date" required={false} name={"closingDate"} rules={[{ required: true }]} className="my-0" layout="horizontal">
                  <DatePicker variant="borderless" onChange={(e, r) => form.setFieldValue("closingDate", dayjs(r.toString()))} size="small" styles={{}} style={{ paddingRight: "2px", paddingLeft: "2px" }} className='rounded-pill' />
                </Form.Item>
              </Space>
            </div>
          </Col>
          <Col span={24}>
            <div className="col-11 col-md-9 col-lg-7 col-xl-6 mx-auto d-flex justify-content-center">
              <Typography.Link onClick={()=>setPrviewModal(i=>!i)}>Preview RFQ <EyeOutlined /></Typography.Link>
            </div>
          </Col>
          <Col span={24}>
            <div className="col-11 col-md-9 col-lg-7 col-xl-6 mx-auto">
              <Button type="primary" onClick={()=>form.submit()} block size="large" loading={formLoading} shape="round">Submit</Button>
            </div>
          </Col>

        </Row>
      </Form>
      <Modal open={prviewModal} footer={null} width={950} onCancel={()=>setPrviewModal(i=>!i)} onClose={()=>setPrviewModal(i=>!i)}>
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
        <RFQCard hideExpoter showSubmit rfqData={formValue} />
        </ConfigProvider>
      </Modal>
      <Modal open={SuccessModal} footer={null} closable={false}>
        <PostSuccessModal id={Id} />
      </Modal>
    </>
  )
}

export const layParams = {
  xs: 24, sm: 24, md: 12, lg: 11
}
export const layParams2 = {
  xs: 24, sm: 24, md: 8, lg: 8
}
export const layParams3 = {
  xs: 24, sm: 24, md: 12, lg: 8, xl: 6
}