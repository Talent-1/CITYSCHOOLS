// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaBus, FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import '../styles/landingstyle/Footer.css'; // Ensure the CSS file is correctly imported

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h4>Contact Us</h4>
          <ul>
             <FaMapMarkerAlt className="detail-icon" />
            <li>Addresses:
              <ol>
                <p>
                  <li>
                    <legend id='head-campus'>Head Campus:</legend> <span className="Campus">Off St. Monica's Junction, <br />
                  Gen. Hosp. Road, <br />
                  Abor Ogidi, Anambra State.</span></li>
                </p>
                <p>
                  <li>
                    <legend id='branch-campus-1'>Branch Campus 1:</legend> <span className="Campus">Ifite/Urideke Road, <br />
                    Umuoji, Anambra State.</span>
                  </li>
                </p>
                <p>
                  <li>
                    <legend id='branch-campus-2'>Branch Campus 2:</legend> <span className="Campus"> Behind St. John The Baptist Cath. Church, <br />
                    Adazi Ogidi, Anambra State.</span>
                  </li>
                </p>
              </ol>
            </li>
            <li>Email: info@citygroupschools.com</li>
            <li>Phone: (123) 456-7890</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/admission">Admissions</Link>
            </li>
            <li>
              <Link to="/academics">Academics</Link>
            </li>
            <li>
              <Link to="/student-life">Student Life</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
            <li>
              <Link to="/legal">Terms & Conditions</Link>
            </li>
            <li>
              <Link to="/legal?privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/sitemap">Sitemap</Link>
            </li>
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
            <li>
              <Link to="/careers">Careers</Link>
            </li>
            <li>
              <Link to="/newsandannouncements">Blog</Link>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Social Media</h4>
          <div className="social-icons">
            <h2>Connect With Us</h2>
                                <p>Follow us on social media and stay updated with the latest news and events.</p>
                                <div className="social-links-grid">
                                    <a href="https://facebook.com/citygroupschools" target="_blank" rel="noopener noreferrer" className="social-link-card">
                                        <FaFacebookF className="social-icon" />
                                        <span>Facebook</span>
                                        <span>@citygroupschools</span>
                                    </a>
                                    <a href="https://twitter.com/cgs" target="_blank" rel="noopener noreferrer" className="social-link-card">
                                        <FaTwitter className="social-icon" />
                                        <span>Twitter</span>
                                        <span>@cgs_edu</span>
                                    </a>
                                    <a href="https://instagram.com/citygroupschools" target="_blank" rel="noopener noreferrer" className="social-link-card">
                                        <FaInstagram className="social-icon" />
                                        <span>Instagram</span>
                                        <span>@citygroupschools</span>
                                    </a>
                                    </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 City Group of Schools. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
