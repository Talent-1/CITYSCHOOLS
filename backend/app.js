const express = require('express');
const cors = require('cors');
const adminRoutes = require('./routes/adminRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const newsRoutes = require('./routes/newsRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/admin', adminRoutes);
app.use('/api', protectedRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/news', newsRoutes);

module.exports = app;