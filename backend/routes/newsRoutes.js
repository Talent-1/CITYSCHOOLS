const express = require('express');
const router = express.Router();

// Replace with real DB logic later
router.get('/', (req, res) => {
  res.json([]); // Empty for now
});

module.exports = router;