import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import PublicLayout from '../layouts/PublicLayout.jsx'
import AdminDashboardLayout from '../layouts/AdminDashboardLayout.jsx'
import ProtectedRoute from '../components/common/ProtectedRoute.jsx'
import Home from '../pages/public/Home.jsx'
import Features from '../pages/public/Features.jsx'
import HowItWorks from '../pages/public/HowItWorks.jsx'
import About from '../pages/public/About.jsx'
import Contact from '../pages/public/Contact.jsx'
import Login from '../pages/auth/Login.jsx'
import Register from '../pages/auth/Register.jsx'
import AdminDashboard from '../pages/AdminCompanyDashbord/AdminDashboard.jsx'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Admin Dashboard routes (Finance + SuperAdmin) */}
        <Route
          element={
            <ProtectedRoute allowedRoles={['finance', 'super_admin']}>
              <AdminDashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>

      <ToastContainer position="top-right" autoClose={4000} />
    </BrowserRouter>
  )
}