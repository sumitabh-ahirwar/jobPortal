import React from 'react'
import Navbar from "./components/shared/Navbar.jsx"
import { Outlet } from "react-router-dom"
import Footer from './components/shared/Footer.jsx'
import Home from './components/auth/Home.jsx'
function Layout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer/>
    </div>
  )
}

export default Layout
