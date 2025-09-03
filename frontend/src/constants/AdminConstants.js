// --- CONSTANTS ---
export const CLASS_LEVELS = [
'JSS1', 'JSS2', 'JSS3', 'SS1', 'SS2', 'SS3',
'Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5', 'Primary 6'
];

export const DEPARTMENTS = ['Sciences', 'Arts', 'Commercial'];

export const SECTIONS = ['Junior', 'Senior'];

// Helper function to check if a class level is for senior secondary students
export const isSeniorSecondaryClass = (classLevel) => {
return ['SS1', 'SS2', 'SS3'].includes(classLevel);
};