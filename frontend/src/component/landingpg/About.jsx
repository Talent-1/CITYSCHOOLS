// src/components/About.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/landingstyle/About.css';

const About = () => {
  return (
    <section className="about-us">
      <h2>About City Group of Schools</h2>
      <p className="about-description">
        We are committed to nurturing young minds through comprehensive
        education, character development, and innovative teaching methods...
      </p>
      <Link to="/about" className="learn-more">
        Learn More About Us →
      </Link>
    </section>
  );
};

export default About;
