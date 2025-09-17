import React, { useState, useEffect } from 'react';
import { FaUser, FaLock, FaEnvelope, FaIdCard, FaBuilding, FaPhoneAlt, FaChalkboardTeacher, FaVenusMars, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../component/styles/auth/AuthPage.css';

// --- Import Seed Data ---
import { campusData, sectionData, departmentData } from '../data/schoolSeedData';

const AuthPage = () => {
    // State to manage which view is active
    const [currentView, setCurrentView] = useState('select-type'); // 'select-type', 'student-login', 'admin-login', 'student-register'

    // Form data states
    const [studentLoginForm, setStudentLoginForm] = useState({ studentId: '', password: '' });
    const [adminLoginForm, setAdminLoginForm] = useState({ username: '', password: '', accessLevel: '' });
    const [studentRegisterForm, setStudentRegisterForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        gender: '',
        campus: '',
        section: '',
        classLevel: '',
        department: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false,
    });
    const [message, setMessage] = useState({ text: '', type: '' });

    // State for dynamic fields
    const [availableClassLevels, setAvailableClassLevels] = useState([]);
    const [showDepartment, setShowDepartment] = useState(false);

    // useEffect hook to handle dynamic form fields
    // This simulates fetching options from a DB when the 'section' changes
    useEffect(() => {
        if (studentRegisterForm.section) {
            setAvailableClassLevels(sectionData[studentRegisterForm.section] || []);
            setShowDepartment(studentRegisterForm.section === 'Senior');
            // Reset class and department when section changes
            setStudentRegisterForm(prevState => ({
                ...prevState,
                classLevel: '',
                department: '',
            }));
        } else {
            setAvailableClassLevels([]);
            setShowDepartment(false);
        }
    }, [studentRegisterForm.section]);

    // Handler for form input changes
    const handleStudentLoginChange = (e) => {
        const { name, value } = e.target;
        setStudentLoginForm({ ...studentLoginForm, [name]: value });
    };

    const handleAdminLoginChange = (e) => {
        const { name, value } = e.target;
        setAdminLoginForm({ ...adminLoginForm, [name]: value });
    };

    const handleStudentRegisterChange = (e) => {
        const { name, value, type, checked } = e.target;
        setStudentRegisterForm({
            ...studentRegisterForm,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    // A function to display a temporary message
    const displayMessage = (text, type) => {
        setMessage({ text, type });
        setTimeout(() => {
            setMessage({ text: '', type: '' });
        }, 5000); // Message disappears after 5 seconds
    };

    // Form submission handlers
    const handleStudentLoginSubmit = (e) => {
        e.preventDefault();
        console.log('Student Login Data:', studentLoginForm);
        displayMessage('Student Login attempt initiated. Check console for data.', 'info');
        // Add your API call for student login here
    };

    const handleAdminLoginSubmit = (e) => {
        e.preventDefault();
        console.log('Admin Login Data:', adminLoginForm);
        displayMessage('Admin Login attempt initiated. Check console for data.', 'info');
        // Add your API call for admin login here
    };

    const handleStudentRegisterSubmit = async (e) => {
        e.preventDefault();
        if (studentRegisterForm.password !== studentRegisterForm.confirmPassword) {
            displayMessage('Passwords do not match!', 'error');
            return;
        }
        if (!studentRegisterForm.agreeToTerms) {
            displayMessage('You must agree to the Terms of Service and Privacy Policy.', 'error');
            return;
        }

        // Prepare data to send (remove confirmPassword and agreeToTerms)
        const { confirmPassword, agreeToTerms, ...payload } = studentRegisterForm;

        try {
            const response = await fetch('http://localhost:5000/api/students/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            if (response.ok) {
                displayMessage(`Registration successful! Your Student ID: ${data.studentId}`, 'success');
                // Optionally, redirect or reset form here
            } else {
                displayMessage(data.error || 'Registration failed.', 'error');
            }
        } catch (error) {
            displayMessage('Network error. Please try again.', 'error');
        }
    };

    return (
        <>
            <div className="auth-page-container">
                <div className="auth-content-wrapper">
                    {/* --- Message Display --- */}
                    {message.text && (
                        <div className={`message-box ${message.type}`}>
                            {message.text}
                        </div>
                    )}
                    {/* --- Selection View --- */}
                    {currentView === 'select-type' && (
                        <div className="auth-selection-card">
                            <h2>Login</h2>
                            <p className="auth-description">
                                Access your student portal or administrative dashboard. Choose your login type below to get started.
                            </p>
                            <h3>Choose Your Login Type</h3>
                            <p className="auth-sub-description">Select the appropriate portal for your role.</p>
                            <div className="login-type-options">
                                <div className="login-type-card" onClick={() => setCurrentView('student-login')}>
                                    <FaUser className="login-type-icon" />
                                    <h4>Student Portal</h4>
                                    <p>Access your courses, view results, check announcements, and manage your academic profile.</p>
                                    <button className="portal-button">Student Login</button>
                                </div>
                                <div className="login-type-card" onClick={() => setCurrentView('admin-login')}>
                                    <FaBuilding className="login-type-icon" />
                                    <h4>Administrator Portal</h4>
                                    <p>Manage students, create courses, view reports, and access administration tools and settings.</p>
                                    <button className="portal-button">Admin Login</button>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* --- Student Login View --- */}
                    {currentView === 'student-login' && (
                        <div className="auth-card">
                            <h3>Student Login</h3>
                            <p className="auth-sub-description">Enter your credentials to access your student portal.</p>
                            <form onSubmit={handleStudentLoginSubmit} className="auth-form">
                                <div className="form-group">
                                    <FaIdCard className="form-icon" />
                                    <input
                                        type="text"
                                        name="studentId"
                                        placeholder="Enter your student ID"
                                        value={studentLoginForm.studentId}
                                        onChange={handleStudentLoginChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <FaLock className="form-icon" />
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        value={studentLoginForm.password}
                                        onChange={handleStudentLoginChange}
                                        required
                                    />
                                </div>
                                <div className="form-actions">
                                    <label>
                                        <input type="checkbox" /> Remember Me
                                    </label>
                                    <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>
                                </div>
                                <button type="submit" className="auth-button"><FaSignInAlt /> Sign In</button>
                                <p className="auth-switch-text">
                                    Don't have an account? <span onClick={() => setCurrentView('student-register')} className="auth-switch-link">Register here</span>
                                </p>
                                <button type="button" onClick={() => setCurrentView('select-type')} className="back-button">Back to Login Type Selection</button>
                            </form>
                        </div>
                    )}
                    {/* --- Admin Login View --- */}
                    {currentView === 'admin-login' && (
                        <div className="auth-card">
                            <h3>Administrator Login</h3>
                            <p className="auth-sub-description">Access the administrative dashboard.</p>
                            <form onSubmit={handleAdminLoginSubmit} className="auth-form">
                                <div className="form-group">
                                    <FaUser className="form-icon" />
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Enter your username"
                                        value={adminLoginForm.username}
                                        onChange={handleAdminLoginChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <FaLock className="form-icon" />
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        value={adminLoginForm.password}
                                        onChange={handleAdminLoginChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <FaChalkboardTeacher className="form-icon" />
                                    <select
                                        name="accessLevel"
                                        value={adminLoginForm.accessLevel}
                                        onChange={handleAdminLoginChange}
                                        required
                                    >
                                        <option value="">Select access level</option>
                                        <option value="principal">Principal</option>
                                        <option value="exam-officer">Exam Officer</option>
                                        <option value="bursar">Bursar</option>
                                        <option value="campus-admin-ab">Campus Admin (Abor)</option>
                                        <option value="campus-admin-ad">Campus Admin (Adazi)</option>
                                        <option value="campus-admin-um">Campus Admin (Umuoji)</option>
                                    </select>
                                </div>
                                <div className="form-actions">
                                    <label>
                                        <input type="checkbox" /> Keep me signed in
                                    </label>
                                </div>
                                <button type="submit" className="auth-button" onClick={() => window.location('/admin')}>Access Dashboard</button>
                                <p className="auth-switch-text">
                                    Need help accessing your account? <Link to="/contact" className="auth-switch-link">Contact IT Support</Link>
                                </p>
                                <button type="button" onClick={() => setCurrentView('select-type')} className="back-button">Back to Login Type Selection</button>
                            </form>
                        </div>
                    )}
                    {/* --- Student Registration View --- */}
                    {currentView === 'student-register' && (
                        <div className="auth-card student-register-card">
                            <h3>Student Registration</h3>
                            <p className="auth-sub-description">Create your student account to access the portal.</p>
                            <form onSubmit={handleStudentRegisterSubmit} className="auth-form">
                                <div className="form-group-inline">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            name="firstName"
                                            placeholder="First Name"
                                            value={studentRegisterForm.firstName}
                                            onChange={handleStudentRegisterChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            name="lastName"
                                            placeholder="Last Name"
                                            value={studentRegisterForm.lastName}
                                            onChange={handleStudentRegisterChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <FaEnvelope className="form-icon" />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        value={studentRegisterForm.email}
                                        onChange={handleStudentRegisterChange}
                                        required
                                    />
                                </div>
                                <div className="form-group-inline">
                                    <div className="form-group">
                                        <FaVenusMars className="form-icon" />
                                        <select
                                            name="gender"
                                            value={studentRegisterForm.gender}
                                            onChange={handleStudentRegisterChange}
                                            required
                                        >
                                            <option value="">Select gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group-inline">
                                    <div className="form-group">
                                        <FaBuilding className="form-icon" />
                                        <select
                                            name="campus"
                                            value={studentRegisterForm.campus}
                                            onChange={handleStudentRegisterChange}
                                            required
                                        >
                                            <option value="">Select campus</option>
                                            {campusData.map((campus, index) => (
                                                <option key={index} value={campus}>{campus}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <FaChalkboardTeacher className="form-icon" />
                                        <select
                                            name="section"
                                            value={studentRegisterForm.section}
                                            onChange={handleStudentRegisterChange}
                                            required
                                        >
                                            <option value="">Select section</option>
                                            {Object.keys(sectionData).map((section, index) => (
                                                <option key={index} value={section}>{section}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group-inline">
                                    <div className="form-group">
                                        <FaChalkboardTeacher className="form-icon" />
                                        <select
                                            name="classLevel"
                                            value={studentRegisterForm.classLevel}
                                            onChange={handleStudentRegisterChange}
                                            required
                                        >
                                            <option value="">Select class level</option>
                                            {availableClassLevels.map((level, index) => (
                                                <option key={index} value={level}>{level}</option>
                                            ))}
                                        </select>
                                    </div>
                                    {showDepartment && (
                                        <div className="form-group">
                                            <FaChalkboardTeacher className="form-icon" />
                                            <select
                                                name="department"
                                                value={studentRegisterForm.department}
                                                onChange={handleStudentRegisterChange}
                                                required={showDepartment}
                                            >
                                                <option value="">Select department</option>
                                                {departmentData.map((dept, index) => (
                                                    <option key={index} value={dept}>{dept}</option>
                                                ))}
                                            </select>
                                        </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <FaLock className="form-icon" />
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={studentRegisterForm.password}
                                        onChange={handleStudentRegisterChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <FaLock className="form-icon" />
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirm Password"
                                        value={studentRegisterForm.confirmPassword}
                                        onChange={handleStudentRegisterChange}
                                        required
                                    />
                                </div>
                                <div className="form-actions register-terms">
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="agreeToTerms"
                                            checked={studentRegisterForm.agreeToTerms}
                                            onChange={handleStudentRegisterChange}
                                            required
                                        />
                                        I agree to the <Link to="/legal?terms" className="auth-switch-link">Terms of Service</Link> and <Link to="/legal?privacy" className="auth-switch-link">Privacy Policy</Link>
                                    </label>
                                </div>
                                <button type="submit" className="auth-button"><FaUserPlus /> Create Account</button>
                                <p className="auth-switch-text">
                                    Already have an account? <span onClick={() => setCurrentView('student-login')} className="auth-switch-link">Sign In</span>
                                </p>
                                <button type="button" onClick={() => setCurrentView('select-type')} className="back-button">Back to Login Type Selection</button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default AuthPage;
