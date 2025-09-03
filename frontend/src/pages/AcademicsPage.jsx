// src/pages/AcademicsPage.jsx
import React from 'react';
import { FaBook, FaFlask, FaUserTie, FaGlobe, FaLaptopCode, FaPaintBrush, FaPencilAlt, FaTasks, FaClipboardCheck, FaCalendarAlt, FaStar, FaLightbulb, FaGraduationCap, FaDumbbell, FaCheck, FaUsers, FaBriefcase } from 'react-icons/fa';
import studentsTakingExams from '../assets/students-taking-exams.jpg';
import '../component/styles/academicstyle/AcademicsPage.css';

const AcademicsPage = () => {
  return (
    <div className="academics-page-container">
      <section className="academics-hero">
        <h2>Academics</h2>
        <p>Discover our comprehensive academic programs designed to nurture intellectual growth, critical thinking, and a passion for lifelong success in higher education and beyond.</p>
      </section>

      <section className="curriculum-section">
        <h3>Our Curriculum</h3>
        <p>A balanced blend of Nigerian National Curriculum and international best practices to ensure holistic development of every student.</p>
        <div className="curriculum-pillars">
          <div className="pillar-card">
            <FaStar className="pillar-icon" />
            <h4>Early Years Foundation</h4>
            <p>Play-based learning approach focusing on social, emotional, and creative development through interactive and sensorial exploration.</p>
          </div>
          <div className="pillar-card">
            <FaLightbulb className="pillar-icon" />
            <h4>Core Academic Excellence</h4>
            <p>Strong foundation in Mathematics, English, Sciences, and Social Studies with a focus on problem-solving skills and critical thinking skills.</p>
          </div>
          <div className="pillar-card">
            <FaGraduationCap className="pillar-icon" />
            <h4>University Preparation</h4>
            <p>Comprehensive WAEC, NECO, and JAMB preparation alongside soft skills training and robust university admission support for senior students.</p>
          </div>
        </div>
      </section>

      <section className="departments-section">
        <h3>Academic Departments</h3>
        <p>Our specialized departments ensure focused attention and expertise in every subject area.</p>
        <div className="departments-grid">
          <div className="department-card">
            <h4><FaBook /> Mathematics Department</h4>
            <p>Developing logical reasoning and problem-solving skills to excel in advanced sciences and technology.</p>
            <ul>
              <li><FaCheck /> Pure Mathematics</li>
              <li><FaCheck /> Further Mathematics</li>
              <li><FaCheck /> Statistics & Geometry</li>
              <li><FaCheck /> Financial Mathematics</li>
            </ul>
          </div>
          <div className="department-card">
            <h4><FaFlask /> Sciences Department</h4>
            <p>Fostering scientific inquiry and supporting practical learning in all science subjects.</p>
            <ul>
              <li><FaCheck /> Physics</li>
              <li><FaCheck /> Chemistry</li>
              <li><FaCheck /> Biology</li>
              <li><FaCheck /> Agricultural Science</li>
            </ul>
          </div>
          <div className="department-card">
            <h4><FaUserTie /> Humanities Department</h4>
            <p>Encouraging cultural and social understanding and awareness through social sciences and literature.</p>
            <ul>
              <li><FaCheck /> History</li>
              <li><FaCheck /> Geography</li>
              <li><FaCheck /> Civic Education</li>
              <li><FaCheck /> Christian Religious Studies</li>
            </ul>
          </div>
          <div className="department-card">
            <h4><FaGlobe /> Languages Department</h4>
            <p>Developing fluency in communication and a strong literary appreciation.</p>
            <ul>
              <li><FaCheck /> English Language</li>
              <li><FaCheck /> French Language</li>
              <li><FaCheck /> Igbo Language</li>
              <li><FaCheck /> Yoruba/Hausa Language</li>
            </ul>
          </div>
          <div className="department-card">
            <h4><FaLaptopCode /> Technology Department</h4>
            <p>Preparing students for the digital age with modern computer skills and programming.</p>
            <ul>
              <li><FaCheck /> Computer Science</li>
              <li><FaCheck /> Information Technology</li>
              <li><FaCheck /> Web Development</li>
              <li><FaCheck /> Digital Literacy</li>
            </ul>
          </div>
          <div className="department-card">
            <h4><FaPaintBrush /> Creative Arts Department</h4>
            <p>Nurturing creativity and self-expression through various artistic disciplines.</p>
            <ul>
              <li><FaCheck /> Fine Arts</li>
              <li><FaCheck /> Music</li>
              <li><FaCheck /> Drama & Theater</li>
              <li><FaCheck /> Cultural Studies</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="programs-section">
        <h3>Academic Programs</h3>
        <p>Structured learning pathways designed to meet the specific needs and interests of our students.</p>
        <div className="programs-grid">
          {/* New Early Years Education Program Card */}
          <div className="program-card">
            <h4>Early Years Education (Ages 3-5)</h4>
            <h5>Pre-Nursery & Nursery</h5>
            <p>A fun-filled and interactive learning environment focusing on foundational skills.</p>
            <ul>
              <li><FaCheck /> Numbers and counting</li>
              <li><FaCheck /> Alphabet and phonics</li>
              <li><FaCheck /> Introduction to basic sciences</li>
              <li><FaCheck /> Creative arts and physical activities</li>
            </ul>
          </div>

          <div className="program-card">
            <h4>Primary Education Program</h4>
            <h5>Foundation Stage (Ages 5-7)</h5>
            <p>Strongly-influenced by Montessori-based curriculum, basic literacy and numeracy skills.</p>
            <p>Key subjects covered:</p>
            <ul>
              <li><FaCheck /> English and creative writing</li>
              <li><FaCheck /> Numeracy and basic mathematics</li>
              <li><FaCheck /> Science and social studies</li>
              <li><FaCheck /> Creative expression and arts</li>
            </ul>
          </div>
          <div className="program-card">
            <h4>Junior Secondary Education (JSS 1-3)</h4>
            <p>Broad-based education covering core subjects with an introduction to specialized fields.</p>
            <p>Key subjects covered:</p>
            <ul>
              <li><FaCheck /> Core subjects: Math, English, Sciences, etc.</li>
              <li><FaCheck /> Vocational and pre-vocational subjects</li>
              <li><FaCheck /> Basic computer studies</li>
              <li><FaCheck /> French language introduction</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="assessment-section">
        <h3>Assessment & Evaluation</h3>
        <p>Our comprehensive assessment system ensures continuous monitoring of student progress and provides valuable feedback for improvement.</p>
        <div className="assessment-content">
          <div className="assessment-details">
            <div className="detail-item">
              <h4><FaPencilAlt /> Continuous Assessment</h4>
              <p>Regular quizzes, assignments, and class participation help monitor daily progress.</p>
            </div>
            <div className="detail-item">
              <h4><FaTasks /> Termly Examinations</h4>
              <p>Comprehensive end-of-term examinations to evaluate subject mastery and understanding.</p>
            </div>
            <div className="detail-item">
              <h4><FaClipboardCheck /> External Examinations</h4>
              <p>Preparation and registration for WAEC, NECO, JAMB, and other standardized tests.</p>
            </div>
          </div>
          <div className="assessment-image-placeholder">
            <img 
                src={studentsTakingExams} 
                alt="Students taking an exam" 
                className="assessment-image" 
            />
          </div>
        </div>
      </section>

      <section className="support-section">
        <h3>Academic Support Services</h3>
        <p>Additional resources and support systems to ensure every student reaches their full potential.</p>
        <div className="support-grid">
          <div className="support-card">
            <FaDumbbell className="support-icon" />
            <h4>Extra Lessons</h4>
            <p>One-on-one tutoring and remedial classes for students who need additional support.</p>
          </div>
          <div className="support-card">
            <FaUsers className="support-icon" />
            <h4>Study Groups</h4>
            <p>Peer-to-peer learning sessions and co-operative study opportunities.</p>
          </div>
          <div className="support-card">
            <FaBriefcase className="support-icon" />
            <h4>Career Guidance</h4>
            <p>Professional counseling to help students make informed decisions about their future.</p>
          </div>
          <div className="support-card">
            <FaFlask className="support-icon" />
            <h4>Laboratory Access</h4>
            <p>Extended laboratory hours for practical experiments and research projects.</p>
          </div>
        </div>
      </section>

      <section className="calendar-section">
        <h3>Academic Calendar 2025</h3>
        <p>Important dates and milestones for the current academic session.</p>
        <div className="calendar-details">
          <div className="term-card">
            <h4>First Term</h4>
            <p>Resumption: <span>September 8, 2025</span></p>
          </div>
          {/* Add more term cards as needed */}
        </div>
      </section>
    </div>
  );
};

export default AcademicsPage;