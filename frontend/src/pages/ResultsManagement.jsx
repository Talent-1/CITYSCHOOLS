import React, { useState, useEffect, useCallback } from 'react';
import api from '../api/api';
import { CLASS_LEVELS, SECTIONS, DEPARTMENTS, isSeniorSecondaryClass } from '../constants/AdminConstants';
import {
  renderSafeString,
  renderSectionDisplay,
  groupResultsByStudentAndExam,
  convertToCsv
} from '../utils/AdminUtils';
import { getAllUsers } from '../api/admin';

// Helper to get unique sections for a given class level from a list of users
const getUniqueSectionsForClassLevel = (users, classLevel) => {
  return SECTIONS.filter(section => {
    return users.some(user => user.classLevel === classLevel && (user.section === section || (user.section === 'senior' && section === 'Senior') || (user.section === 'junior' && section === 'Junior')));
  }).sort();
};

// Helper to get unique departments (areaOfSpecialization) for a given class level from users
const getUniqueDepartmentsForClassLevel = (users, classLevel) => {
  const departments = new Set();
  users.forEach(user => {
    if (user.classLevel === classLevel && user.role === 'student' && user.areaOfSpecialization) {
      departments.add(user.areaOfSpecialization);
    }
  });
  return Array.from(departments).sort();
};

function ResultsManagement({ setGlobalFeedback, setGlobalError }) {
  const [allUsers, setAllUsers] = useState([]);
  const [processedResults, setProcessedResults] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  // Filter states
  const [selectedResultsClassLevel, setSelectedResultsClassLevel] = useState('');
  const [selectedResultsSubClassLevel, setSelectedResultsSubClassLevel] = useState('');
  const [selectedResultsDepartment, setSelectedResultsDepartment] = useState('');
  const [selectedDateTaken, setSelectedResultsDateTaken] = useState('');
  const [studentIdFilter, setStudentIdFilter] = useState('');
  const [availableResultsSubClassLevels, setAvailableResultsSubClassLevels] = useState([]);
  const [availableResultsDepartments, setAvailableResultsDepartments] = useState([]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(50);
  const [totalResultsCount, setTotalResultsCount] = useState(0);

  const fetchData = useCallback(async () => {
    setDataLoading(true);
    setGlobalError('');
    try {
      const fetchedUsers = await getAllUsers();
      setAllUsers(fetchedUsers);

      const resultsFilterParams = new URLSearchParams();
      if (selectedResultsClassLevel) resultsFilterParams.append('classLevel', selectedResultsClassLevel);
      if (selectedResultsSubClassLevel) resultsFilterParams.append('section', selectedResultsSubClassLevel);
      if (isSeniorSecondaryClass(selectedResultsClassLevel) && selectedResultsDepartment) resultsFilterParams.append('areaOfSpecialization', selectedResultsDepartment);
      if (selectedDateTaken) resultsFilterParams.append('dateTaken', selectedDateTaken);
      if (studentIdFilter.trim()) resultsFilterParams.append('studentId', studentIdFilter.trim());
      resultsFilterParams.append('page', currentPage);
      resultsFilterParams.append('limit', resultsPerPage);
      const filterQueryString = resultsFilterParams.toString();
      const resultsEndpoint = `/results${filterQueryString ? `?${filterQueryString}` : ''}`;

      const fetchedResultsResponse = await api.get(resultsEndpoint);
      const resultsData = fetchedResultsResponse.data || [];
      const totalCount = resultsData.length;
      setTotalResultsCount(totalCount);
      setProcessedResults(groupResultsByStudentAndExam(resultsData));
    } catch (err) {
      setGlobalError('Failed to load student results.');
      console.error("Results data fetch error:", err);
    } finally {
      setDataLoading(false);
    }
  }, [
    selectedResultsClassLevel,
    selectedResultsSubClassLevel,
    selectedResultsDepartment,
    selectedDateTaken,
    studentIdFilter,
    currentPage,
    resultsPerPage,
    setGlobalError
  ]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Effect to update available sections and departments when class level filter changes
  useEffect(() => {
    if (selectedResultsClassLevel && allUsers.length > 0) {
      const sections = getUniqueSectionsForClassLevel(allUsers, selectedResultsClassLevel);
      setAvailableResultsSubClassLevels(sections);
      setSelectedResultsSubClassLevel('');
      if (isSeniorSecondaryClass(selectedResultsClassLevel)) {
        const departments = getUniqueDepartmentsForClassLevel(allUsers, selectedResultsClassLevel);
        setAvailableResultsDepartments(departments);
        setSelectedResultsDepartment('');
      } else {
        setAvailableResultsDepartments([]);
        setSelectedResultsDepartment('');
      }
    } else {
      setAvailableResultsSubClassLevels([]);
      setSelectedResultsSubClassLevel('');
      setAvailableResultsDepartments([]);
      setSelectedResultsDepartment('');
    }
    setCurrentPage(1);
  }, [selectedResultsClassLevel, allUsers]);

  const handleDownloadResults = async (downloadType) => {
    setGlobalError('');
    setGlobalFeedback('');
    try {
      let dataToDownload = [];
      let filenamePrefix = 'Student_Results';
      if (downloadType === 'currentView') {
        dataToDownload = processedResults;
        filenamePrefix = 'Current_Page_Results';
      } else if (downloadType === 'allFiltered') {
        filenamePrefix = 'All_Filtered_Results';
        const allResultsFilterParams = new URLSearchParams();
        if (selectedResultsClassLevel) allResultsFilterParams.append('classLevel', selectedResultsClassLevel);
        if (selectedResultsSubClassLevel) allResultsFilterParams.append('section', selectedResultsSubClassLevel);
        if (isSeniorSecondaryClass(selectedResultsClassLevel) && selectedResultsDepartment) allResultsFilterParams.append('areaOfSpecialization', selectedResultsDepartment);
        if (selectedDateTaken) allResultsFilterParams.append('dateTaken', selectedDateTaken);
        if (studentIdFilter.trim()) allResultsFilterParams.append('studentId', studentIdFilter.trim());
        const filterQueryString = allResultsFilterParams.toString();
        const resultsEndpoint = `/results${filterQueryString ? `?${filterQueryString}` : ''}`;
        setGlobalFeedback('Fetching all filtered results for download...');
        const response = await api.get(resultsEndpoint);
        const rawAllResults = response.data || [];
        dataToDownload = groupResultsByStudentAndExam(rawAllResults);
        setGlobalFeedback('Results data fetched. Preparing download...');
      } else {
        setGlobalError('Invalid download type specified.');
        return;
      }
      if (dataToDownload.length === 0) {
        setGlobalFeedback('No results to download for the selected criteria.');
        return;
      }
      const csvString = convertToCsv(dataToDownload);
      const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `${filenamePrefix}_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setGlobalFeedback('Results downloaded successfully!');
    } catch (err) {
      console.error("Download results error:", err);
      setGlobalError(err.response?.data?.message || err.message || 'Failed to download results.');
    }
  };

  const totalPages = Math.ceil(totalResultsCount / resultsPerPage);
  const handlePreviousPage = () => setCurrentPage(prev => Math.max(1, prev - 1));
  const handleNextPage = () => setCurrentPage(prev => Math.min(totalPages, prev + 1));

  if (dataLoading) {
    return <p className="loadingMessage">Loading student results...</p>;
  }

  return (
    <div className="results-management">
      <section className="adminSection">
        <h2 className="sectionHeader">Student Results</h2>
        <div className="filterContainer">
          <div className="filterGroup">
            <label htmlFor="resultsClassLevel">Class Level:</label>
            <select id="resultsClassLevel" value={selectedResultsClassLevel} onChange={(e) => setSelectedResultsClassLevel(e.target.value)} className="select">
              <option value="">All</option>
              {CLASS_LEVELS.map(level => (<option key={level} value={level}>{level}</option>))}
            </select>
          </div>
          <div className="filterGroup">
            <label htmlFor="resultsSubClassLevel">Section:</label>
            <select id="resultsSubClassLevel" value={selectedResultsSubClassLevel} onChange={(e) => setSelectedResultsSubClassLevel(e.target.value)} disabled={!selectedResultsClassLevel} className="select">
              <option value="">All</option>
              {availableResultsSubClassLevels.map(section => (<option key={section} value={section}>{section}</option>))}
            </select>
          </div>
          {isSeniorSecondaryClass(selectedResultsClassLevel) && (
            <div className="filterGroup">
              <label htmlFor="resultsDepartment">Department:</label>
              <select id="resultsDepartment" value={selectedResultsDepartment} onChange={(e) => setSelectedResultsDepartment(e.target.value)} className="select">
                <option value="">All</option>
                {availableResultsDepartments.map(dept => (<option key={dept} value={dept}>{dept}</option>))}
              </select>
            </div>
          )}
          <div className="filterGroup">
            <label htmlFor="resultsDateTaken">Date Taken:</label>
            <input type="date" id="resultsDateTaken" value={selectedDateTaken} onChange={(e) => setSelectedResultsDateTaken(e.target.value)} className="input dateInput" />
          </div>
          <div className="filterGroup">
            <label htmlFor="studentIdFilter">Student ID:</label>
            <input type="text" id="studentIdFilter" value={studentIdFilter} onChange={(e) => setStudentIdFilter(e.target.value)} placeholder="Filter by Student ID" className="input" />
          </div>
          <button onClick={fetchData} className="button primary">Apply Filters</button>
          <div className="downloadButtons">
            <button onClick={() => handleDownloadResults('currentView')} className="button secondary">Download Current View</button>
            <button onClick={() => handleDownloadResults('allFiltered')} className="button primary">Download All Filtered</button>
          </div>
        </div>
        {processedResults.length > 0 ? (
          <div className="tableContainer">
            <table className="dataTable resultsTable">
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Full Name</th>
                  <th>Class Level</th>
                  <th>Section</th>
                  <th>Department</th>
                  <th>Exam Title</th>
                  <th>Date Taken</th>
                  <th>Overall Score</th>
                  <th>Percentage</th>
                  <th>Subject Breakdown</th>
                </tr>
              </thead>
              <tbody>
                {processedResults.map((result, index) => (
                  <tr key={result.studentId + result.examTitle + index}>
                    <td>{result.studentId}</td>
                    <td>{result.fullName}</td>
                    <td>{result.classLevel}</td>
                    <td>{result.section}</td>
                    <td>{result.department}</td>
                    <td>{result.examTitle}</td>
                    <td>{result.dateTaken}</td>
                    <td>{`${result.overallScore}/${result.totalMaxScore}`}</td>
                    <td>{result.percentage}</td>
                    <td><pre>{result.formattedSubjectScores}</pre></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="noDataMessage">No results found for the selected criteria.</p>
        )}
      </section>
    </div>
  );
}

export default ResultsManagement;
