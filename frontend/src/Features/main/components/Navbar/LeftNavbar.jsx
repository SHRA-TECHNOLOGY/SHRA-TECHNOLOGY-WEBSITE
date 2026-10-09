import React, { useContext,useState } from 'react'
import Logo from '../../../../assets/logo2.png'
import '../../styles/Navbar/LeftNavbar.scss'
import { NavLink, useNavigate } from 'react-router'
import { AuthContext } from '../../../auth/auth.context'
import { useLogout } from '../../../auth/Hooks/useAuth'

import {
    House,
    BookOpen,
    FileText,
    PencilLine,
    ClipboardCheck,
    Video,
    User,
    Settings,
    LogOut,
    UserKey,
    ContactRound,
    Menu,
    X
} from "lucide-react";


const LeftNavbar = ({ expandSidebar, setExpandSidebar }) => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const { user } = useContext(AuthContext);

    const userId = user?.id;

    const sidebarLinksUpper = [
        { id: 1, title: "Dashboard", icon: House, path: "/dashboard" },
        { id: 2, title: "Courses", icon: BookOpen, path: "/course" },
        { id: 3, title: "My Courses", icon: BookOpen, path: `/my-course/${userId}` },
        { id: 4, title: "Notes", icon: FileText, path: "/notes" },
        { id: 5, title: "Practice", icon: PencilLine, path: "/practice" },
        { id: 6, title: "Tests", icon: ClipboardCheck, path: "/tests" },
        { id: 7, title: "Live Classes", icon: Video, path: "/live-classes" },
        { id: 10, title: "Admin Panel", icon: UserKey, path: "/admin-panel", role: "admin" },
        { id: 11, title: "Contact Us", icon: ContactRound, path: "/contact-us" },
    ];

    const sidebarLinksLower = [
        { id: 11, title: "Profile", icon: User, path: "/profile" },
        { id: 12, title: "Settings", icon: Settings, path: "/settings" },
        { id: 13, title: "Logout", icon: LogOut, path: "/logout" },
    ];


    const visibleLinks = sidebarLinksUpper.filter((link) => {

        // Admin link
        if (link.role === "admin") {
            return user?.role === "admin";
        }

        // Normal links
        return true;
    });


    const navigate = useNavigate();


    const {
        mutateAsync: logoutHandler,
        isPending: logoutLoading,
    } = useLogout();


    const handleLogout = async () => {

        try {

            const result = await logoutHandler();

            if (result.success === true) {

                setExpandSidebar(false);

                navigate("/login");

                return;
            }

        } catch (error) {

            console.log(error);

        }
    };


    // Mobile menu toggle
    const handleMenuToggle = () => {

        setExpandSidebar(prev => !prev);

    };


    // Mobile link click par sidebar close
    const handleMobileLinkClick = () => {

        if (window.innerWidth <= 768) {

            setExpandSidebar(false);

        }

    };


    return (

        <>

            {/* =================================
                MOBILE MENU BUTTON
            ================================= */}

            <button
                className={`mobile-menu-btn ${expandSidebar ? "open" : ""
                    }`}
                onClick={handleMenuToggle}
                aria-label="Toggle sidebar"
            >
                {expandSidebar
                    ? <X size={24} />
                    : <Menu size={24} />
                }
            </button>


            {/* =================================
                MOBILE OVERLAY
            ================================= */}

            {expandSidebar && (

                <div
                    className="sidebar-overlay"
                    onClick={() => setExpandSidebar(false)}
                />

            )}


            {/* =================================
                SIDEBAR
            ================================= */}

            <div
                className={`course-left-section ${expandSidebar ? "expand" : ""}`}

                onMouseEnter={() => {

                    if (window.innerWidth > 768) {
                        setExpandSidebar(true);
                    }

                }}

                onMouseLeave={() => {

                    if (window.innerWidth > 768) {
                        setExpandSidebar(false);
                    }

                }}
            >

                {/* =================================
                    LOGO
                ================================= */}

                <div className="logo">

                    <img
                        src={Logo}
                        alt="SHRA Technology"
                    />

                    <h2>
                        SHRA <span>Technology</span>
                    </h2>

                </div>


                {/* =================================
                    MAIN LINKS
                ================================= */}

                <div className="left-feature">

                    {visibleLinks.map(item => {

                        const Icon = item.icon;

                        return (

                            <NavLink
                                to={item.path}

                                onClick={handleMobileLinkClick}

                                className={({ isActive }) =>
                                    `left-link ${isActive ? "active" : ""}`
                                }

                                key={item.id}
                            >

                                <span>
                                    <Icon size={20} />
                                </span>

                                <p>
                                    {item.title}
                                </p>

                            </NavLink>

                        );

                    })}

                </div>


                {/* =================================
                    SETTINGS
                ================================= */}

                <div className="left-setting">

                    {sidebarLinksLower.map(item => {

                        const Icon = item.icon;


                        // Logout
                        if (item.title === "Logout") {

                            return (

                                <button
                                    key={item.id}

                                    onClick={handleLogout}

                                    disabled={logoutLoading}

                                    className="sidebar-link logout-link"
                                >

                                    <span>
                                        <Icon size={20} />
                                    </span>

                                    <p>
                                        {logoutLoading
                                            ? "Logging out..."
                                            : item.title
                                        }
                                    </p>

                                </button>

                            );

                        }


                        return (

                            <NavLink
                                to={item.path}

                                onClick={handleMobileLinkClick}

                                className={({ isActive }) =>
                                    `left-link ${isActive ? "active" : ""}`
                                }

                                key={item.id}
                            >

                                <span>
                                    <Icon size={20} />
                                </span>

                                <p>
                                    {item.title}
                                </p>

                            </NavLink>

                        );

                    })}

                </div>

            </div>

        </>

    );

}

export default LeftNavbar;