"use client"
import { assetsRootPath } from '@/components/utils'
import { getSessionCache } from '@/network/endpoints'
import { CalendarOutlined, CompassOutlined, LogoutOutlined, OrderedListOutlined, ProductOutlined, SearchOutlined, StockOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { Col, Dropdown, Input, Layout, Menu, Space } from 'antd'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
const {Sider,Content,Header} = Layout
export const DashboardUI:React.FC<{sideUI?:React.ReactNode,children:React.ReactNode}>= ({sideUI,children})=>{
    const [collapsed, setCollapsed] = useState(false);
    const [user, setuser] = useState<any>({})

    useEffect(()=>{
        getSessionCache()
        .then(r=>{
            if(r?.user){
                setuser(r.user)
            }
        })
        .catch(r=>{})
    },[])
    return(
        <Layout style={layoutStyle}>
            <Sider width={270} style={siderStyle} collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} breakpoint="md">
                    {collapsed?
                    <div className="demo-logo-vertical my-2 mb-2" style={{paddingLeft:"6px",width:"42px",overflow:'hidden'}}>
                        <img src={assetsRootPath + "image/logos/vector.png"} alt="Freightant Logo" height={"32"} />
                    </div>:
                    <div className="d-none d-md-block freightant-logo d-flex justify-content-center my-2 mb-2">
                        <img src={assetsRootPath + "image/logos/vector.png"} alt="Freightant Logo" height={"31"} />
                    </div>
                    }
                <Menu defaultSelectedKeys={['1']} mode="inline" items={menuItems} className='my-4 px-2' />
            </Sider>
            <Layout>
                <Header style={headerStyle}>
                    <Space className='d-flex justify-content-between align-items-center col-12 col-md-11 col-lg-10 mx-auto'>
                        <Input style={{minWidth:"30em",width:"40em"}} placeholder="Search Input" variant="filled" size="large" prefix={<SearchOutlined />} />
                        <Space size={"large"}>
                            <h4 className='text-primary2 m-0'>Hi {user?.name}</h4>
                            <Dropdown menu={{items:[{label:"Log Out",key:"01",icon:<LogoutOutlined/>,onClick:()=>signOut()}]}}>
                                <img className="rounded-circle img-thumnail" src="https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?fm=jpg&q=60&w=300&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" style={{width:45,height:45}}/>
                            </Dropdown>
                        </Space>
                    </Space>
                </Header>
                <Content style={contentStyle}>
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}

const menuItems =[
    {
        key: '1',
        label: 'Dashboard',
        icon: <ProductOutlined />,
    },
    {
        key: '2',
        label: 'Spot Market',
        icon: <StockOutlined />,
    },
    {
        key: '3',
        label: <Link href={"/rfq/post"}>Create RFQ</Link>,
        icon: <CalendarOutlined />,
    },
    {
        key: '4',
        label: 'RFQ List',
        icon: <UnorderedListOutlined />,
    },
    {
        key: '5',
        label: 'Order List',
        icon: <OrderedListOutlined />,
    },
    {
        key: '6',
        label: 'Shipment Status',
        icon: <CompassOutlined />,
    }
]

const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 34,
    lineHeight: '64px',
    backgroundColor: '#F3F6FF',
    paddingTop: 16,
    zIndex:1
  };
  
  const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#F3F6FF',
  };
  
  const siderStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#fff',
    overflow: "auto",
	minHeight: "100vh",
    padding: "15px 0px 15px 00px",
    borderRadius: "0 45px 45px 0px",
  };
  

  
  const layoutStyle = {
    borderRadius: 0,
    overflow: 'hidden',
    width: '100%',
    height: '100vh',
    maxWidth: '100%',
  };