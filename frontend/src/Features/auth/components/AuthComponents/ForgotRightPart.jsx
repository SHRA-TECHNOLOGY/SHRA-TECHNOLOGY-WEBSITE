import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router';
import toast from "react-hot-toast";
import {ShieldCheck} from 'lucide-react'

import {useForgotPassword} from '../../Hooks/useAuth'

import '../../styles/Forgot/ForgotRightPart.scss'

const ForgotRightPart = () => {

    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const {
        mutateAsync: ForgotPasswordHandle,
        isPending: forgotLoading,
    } = useForgotPassword();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await ForgotPasswordHandle({email});

            console.log(data);

            if (data?.success) {
                navigate("/login");
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="form-container">
            <h1>Reset Your Password </h1>
            <p className='reset-subTitle'>Enter your registered email address below and we'll send you a password reset link.</p>


            <form onSubmit={handleSubmit}>

                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" onChange={(e) => { setEmail(e.target.value) }} id='email' name='email' placeholder='enter your email..' required />
                </div>

                <button className='button primary-button'>
                    {forgotLoading
          ? ("Send Reset Link...")
          : ("Send Reset Link")}
          </button>


            </form>

            <div className="forgot-information">
              <span className='icon-forgot'><ShieldCheck /></span>
              <div className="info-sub">
                <h3>Secure & Private</h3>
                <p>Your information is safe with us. We never share your email with anyone.</p>
              </div>
            </div>

        </div>
    )
}

export default ForgotRightPart
