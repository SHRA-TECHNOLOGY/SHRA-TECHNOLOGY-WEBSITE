import React from 'react'
import { Outlet } from 'react-router'
import LeftPart from '../auth/components/AuthComponents/LeftPanel'
import { GoogleLogin } from '@react-oauth/google'

const AuthLayout = () => {
    return (
        <div className="auth-container">
            <div className="auth-main">
                <LeftPart />

                <div className="auth-right">
                    <Outlet />
                </div>

            </div>

        </div>
    )
}

export default AuthLayout
