import React, { useState } from "react";
import LoginTabs from "../components/AuthComponents/LoginTabs";
import LoginForm from "../components/AuthComponents/LoginForm";
import AuthFooter from "../components/AuthComponents/AuthFooter";
import { Link, useNavigate } from "react-router";
import { House, LayoutDashboard } from "lucide-react";
import toast from "react-hot-toast";
import api from '../../../api/axios';

import "../styles/Login/Login.scss";

const Login = () => {

    const navigate = useNavigate();
    const [checkingSession, setCheckingSession] = useState(false);

    const handleDashboardClick = async () => {
        try {
            setCheckingSession(true);

            const response = await api.get("api/auth/get-me");

            if (response.data?.success) {
                navigate("/dashboard");
            } else {
                toast.error("Please login first to access the dashboard.");
            }
        } catch (error) {
            const status = error?.response?.status;

            if (status === 401 || status === 403) {
                toast.error("Please login first to access the dashboard.");
            } else {
                toast.error(
                    error?.response?.data?.message ||
                    "Unable to verify your session. Please try again."
                );
            }
        } finally {
            setCheckingSession(false);
        }
    };

    return (

        <div className="form-container">

            <LoginTabs />

            <LoginForm />

            <AuthFooter />


            {/* ==================================
                SIGN UP
            ================================== */}

            <p className="footer-p">
                Don't have an account?{" "}

                <Link
                    to="/register"
                    className="signup"
                >
                    Sign Up
                </Link>
            </p>


            {/* ==================================
                NAVIGATION OPTIONS
            ================================== */}

            <div className="login-navigation">

                <Link
                    to="/"
                    className="login-nav-btn"
                >

                    <House size={16} />

                    <span>
                        Home
                    </span>

                </Link>


                <button
                    type="button"
                    className="login-nav-btn"
                    onClick={handleDashboardClick}
                    disabled={checkingSession}
                >
                    <LayoutDashboard size={16} />

                    <span>
                        {checkingSession ? "Checking..." : "Dashboard"}
                    </span>
                </button>

            </div>

        </div>

    );

};

export default Login;