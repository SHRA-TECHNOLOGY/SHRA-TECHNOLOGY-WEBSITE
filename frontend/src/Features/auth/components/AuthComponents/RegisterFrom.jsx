import React,{useContext, useState} from 'react'
import {Eye,EyeOff} from 'lucide-react'
import { ButtonLoader } from '../Loader/ButtonLoader/ButtonLoader';
import { AuthContext } from '../../auth.context';
import {useRegister} from '../../Hooks/useAuth';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router';

const RegisterFrom = () => {

    // state

    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [city, setCity] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isShowPass, setIsShowPass] = useState(false)

    const navigate = useNavigate();

    // number only 10 value validation
    const handleNumberChange = (e) => {
        const inputValue = e.target.value;
        if (inputValue.length <= 10) {
            setNumber(inputValue);
        }
    };

    //hook

    const {
        mutateAsync : registerHandler,
        isPending : registerPending
    } = useRegister();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            if(password != confirmPassword ){
                toast.error("Password And Confirm Password is not matched !");
                return
            }

            const result = await registerHandler({fullName,username,number,city,email,password});

            // Login successful hone ke baad
            if (result.success === true) {

                navigate("/login")
            }

        } catch (error) {
            console.log(error)
        }
    }
    return (
        
        
        <div className='form-card'>
            {/* Form */}
            <form className="auth-form">

                <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" placeholder="Enter your username" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                </div>

                <div className="form-group">
                    <label>Username</label>
                    <input type="text" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>

                <div className="form-group">
                    <label>Phone No.</label>
                    <input type="number" placeholder="Enter your phone number" value={number} onChange={handleNumberChange} required />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div className="form-group">
                    <label>City</label>
                    <input type="text" placeholder="Enter your city" value={city} onChange={(e) => setCity(e.target.value)} required />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <div className="password-field">
                        <input type={isShowPass ? "text":"password" } placeholder="Enter your password" className='password' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                        <button type='button' className='eye-btn' onClick={()=>setIsShowPass(!isShowPass)}> {isShowPass? <Eye /> :<EyeOff />}</button>
                    </div>
                </div>

                <div className="form-group">
                    <label>Confirm Password</label>
                    <div className="password-field">
                        <input type={isShowPass ? "text":"password" } placeholder="Enter your confirm password" className='password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} required/>
                        <button type='button' className='eye-btn' onClick={()=>setIsShowPass(!isShowPass)}> {isShowPass? <Eye /> :<EyeOff />}</button>
                    </div>
                </div>

                <ButtonLoader loading={registerPending} text="Create Account" loadingText="Creating Account..." type="submit" onClick={handleSubmit} className="login-btn" />

            </form>

        </div>
    )
}

export default RegisterFrom
