// src/components/MissionVision.jsx
import React from 'react';
import '../styles/aboutstyle/MissionVision.css'; // Ensure the CSS file is correctly imported

const MissionVision = () => {
  return (
    <section className="mission-vision-section">
      <div className="image-placeholder">
        <span>School Campus Image</span>
      </div>
      <div className="text-content">
        <div className="statement">
          <h3>Our Mission</h3>
          <p>
            To provide quality education that empowers students with knowledge,
            skills, and values necessary for success...
          </p>
        </div>
        <div className="statement">
          <h3>Our Vision</h3>
          <p>
            To be the leading educational institution in Anambra State,
            recognized for academic excellence, character development, and
            innovation in teaching...
          </p>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
