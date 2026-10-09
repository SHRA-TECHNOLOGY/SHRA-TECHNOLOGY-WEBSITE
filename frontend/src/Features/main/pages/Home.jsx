import React from 'react'
import Navbar from '../components/Navbar/HomeNavbar.jsx'
import HeroSection from '../components/Home/HeroSection'
import '../styles/Home/Home.scss'
import Features from '../components/Home/Features'
import PopularCourse from '../components/Home/PopularCourse'
import ReviewSection from '../components/Home/ReviewSection'
import Footer from '../components/Footer/Footer'
import MobileFooter from '../components/Footer/MobileFooter.jsx'

const Home = () => {
  return (
    <main>
      <div className="home-upper-section">
        <Navbar />
        <HeroSection />
      </div>

      <div className="content-section">
        <Features />
        <PopularCourse />
        <ReviewSection />

        
      </div>

      <Footer />
      <MobileFooter />
    </main>
  )
}

export default Home
