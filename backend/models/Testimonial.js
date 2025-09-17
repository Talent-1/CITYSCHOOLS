const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: String,
  role: String,
  quote: String,
});

module.exports = mongoose.model('Testimonial', testimonialSchema);