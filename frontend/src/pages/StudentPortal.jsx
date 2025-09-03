import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import '../component/styles/dashboardstyles/StudentPortal.css';

// Import the feature components
import StudentDashboard from './StudentDashboard';
import StudentProfile from './StudentProfile';
import StudentExams from './StudentExams';
import StudentResults from './StudentResults';
import StudentPayments from './StudentPayments';

// Define the available portal views
const VIEWS = {
  DASHBOARD: 'dashboard',
  PROFILE: 'profile',
  EXAMS: 'exams',
  RESULTS: 'results',
  PAYMENTS: 'payments',
};

function StudentPortal() {
  const navigate = useNavigate();
  const { user: authUser, loading: authLoading, logout } = useAuth();
  const [activeView, setActiveView] = useState(VIEWS.DASHBOARD);
  const [error, setError] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  // Centralized state for feedback and error messages
  const setGlobalFeedback = (msg) => {
    setFeedbackMessage(msg);
    setTimeout(() => setFeedbackMessage(''), 5000); // Clear after 5 seconds
  };

  const setGlobalError = (msg) => {
    setError(msg);
    setTimeout(() => setError(''), 5000); // Clear after 5 seconds
  };

  useEffect(() => {
    if (authLoading) {
      return;
    }
    if (!authUser || authUser.role !== 'student') {
      setGlobalError('Access Denied. You must be a student to view this page.');
      setTimeout(() => navigate('/login'), 2000);
    }
  }, [authUser, authLoading, navigate]);

  const handleLogout = useCallback(() => {
    logout();
    navigate('/login');
  }, [logout, navigate]);

  if (authLoading) {
    return (
      <div className="container">
        <p className="loadingMessage">Loading student portal... Please wait.</p>
      </div>
    );
  }

  if (!authUser || authUser.role !== 'student') {
    return (
      <p className="errorMessage">
        Access Denied. You must be a student to view this page. <Link to="/login">Login</Link>
      </p>
    );
  }

  const renderActiveView = () => {
    switch (activeView) {
      case VIEWS.DASHBOARD:
        return <StudentDashboard setGlobalFeedback={setGlobalFeedback} setGlobalError={setGlobalError} authUser={authUser} />;
      case VIEWS.PROFILE:
        return <StudentProfile setGlobalFeedback={setGlobalFeedback} setGlobalError={setGlobalError} authUser={authUser} />;
      case VIEWS.EXAMS:
        return <StudentExams setGlobalFeedback={setGlobalFeedback} setGlobalError={setGlobalError} authUser={authUser} />;
      case VIEWS.RESULTS:
        return <StudentResults setGlobalFeedback={setGlobalFeedback} setGlobalError={setGlobalError} authUser={authUser} />;
      case VIEWS.PAYMENTS:
        return <StudentPayments setGlobalFeedback={setGlobalFeedback} setGlobalError={setGlobalError} authUser={authUser} />;
      default:
        return <div className="welcomeMessage">Please select a feature from the navigation menu.</div>;
    }
  };

  return (
    <div className="student-container">
      <header className="student-header">
        <h1 className="header">Student Portal</h1>
        <div className="auth-controls">
          <p>Welcome, {authUser.fullName}</p>
          <button onClick={handleLogout} className="button logoutButton">Logout</button>
        </div>
      </header>
      <div className="main-content">
        <nav className="sidebar">
          <button onClick={() => setActiveView(VIEWS.DASHBOARD)} className={`nav-button ${activeView === VIEWS.DASHBOARD ? 'active' : ''}`}>
            Dashboard
          </button>
          <button onClick={() => setActiveView(VIEWS.PROFILE)} className={`nav-button ${activeView === VIEWS.PROFILE ? 'active' : ''}`}>
            My Profile
          </button>
          <button onClick={() => setActiveView(VIEWS.EXAMS)} className={`nav-button ${activeView === VIEWS.EXAMS ? 'active' : ''}`}>
            My Exams
          </button>
          <button onClick={() => setActiveView(VIEWS.RESULTS)} className={`nav-button ${activeView === VIEWS.RESULTS ? 'active' : ''}`}>
            My Results
          </button>
          <button onClick={() => setActiveView(VIEWS.PAYMENTS)} className={`nav-button ${activeView === VIEWS.PAYMENTS ? 'active' : ''}`}>
            My Payments
          </button>
        </nav>
        <main className="portal-view">
          {error && <p className="errorMessage">{error}</p>}
          {feedbackMessage && <p className="successMessage">{feedbackMessage}</p>}
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
}

export default StudentPortal;
