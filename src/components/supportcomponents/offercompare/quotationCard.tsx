import React, { useEffect, useState } from 'react';
import { Card, Typography, Row, Col, Button, Space, Steps } from 'antd';
import { assetsRootPath, camelCaseToSpaceSeparated } from '@/components/utils';
import { title } from 'process';
import dayjs from 'dayjs';
import { ClockCircleOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { freightTitle } from '@/components/page/rfq/options';

const QuotationCard = ({ quotation }:{quotation:any}) => {
    // console.log(quotation);
    const [docs, setDocs] = useState<any>([])
    
  const {
    _id,
    rfq,
    shippingLine,
    modeOfShipment,
    quotationValidityDate,
    portCutOff,
    podChargeLocal,
    podCurrencyCode,
    polCurrencyCode,
    polChargeLocal,    
    inclusiveFrightDollor,
    transShipmentPorts,
    noOfTransShipmentPorts,
    oceanFreightCost,
    polCost,
    podCost,
    portCutoff,
    etd,
    validTill,
    totallandedCost,
    licensesAndCertifications,
    inclusiveFrightLocal,
  } = quotation;
  
  useEffect(()=>{
    // console.log(quotation?.organization?.userdocuments);
    if(quotation?.organization?.userdocuments){
        let a = Object.keys(quotation?.organization?.userdocuments)
        setDocs(a.map((i:any)=>({...quotation?.organization?.userdocuments[i],name:i})))
    }
    
  },[quotation])
  console.log(docs);
  

  return (
    <Card
     title={
        <Row justify={"space-between"} align={"middle"}>
            <Col sm={24} md={8} className='d-flex justify-content-start'>
                <h5 className="text-primary3">
                    {quotation?.organization?.companyName}
                </h5>
            </Col>
            <Col sm={24} md={8} className='d-flex justify-content-center'>
                <Space>
                    <Button shape="round" icon={<img src={assetsRootPath+"image/assets/cargoShip.png"}/>}>{shippingLine}</Button>
                    <Button shape="round" icon={<img src={assetsRootPath+"image/assets/port.png"}/>}>{noOfTransShipmentPorts} Transhipment</Button>                    
                    <Button shape="round" icon={<ClockCircleOutlined/>}>{rfq?.freeTimeLP} Days</Button>                    
                </Space>
            </Col>
            <Col sm={24} md={8} className='d-flex justify-content-end'>
                <Space className="border rounded-2 px-2 py-1 my-1">
                    <p className='m-0'>{_id}</p>
                </Space>
            </Col>
        </Row>
    }
        styles={{header:{borderBottom:0}}}
    >
      <Row gutter={[16, 16]}>
        <Col sm={24} md={18}>
            <Row gutter={[8,8]}>
                <Col sm={22} md={19}>
                <Typography.Paragraph>Routing:</Typography.Paragraph>
                          <Steps
                              progressDot
                              size="small"
                              items={
                                [
                                    ...[{ title:rfq?.loadingPortObj?.Name,description:rfq?.loadingPortObj?.FullName}],
                                    ...(transShipmentPorts? transShipmentPorts: []).map((port: any, iIndex: number) => (
                                        { title: port?.Name,status:"wait", description:port?.FullName  }
                                    )),
                                    ...[{ status:"finish", title:rfq?.dischargePortObj?.Name,description:rfq?.dischargePortObj?.FullName}],
                                ]
                              }
                          />
                </Col>
                <Col span={24}>
                <Space size={"large"}>
                    <div className="p-1 border rounded-3">
                        <p className='p-0 m-0'>Port Cutoff <span className="text-primary2">{dayjs(portCutOff?.date).format('YYYY-MM-DD')}</span> </p>
                    </div>
                    <div className="p-1 border rounded-3">
                        <p className='p-0 m-0'>ETD <span className="text-primary2">{dayjs(etd).format('YYYY-MM-DD')}</span> </p>
                    </div>
                </Space>
                </Col>
                <Col span={24}>
                <Space size={"large"}>
                    <div className="p-1 border rounded-3">
                        <p className='p-0 m-0'>VALID TILL <span className="text-primary2">{dayjs(quotationValidityDate).format('YYYY-MM-DD')}</span> </p>
                    </div>
                </Space>
                </Col>
                <Col span={24}>
                <Space wrap>
                        {
                            docs.filter((i:any)=>(i.status)).map((i:any)=>(
                            <div key={i.name} className="tag-content text-capitalize">
                                {camelCaseToSpaceSeparated(i.name)}
                              </div>
                            ))
                        }
                </Space>
                </Col>
            </Row>
        </Col>
        <Col sm={24} md={6}>
            <Row gutter={[16, 8]}>
                <Col span={24}>
                    <Space className="border rounded-2 px-2 py-1">
                        <p className='m-0'>{freightTitle(rfq?.modeOfShipment)}</p>
                        <p className='m-0'>USD {inclusiveFrightDollor}</p>
                    </Space>
                </Col>
                <Col span={24}>
                    <Space className="border rounded-2 px-2 py-1">
                        <p className='m-0'>POL Cost:</p>
                        <p className='m-0'>{polCurrencyCode} {polChargeLocal}</p>
                    </Space>
                </Col>
                <Col span={24}>
                    <Space className="border rounded-2 px-2 py-1">
                        <p className='m-0'>POD Cost:</p>
                        <p className='m-0'>{podCurrencyCode} {podChargeLocal}</p>
                    </Space>
                </Col>
                <Col span={24}>
                    <Space className="border rounded-2 px-2 py-1 my-1">
                        <p className='m-0'>Total Landed Cost:</p>
                        <p className='m-0'>{polCurrencyCode} {totallandedCost}</p>
                    </Space>
                </Col>
            </Row>
        </Col>
      </Row>

      
    <div className='d-flex justify-content-end col-12'>
        <Link target="_blank" href={"/rfq/offerdetail/"+_id}>
            <Button type="primary" shape="round">View Details</Button>
        </Link>
    </div>
    </Card>
  );
};

export default QuotationCard;