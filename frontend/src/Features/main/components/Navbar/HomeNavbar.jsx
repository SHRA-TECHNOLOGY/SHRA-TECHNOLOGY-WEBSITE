import React, { useState,useRef,useEffect } from 'react'
import logo from '../../../../assets/logo2.png'
import { Link } from 'react-router';
import '../../styles/Navbar/Navbar.scss'
import { Menu, X } from 'lucide-react'

const Navbar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {

        const handleClickOutside = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };

    }, []);

    return (
        <nav ref={menuRef}>

            <div className="nav-heading">
                <img src={logo} alt="animation img" className='logo-img' />
                <div className="logo-title-section">
                    <h2>SHRA</h2>
                    <span>Technology</span>
                </div>

            </div>

            {/* Mobile Menu Button */}

            <button
                className="menu-btn"
                onClick={() =>
                    setIsMenuOpen(!isMenuOpen)
                }
            >
                {
                    isMenuOpen
                        ? <X size={25} />
                        : <Menu size={25} />
                }
            </button>

            {/* Nav Links */}

            <div
                className={`nav-links ${isMenuOpen ? "active" : ""
                    }`}
            >

                <Link
                    to="/home"
                    onClick={() => setIsMenuOpen(false)}
                >
                    Home
                </Link>

                <Link
                    to="/course"
                    onClick={() => setIsMenuOpen(false)}
                >
                    Courses
                </Link>

                <Link
                    to="/features"
                    onClick={() => setIsMenuOpen(false)}
                >
                    Features
                </Link>

                <Link
                    to="#"
                    onClick={() => setIsMenuOpen(false)}
                >
                    About Us
                </Link>

                <Link
                    to="/contact-us"
                    onClick={() => setIsMenuOpen(false)}
                >
                    Contact
                </Link>


                <Link
                    to="/login"
                    className="login-btn home-signUp-btn"
                    onClick={() => setIsMenuOpen(false)}
                >
                    Login
                </Link>

            </div>

        </nav>
    )
}

export default Navbar
