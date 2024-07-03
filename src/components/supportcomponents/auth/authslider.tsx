
import React, { ReactNode } from 'react';
import Title from 'antd/es/typography/Title';
import { assetsRootPath } from '@/components/utils';
import { AuditOutlined, TruckOutlined } from '@ant-design/icons';
import Text from 'antd/es/typography/Text';
import Carousel  from 'antd/es/carousel'
import ConfigProvider from "antd/es/config-provider"
import Space from "antd/es/space";
import Button from "antd/es/button";


interface Slide {
  imageUrl: string;
  title: string;
  description: string;
  buttonText1: {text: string,icon: ReactNode};
  buttonText2: {text: string,icon: ReactNode};
  buttonLink1?: string; // Optional link for button 1
  buttonLink2?: string; // Optional link for button 2
}

const slides: Slide[] = [
  {
    imageUrl: assetsRootPath+"image/auth/slide1.png", // Replace with your image URL
    title: 'Discover the best!',
    description: 'Cost-Effective Solutions: Find competitive rates and save on shipping costs',
    buttonText1: {text:'Quality Assurance',icon:<AuditOutlined />},
    buttonText2: {text:'Speedy Delivery',icon:<TruckOutlined />},
  },
  {
    imageUrl: assetsRootPath+"image/auth/slide2.png", // Replace with your image URL
    title: 'Discover the best!',
    description: 'Reliable Shipping Containers: Your Trusted Partner for Seamless Logistics',
    buttonText1: {text:'Quality Assurance',icon:<AuditOutlined />},
    buttonText2: {text:'Speedy Delivery',icon:<TruckOutlined />},
  },
  {
    imageUrl: assetsRootPath+"image/auth/slide2.png", // Replace with your image URL
    title: 'Discover the best!',
    description: 'Reliable Shipping Containers: Your Trusted Partner for Seamless Logistics',
    buttonText1: {text:'Quality Assurance',icon:<AuditOutlined />},
    buttonText2: {text:'Speedy Delivery',icon:<TruckOutlined />},
  },
];

const AuthCarousel: React.FC = () => {
  return (
    <ConfigProvider theme={{
        "components": {
          "Carousel": {
            "colorBgContainer": "rgb(106, 55, 244)",
            "dotWidth": 40,
            "dotActiveWidth": 48
          }
        }
      }}>
        <Carousel autoplay>
        {slides.map((slide) => (
            <div key={slide.title} className="carousel-slide overflow-hidden mx-0" style={{borderEndStartRadius:"60px",borderTopRightRadius:"60px" }}>
            <div
                className="slide-image d-flex align-items-center"
                style={{ backgroundImage: `url(${slide.imageUrl})`,backgroundSize:"cover",height:"80vh", borderEndStartRadius:"50px",borderTopRightRadius:"60px" }}
            >                
                <div className="slide-content p-2">
                    <Text className='text-light'>{slide.title}</Text>
                    <Title level={3} className='text-light'>{slide.description}</Title>
                    <br />
                    <Space className="">
                    <Button size="small" ghost shape="round" icon={slide.buttonText1.icon}>
                        {slide.buttonText1.text}
                    </Button>
                    <Button size="small" ghost shape="round" icon={slide.buttonText2.icon}>
                        {slide.buttonText2.text}
                    </Button>
                    </Space>
                </div>
            </div>
            </div>
        ))}
        </Carousel>
    </ConfigProvider>
  );
};

export default AuthCarousel;
