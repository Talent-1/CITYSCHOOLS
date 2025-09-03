import React, { useState, useEffect } from 'react';
import { getExams, deleteExam, updateExam } from '../api/exams';
import { addExam, getAllSubjects, getBranches } from '../api/admin';
import { CLASS_LEVELS, DEPARTMENTS, isSeniorSecondaryClass } from '../constants/AdminConstants';
import { renderSafeString } from '../utils/AdminUtils';

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

function ExamManagement({ setGlobalFeedback, setGlobalError, authUser }) {
  const [exams, setExams] = useState([]);
  const [branches, setBranches] = useState([]);
  const [availableSubjectsGrouped, setAvailableSubjectsGrouped] = useState({});
  const [dataLoading, setDataLoading] = useState(true);
  const [newExam, setNewExam] = useState({
    title: '', classLevel: '', duration: '', branchId: '', areaOfSpecialization: '', isActive: true
  });
  const [selectedSubjectsForExam, setSelectedSubjectsForExam] = useState({});

  // Modal State for editing
  const [editExamModalOpen, setEditExamModalOpen] = useState(false);
  const [examToEdit, setExamToEdit] = useState(null);
  const [editExamForm, setEditExamForm] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setDataLoading(true);
      try {
        const fetchedExams = await getExams();
        setExams(fetchedExams);
        const fetchedBranches = await getBranches();
        setBranches(fetchedBranches);
        const fetchedSubjects = await getAllSubjects();
        setAvailableSubjectsGrouped(groupSubjectsByClassLevel(fetchedSubjects));
      } catch (err) {
        setGlobalError('Failed to load exams, branches, or subjects.');
        console.error("Exam management data fetch error:", err);
      } finally {
        setDataLoading(false);
      }
    };
    fetchData();
  }, [setGlobalError]);

  const handleExamChange = (e) => {
    const { name, value } = e.target;
    setNewExam(prev => ({ ...prev, [name]: value }));
    if (name === 'classLevel') {
      setSelectedSubjectsForExam({});
      if (!isSeniorSecondaryClass(value)) {
        setNewExam(prev => ({ ...prev, areaOfSpecialization: '' }));
      }
    }
  };

  const handleSubjectSelectionForExam = (subjectId, isChecked) => {
    setSelectedSubjectsForExam(prevSelected => {
      const newState = { ...prevSelected };
      const allSubjectsFlat = Object.values(availableSubjectsGrouped).flat();
      const selectedSubjectData = allSubjectsFlat.find(s => s._id === subjectId);
      if (!selectedSubjectData) {
        console.error("Error: Subject data not found for ID:", subjectId);
        return prevSelected;
      }
      if (isChecked) {
        newState[subjectId] = {
          isSelected: true,
          numQuestions: prevSelected[subjectId]?.numQuestions || '',
          subjectName: selectedSubjectData.subjectName
        };
      } else {
        delete newState[subjectId];
      }
      return newState;
    });
  };

  const handleNumQuestionsForSubject = (subjectId, value) => {
    setSelectedSubjectsForExam(prev => ({
      ...prev,
      [subjectId]: { ...prev[subjectId], numQuestions: parseInt(value, 10) || 0 }
    }));
  };

  const handleAddExam = async (e) => {
    e.preventDefault();
    if (!authUser || authUser.role !== 'admin') {
      setGlobalError('Unauthorized: Only Super Administrators can add exams.');
      return;
    }
    if (!newExam.title || !newExam.classLevel || !newExam.duration || !newExam.branchId) {
      setGlobalError('Please fill all required fields for the exam.');
      return;
    }
    if (isSeniorSecondaryClass(newExam.classLevel) && !newExam.areaOfSpecialization) {
      setGlobalError('For Senior Secondary class levels, please select a Department.');
      return;
    }
    const selectedSubjectsArray = Object.entries(selectedSubjectsForExam)
      .filter(([, data]) => data.isSelected)
      .map(([subjectId, data]) => ({
        subjectId: subjectId,
        subjectName: data.subjectName,
        numberOfQuestions: data.numQuestions,
      }));

    if (selectedSubjectsArray.length === 0) {
      setGlobalError('Please select at least one subject for the exam.');
      return;
    }
    try {
      const examDataToSend = {
        title: newExam.title,
        classLevel: newExam.classLevel,
        duration: parseInt(newExam.duration),
        branchId: newExam.branchId,
        createdBy: authUser._id,
        subjectsIncluded: selectedSubjectsArray,
        areaOfSpecialization: isSeniorSecondaryClass(newExam.classLevel) ? newExam.areaOfSpecialization : null,
        isActive: newExam.isActive,
      };
      await addExam(examDataToSend);
      setGlobalFeedback('Unit Exam added successfully!');
      setNewExam({
        title: '', classLevel: '', duration: '', branchId: '', areaOfSpecialization: '', isActive: true
      });
      setSelectedSubjectsForExam({});
      const fetchedExams = await getExams();
      setExams(fetchedExams);
    } catch (err) {
      setGlobalError(err.response?.data?.message || 'Failed to add exam. Check console for details.');
      console.error("Add exam error:", err);
    }
  };

  const handleDeleteExam = async (examId) => {
    if (!window.confirm('Are you sure you want to delete this exam? This action cannot be undone.')) return;
    try {
      await deleteExam(examId);
      setExams(prev => prev.filter(e => e._id !== examId));
      setGlobalFeedback('Exam deleted successfully.');
      if (examToEdit && examToEdit._id === examId) closeEditExamModal();
    } catch (err) {
      setGlobalError('Failed to delete exam.');
      console.error(err);
    }
  };

  const handleToggleExamActiveStatus = async (examId, currentStatus) => {
    if (!authUser || authUser.role !== 'admin') {
      setGlobalError('Unauthorized: Only Super Administrators can change exam status.');
      return;
    }
    const newStatus = !currentStatus;
    if (!window.confirm(`Are you sure you want to ${newStatus ? 'ACTIVATE' : 'DEACTIVATE'} this exam?`)) return;
    try {
      await updateExam(examId, { isActive: newStatus });
      setGlobalFeedback(`Exam ${newStatus ? 'activated' : 'deactivated'} successfully!`);
      setExams(prevExams =>
        prevExams.map(exam =>
          exam._id === examId ? { ...exam, isActive: newStatus } : exam
        )
      );
    } catch (err) {
      setGlobalError(err.response?.data?.message || 'Failed to toggle exam status.');
      console.error(err);
    }
  };

  const handleEditExam = (exam) => {
    setExamToEdit(exam);
    setEditExamForm({
      title: exam.title || '',
      classLevel: exam.classLevel || '',
      duration: exam.duration || '',
      branchId: exam.branchId || '',
      areaOfSpecialization: exam.areaOfSpecialization || '',
      subjectsIncluded: exam.subjectsIncluded || [],
      isActive: exam.isActive ?? true,
    });
    setEditExamModalOpen(true);
  };

  const handleEditExamFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditExamForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSaveExamEdit = async (e) => {
    e.preventDefault();
    if (!examToEdit) return;
    try {
      await updateExam(examToEdit._id, {
        ...editExamForm,
        duration: parseInt(editExamForm.duration),
      });
      setGlobalFeedback('Exam updated successfully!');
      setEditExamModalOpen(false);
      setExamToEdit(null);
      const fetchedExams = await getExams();
      setExams(fetchedExams);
    } catch (err) {
      setGlobalError(err.response?.data?.message || 'Failed to update exam.');
      console.error(err);
    }
  };

  const closeEditExamModal = () => {
    setEditExamModalOpen(false);
    setExamToEdit(null);
  };

  if (dataLoading) {
    return <p className="loadingMessage">Loading exams and branches...</p>;
  }

  return (
    <div className="exam-management">
      <section className="adminSection">
        <h2 className="sectionHeader">Add New Exam</h2>
        <form onSubmit={handleAddExam} className="form">
          <div className="formGroup">
            <label>Title:</label>
            <input type="text" name="title" value={newExam.title} onChange={handleExamChange} required className="input" />
          </div>
          <div className="formGroup">
            <label>Class Level:</label>
            <select name="classLevel" value={newExam.classLevel} onChange={handleExamChange} required className="select">
              <option value="">Select Class Level</option>
              {CLASS_LEVELS.map(level => (<option key={level} value={level}>{level}</option>))}
            </select>
          </div>
          {isSeniorSecondaryClass(newExam.classLevel) && (
            <div className="formGroup">
              <label>Department:</label>
              <select name="areaOfSpecialization" value={newExam.areaOfSpecialization} onChange={handleExamChange} required={isSeniorSecondaryClass(newExam.classLevel)} className="select">
                <option value="">Select Department</option>
                {DEPARTMENTS.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          )}
          <div className="formGroup">
            <label>Duration (mins):</label>
            <input type="number" name="duration" value={newExam.duration} onChange={handleExamChange} required className="input" min="1" />
          </div>
          <div className="formGroup">
            <label>Branch:</label>
            <select name="branchId" value={newExam.branchId} onChange={handleExamChange} required className="select">
              <option value="">Select Branch</option>
              {branches.map(branch => (<option key={branch._id} value={branch._id}>{branch.name}</option>))}
            </select>
          </div>
          <div className="formGroup">
            <label>Select Subjects:</label>
            {newExam.classLevel && availableSubjectsGrouped[newExam.classLevel]?.length > 0 ? (
              <ul className="subjectsList">
                {availableSubjectsGrouped[newExam.classLevel].map(subject => (
                  <li key={subject._id} className="subjectItem">
                    <input
                      type="checkbox"
                      id={`subject-${subject._id}`}
                      checked={!!selectedSubjectsForExam[subject._id]?.isSelected}
                      onChange={(e) => handleSubjectSelectionForExam(subject._id, e.target.checked)}
                      className="checkbox"
                    />
                    <label htmlFor={`subject-${subject._id}`} className="subjectLabel">{subject.subjectName}</label>
                    {selectedSubjectsForExam[subject._id]?.isSelected && (
                      <input
                        type="number"
                        placeholder="No. of questions"
                        value={selectedSubjectsForExam[subject._id]?.numQuestions || ''}
                        onChange={(e) => handleNumQuestionsForSubject(subject._id, e.target.value)}
                        min="1"
                        className="input smallInput"
                      />
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="noDataMessage">No subjects available for this class level.</p>
            )}
          </div>
          <div className="formGroup checkboxGroup">
            <input type="checkbox" id="isActive" name="isActive" checked={newExam.isActive} onChange={handleExamChange} className="checkbox" />
            <label htmlFor="isActive" className="checkboxLabel">Exam is Active</label>
          </div>
          <button type="submit" className="button primary fullWidth">Add Exam</button>
        </form>
      </section>
      <section className="adminSection">
        <h2 className="sectionHeader">Existing Exams</h2>
        {exams.length > 0 ? (
          <div className="tableContainer">
            <table className="dataTable">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Class Level</th>
                  <th>Duration (mins)</th>
                  <th>Branch</th>
                  <th>Subjects</th>
                  <th>Active</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {exams.map(exam => (
                  <tr key={exam._id}>
                    <td>{exam.title}</td>
                    <td>{exam.classLevel}</td>
                    <td>{exam.duration}</td>
                    <td>{renderSafeString(exam.branchId)}</td>
                    <td>
                      <ul className="subjectsList noBullet">
                        {exam.subjectsIncluded.map((subject, index) => (
                          <li key={index}>{subject.subjectName} ({subject.numberOfQuestions} q's)</li>
                        ))}
                      </ul>
                    </td>
                    <td>{exam.isActive ? '✅' : '❌'}</td>
                    <td className="actionsCell">
                      <button onClick={() => handleEditExam(exam)} className="actionButton editButton">Edit</button>
                      <button onClick={() => handleToggleExamActiveStatus(exam._id, exam.isActive)} className="actionButton toggleButton">
                        {exam.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                      <button onClick={() => handleDeleteExam(exam._id)} className="actionButton deleteButton">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="noDataMessage">No exams found.</p>
        )}
      </section>
      {editExamModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit Exam</h2>
            <form onSubmit={handleSaveExamEdit} className="form">
              <div className="formGroup">
                <label>Title:</label>
                <input type="text" name="title" value={editExamForm.title} onChange={handleEditExamFormChange} required className="input" />
              </div>
              <div className="formGroup">
                <label>Class Level:</label>
                <select name="classLevel" value={editExamForm.classLevel} onChange={handleEditExamFormChange} required className="select">
                  <option value="">Select Class Level</option>
                  {CLASS_LEVELS.map(level => (<option key={level} value={level}>{level}</option>))}
                </select>
              </div>
              {editExamForm.classLevel && isSeniorSecondaryClass(editExamForm.classLevel) && (
                <div className="formGroup">
                  <label>Department:</label>
                  <select name="areaOfSpecialization" value={editExamForm.areaOfSpecialization} onChange={handleEditExamFormChange} required className="select">
                    <option value="">Select Department</option>
                    {DEPARTMENTS.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
              )}
              <div className="formGroup">
                <label>Duration (mins):</label>
                <input type="number" name="duration" value={editExamForm.duration} onChange={handleEditExamFormChange} required className="input" min="1" />
              </div>
              <div className="formGroup">
                <label>Branch:</label>
                <select name="branchId" value={editExamForm.branchId} onChange={handleEditExamFormChange} required className="select">
                  <option value="">Select Branch</option>
                  {branches.map(branch => (<option key={branch._id} value={branch._id}>{branch.name}</option>))}
                </select>
              </div>
              <div className="formGroup checkboxGroup">
                <input type="checkbox" id="editExamIsActive" name="isActive" checked={editExamForm.isActive} onChange={handleEditExamFormChange} className="checkbox" />
                <label htmlFor="editExamIsActive" className="checkboxLabel">Exam is Active</label>
              </div>
              <div className="formGroup">
                <label>Subjects:</label>
                <div>
                  {editExamForm.subjectsIncluded && editExamForm.subjectsIncluded.map(subject => (
                    <div key={subject.subjectId} className="subjectTag">
                      {subject.subjectName} ({subject.numberOfQuestions} questions)
                    </div>
                  ))}
                </div>
              </div>
              <div className="buttonContainer">
                <button type="submit" className="button primary">Save Changes</button>
                <button type="button" onClick={closeEditExamModal} className="button secondary">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExamManagement;
