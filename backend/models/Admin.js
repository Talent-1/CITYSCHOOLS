const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String, // hashed
  role: { 
    type: String, 
    enum: ['principal', 'exam-officer', 'bursar', 'campus-admin-ab', 'campus-admin-ad', 'campus-admin-um'],
    required: true
  },
  campus: { type: String, enum: ['AB', 'AD', 'UM'], default: null } // Only for campus admins
});

module.exports = mongoose.model('Admin', adminSchema);