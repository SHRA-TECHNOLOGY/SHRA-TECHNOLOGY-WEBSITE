import { useState } from "react";
import { Link } from "react-router";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";
import '../../styles/Footer/MobileFooter.scss'

const MobileFooter = () => {
  const [open, setOpen] = useState("");

  const toggle = (section) => {
    setOpen(open === section ? "" : section);
  };

  return (
    <footer className="mobile-footer">

      <div className="mobile-footer-brand">
        <h2>SHRA <span>Technologies</span></h2>
      </div>

      <div className="footer-accordion">

        <div className="accordion-item">
          <button onClick={() => toggle("platform")}>
            Platform <IoChevronDown />
          </button>

          {open === "platform" && (
            <div className="accordion-content">
              <Link to="/course">Courses</Link>
              <Link to="/notes">Notes</Link>
              <Link to="/practice">Practice</Link>
              <Link to="/tests">Tests</Link>
            </div>
          )}
        </div>

        <div className="accordion-item">
          <button onClick={() => toggle("support")}>
            Support <IoChevronDown />
          </button>

          {open === "support" && (
            <div className="accordion-content">
              <Link to="/help-center">Help Center</Link>
              <Link to="/contact">Contact Us</Link>
              <Link to="/faq">FAQs</Link>
            </div>
          )}
        </div>

        <div className="accordion-item">
          <button onClick={() => toggle("company")}>
            Company <IoChevronDown />
          </button>

          {open === "company" && (
            <div className="accordion-content">
              <Link to="/about">About Us</Link>
              <Link to="/careers">Careers</Link>
              <Link to="/blog">Blog</Link>
            </div>
          )}
        </div>

        <div className="accordion-item">
          <button onClick={() => toggle("contact")}>
            Contact <IoChevronDown />
          </button>

          {open === "contact" && (
            <div className="accordion-content">
              <a href="mailto:support@shratech.com">
                support@shratech.com
              </a>

              <a href="tel:+919876543210">
                +91 98765 43210
              </a>

              <span>Kushinagar, UP</span>
            </div>
          )}
        </div>

      </div>

      <div className="mobile-socials">
        <a href="#"><FaFacebookF /></a>
        <a href="#"><FaLinkedinIn /></a>
        <a href="#"><FaYoutube /></a>
        <a href="#"><FaInstagram /></a>
      </div>

      <p className="copyright">
        © {new Date().getFullYear()} SHRA Technologies.
        All rights reserved.
      </p>

    </footer>
    
  );
};

export default MobileFooter;