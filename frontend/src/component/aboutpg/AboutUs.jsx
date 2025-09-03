// src/components/AboutUs.jsx
import React from 'react';
import '../styles/aboutstyle/AboutUs.css'; // Ensure the CSS file is correctly imported

const AboutUs = () => {
  return (
    <section className="about-us-section">
      <div className="text-content">
        <h2>About City Group of Schools</h2>
        <p>
          Nurturing excellence in education since 1998, we are committed to
          developing well-rounded individuals who will become tomorrow's leaders
          and innovators.
        </p>
      </div>
      <div className="about-image-placeholder">
        <span>School Campus Image</span>
      </div>
    </section>
  );
};

export default AboutUs;
