import React from 'react'
import '../../styles/Footer/Footer.scss'
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import {Link} from 'react-router'


const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-top">

        {/* Brand Section */}
        <div className="footer-brand">
          <h2>
            SHRA <span>Technologies</span>
          </h2>

          <p>
            All-in-one platform for students to learn,
            practice, test and grow together.
          </p>

          <div className="social-links">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaYoutube /></a>
            <a href="#"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* Platform */}
        <div className="footer-links">
          <h3>Platform</h3>

          <Link to="/course">Courses</Link>
          <Link to="/notes">Notes</Link>
          <Link to="/practice">Practice</Link>
          <Link to="/tests">Tests</Link>
          <Link to="/live-classes">Live Classes</Link>
        </div>

        {/* Company */}
        <div className="footer-links">
          <h3>Company</h3>

          <Link to="/about">About Us</Link>
          <Link to="/mission">Our Mission</Link>
          <Link to="/careers">Careers</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
        </div>

        {/* Support */}
        <div className="footer-links">
          <h3>Support</h3>

          <Link to="/help-center">Help Center</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/faq">FAQs</Link>
        </div>

        {/* Contact */}
        <div className="footer-links">
          <h3>Contact</h3>

          <div className="contact-item">
            <MdEmail />
            <span>support@shratech.com</span>
          </div>

          <div className="contact-item">
            <IoCall />
            <span>+91 98765 43210</span>
          </div>

          <div className="contact-item">
            <MdLocationOn />
            <span>Kushinagar, UP</span>
          </div>
        </div>

      </div>

      <hr />

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} SHRA Technology.
          All rights reserved.
        </p>

        <div className="footer-bottom-links">
          <Link to="/terms">Terms & Conditions</Link>
          <div className="footer-divder"></div>
          <Link to="/privacy-policy">Privacy Policy</Link>
        </div>
      </div>

    </footer>
  )
}

export default Footer
