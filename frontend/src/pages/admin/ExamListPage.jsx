import React, { useEffect, useState } from 'react';

const ExamListPage = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    // Fetch exams from backend API
    const fetchExams = async () => {
      try {
        const response = await fetch('/api/exams');
        const data = await response.json();
        setExams(data);
      } catch (error) {
        setExams([]);
      }
    };
    fetchExams();
  }, []);

  return (
    <div>
      <h3>All Exams</h3>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Subject</th>
            <th>Campus</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {exams.map(exam => (
            <tr key={exam._id || exam.id}>
              <td>{exam.title}</td>
              <td>{exam.subject}</td>
              <td>{exam.campus}</td>
              <td>{exam.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExamListPage;