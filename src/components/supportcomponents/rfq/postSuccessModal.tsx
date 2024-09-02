import { variants2 } from '@/components/page/auth/signup'
import { assetsRootPath } from '@/components/utils'
import { Button } from 'antd'
import Title from 'antd/es/typography/Title'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'


function PostSuccessModal({id}:{id:string}) {
    const [loading,setLoading] = useState(false)
  const router = useRouter()
  return (
    <div className='my-5'>
    <motion.div
        variants={variants2}
        animate="big" // Start in the "big" state
        initial="small" 
        className="freightant-logo d-flex justify-content-center my-2 mb-3">
        <img src={assetsRootPath + "image/auth/tick.png"} alt="otp Sent" />
    </motion.div>
    <div className="freightant-logo d-flex flex-column justify-content-center align-items-center my-2 mb-3">
        <Title className='text-primary2 text-center' level={3}>Congratulations</Title>
        <p className="text-mute text-center">RFQ {id} Posted Succefully.</p>
        <Button disabled={loading} onClick={()=>location.reload()} type="primary" block shape='round' className='col-12'>Add New</Button>
        <Button  onClick={()=>router.push("/")} block shape='round' className='col-12 my-2'>Go Home</Button>
    </div>
</div>
)
}

export default PostSuccessModal