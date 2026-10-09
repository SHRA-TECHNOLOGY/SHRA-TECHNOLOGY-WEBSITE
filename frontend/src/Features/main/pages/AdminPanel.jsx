import React from 'react'
import CommonNavbar from '../components/Navbar/CommonNavbar'
import DashboardCard from '../components/AdminPanel/DashboardCard'
import '../styles/AdminPanel/AdminPanelHome.scss'
import AdminMainSection from '../components/AdminPanel/AdminMainSection'

const AdminPanel = () => {
  return (
    <>

      <CommonNavbar />

      <div className="admin-main-content">

        {/* Hero section */}

        <div className="admin-hero-section contact-hero-section">
          <h3>Admin Panel</h3>
          <p>Manage course, students, and content.</p>
        </div>

        {/* dashboard card section  */}

        <DashboardCard />

        <AdminMainSection/>

      </div>


    </>
  )
}

export default AdminPanel
