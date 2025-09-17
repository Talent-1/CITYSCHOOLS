// src/components/NewsAndAnnouncements.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/landingstyle/NewsAndAnnouncements.css';

const NewsAndAnnouncements = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Use Axios to make the GET request
        const response = await axios.get('http://localhost:5000/news');
        // Axios automatically parses JSON data
        setNewsItems(response.data);
      } catch (error) {
        // Axios throws an error for non-2xx status codes
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <section className="news-announcements-section">
        <p>Loading latest news...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="news-announcements-section">
        <p>Error loading news. Please try again later.</p>
      </section>
    );
  }

  return (
    <section className="news-announcements-section">
      <div className="section-header">
        <h2>Latest News & Announcements</h2>
        <a href="#" className="view-all-link">
          View All →
        </a>
      </div>
      <div className="news-container">
        {newsItems.map((item) => (
          <div key={item.id} className="news-card">
            <div
              className={`news-image-placeholder ${item.imageType.toLowerCase()}-image`}
            >
              <span>{item.imageType} Image</span>
            </div>
            <div className="news-content">
              <span className="news-date">{item.date}</span>
              <h3>{item.title}</h3>
              <p>{item.content}</p>
              <a href="#" className="read-more">
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewsAndAnnouncements;
