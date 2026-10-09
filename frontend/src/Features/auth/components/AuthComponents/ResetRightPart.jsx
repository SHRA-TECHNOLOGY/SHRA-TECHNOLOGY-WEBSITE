import React, { useState } from 'react'
import { useNavigate, Link, useParams } from 'react-router';
import { ShieldCheck, LockKeyhole, Circle, CheckCircle2, Eye, EyeOff } from 'lucide-react'
import toast from "react-hot-toast";
import { useResetPassword } from '../../Hooks/useAuth'
import '../../styles/ResetPassword/ResetRightPart.scss'

const ResetRightPart = () => {

    

    // hook

    const {
        mutateAsync: resetPasswordHandle,
        isPending: resetLoading,
    } = useResetPassword();

    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassNew, setShowPassNew] = useState(false)
    const [showPassCon, setShowPassCon] = useState(false)

    const { resetToken } = useParams();

    //strong password
    const hasMinLength = newPassword.length >= 8;
    const hasUpperCase = /[A-Z]/.test(newPassword);
    const hasLowerCase = /[a-z]/.test(newPassword);
    const hasNumberOrSymbol = /[\d!@#$%^&*(),.?":{}|<>]/.test(newPassword);

    const isValidPassword = hasMinLength && hasUpperCase && hasLowerCase && hasNumberOrSymbol;


    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            if (!isValidPassword) {
                toast.error("Please follow all password requirements.");
                return;
            }

            if (newPassword !== confirmPassword) {
                toast.error("Passwords do not match.");
                return;
            }

            const data = await resetPasswordHandle({resetToken, newPassword})

            if (data?.success) {
                navigate("/login");
            }

        } catch (error) {

            console.log(error);
        }
    }

    return (
        <div className="form-container">
            <h1>Create New Password</h1>
            <p className='reset-subTitle'>Enter your new password below. Make sure it's strong and secure.</p>


            <form onSubmit={handleSubmit}>

                <div className="input-group">
                    <label htmlFor="newPassword">New Password</label>

                    <div className="password-field">

                        <input type={showPassNew ? "text" : "password"} autoComplete="new-password" onChange={(e) => { setNewPassword(e.target.value) }} name='newPassword' placeholder='Enter new password...' required />
                        {
                            showPassNew === true ? <Eye strokeWidth={1.25} className='eye-icon' onClick={() => { setShowPassNew(!showPassNew) }} /> : <EyeOff strokeWidth={1.25} className='eye-icon' onClick={() => { setShowPassNew(!showPassNew) }} />
                        }

                    </div>
                </div>


                <div className="input-group">
                    <label htmlFor="confirmPassword">Confirm New Password</label>

                    <div className="password-field">

                        <input type={showPassCon ? "text" : "password"} onChange={(e) => { setConfirmPassword(e.target.value) }} name='confirmPassword' placeholder='Confirm new password...' required />
                        {
                            showPassCon === true ? <Eye strokeWidth={1.25} className='eye-icon' onClick={() => { setShowPassCon(!showPassCon) }} /> : <EyeOff strokeWidth={1.25} className='eye-icon' onClick={() => { setShowPassCon(!showPassCon) }} />
                        }
                    </div>
                </div>

                {/* instruction for strong password */}

                <div className="instructionForPassword">
                    <h3>Password must contain:</h3>

                    <div className="instruction-section">

                        <div className="instruction">
                            {
                                hasMinLength ? (
                                    <CheckCircle2 size={18} color="#ff2d75" />
                                ) : (
                                    <Circle size={18} color="#8b93a7" />
                                )
                            }
                            <p>At least 8 characters</p>
                        </div>

                        <div className="instruction">
                            {
                                hasUpperCase ? (
                                    <CheckCircle2 size={18} color="#ff2d75" />
                                ) : (
                                    <Circle size={18} color="#8b93a7" />
                                )
                            }
                            <p>One uppercase letter</p>
                        </div>

                        <div className="instruction">
                            {
                                hasLowerCase ? (
                                    <CheckCircle2 size={18} color="#ff2d75" />
                                ) : (
                                    <Circle size={18} color="#8b93a7" />
                                )
                            }
                            <p>One lowercase letter</p>
                        </div>

                        <div className="instruction">
                            {
                                hasNumberOrSymbol ? (
                                    <CheckCircle2 size={18} color="#ff2d75" />
                                ) : (
                                    <Circle size={18} color="#8b93a7" />
                                )
                            }
                            <p>One number or symbol</p>
                        </div>

                    </div>
                </div>

                <button className='button primary-button'><LockKeyhole strokeWidth={1.25} />
                {resetLoading ? "Resetting..." : "Reset Password"}</button>


            </form>

            <div className="footer-reset">
                <span className='icon-forgot'><ShieldCheck /></span>
                <p>Your password is encrypted and secure</p>
            </div>

        </div>
    )
}

export default ResetRightPart
