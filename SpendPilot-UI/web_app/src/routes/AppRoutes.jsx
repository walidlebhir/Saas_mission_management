import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import PublicLayout from '../layouts/PublicLayout.jsx'
import Home from '../pages/public/Home.jsx'
import Features from '../pages/public/Features.jsx'
import HowItWorks from '../pages/public/HowItWorks.jsx'
import About from '../pages/public/About.jsx'
import Contact from '../pages/public/Contact.jsx'
import Login from '../pages/auth/Login.jsx'
import Register from '../pages/auth/Register.jsx'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
          // public route definit web site de notre application
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

          // application route -->


      </Routes>

      <ToastContainer position="top-right" autoClose={4000} />
    </BrowserRouter>
  )
}