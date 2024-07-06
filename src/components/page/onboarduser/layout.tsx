"use client"
import { Layout } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import React from 'react';

const OnboardUserUI:React.FC<{sideUI:React.ReactNode,children:React.ReactNode}>= ({sideUI,children})=>{
    return(
        <Layout style={{height:"100vh",backgroundColor:"#F3F6FF"}}>
            <Sider collapsedWidth={45} breakpoint="sm" style={{backgroundColor:"#FFFFFF",borderTopRightRadius:'50px',borderBottomRightRadius:"50px"}} width={270} className='px-md-4 py-3'>
                {sideUI}
            </Sider>
            <Content className='p-3 p-md-5 overflow-auto' style={{maxHeight:"100vh"}}>
                <div className="col-12 col-md-10 col-lg-9 mx-auto">
                    {children}
                </div>
            </Content>
        </Layout>
    )
}

export default OnboardUserUI;