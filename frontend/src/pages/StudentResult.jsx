import React from 'react';

function StudentResults({ authUser, setGlobalFeedback, setGlobalError }) {
  // This is a placeholder component.
  // We will add features like:
  // - A list of all completed exam results for the student
  // - A detailed breakdown of scores by subject
  // - A graphical representation of performance over time
  // - The ability to download a result slip
  return (
    <div className="student-results">
      <section className="studentSection">
        <h2 className="sectionHeader">My Exam Results</h2>
        <p>This page will show all your exam results. It's empty for now, but we will fill it with data from the exams you've taken.</p>
        <div className="tableContainer">
          <table className="dataTable">
            <thead>
              <tr>
                <th>Exam Title</th>
                <th>Date Taken</th>
                <th>Score</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="4" className="text-center">No results found.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default StudentResults;
