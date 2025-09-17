// src/pages/ResultCheckerPage.jsx
import React, { useState } from 'react';
import { FaPrint } from 'react-icons/fa';
import '../component/styles/resultstyle/ResultCheckerPage.css';
import campuses from '../data/campuses'; // Import the campus data

const ResultCheckerPage = () => {
  const [showResult, setShowResult] = useState(false);
  const [studentData, setStudentData] = useState(null); // State to hold student details

  const handleViewResult = (e) => {
    e.preventDefault();

    // In a real application, you would fetch data from an API based on student ID.
    // For this example, we'll hardcode the student's campus.
    const studentResult = {
      name: 'John Doe Okeke',
      studentId: '1234/2025/201034',
      class: 'JSS III Science',
      date: 'January 31, 2025',
      campus: 'umuoji', // This is the dynamic part
      resultData: [
        { subject: 'Mathematics', ca: 40, exam: 45, total: 85, grade: 'A', remark: 'Passed', position: '1st' },
        { subject: 'English Language', ca: 32, exam: 40, total: 72, grade: 'B+', remark: 'Passed', position: '3rd' },
        { subject: 'Literature', ca: 30, exam: 35, total: 65, grade: 'C+', remark: 'Passed', position: '5th' },
        { subject: 'History', ca: 28, exam: 40, total: 68, grade: 'B-', remark: 'Passed', position: '4th' },
        { subject: 'Geography', ca: 40, exam: 45, total: 85, grade: 'A', remark: 'Passed', position: '1st' },
      ],
      classPosition: '2nd',
      numberInClass: 35,
    };

    setStudentData(studentResult);
    setShowResult(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const currentCampus = studentData ? campuses[studentData.campus] : null;

  return (
    <div className="result-checker-page-container">
      <header className="result-checker-hero">
        <h2>Result Checker Portal</h2>
        <p>Access your examination results securely using your student information and result card details.</p>
        <div className="hero-buttons">
          <button onClick={handleViewResult} className="view-result-btn">View My Result</button>
          <button className="take-exam-btn">Take a New Exam</button>
        </div>
      </header>

      <section className="access-form-section">
        <div className="form-card">
          <h3>Access Your Results</h3>
          <p>Enter your student details and scratch card information to view your examination results.</p>
          <form onSubmit={handleViewResult}>
            <div className="form-group">
              <label htmlFor="student-id">Student ID</label>
              <input type="text" id="student-id" placeholder="Enter student ID" required />
            </div>
            <div className="form-group">
              <label htmlFor="scratch-card-pin">Scratch Card PIN</label>
              <input type="password" id="scratch-card-pin" placeholder="Enter scratch card PIN" required />
            </div>
            <div className="form-group">
              <label htmlFor="serial-number">Serial No</label>
              <input type="text" id="serial-number" placeholder="Enter serial number" required />
            </div>
            <div className="security-notice">
              <input type="checkbox" id="security-notice" required />
              <label htmlFor="security-notice">
                I hereby accept that this is an official result portal and that all information entered is true and correct.
              </label>
            </div>
            <button type="submit" className="view-results-submit-btn">View Results</button>
          </form>
        </div>
      </section>

      {showResult && currentCampus && (
        <section className="result-sheet-section">
          <div className="printable-header">
            <img src={currentCampus.logo} alt="School Logo" className="school-logo" />
            <div className="school-info">
              <h1>{currentCampus.name}</h1>
              <p>{currentCampus.address}</p>
            </div>
          </div>
          
          <div className="result-sheet-header">
            <h3>Student Result Sheet</h3>
            <p>Official examination results</p>
            <button onClick={handlePrint} className="print-btn">
              <FaPrint /> Print Results
            </button>
          </div>
          <div className="student-info">
            <div className="info-item">
              <span>Student Name:</span> {studentData.name}
            </div>
            <div className="info-item">
              <span>Student ID:</span> {studentData.studentId}
            </div>
            <div className="info-item">
              <span>Class:</span> {studentData.class}
            </div>
            <div className="info-item">
              <span>Date:</span> {studentData.date}
            </div>
          </div>
          <table className="result-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>CA</th>
                <th>EXAM</th>
                <th>TOTAL</th>
                <th>Grade</th>
                <th>Remark</th>
                <th>Position</th>
              </tr>
            </thead>
            <tbody>
              {studentData.resultData.map((result, index) => (
                <tr key={index}>
                  <td>{result.subject}</td>
                  <td>{result.ca}/50</td>
                  <td>{result.exam}/50</td>
                  <td>{result.total}/100</td>
                  <td>{result.grade}</td>
                  <td><span className={result.remark.toLowerCase()}>{result.remark}</span></td>
                  <td>{result.position}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="result-summary">
            <div className="summary-item">
              <span>Total Score:</span> 427/600
            </div>
            <div className="summary-item">
              <span>Average Grade:</span> B+
            </div>
            <div className="summary-item">
              <span>Current Status:</span> <span className="passed-status">Passed</span>
            </div>
          </div>
          <div className="result-sheet-footer">
            <div className="footer-item">
              <span>Class Position:</span> {studentData.classPosition}
            </div>
            <div className="footer-item">
              <span>Number in Class:</span> {studentData.numberInClass}
            </div>
          </div>
          <p className="disclaimer">
            This is an official school result generated by City Group of Schools' examination system. For clarification, please contact the school administration.
          </p>
        </section>
      )}
    </div>
  );
};

export default ResultCheckerPage;