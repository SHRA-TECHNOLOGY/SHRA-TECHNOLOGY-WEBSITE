import React from 'react'
import ForgotLeftPart from '../components/AuthComponents/ForgotLeft';
import Image from '../../../assets/reset-icon.png'
import ResetRightPart from '../components/AuthComponents/ResetRightPart'
import {
    ShieldCheck,
    Lock,
    Shield,
    RefreshCw
} from "lucide-react";

const ResetPassword = () => {



    const resetPasswordCardData = [
        {
            id: 1,
            icon: ShieldCheck,
            title: "Choose a strong password"
        },
        {
            id: 2,
            icon: Lock,
            title: "Keep your account secure"
        },
        {
            id: 3,
            icon: Shield,
            title: "Don't share your password"
        },
        {
            id: 4,
            icon: RefreshCw,
            title: "You'll be redirected to login"
        }
    ];

    return (
        <>

            <div className="auth-container">

                <div className="auth-main">

                    <ForgotLeftPart
                        title1="Reset Your"
                        title2="Password"
                        description1="Almost there! Enter your new password and you're all set to go."
                        cardData={resetPasswordCardData}
                        back={true}
                        image={Image}
                    />

                    <div className="auth-right">
                        <ResetRightPart />
                    </div>

                </div>

            </div>
        </>
    )
}

export default ResetPassword
