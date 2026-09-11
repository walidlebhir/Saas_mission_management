import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuthStore } from '../services/auth/auth.service.js'
import Sidebar from '../components/AdminDashbordCompany/Sidebar.jsx'
import Navbar from '../components/AdminDashbordCompany/Navbar.jsx'

export default function AdminDashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { logout } = useAuthStore()

  function handleLogout() {
    logout()
    window.location.href = '/login'
  }

  return (
    <div className="min-h-screen bg-[#F6F8FC]">
      <div className="flex w-full">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          onLogout={handleLogout}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <Navbar setSidebarOpen={setSidebarOpen} onLogout={handleLogout} />

          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}