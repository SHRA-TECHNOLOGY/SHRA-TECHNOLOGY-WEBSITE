import React from 'react'
import ForgotLeftPart from '../components/AuthComponents/ForgotLeft';
import { Mail, Link, Lock } from "lucide-react";
import ForgotRightPart from '../components/AuthComponents/ForgotRightPart';
import Image from '../../../assets/forgot-icon.png'

import '../styles/Forgot/ForgotHome.scss'

const ForgotPassword = () => {


    const forgotPasswordCardData = [
        {
            id: 1,
            icon: Mail,
            title: "Check your email inbox"
        },
        {
            id: 2,
            icon: Link,
            title: "Click the reset link"
        },
        {
            id: 3,
            icon: Lock,
            title: "Create a new password"
        }
    ];
    return (
        <>

            <div className="auth-container">

                <div className="auth-main">

                    <ForgotLeftPart
                        title1="Forgot"
                        title2="Password?"
                        description1="No worries! Enter your email address and we'll send you a link to reset your password."
                        cardData={forgotPasswordCardData}
                        back={true}
                        image={Image}
                    />

                    <div className="auth-right">
                        <ForgotRightPart />
                    </div>

                </div>

            </div>
        </>
    )
}

export default ForgotPassword
