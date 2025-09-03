// src/components/Header.jsx
import React, { useState } from 'react';
import '../styles/landingstyle/Header.css';

const Header = () => {
  const [isNavActive, setIsNavActive] = useState(false);

  const toggleNav = () => {
    setIsNavActive(!isNavActive);
  };

  return (
    <header className="header">
      <div className="logo-container">
        <img
          src="/school-logo.jpg"
          alt="City Group of Schools Logo"
          className="logo"
        />
        <span className="logo-text">City Group of Schools</span>
      </div>
      <nav className={`nav-links ${isNavActive ? 'active' : ''}`}>
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#news">News</a>
        <a href="#blog">Blog</a>
        <a href="#contact">Contact</a>
      </nav>
      <button className="login-button">Login</button>
      <div className="header-toggle" onClick={toggleNav}>
        ☰
      </div>
    </header>
  );
};

export default Header;
