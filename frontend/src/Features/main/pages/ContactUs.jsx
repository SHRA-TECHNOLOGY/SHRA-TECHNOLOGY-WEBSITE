import React from 'react'
import CommonNavbar from '../components/Navbar/CommonNavbar'
import ContactHeroSection from '../components/ContactUs/ContactHeroSection'
import ContactLeftPart from '../components/ContactUs/ContactLeftPart'
import ContactRightPart from '../components/ContactUs/ContactRightPart'
import '../styles/ContactUs/ContactHome.scss'

const ContactUs = () => {
  return (
    <>
      {/* navbar code here */}
        <CommonNavbar />

        <ContactHeroSection />

        <div className="contact-main">
            <ContactLeftPart />
            <ContactRightPart />
        </div>
    </>
  )
}

export default ContactUs
