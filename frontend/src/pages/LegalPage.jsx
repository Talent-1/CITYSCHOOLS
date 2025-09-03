// src/pages/LegalPage.jsx
import React, { useState } from 'react';
import { FaUserShield, FaFileContract, FaCookieBite, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import '../component/styles/legalstyle/LegalPage.css';

const privacyPolicyContent = (
    <>
        <h4>1. Information We Collect</h4>
        <p>We collect information you provide directly to us, such as when you create an account, take exams, or contact us for support.</p>
        <ul>
            <li>Personal Information (name, email, phone number, date of birth)</li>
            <li>Academic Information (class level, student ID, exam results)</li>
            <li>Usage data (login times, exam attempts, platform interactions)</li>
            <li>Device Information (IP address, browser type, operating system)</li>
        </ul>
        <h4>2. How We Use Your Information</h4>
        <p>We use the information we collect to provide, maintain, and improve our services:</p>
        <ul>
            <li>Administer exams and calculate results.</li>
            <li>Maintain student records and academic progress.</li>
            <li>Communicate important updates and announcements.</li>
            <li>Provide technical support and customer service.</li>
            <li>Improve our platform and develop new features.</li>
        </ul>
        <h4>3. Information Sharing</h4>
        <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy or as required by law.</p>
        <h4>4. Data Security</h4>
        <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
        <h4>5. Your Rights</h4>
        <p>You have the right to:</p>
        <ul>
            <li>Access and review your personal information.</li>
            <li>Request corrections to inaccurate information.</li>
            <li>Request deletion of your account and data.</li>
            <li>Opt-out of certain communications.</li>
        </ul>
    </>
);

const termsOfServiceContent = (
    <>
        <h4>1. Acceptance of Terms</h4>
        <p>By accessing or using the City Group of Schools platform, you accept and agree to be bound by our terms and conditions of this agreement.</p>
        <h4>2. Use License</h4>
        <p>Permission is granted to temporarily access the platform for personal, non-commercial transitory viewing only. This is a license, not a transfer of title, and under this license you may not:</p>
        <ul>
            <li>Modify or copy the materials.</li>
            <li>Use the materials for commercial purposes or public display.</li>
            <li>Attempt to decompile or reverse engineer any software.</li>
            <li>Remove any copyright or proprietary notations.</li>
        </ul>
        <h4>3. Student Responsibilities</h4>
        <p>Students using the platform agree to:</p>
        <ul>
            <li>Be responsible for the security of their login credentials.</li>
            <li>Use the platform only for legitimate educational purposes.</li>
            <li>Not share course content or attempt to cheat.</li>
            <li>Adhere to all school rules and disciplinary policies.</li>
            <li>Respect other users and maintain appropriate conduct.</li>
        </ul>
        <h4>4. Exam Integrity</h4>
        <p>Any attempt to compromise exam integrity, including but not limited to cheating, plagiarism, or unauthorized assistance, will be met with immediate suspension of platform access and/or disciplinary action.</p>
        <h4>5. Limitation of Liability</h4>
        <p>The platform is provided "as is". We are not responsible for any damage arising from the use or inability to use the platform, including but not limited to technical failures, data loss, or service interruptions.</p>
    </>
);

const cookiePolicyContent = (
    <>
        <h4>What Are Cookies?</h4>
        <p>Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and login status.</p>
        <h4>Types of Cookies We Use</h4>
        <p><strong>Essential Cookies</strong><br />Required to enable core platform functionality, including login sessions and account security.</p>
        <p><strong>Performance Cookies</strong><br />Help us understand how visitors interact with our platform to improve overall performance and user experience.</p>
        <p><strong>Functional Cookies</strong><br />Remember your preferences and settings to provide a personalized user experience.</p>
        <h4>Managing Cookies</h4>
        <p>You can control and delete cookies through your browser settings. However, disabling certain cookies may affect the functionality of our platform.</p>
    </>
);

const LegalPage = () => {
    const [activePolicy, setActivePolicy] = useState('privacy'); // 'privacy', 'terms', 'cookie'
    const lastUpdated = 'September 02, 2025';

    const renderPolicyContent = () => {
        switch (activePolicy) {
            case 'privacy':
                return privacyPolicyContent;
            case 'terms':
                return termsOfServiceContent;
            case 'cookie':
                return cookiePolicyContent;
            default:
                return null;
        }
    };

    return (
        <div className="legal-page-container">
            <section className="legal-hero">
                <h2>Legal Information</h2>
                <p>Important legal documents and policies for City Group of Schools</p>
            </section>

            <section className="policy-navigation">
                <div 
                    className={`policy-link ${activePolicy === 'privacy' ? 'active' : ''}`} 
                    onClick={() => setActivePolicy('privacy')}
                >
                    <FaUserShield className="policy-icon" />
                    <span>Privacy Policy</span>
                    <p>Information we collect and protect your personal information</p>
                </div>
                <div 
                    className={`policy-link ${activePolicy === 'terms' ? 'active' : ''}`} 
                    onClick={() => setActivePolicy('terms')}
                >
                    <FaFileContract className="policy-icon" />
                    <span>Terms of Service</span>
                    <p>Rules and guidelines for using our platform and services</p>
                </div>
                <div 
                    className={`policy-link ${activePolicy === 'cookie' ? 'active' : ''}`} 
                    onClick={() => setActivePolicy('cookie')}
                >
                    <FaCookieBite className="policy-icon" />
                    <span>Cookie Policy</span>
                    <p>Information about our use of cookies and your managing your rights</p>
                </div>
            </section>
            
            <section className="policy-content">
                <p className="last-updated">Last updated: {lastUpdated}</p>
                <div className="content-box">
                    {renderPolicyContent()}
                </div>
            </section>

            <section className="legal-contact-section">
                <h3>Questions About Our Legal Policies?</h3>
                <p>If you have any questions about these policies or need clarification, please contact us.</p>
                <div className="legal-contact-cards">
                    <div className="contact-card">
                        <FaEnvelope className="contact-icon" />
                        <h4>Email Support</h4>
                        <p>Send us your legal questions and concerns</p>
                        <span>legal@cgschools.edu.ng</span>
                    </div>
                    <div className="contact-card">
                        <FaPhoneAlt className="contact-icon" />
                        <h4>Phone Support</h4>
                        <p>Speak with a member of our legal team</p>
                        <span>+234 803 501 5436</span>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LegalPage;