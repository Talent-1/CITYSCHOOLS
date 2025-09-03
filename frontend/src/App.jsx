// src/App.jsx
import React from 'react';
import Hero from './component/landingpg/Hero';
import About from './component/landingpg/About';
import Features from './component/landingpg/Features';
import NewsAndAnnouncements from './component/landingpg/NewsAndAnnouncements';
import Testimonials from './component/landingpg/Testimonials';
import './App.css'; // Global styles

function App() {
  return (
    <div className="homepage-content">
      <main>
        <Hero />
        <About />
        <Features />
        <NewsAndAnnouncements />
        <Testimonials />
      </main>
    </div>
  );
}

export default App;