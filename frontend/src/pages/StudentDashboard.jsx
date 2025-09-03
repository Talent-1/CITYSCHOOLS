import React from 'react';

function StudentDashboard({ authUser, setGlobalFeedback, setGlobalError }) {
  // This is a placeholder component.
  // We will add features like:
  // - A welcoming message with the student's name
  // - A summary of recent exam results (e.g., last 3 exams)
  // - A count of upcoming exams or assignments
  // - A progress bar for their overall academic performance
  // - Quick links to other sections of the portal
  return (
    <div className="student-dashboard">
      <section className="studentSection">
        <h2 className="sectionHeader">Dashboard Overview</h2>
        <div className="cardGrid">
          <div className="card">
            <div className="card-title">Welcome Back</div>
            <div className="card-value">{authUser.fullName}</div>
            <p className="text-sm text-gray-500">How are you doing today?</p>
          </div>
          <div className="card">
            <div className="card-title">Completed Exams</div>
            <div className="card-value">0</div>
            <p className="text-sm text-gray-500">Exams taken so far.</p>
          </div>
          <div className="card">
            <div className="card-title">Pending Payments</div>
            <div className="card-value">0</div>
            <p className="text-sm text-gray-500">Payments pending verification.</p>
          </div>
        </div>
      </section>
      <section className="studentSection">
        <h2 className="sectionHeader">Upcoming Exams</h2>
        <p>No upcoming exams at the moment. Check back soon!</p>
      </section>
    </div>
  );
}

export default StudentDashboard;
