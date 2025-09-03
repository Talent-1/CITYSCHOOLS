import React from 'react';

function StudentExams({ authUser, setGlobalFeedback, setGlobalError }) {
  // This is a placeholder component.
  // We will add features like:
  // - A list of upcoming exams with dates and durations
  // - A button to start an exam when it's available
  // - A list of completed exams
  // - Filters to sort exams by class level or subject
  return (
    <div className="student-exams">
      <section className="studentSection">
        <h2 className="sectionHeader">My Exams</h2>
        <p>This is where you'll see all your upcoming and past exams. We will add more functionality here soon!</p>
        <div className="tableContainer">
          <table className="dataTable">
            <thead>
              <tr>
                <th>Exam Title</th>
                <th>Subject</th>
                <th>Duration (mins)</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="5" className="text-center">No exams found.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default StudentExams;
