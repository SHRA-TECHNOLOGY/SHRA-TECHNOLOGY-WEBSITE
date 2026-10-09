import React, { useState } from 'react'
import { useNavigate,useLocation } from 'react-router'

const LoginTabs = () => {

    const location = useLocation();

    const navigate = useNavigate()
    return (
        <div className="auth-tabs">
            <button className={location.pathname === '/login' ? "active" : ""} onClick={() => { 
                navigate('/login')
             }}>Login</button>
            <button className={location.pathname === '/register' ? "active" : ""} onClick={() =>{
                navigate('/register')
            } }>Sign Up</button>
        </div>
    )
}

export default LoginTabs
