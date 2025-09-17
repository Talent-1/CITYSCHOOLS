import React, { useState } from 'react';

const TestimonialForm = () => {
  const [form, setForm] = useState({ name: '', role: '', quote: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/testimonials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (response.ok) setMessage('Thank you for your testimonial!');
    else setMessage('Submission failed. Please try again.');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Your Name" onChange={handleChange} required />
      <input name="role" placeholder="Your Role" onChange={handleChange} required />
      <textarea name="quote" placeholder="Your Testimonial" onChange={handleChange} required />
      <button type="submit">Submit</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default TestimonialForm;