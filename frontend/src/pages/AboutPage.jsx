// src/pages/AboutPage.jsx
import React from 'react';
import AboutUs from '../component/aboutpg/AboutUs';
import MissionVision from '../component/aboutpg/MissionVision';
import CoreValues from '../component/aboutpg/CoreValues';
import OurHistory from '../component/aboutpg/OurHistory';
import LeadershipTeam from '../component/aboutpg/LeadershipTeam';
import Facilities from '../component/aboutpg/Facilities';
import Achievements from '../component/aboutpg/Achievements';
import '../component/styles/aboutstyle/AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page-container">
      <main>
        <AboutUs />
        <MissionVision />
        <CoreValues />
        <OurHistory />
        <LeadershipTeam />
        <Facilities />
        <Achievements />
      </main>
    </div>
  );
};

export default AboutPage;