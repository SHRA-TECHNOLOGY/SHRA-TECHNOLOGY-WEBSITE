import React from 'react'
import BoyImg from '../../../../assets/home-boy.png'
import '../../styles/Home/HeroSection.scss'

const HeroSection = () => {
  return (
    <div className='home-heroSec'>

      {/* left part code here */}

      <div className="home-leftHero">

        <div className="left-title-section">
          <h2>Learn • Code • Grow</h2>
          <h1>SHRA Technology</h1>
          <p>A complete platform for CSE students to <br />learn, practice, test and grow together.</p>
        </div>

        <div className="left-btn">
          <button>Get Started</button>
          <button>Explore Courses</button>
        </div>

      </div>

      {/* Right part code here */}

      <div className="home-rightHHero">
        <img src={BoyImg} alt="animated boy img" />
      </div>

    </div>
  )
}

export default HeroSection
