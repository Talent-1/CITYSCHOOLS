// src/components/Hero.jsx
import React from 'react';
import '../styles/landingstyle/Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
          Excellence in Education
          <br />
          at City Group of Schools
        </h1>
        <p>
          Providing quality education and innovative learning experiences for
          students in Ogidi and Umuoji communities.
        </p>
        <div className="cta-buttons">
          <button className="cta-button primary">Take a Tour</button>
          <button className="cta-button secondary">Apply Now</button>
        </div>
      </div>
      <div className="hero-image-placeholder">
        <span>School Campus Image</span>
      </div>
    </section>
  );
};

export default Hero;
