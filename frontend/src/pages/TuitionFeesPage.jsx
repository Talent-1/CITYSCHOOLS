import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../component/styles/admission/TuitionFeesPage.css'; // We'll create this file next

const TuitionFeesPage = () => {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFees = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await axios.get('https://your-api.com/fees');
        setFees(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFees();
  }, []);

  if (loading) {
    return <p>Loading tuition information...</p>;
  }

  if (error) {
    return <p>Error loading tuition details. Please try again later.</p>;
  }

  return (
    <section className="tuition-fees-section">
       <h2>Tuition & Fees</h2>
      <p>
        Find the right plan for your child's education. Our fees are
         transparent and designed to provide the best value. {' '}
      </p>
      {' '}
      <div className="fees-container">
{' '}
        {fees.map((plan) => (
          <div key={plan.id} className="fee-card">
             <h3>{plan.title}</h3>{' '}
            <p className="price-tag">
              <span className="price">{plan.price}</span>
               <span className="per-term"> / per term</span>{' '}
            </p>
        {' '}
            <div className="details-list">
              {' '}
              {plan.details.map((detail, index) => (
                <p key={index} className="detail-item">
                   <span>✓</span> {detail}{' '}
                </p>
              ))}
              {' '}
            </div>
             <button className="apply-button">Apply Now</button>
            {' '}
          </div>
        ))}
        {' '}
      </div>
      {' '}
    </section>
  );
};

export default TuitionFeesPage;
