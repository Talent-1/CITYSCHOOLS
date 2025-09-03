// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './component/Layout';
import App from './App.jsx';
import AboutPage from './pages/AboutPage.jsx';
import AdmissionPage from './pages/AdmissionPage.jsx';
import TuitionFeesPage from './pages/TuitionFeesPage.jsx';
import ApplyNowPage from './pages/ApplyNowPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import AuthPage from './pages/AuthPage.jsx';
import LegalPage from './pages/LegalPage.jsx';
import AcademicsPage from "./pages/AcademicsPage.jsx";
import NewsAndAnnouncements from './component/landingpg/NewsAndAnnouncements.jsx';
import ResultCheckerPage from './pages/ResultCheckerPage.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx'
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="about" element={<AboutPage />} />
           {/* Use a parent route for Admission */}
        <Route path="/admission" element={<AdmissionPage />}>
          {/* Nested routes that will be rendered inside AdmissionPage's <Outlet /> */}
          <Route path="fees" element={<TuitionFeesPage />} />
          <Route path="apply" element={<ApplyNowPage />} />
        </Route>
        <Route path="contact" element={<ContactPage />} />
        <Route path="auth" element={<AuthPage />} />
        <Route path="legal" element={<LegalPage />} />
        <Route path="academics" element={<AcademicsPage />} />
        <Route path="newsandannouncements" element={<NewsAndAnnouncements />} />
        <Route path="resultchecker" element={<ResultCheckerPage />} />
        <Route path="admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);