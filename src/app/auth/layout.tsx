import AuthCarousel from '@/components/supportcomponents/auth/authslider';
import Col from 'antd/es/col';
import Row from "antd/es/row"
import React from 'react'


function Layout({
    children
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <Row gutter={[8,0]} align={"middle"} justify={"space-around"} style={{minHeight:"100vh",backgroundColor:"#F3F6FF"}} className='mx-0 px-0 px-md-2 px-lg-4'>
        <Col xs={0} sm={0} md={11} lg={11} style={{maxWidth:"470px"}}>
          <AuthCarousel />
        </Col>
        <Col xs={22} sm={22} md={10} lg={11} style={{maxWidth:"400px"}}>
          {children}
        </Col>
    </Row>
  )
}

export default Layout