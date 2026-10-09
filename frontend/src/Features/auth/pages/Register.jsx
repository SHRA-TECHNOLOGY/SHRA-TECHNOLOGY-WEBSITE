import React from 'react'
import LoginTabs from '../components/AuthComponents/LoginTabs'
import RegisterFrom from '../components/AuthComponents/RegisterFrom'
import AuthFooter from '../components/AuthComponents/AuthFooter'
import '../styles/Login/Login.scss'
import { Link } from 'react-router'

const Register = () => {
  return (
    <div className='form-container'>
      <LoginTabs />
      <RegisterFrom />
      <AuthFooter />
      
      <p className='footer-p'>Already have an account? <Link to={'/login'} className='signup' >Login</Link></p>
    </div>
  )
}

export default Register
