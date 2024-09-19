import React from 'react'
import AdminLayout from '../layout' 
import SiteSectionPage from './sections/site-sections'
import SiteView from './sections/site-sections'

export default function AdminSitePage() {
    return (
        <AdminLayout>
          <SiteView/>
        </AdminLayout>
    )
} 
