import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/aboutstyle/CoreValues.css';

const CoreValues = () => {
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchValues = async () => {
      try {
        // Replace this with your actual API endpoint for core values
        const response = await axios.get('http://localhost:5000/core-values');
        setValues(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchValues();
  }, []);

  if (loading) {
    return (
      <section className="core-values-section">
        <p>Loading core values...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="core-values-section">
        <p>Error loading values. Please try again later.</p>
      </section>
    );
  }

  return (
    <section className="core-values-section">
      <h3>Our Core Values</h3>
      <p>
        These fundamental principles guide everything we do at City Group of
        Schools.
      </p>
      <div className="values-container">
        {values.map((value) => (
          <div key={value.id} className="value-card">
            <div className="icon-placeholder"></div>
            <h4>{value.name}</h4>
            <p>{value.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CoreValues;
