import DashboardLayout from '@/layout/DashboardLayout'
import UserLayout from '@/layout/userLayout'
import React from 'react'

export default function MyConnectionsPage() {
  return (
    <div>
        <UserLayout>
                <DashboardLayout>
                    <div>
                        <h1>My Connections</h1>
                    </div>
                </DashboardLayout>
        </UserLayout>
    </div>
  )
}
