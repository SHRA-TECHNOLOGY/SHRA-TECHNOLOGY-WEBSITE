import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { Eye, EyeOff } from 'lucide-react'
import { ButtonLoader } from '../Loader/ButtonLoader/ButtonLoader'
import { useLogin } from '../../Hooks/useAuth'

const LoginForm = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isShowPass, setIsShowPass] = useState(false)

    // Login Hook
    const {
        mutateAsync: loginHandler,
        isPending: loginLoading,
    } = useLogin();


    // ==========================================
    // LOGIN SUBMIT
    // ==========================================

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {

            const result = await loginHandler({
                email,
                password
            })

            // Login successful hone ke baad
            if (result.success === true) {

                navigate("/dashboard")
                return;
            }

        } catch (error) {

            // Error toast useLogin ke onError se handle ho raha hai
            console.log(error)

        }
    }


    return (
        <div className='form-card'>

            {/* Form */}

            <form
                className="auth-form"
                onSubmit={handleSubmit}
            >

                {/* Email */}

                <div className="form-group">
                    <label>Email</label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>


                {/* Password */}

                <div className="form-group">
                    <label>Password</label>

                    <div className="password-field">

                        <input
                            type={isShowPass ? "text" : "password"}
                            placeholder="Enter your password"
                            className='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <button
                            type="button"
                            className='eye-btn'
                            onClick={() => setIsShowPass(!isShowPass)}
                        >
                            {isShowPass ? <Eye /> : <EyeOff />}
                        </button>

                    </div>
                </div>


                {/* Remember Me / Forgot Password */}

                <div className="form-options">

                    <label>
                        <input
                            type="checkbox"
                            className='checkbox'
                        />
                        Remember Me
                    </label>

                    <Link
                        to={'/forgot-password'}
                        className='forgot-pas'
                    >
                        Forget Password?
                    </Link>

                </div>


                {/* Login Button */}

                <ButtonLoader
                    loading={loginLoading}
                    text="Login"
                    loadingText="logging in..."
                    type="submit"
                    className="login-btn"
                />

            </form>

        </div>
    )
}

export default LoginForm