import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/aboutstyle/LeadershipTeam.css';

const LeadershipTeam = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        // Replace this with your actual API endpoint for the leadership team
        const response = await axios.get('https://your-api.com/leadership');
        setLeaders(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaders();
  }, []);

  if (loading) {
    return (
      <section className="leadership-section">
        <p>Loading leadership team...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="leadership-section">
        <p>Error loading team. Please try again later.</p>
      </section>
    );
  }

  return (
    <section className="leadership-section">
      <h3>Our Leadership Team</h3>
      <p>
        Meet the dedicated professionals leading our school towards excellence.
      </p>
      <div className="leaders-container">
        {leaders.map((leader) => (
          <div key={leader.id} className="leader-card">
            <div className="leader-image-placeholder"></div>
            <h4>{leader.name}</h4>
            <p className="role">{leader.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LeadershipTeam;
