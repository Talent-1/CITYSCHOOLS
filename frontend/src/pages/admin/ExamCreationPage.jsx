import React, { useState } from 'react';
import { createExam } from '../../api/exams';

const ExamCreationPage = () => {
  const [form, setForm] = useState({
    title: '',
    campus: '',
    date: '',
    timeLimit: '',
    subjects: [],
  });
  const [subjectInput, setSubjectInput] = useState({ subject: '', questions: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubjectInputChange = (e) => {
    setSubjectInput({ ...subjectInput, [e.target.name]: e.target.value });
  };

  const addSubject = (e) => {
    e.preventDefault();
    if (
      !subjectInput.subject ||
      !subjectInput.questions ||
      form.subjects.some(s => s.subject.toLowerCase() === subjectInput.subject.toLowerCase())
    ) {
      setMessage('Subject name must be unique and fields cannot be empty.');
      return;
    }
    setForm({
      ...form,
      subjects: [...form.subjects, { ...subjectInput, questions: Number(subjectInput.questions) }],
    });
    setSubjectInput({ subject: '', questions: '' });
    setMessage('');
  };

  const removeSubject = (index) => {
    setForm({
      ...form,
      subjects: form.subjects.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.subjects.length === 0) {
      setMessage('Please add at least one subject.');
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      await createExam(form);
      setMessage('Exam created successfully!');
      setForm({ title: '', campus: '', date: '', timeLimit: '', subjects: [] });
    } catch (err) {
      setMessage(typeof err === 'string' ? err : 'Failed to create exam.');
    }
    setLoading(false);
  };

  return (
    <div>
      <h3>Create New Exam</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Exam Title
          <input name="title" placeholder="Exam Title" value={form.title} onChange={handleChange} required />
        </label>
        <label>
          Exam Date
          <input name="date" type="date" value={form.date} onChange={handleChange} required />
        </label>
        <label>
          Time Limit (minutes)
          <input name="timeLimit" type="number" min="1" placeholder="Time Limit (minutes)" value={form.timeLimit} onChange={handleChange} required />
        </label>
        <label>
          Campus
          <select name="campus" value={form.campus} onChange={handleChange} required>
            <option value="">Select Campus</option>
            <option value="abor">Abor</option>
            <option value="adazi">Adazi</option>
            <option value="umuoji">Umuoji</option>
          </select>
        </label>
        <hr />
        <div>
          <h4>Add Subjects</h4>
          <input
            name="subject"
            placeholder="Subject Name"
            value={subjectInput.subject}
            onChange={handleSubjectInputChange}
          />
          <input
            name="questions"
            type="number"
            min="1"
            placeholder="Number of Questions"
            value={subjectInput.questions}
            onChange={handleSubjectInputChange}
          />
          <button
            onClick={addSubject}
            disabled={!subjectInput.subject || !subjectInput.questions}
            type="button"
          >
            Add Subject
          </button>
        </div>
        <ul>
          {form.subjects.map((subj, idx) => (
            <li key={idx}>
              {subj.subject} - {subj.questions} questions
              <button type="button" onClick={() => removeSubject(idx)}>Remove</button>
            </li>
          ))}
        </ul>
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Exam'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ExamCreationPage;