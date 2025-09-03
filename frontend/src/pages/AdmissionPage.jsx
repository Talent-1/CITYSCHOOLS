// src/pages/AdmissionPage.jsx
// src/pages/AdmissionPage.jsx
import React from 'react';
import { Routes, Route, Outlet, Link } from 'react-router-dom';
import TuitionFeesPage from './TuitionFeesPage';
import ApplyNowPage from './ApplyNowPage';
import '../component/styles/admission//AdmissionPage.css';

const AdmissionPage = () => {
    return (
        <React.Fragment> {/* Use a React Fragment to avoid extra div */}
            <section className="admission-hero">
                <h2>Admissions</h2>
                <p>
                    Join our community of learners and begin your journey towards
                    academic excellence. We welcome students who are ready to grow,
                    learn, and make a positive impact.
                </p>
            </section>
            <section className="application-process">
                <h3>Application Process</h3>
                <p>
                    Our straightforward application process is designed to make your
                    enrollment journey smooth and easy.
                </p>
                <div className="process-steps">
                    <div className="step-card">
                        <span className="step-number">1</span>
                        <h4>Submit Application</h4>
                        <p>
                            Complete the comprehensive online application form with all
                            required documents.
                        </p>
                    </div>
                    <div className="step-card">
                        <span className="step-number">2</span>
                        <h4>Entrance Assessment</h4>
                        <p>
                            Your child will be invited to a placement assessment to
                            determine academic readiness and placement.
                        </p>
                    </div>
                    <div className="step-card">
                        <span className="step-number">3</span>
                        <h4>Review & Interview</h4>
                        <p>
                            Participate in a parent interview and await the admissions
                            committee’s decision.
                        </p>
                    </div>
                    <div className="step-card">
                        <span className="step-number">4</span>
                        <h4>Enrollment</h4>
                        <p>
                            Receive admission and complete enrollment procedures to secure
                            your child’s spot.
                        </p>
                    </div>
                </div>
            </section>
            <section className="admission-requirements">
                <h3>Admission Requirements</h3>
                {/* ... (rest of the requirements section) */}
            </section>
            <section className="important-dates">
                <h3>Important Dates & Deadlines</h3>
                {/* ... (rest of the dates section) */}
            </section>

            <div className="admission-sub-pages">
                <div className="admission-sub-nav">
                    <Link to="apply" className="sub-nav-item">
                        Online Application
                    </Link>
                    <Link to="fees" className="sub-nav-item">
                        Tuition & Fees
                    </Link>
                </div>
                <Routes>
                    <Route path="apply" element={<ApplyNowPage />} />
                    <Route path="fees" element={<TuitionFeesPage />} />
                </Routes>
            </div>
        </React.Fragment>
    );
};

export default AdmissionPage;