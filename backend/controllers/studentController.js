const Student = require('../models/Student');
const campusCodes = require('../utils/campusCodes');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

// Helper: Generate JWT
const generateToken = (student) => {
  return jwt.sign(
    { id: student._id, email: student.email, role: "student" },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

exports.registerStudent = async (req, res) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  try {
    const {
      firstName, lastName, email, gender, campus,
      section, classLevel, department, password
    } = req.body;

    // Check for duplicate email
    const existing = await Student.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email already registered." });
    }

    // Validate campus
    const code = campusCodes[campus];
    if (!code) return res.status(400).json({ message: "Invalid campus" });

    const year = new Date().getFullYear().toString().slice(-2);

    // Find highest index for this campus/year
    const regex = new RegExp(`^CGS/${code}/${year}/(\\d{3})$`);
    const lastStudent = await Student.find({ campus, studentId: { $regex: regex } })
      .sort({ studentId: -1 })
      .limit(1)
      .lean();

    let nextIndex = 1;
    if (lastStudent.length > 0) {
      const lastId = lastStudent[0].studentId;
      const match = lastId.match(/(\d{3})$/);
      if (match) nextIndex = parseInt(match[1], 10) + 1;
    }

    const paddedIndex = String(nextIndex).padStart(3, "0");
    const studentId = `CGS/${code}/${year}/${paddedIndex}`;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Save student
    const student = new Student({
      firstName, lastName, email, gender, campus,
      section, classLevel, department,
      password: hashedPassword,
      studentId
    });
    await student.save();

    // Never return password
    const studentObj = student.toObject();
    delete studentObj.password;

    // Generate token
    const token = generateToken(student);

    res.status(201).json({
      message: "Student registered successfully",
      studentId,
      token,
      student: studentObj
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: "Duplicate student ID. Please try again." });
    }
    res.status(500).json({ message: "Server error.", error: err.message });
  }
};
