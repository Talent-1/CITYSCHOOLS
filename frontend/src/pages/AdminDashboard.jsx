import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../component/styles/dashboardstyles/AdminDashboard.css';

// Importing the feature components
import QuestionManagement from './QuestionManagement';
import ExamManagement from './ExamManagement';
import ResultsManagement from './ResultsManagement';
import PaymentVerification from './PaymentVerification';
import UserManagement from './UserManagement'; // A new, simple component for managing users

// Define the available dashboard views
const VIEWS = {
  USER_MANAGEMENT: 'user-management',
  EXAM_MANAGEMENT: 'exam-management',
  QUESTION_MANAGEMENT: 'question-management',
  RESULTS_MANAGEMENT: 'results-management',
  PAYMENT_VERIFICATION: 'payment-verification',
};

function AdminDashboard() {
  const navigate = useNavigate();
  const { user: authUser, loading: authLoading, logout } = useAuth();
  const [activeView, setActiveView] = useState(VIEWS.QUESTION_MANAGEMENT);
  const [error, setError] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  // Use a single, centralized state for feedback and error messages
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
    if (!authUser || (authUser.role !== 'admin' && authUser.role !== 'branch_admin')) {
      setError('Access Denied. You must be an administrator or branch administrator to view this page.');
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
        <p className="loadingMessage">Loading admin dashboard... Please wait.</p>
      </div>
    );
  }

  if (!authUser || (authUser.role !== 'admin' && authUser.role !== 'branch_admin')) {
    return <p className="errorMessage">Access Denied. You must be an administrator or branch administrator to view this page. <Link to="/login">Login</Link></p>;
  }

  const renderActiveView = () => {
    switch (activeView) {
      case VIEWS.QUESTION_MANAGEMENT:
        return <QuestionManagement setGlobalFeedback={setGlobalFeedback} setGlobalError={setGlobalError} authUser={authUser} />;
      case VIEWS.EXAM_MANAGEMENT:
        return <ExamManagement setGlobalFeedback={setGlobalFeedback} setGlobalError={setGlobalError} authUser={authUser} />;
      case VIEWS.RESULTS_MANAGEMENT:
        return <ResultsManagement setGlobalFeedback={setGlobalFeedback} setGlobalError={setGlobalError} authUser={authUser} />;
      case VIEWS.PAYMENT_VERIFICATION:
        return <PaymentVerification setGlobalFeedback={setGlobalFeedback} setGlobalError={setGlobalError} authUser={authUser} />;
      case VIEWS.USER_MANAGEMENT:
        return <UserManagement setGlobalFeedback={setGlobalFeedback} setGlobalError={setGlobalError} authUser={authUser} />;
      default:
        return <div className="welcomeMessage">Please select a feature from the navigation menu.</div>;
    }
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1 className="header">Admin Dashboard</h1>
        <div className="auth-controls">
          <p>Welcome, {authUser.fullName}</p>
          <button onClick={handleLogout} className="button logoutButton">Logout</button>
        </div>
      </header>
      <div className="main-content">
        <nav className="sidebar">
          <button onClick={() => setActiveView(VIEWS.QUESTION_MANAGEMENT)} className={`nav-button ${activeView === VIEWS.QUESTION_MANAGEMENT ? 'active' : ''}`}>
            Question Management
          </button>
          <button onClick={() => setActiveView(VIEWS.EXAM_MANAGEMENT)} className={`nav-button ${activeView === VIEWS.EXAM_MANAGEMENT ? 'active' : ''}`}>
            Exam Management
          </button>
          <button onClick={() => setActiveView(VIEWS.RESULTS_MANAGEMENT)} className={`nav-button ${activeView === VIEWS.RESULTS_MANAGEMENT ? 'active' : ''}`}>
            Student Results
          </button>
          <button onClick={() => setActiveView(VIEWS.PAYMENT_VERIFICATION)} className={`nav-button ${activeView === VIEWS.PAYMENT_VERIFICATION ? 'active' : ''}`}>
            Payment Verification
          </button>
          <button onClick={() => setActiveView(VIEWS.USER_MANAGEMENT)} className={`nav-button ${activeView === VIEWS.USER_MANAGEMENT ? 'active' : ''}`}>
            User Management
          </button>
        </nav>
        <main className="dashboard-view">
          {error && <p className="errorMessage">{error}</p>}
          {feedbackMessage && <p className="successMessage">{feedbackMessage}</p>}
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
