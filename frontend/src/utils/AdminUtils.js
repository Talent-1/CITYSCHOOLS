
// --- GLOBAL HELPER FUNCTIONS ---

// Helper function to safely render properties that might be objects with { _id, name }
export const renderSafeString = (value) => {
	if (
		typeof value === 'object' &&
		value !== null &&
		(
			Object.prototype.hasOwnProperty.call(value, '_id') ||
			Object.prototype.hasOwnProperty.call(value, 'name') ||
			Object.prototype.hasOwnProperty.call(value, 'fullName') ||
			Object.prototype.hasOwnProperty.call(value, 'subjectName') ||
			Object.prototype.hasOwnProperty.call(value, 'title') ||
			Object.prototype.hasOwnProperty.call(value, 'studentId')
		)
	) {
		return (
			value.name ||
			value.fullName ||
			value.subjectName ||
			value.title ||
			value.studentId ||
			'N/A'
		);
	}
	return value || 'N/A';
};

// Helper to specifically handle section display (e.g., replace 'senior' with something else)
export const renderSectionDisplay = (value) => {
	const safeValue = renderSafeString(value);
	if (
		typeof safeValue === 'string' &&
		safeValue.toLowerCase() === 'senior' &&
		safeValue !== 'Senior'
	) {
		return 'N/A (Invalid Section Data)';
	}
	return safeValue;
};

// Function to transform raw results into the desired grouped format
export const groupResultsByStudentAndExam = (results) => {
	const grouped = {};
	results.forEach((result) => {
		const studentId = renderSafeString(
			result.student_id || result.user?._id || result.user?.studentId
		);
		const examId = renderSafeString(result.exam?._id || result.exam_id);
		if (!studentId || !examId) {
			console.warn('Skipping result due to missing student or exam ID:', result);
			return;
		}
		const key = `${studentId}-${examId}`;
		if (!grouped[key]) {
			grouped[key] = {
				studentId: studentId,
				fullName: renderSafeString(result.student_name || result.user?.fullName),
				classLevel: renderSafeString(result.student_classLevel || result.user?.classLevel),
				section: renderSectionDisplay(result.student_section || result.user?.section),
				department: renderSafeString(
					result.student_department || result.user?.areaOfSpecialization || 'N/A'
				),
				examTitle: renderSafeString(result.exam_title || result.exam?.title),
				dateTaken: result.date_taken
					? new Date(result.date_taken).toLocaleDateString()
					: 'N/A',
				overallScore: 0,
				totalMaxScore: 0,
				subjectScores: [],
			};
		}
		if (
			result.subject_scores_breakdown &&
			Array.isArray(result.subject_scores_breakdown)
		) {
			result.subject_scores_breakdown.forEach((subjectBreakdown) => {
				const score =
					typeof subjectBreakdown.score === 'number' ? subjectBreakdown.score : 0;
				const maxScore =
					typeof subjectBreakdown.totalQuestionsInSubject === 'number'
						? subjectBreakdown.totalQuestionsInSubject
						: 0;
				const subjectName = renderSafeString(subjectBreakdown.subjectName);
				grouped[key].overallScore += score;
				grouped[key].totalMaxScore += maxScore;
				grouped[key].subjectScores.push({
					subjectName: subjectName,
					score: score,
					maxScore: maxScore,
				});
			});
		} else {
			console.warn("Result missing 'subject_scores_breakdown' array:", result);
			const score = typeof result.score === 'number' ? result.score : 0;
			const maxScore =
				typeof result.total_questions === 'number' ? result.total_questions : 0;
			const subjectName = renderSafeString(result.subject_name || 'N/A');
			grouped[key].overallScore += score;
			grouped[key].totalMaxScore += maxScore;
			grouped[key].subjectScores.push({
				subjectName: subjectName,
				score: score,
				maxScore: maxScore,
			});
		}
	});

	return Object.values(grouped).map((entry) => {
		const percentage =
			entry.totalMaxScore > 0
				? ((entry.overallScore / entry.totalMaxScore) * 100).toFixed(2) + '%'
				: '0.00%';
		const formattedSubjectScores = entry.subjectScores
			.map((sub) => `${sub.subjectName}: ${sub.score}/${sub.maxScore}`)
			.join('\n');
		return {
			studentId: entry.studentId,
			fullName: entry.fullName,
			classLevel: entry.classLevel,
			section: entry.section,
			department: entry.department,
			examTitle: entry.examTitle,
			dateTaken: entry.dateTaken,
			overallScore: entry.overallScore,
			totalMaxScore: entry.totalMaxScore,
			percentage: percentage,
			formattedSubjectScores: formattedSubjectScores,
		};
	});
};

// Helper function to convert data to CSV format
export const convertToCsv = (data) => {
	if (!data || data.length === 0) {
		return '';
	}
	const headersMap = {
		studentId: 'Student ID',
		fullName: 'Student Name',
		classLevel: 'Class Level',
		section: 'Section',
		department: 'Department',
		examTitle: 'Exam Title',
		dateTaken: 'Date Taken',
		overallScore: 'Overall Score',
		totalMaxScore: 'Total Max Score',
		percentage: 'Percentage',
		formattedSubjectScores: 'Subject Scores Breakdown',
	};
	const headers = Object.keys(headersMap);
	const readableHeaders = Object.values(headersMap);
	const headerRow = readableHeaders
		.map((header) => `"${header.replace(/"/g, '""')}"`)
		.join(',');
	const csvRows = data.map((row) => {
		return headers
			.map((header) => {
				let value = row[header];
				if (value === null || value === undefined) {
					value = '';
				}
				if (header === 'section') {
					value = renderSectionDisplay(value);
				}
				if (header === 'formattedSubjectScores') {
					if (typeof value === 'string') {
						return `"${value.replace(/"/g, '""')}"`;
					}
				}
				if (
					typeof value === 'string' &&
					(value.includes(',') || value.includes('"') || value.includes('\n'))
				) {
					return `"${value.replace(/"/g, '""')}"`;
				}
				return value;
			})
			.join(',');
	});
	return [headerRow, ...csvRows].join('\n');
};