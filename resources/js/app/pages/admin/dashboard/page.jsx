import React from 'react'
import AdminLayout from '../layout'
import DashboardTableSection from './sections/dashboard-section'

export default function AdminDashboardPage() {
  return ( 
    <AdminLayout>
        <DashboardTableSection />
    </AdminLayout>
  )
}
