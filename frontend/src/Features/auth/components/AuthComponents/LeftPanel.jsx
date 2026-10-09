import React from 'react'
import girlImage from '../../../../assets/login-girl.png'
import logo from '../../../../assets/logo2.png'

const LeftPart = () => {
  return (
    <div className='login-left'>

      <div className="left-upper">
        <div className="login-heading">
          <img src={logo} alt="animation img" className='logo-img' />
          <div className="logo-title-section">
            <h2>SHRA</h2>
            <span>Technologies</span>
          </div>

        </div>

        <div className="login-welcome">
          <h2>Welcome Back! 👋</h2>
          <p>Start learning and <br />achieve your goals <br />with SHRA Technologies.</p>
        </div>
      </div>


      <div className="login-img">
        <img src={girlImage} alt="animation img" />
      </div>
    </div>
  )
}

export default LeftPart
