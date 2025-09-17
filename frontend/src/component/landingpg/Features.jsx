import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/landingstyle/Features.css';

const Features = () => {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        // Replace with your actual API endpoint for features
        const response = await axios.get('http://localhost:5000/features');
        setFeatures(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatures();
  }, []);

  if (loading) {
    return (
      <section className="features-section">
        <p>Loading features...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="features-section">
        <p>Error loading features. Please try again later.</p>
      </section>
    );
  }

  return (
    <section className="features-section">
      <h2>Key Features</h2>
      <div className="features-container">
        {features.map((feature) => (
          <div key={feature.id} className="feature-card">
            <div className="icon">[]</div> {/* Add your icon here */}
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
            <a href="#">Learn More →</a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
