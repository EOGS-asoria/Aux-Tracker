import React from 'react'
import AdminLayout from '../layout'
import UsersTableSection from './sections/users-table-section'

export default function AdminUserdPage() {
  return (
    <AdminLayout>
       <UsersTableSection/>
    </AdminLayout>
  )
}
