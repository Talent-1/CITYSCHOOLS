// src/pages/ApplyNowPage.jsx
import React, { useState } from 'react';
import '../component/styles/admission/ApplyNowPage.css';

const ApplyNowPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    program: '',
    campus: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Application submitted! Thank you.');
  };

  const renderFormStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="form-step">
            <h3>Personal Information</h3>{' '}
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />{' '}
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />{' '}
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />{' '}
            <div className="button-group">
              {' '}
              <button type="button" onClick={nextStep}>
                Next
              </button>{' '}
            </div>{' '}
          </div>
        );
      case 2:
        return (
          <div className="form-step">
            <h3>Academic Details</h3>{' '}
            <legend
              style={{ fontSize: '0.9rem', color: '#666', fontStyle: 'italic' }}
            >
              E.g. Nursery, Primary, Secondary
            </legend>{' '}
            <input
              type="text"
              name="program"
              placeholder="Desired Program"
              value={formData.program}
              onChange={handleChange}
              required
            />{' '}
            <input
              type="text"
              name="campus"
              placeholder="Preferred Campus"
              value={formData.campus}
              onChange={handleChange}
              required
            />{' '}
            <div className="button-group">
              {' '}
              <button type="button" onClick={prevStep}>
                Previous
              </button>{' '}
              <button type="button" onClick={nextStep}>
                Next
              </button>{' '}
            </div>{' '}
          </div>
        );
      case 3:
        return (
          <div className="form-step">
            <h3>Documents Upload</h3> {''}
            <p>
              Upload required documents (e.g., birth certificate, last term
              report card).
            </p>
            <div className="button-group">
              {' '}
              <button type="button" onClick={prevStep}>
                Previous
              </button>
              <button type="submit">Submit Application</button>{' '}
            </div>{' '}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="apply-now-section">
      <h2>Apply Now</h2>
      <p>Begin your application to City Group of Schools today.</p>
      <form onSubmit={handleSubmit}>
        <div className="progress-bar">
          <div className={`step ${step === 1 ? 'active' : ''}`}>1</div>
          <div className={`step ${step === 2 ? 'active' : ''}`}>2</div>
          <div className={`step ${step === 3 ? 'active' : ''}`}>3</div>
        </div>
        {renderFormStep()}
      </form>
    </section>
  );
};

export default ApplyNowPage;
