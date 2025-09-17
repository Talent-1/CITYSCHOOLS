const express = require('express');
const Testimonial = require('../models/Testimonial');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, role, quote } = req.body;
    const testimonial = new Testimonial({ name, role, quote });
    await testimonial.save();
    res.status(201).json({ message: 'Testimonial submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit testimonial' });
  }
});

module.exports = router;