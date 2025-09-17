import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/aboutstyle/OurHistory.css';

const OurHistory = () => {
  const [historyEvents, setHistoryEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // Replace this with your actual API endpoint for history events
        const response = await axios.get('http://localhost:5000/history');
        setHistoryEvents(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) {
    return (
      <section className="history-section">
        <p>Loading history...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="history-section">
        <p>Error loading history. Please try again later.</p>
      </section>
    );
  }

  return (
    <section className="history-section">
      <div className="history-timeline">
        <h3>Our History</h3>
        {historyEvents.map((event) => (
          <div key={event.id} className="history-item">
            <span className="year">{event.year}</span>
            <p>{event.event}</p>
          </div>
        ))}
      </div>
      <div className="history-image-placeholder">
        <span>Historical Timeline Image</span>
      </div>
    </section>
  );
};

export default OurHistory;
