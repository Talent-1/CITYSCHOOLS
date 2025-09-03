import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/aboutstyle/Facilities.css';

const Facilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        // Replace this with your actual API endpoint for facilities
        const response = await axios.get('https://your-api.com/facilities');
        setFacilities(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFacilities();
  }, []);

  if (loading) {
    return (
      <section className="facilities-section">
        <p>Loading facilities...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="facilities-section">
        <p>Error loading facilities. Please try again later.</p>
      </section>
    );
  }

  return (
    <section className="facilities-section">
      <h2>World-Class Facilities</h2>
      <p>
        Our modern infrastructure supports comprehensive learning and
        development.
      </p>
      <div className="facilities-container">
        {facilities.map((facility) => (
          <div key={facility.id} className="facility-card">
            <div className="facility-image-placeholder"></div>
            <h4>{facility.name}</h4>
            <p>{facility.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Facilities;
