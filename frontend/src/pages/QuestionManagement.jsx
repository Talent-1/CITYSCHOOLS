import React, { useState, useEffect } from 'react';
//import {
  //addQuestion,
  //getAllQuestions,
  //getAllSubjects,
  //deleteQuestion,
  //updateQuestion
//} from '../api/admin';
//import { CLASS_LEVELS } from '../constants/AdminConstants';

const groupSubjectsByClassLevel = (subjects) => {
  return subjects.reduce((acc, subject) => {
    const { classLevel } = subject;
    if (!acc[classLevel]) {
      acc[classLevel] = [];
    }
    acc[classLevel].push(subject);
    return acc;
  }, {});
};

const renderSafeString = (value) => {
  if (typeof value === 'object' && value !== null && (
    Object.prototype.hasOwnProperty.call(value, '_id') ||
    Object.prototype.hasOwnProperty.call(value, 'name') ||
    Object.prototype.hasOwnProperty.call(value, 'fullName') ||
    Object.prototype.hasOwnProperty.call(value, 'subjectName') ||
    Object.prototype.hasOwnProperty.call(value, 'title') ||
    Object.prototype.hasOwnProperty.call(value, 'studentId')
  )) {
    return value.name || value.fullName || value.subjectName || value.title || value.studentId || 'N/A';
  }
  return value || 'N/A';
};

function QuestionManagement({ setGlobalFeedback, setGlobalError, authUser }) {
  const [allQuestions, setAllQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    questionText: '', optionA: '', optionB: '', optionC: '', optionD: '', correctOption: '',
    subject: '', classLevel: '',
  });
  const [availableSubjectsGrouped, setAvailableSubjectsGrouped] = useState({});
  const [dataLoading, setDataLoading] = useState(true);

  // Modal State for editing
  const [editQuestionModalOpen, setEditQuestionModalOpen] = useState(false);
  const [questionToEdit, setQuestionToEdit] = useState(null);
  const [editQuestionForm, setEditQuestionForm] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setDataLoading(true);
      try {
        const fetchedQuestions = await getAllQuestions();
        setAllQuestions(fetchedQuestions);
        const fetchedSubjects = await getAllSubjects();
        setAvailableSubjectsGrouped(groupSubjectsByClassLevel(fetchedSubjects));
      } catch (err) {
        setGlobalError('Failed to load questions or subjects.');
        console.error("Question management data fetch error:", err);
      } finally {
        setDataLoading(false);
      }
    };
    fetchData();
  }, [setGlobalError]);

  const handleQuestionChange = (e) => {
    setNewQuestion({ ...newQuestion, [e.target.name]: e.target.value });
  };

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    if (!authUser || authUser.role !== 'admin') {
      setGlobalError('Unauthorized: Only Super Administrators can add questions.');
      return;
    }
    if (!newQuestion.questionText || !newQuestion.correctOption ||
      !newQuestion.optionA || !newQuestion.optionB || !newQuestion.optionC || !newQuestion.optionD ||
      !newQuestion.subject || !newQuestion.classLevel) {
      setGlobalError('Please fill all required fields for the question.');
      return;
    }
    const optionsArray = [
      { text: newQuestion.optionA }, { text: newQuestion.optionB },
      { text: newQuestion.optionC }, { text: newQuestion.optionD },
    ];
    const correctOptionMapping = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
    const correctOptionIndex = correctOptionMapping[newQuestion.correctOption.toUpperCase()];
    if (correctOptionIndex === undefined) {
      setGlobalError('Invalid correct option. Please use A, B, C, or D.');
      return;
    }
    const questionDataToSend = {
      questionText: newQuestion.questionText,
      options: optionsArray,
      correctOptionIndex: correctOptionIndex,
      subject: newQuestion.subject,
      classLevel: newQuestion.classLevel,
    };
    try {
      await addQuestion(questionDataToSend);
      setGlobalFeedback('Question added successfully!');
      setNewQuestion({
        questionText: '', optionA: '', optionB: '', optionC: '', optionD: '', correctOption: '',
        subject: '', classLevel: ''
      });
      // Re-fetch questions to update the list
      const fetchedQuestions = await getAllQuestions();
      setAllQuestions(fetchedQuestions);
    } catch (err) {
      setGlobalError(err.response?.data?.message || 'Failed to add question.');
      console.error("Add question error:", err);
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    if (!window.confirm('Are you sure you want to delete this question? This action cannot be undone.')) return;
    try {
      await deleteQuestion(questionId);
      setAllQuestions(prev => prev.filter(q => q._id !== questionId));
      setGlobalFeedback('Question deleted successfully.');
    } catch (err) {
      setGlobalError('Failed to delete question.');
      console.error(err);
    }
  };

  // Handle Edit Question (open modal and populate form)
  const handleEditQuestion = (question) => {
    setQuestionToEdit(question);
    setEditQuestionForm({
      questionText: question.questionText || '',
      classLevel: question.classLevel || '',
      subject: question.subject?._id || '',
      optionA: question.options?.[0]?.text || '',
      optionB: question.options?.[1]?.text || '',
      optionC: question.options?.[2]?.text || '',
      optionD: question.options?.[3]?.text || '',
      correctOption: String.fromCharCode(65 + (question.correctOptionIndex ?? 0)),
    });
    setEditQuestionModalOpen(true);
  };

  const handleEditQuestionFormChange = (e) => {
    setEditQuestionForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSaveQuestionEdit = async (e) => {
    e.preventDefault();
    if (!questionToEdit) return;
    const optionsArray = [
      { text: editQuestionForm.optionA },
      { text: editQuestionForm.optionB },
      { text: editQuestionForm.optionC },
      { text: editQuestionForm.optionD },
    ];
    const correctOptionMapping = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
    const correctOptionIndex = correctOptionMapping[editQuestionForm.correctOption.toUpperCase()];
    if (correctOptionIndex === undefined) {
      setGlobalError('Invalid correct option. Please use A, B, C, or D.');
      return;
    }
    try {
      await updateQuestion(questionToEdit._id, {
        questionText: editQuestionForm.questionText,
        classLevel: editQuestionForm.classLevel,
        subject: editQuestionForm.subject,
        options: optionsArray,
        correctOptionIndex,
      });
      setGlobalFeedback('Question updated successfully!');
      setEditQuestionModalOpen(false);
      setQuestionToEdit(null);
      const fetchedQuestions = await getAllQuestions();
      setAllQuestions(fetchedQuestions);
    } catch (err) {
      setGlobalError(err.response?.data?.message || 'Failed to update question.');
      console.error(err);
    }
  };

  const closeEditQuestionModal = () => {
    setEditQuestionModalOpen(false);
    setQuestionToEdit(null);
  };

  if (dataLoading) {
    return <p className="loadingMessage">Loading questions and subjects...</p>;
  }

  return (
    <div className="question-management">
      <section className="adminSection">
        <h2 className="sectionHeader">Add New Question</h2>
        <form onSubmit={handleAddQuestion} className="form">
          <div className="formGroup">
            <label>Class Level:</label>
            <select name="classLevel" value={newQuestion.classLevel} onChange={handleQuestionChange} required className="select">
              <option value="">Select Class Level</option>
              {CLASS_LEVELS.map(level => (<option key={level} value={level}>{level}</option>))}
            </select>
          </div>
          <div className="formGroup">
            <label>Subject:</label>
            <select name="subject" value={newQuestion.subject} onChange={handleQuestionChange} required className="select">
              <option value="">Select Subject</option>
              {availableSubjectsGrouped[newQuestion.classLevel]?.map(subject => (
                <option key={subject._id} value={subject._id}>{subject.subjectName}</option>
              ))}
            </select>
          </div>
          <div className="formGroup">
            <label>Question Text:</label>
            <textarea name="questionText" value={newQuestion.questionText} onChange={handleQuestionChange} required className="input textarea" />
          </div>
          <div className="formGroup">
            <label>Option A:</label>
            <input type="text" name="optionA" value={newQuestion.optionA} onChange={handleQuestionChange} required className="input" />
          </div>
          <div className="formGroup">
            <label>Option B:</label>
            <input type="text" name="optionB" value={newQuestion.optionB} onChange={handleQuestionChange} required className="input" />
          </div>
          <div className="formGroup">
            <label>Option C:</label>
            <input type="text" name="optionC" value={newQuestion.optionC} onChange={handleQuestionChange} required className="input" />
          </div>
          <div className="formGroup">
            <label>Option D:</label>
            <input type="text" name="optionD" value={newQuestion.optionD} onChange={handleQuestionChange} required className="input" />
          </div>
          <div className="formGroup">
            <label>Correct Option (A, B, C, or D):</label>
            <input type="text" name="correctOption" value={newQuestion.correctOption} onChange={handleQuestionChange} required maxLength="1" className="input" />
          </div>
          <button type="submit" className="button primary fullWidth">Add Question</button>
        </form>
      </section>
      <section className="adminSection">
        <h2 className="sectionHeader">Existing Questions</h2>
        {allQuestions.length > 0 ? (
          <div className="tableContainer">
            <table className="dataTable">
              <thead>
                <tr>
                  <th>Question Text</th>
                  <th>Class Level</th>
                  <th>Subject</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {allQuestions.map(question => (
                  <tr key={question._id}>
                    <td>{question.questionText.substring(0, 50)}...</td>
                    <td>{question.classLevel}</td>
                    <td>{renderSafeString(question.subject)}</td>
                    <td className="actionsCell">
                      <button onClick={() => handleEditQuestion(question)} className="actionButton editButton">Edit</button>
                      <button onClick={() => handleDeleteQuestion(question._id)} className="actionButton deleteButton">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="noDataMessage">No questions found.</p>
        )}
      </section>
      {editQuestionModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit Question</h2>
            <form onSubmit={handleSaveQuestionEdit} className="form">
              <div className="formGroup">
                <label>Question Text:</label>
                <textarea name="questionText" value={editQuestionForm.questionText} onChange={handleEditQuestionFormChange} required className="input textarea" />
              </div>
              <div className="formGroup">
                <label>Class Level:</label>
                <select name="classLevel" value={editQuestionForm.classLevel} onChange={handleEditQuestionFormChange} required className="select">
                  <option value="">Select Class Level</option>
                  {CLASS_LEVELS.map(level => (<option key={level} value={level}>{level}</option>))}
                </select>
              </div>
              <div className="formGroup">
                <label>Subject:</label>
                <select name="subject" value={editQuestionForm.subject} onChange={handleEditQuestionFormChange} required className="select">
                  <option value="">Select Subject</option>
                  {availableSubjectsGrouped[editQuestionForm.classLevel]?.map(subject => (
                    <option key={subject._id} value={subject._id}>{subject.subjectName}</option>
                  ))}
                </select>
              </div>
              <div className="formGroup">
                <label>Option A:</label>
                <input type="text" name="optionA" value={editQuestionForm.optionA} onChange={handleEditQuestionFormChange} required className="input" />
              </div>
              <div className="formGroup">
                <label>Option B:</label>
                <input type="text" name="optionB" value={editQuestionForm.optionB} onChange={handleEditQuestionFormChange} required className="input" />
              </div>
              <div className="formGroup">
                <label>Option C:</label>
                <input type="text" name="optionC" value={editQuestionForm.optionC} onChange={handleEditQuestionFormChange} required className="input" />
              </div>
              <div className="formGroup">
                <label>Option D:</label>
                <input type="text" name="optionD" value={editQuestionForm.optionD} onChange={handleEditQuestionFormChange} required className="input" />
              </div>
              <div className="formGroup">
                <label>Correct Option (A, B, C, or D):</label>
                <input type="text" name="correctOption" value={editQuestionForm.correctOption} onChange={handleEditQuestionFormChange} required maxLength="1" className="input" />
              </div>
              <div className="buttonContainer">
                <button type="submit" className="button primary">Save Changes</button>
                <button type="button" onClick={closeEditQuestionModal} className="button secondary">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuestionManagement;
