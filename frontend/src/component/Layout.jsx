// src/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../component/landingpg/Navbar';
import Footer from '../component/landingpg/Footer';
import CodyChatbot from '../component/CodyChatbot';
import './Layout.css'; // Create this file for main layout styles

const Layout = () => {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <CodyChatbot />
      <Footer />
    </div>
  );
};

export default Layout;
