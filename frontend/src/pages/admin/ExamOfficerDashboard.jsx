import React from 'react';
import { useNavigate } from 'react-router-dom';

const ExamOfficerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h2>Exam Officer Dashboard</h2>
      <div className="dashboard-actions">
        <button onClick={() => navigate('/admin/exam-officer/create-exam')}>
          Create New Exam
        </button>
        <button onClick={() => navigate('/admin/exam-officer/exams')}>
          View All Exams
        </button>
        <button onClick={() => navigate('/admin/exam-officer/results')}>
          Manage Results
        </button>
      </div>
    </div>
  );
};

export default ExamOfficerDashboard;