"use client"
import { AuthHOC } from '@/components/supportcomponents/auth/UnAuthHOC'
import React from 'react'

function  DashboardHome() {
  return (
    <div> DashboardHome</div>
  )
}

export default  AuthHOC(DashboardHome)