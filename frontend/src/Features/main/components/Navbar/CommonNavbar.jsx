import React from "react";
import { useNavigate } from "react-router";

import {
    Settings,
    Bell,
} from "lucide-react";

import "../../styles/Navbar/CommonNavbar.scss";

import LogoImg from "../../../../assets/sonu-img.png";

import { useProfileDashboard } from "../../Hooks/Profile/useProfile";

import {
    useUnreadNotificationCount,
} from "../../Hooks/Notification/useNotification";


const CommonNavbar = ({
    title,
    color,
    message,
    title2,
    size,
}) => {

    // ==========================================
    // PROFILE
    // ==========================================

    const {
        data: profileDashboard,
    } = useProfileDashboard();


    const profileImage =
        profileDashboard?.profile?.profileImage || LogoImg;


    // ==========================================
    // NOTIFICATION
    // ==========================================

    const {
        data: unreadData,
    } = useUnreadNotificationCount();


    const unreadCount =
        unreadData?.unreadCount || 0;


    // ==========================================
    // NAVIGATION
    // ==========================================

    const navigate = useNavigate();


    return (

        <nav className="common-navbar">

            {/* ======================================
                LEFT
            ====================================== */}

            <div className="nac-left">

                <h2
                    className={
                        color === "white"
                            ? "white"
                            : "dark-white"
                    }
                >

                    {title}

                    {title2 && (
                        <span>
                            {" > "}
                            {title2}
                        </span>
                    )}

                </h2>


                {message && (
                    <p>
                        {message}
                    </p>
                )}

            </div>


            {/* ======================================
                RIGHT
            ====================================== */}

            <div className="nav-right">


                {/* Settings */}

                <button
                    className={
                        color === "white"
                            ? "white"
                            : "dark-white"
                    }
                    onClick={() =>
                        navigate("/settings")
                    }
                    title="Settings"
                >

                    <Settings size={22} />

                </button>


                {/* ==================================
                    NOTIFICATION
                ================================== */}

                <div className="notification-nav-wrapper">

                    <button
                        className={
                            color === "white"
                                ? "white"
                                : "dark-white"
                        }
                        onClick={() =>
                            navigate("/notifications")
                        }
                        title="Notifications"
                    >

                        <Bell size={22} />


                        {unreadCount > 0 && (
                            <span className="notification-badge">

                                {unreadCount > 99
                                    ? "99+"
                                    : unreadCount}

                            </span>
                        )}

                    </button>

                </div>


                {/* Profile */}

                <img
                    src={profileImage}
                    alt="Profile"
                    className="profile-img"
                    onClick={() =>
                        navigate("/profile")
                    }
                />

            </div>

        </nav>
    );
};

export default CommonNavbar;