// src/pages/ContactPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaBus, FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import '../component/styles/contactstyle/ContactPage.css';

// Using a simple placeholder for images until the API provides them
//import userPlaceholder from '../assets/user-placeholder.png'; 

const ContactPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        subject: '',
        message: '',
    });

    const [keyContacts, setKeyContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data from the API when the component mounts
    useEffect(() => {
        const fetchContacts = async () => {
            try {
                // Replace this with your actual API endpoint for key contacts
                const response = await axios.get('https://your-api.com/contacts'); 
                setKeyContacts(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchContacts();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        alert('Message sent successfully!');
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            subject: '',
            message: '',
        });
    };

    return (
        <div className="contact-page-container">
            <section className="contact-hero">
                <h2>Contact Us</h2>
                <p>
                    Get in touch with City Group of Schools. We're here to answer your questions,
                    provide information, and help you connect with our educational community.
                </p>
            </section>

            <section className="contact-content-grid">
                <div className="contact-form-container">
                    <h3>Send us a Message</h3>
                    <p>
                        Fill out the form below and we'll get back to you within 24 hours. For urgent
                        inquiries, please call our front office directly.
                    </p>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group-inline">
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group-inline">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="tel"
                                name="phoneNumber"
                                placeholder="Phone Number"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <input
                            type="text"
                            name="subject"
                            placeholder="Subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                        />
                        <textarea
                            name="message"
                            placeholder="Type your message here..."
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                        <button type="submit">Send Message</button>
                    </form>
                </div>
                <div className="contact-info-container">
                    <h3>Visit Our Campus</h3>
                    <p>
                        Come and explore our vibrant learning environment firsthand. We provide tours
                        and are delighted to answer your questions about our facilities.
                    </p>
                    {/* The Google Maps iframe is added here */}
                    <div className="map-embed">
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.817184366166!2d6.899771109644828!3d6.155234093806168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104391f57122d675%3A0x5e304e2c012c333a!2sCity%20Comprehensive%20Secondary%20School%2C%20Ogidi.!5e0!3m2!1sen!2sng!4v1756352648368!5m2!1sen!2sng"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="School Location Map"
        ></iframe>
    </div>
                    <div className="contact-details">
                        <div className="detail-item">
                            <FaMapMarkerAlt className="detail-icon" />
                            <div>
                                <h4>Address</h4>
                                <ul>
                                    <li>
                                        <strong>Head Campus:</strong> <span className="Campus">Off St. Monica's Junction, <br />Gen. Hosp. Road, <br />Abor Ogidi, Anambra State.</span>
                                    </li>
                                    <li>
                                        <strong>Branch Campus 1:</strong> <span className="Campus">Ifite/Urideke Road, <br />Umuoji, Anambra State.</span>
                                    </li>
                                    <li>
                                        <strong>Branch Campus 2:</strong> <span className="Campus">Behind St. John The Baptist Cath. Church, <br />Adazi Ogidi, Anambra State.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="detail-item">
                            <FaClock className="detail-icon" />
                            <div>
                                <h4>Office Hours</h4>
                                <p>Monday - Friday: 7:00 AM - 5:00 PM</p>
                                <p>Saturday: 9:00 AM - 1:00 PM</p>
                                <p>Sunday: Closed</p>
                            </div>
                        </div>
                        <div className="detail-item">
                            <FaBus className="detail-icon" />
                            <div>
                                <h4>Transportation</h4>
                                <p>
                                    Free bus service available. Parking available on campus. Please call for more details.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="key-contacts-section">
                <h2>Directory of Key Contacts</h2>
                <p>Connect directly with the department or staff member for your specific needs.</p>
                {loading ? (
                    <p>Loading contacts...</p>
                ) : error ? (
                    <p>Error loading contacts. Please try again later.</p>
                ) : (
                    <div className="contact-cards-grid">
                        {keyContacts.map(contact => (
                            <div className="contact-card" key={contact.id}>
                                <img src={contact.image /*|| userPlaceholder*/} alt={contact.name} className="contact-profile-img" />
                                <h4>{contact.name}</h4>
                                <p className="contact-title">{contact.title}</p>
                                <p><FaPhoneAlt /> {contact.phone}</p>
                                <p><FaEnvelope /> {contact.email}</p>
                                <p><FaClock /> {contact.hours}</p>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <section className="emergency-social-section">
                <div className="emergency-contacts">
                    <h2>Emergency Contacts</h2>
                    <p>For urgent matters outside regular office hours or emergency situations.</p>
                    <div className="emergency-hotline">
                        <p className="hotline-number"><FaPhoneAlt /> 24/7 Emergency Hotline</p>
                        <p>+234 803 999 8888</p>
                        <p className="hotline-desc">For medical emergencies, security issues, or urgent school matters.</p>
                    </div>
                    <div className="other-numbers">
                        <h4>Other Important Numbers</h4>
                        <p>Security Office: +234 801 111 4444</p>
                        <p>Transport Department: +234 801 222 5555</p>
                        <p>Maintenance: +234 801 333 6666</p>
                    </div>
                </div>
                <div className="connect-with-us">
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
            </section>
        </div>
    );
};

export default ContactPage;