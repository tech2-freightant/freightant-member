import { DashboardUI } from '@/components/page/dashboard/layout'
import React from 'react'

function Layout({children}:{children:any}) {
  return (
    <DashboardUI>
        {children}
    </DashboardUI>
  )
}

export default Layout