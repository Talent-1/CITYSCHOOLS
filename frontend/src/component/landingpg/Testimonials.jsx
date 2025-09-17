// src/components/Testimonials.jsx
import React, { useState, useEffect } from 'react';
import '../styles/landingstyle/Testimonials.css';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        // Replace this with your actual API endpoint for testimonials
        const response = await fetch('http://localhost:5000/testimonials');
        if (!response.ok) {
          throw new Error('Failed to fetch testimonials');
        }
        const data = await response.json();
        setTestimonials(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <section className="testimonials-section">
        <p>Loading testimonials...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="testimonials-section">
        <p>Error loading testimonials. Please try again later.</p>
      </section>
    );
  }

  return (
    <section className="testimonials-section">
      <h2>What Our Community Says</h2>
      <div className="testimonials-container">
        {testimonials.map((item) => (
          <div key={item.id} className="testimonial-card">
            <div className="profile">
              <div className="avatar-placeholder"></div>
              <div className="info">
                <h4>{item.name}</h4>
                <p>{item.role}</p>
              </div>
            </div>
            <p className="quote">"{item.quote}"</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
