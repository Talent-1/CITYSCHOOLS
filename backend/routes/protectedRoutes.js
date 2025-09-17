const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const router = express.Router();

// Principal: all access
router.get('/admin/all-data', authenticate, authorize('principal'), (req, res) => {
  // Return all data
  res.json({ message: 'Principal access: all data' });
});

// Exam Officer: exams and results (all campuses)
router.get('/exams', authenticate, authorize('principal', 'exam-officer'), (req, res) => {
  res.json({ message: 'Exam officer or principal: exams data' });
});

// Bursar: payments (one campus at a time)
router.get('/payments/:campus', authenticate, authorize('principal', 'bursar'), (req, res) => {
  const { campus } = req.params;
  // Only allow bursar to view one campus at a time
  res.json({ message: `Payments for campus ${campus}` });
});

// Campus Admin: only their campus
router.get('/campus/:campus/data', authenticate, authorize('principal', 'campus-admin-ab', 'campus-admin-ad', 'campus-admin-um'), (req, res) => {
  const { campus } = req.params;
  // If not principal, check campus matches admin's campus
  if (req.admin.role.startsWith('campus-admin') && req.admin.campus !== campus) {
    return res.status(403).json({ error: 'Forbidden: not your campus' });
  }
  res.json({ message: `Campus admin data for ${campus}` });
});

module.exports = router;