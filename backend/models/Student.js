const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  gender: String,
  campus: { type: String, enum: ['abor', 'adazi', 'umuoji'], required: true },
  section: String,
  classLevel: String,
  department: String,
  password: String, // Hash in production!
  studentId: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Student', studentSchema);