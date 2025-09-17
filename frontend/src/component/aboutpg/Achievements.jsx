import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/aboutstyle/Achievements.css';

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        // Replace this with your actual API endpoint for achievements
        const response = await axios.get('http://localhost:5000/achievements');
        setAchievements(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAchievements();
  }, []);

  if (loading) {
    return (
      <section className="achievements-section">
        <p>Loading achievements...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="achievements-section">
        <p>Error loading achievements. Please try again later.</p>
      </section>
    );
  }

  return (
    <section className="achievements-section">
      <h2>Our Achievements</h2>
      <p>
        Recognitions and milestones that reflect our commitment to excellence.
      </p>
      <div className="achievements-container">
        {achievements.map((item) => (
          <div key={item.id} className="achievement-item">
            <h3 className="stat-number">{item.stat}</h3>
            <p className="stat-label">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Achievements;
