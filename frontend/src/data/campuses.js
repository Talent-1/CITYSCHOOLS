// src/data/campuses.js
import SchoolLogo from '../assets/Head-campus.jpg';
import AdaziCampusLogo from '../assets/Adazi-campus.jpg';

const campuses = {
  head: {
    logo: SchoolLogo,
    name: 'City Comprehensive Secondary School, Ogidi',
    address: 'Off St. Monica\'s Junction, Gen. Hosp. Road, Abor Ogidi, Anambra State, Nigeria.',
  },
  branch1: {
    logo: SchoolLogo, // Same logo as head campus
    name: 'City Comprehensive Secondary School, Umuoji', // Same name as head campus
    address: 'Ifite/Uruedeke Road, Umuoji, Anambra State, Nigeria.',
  },
  adazi: {
    logo: AdaziCampusLogo,
    name: 'City Model Secondary School, Adazi Ogidi',
    address: 'Behind St. John The Baptist Cath. Church, Adazi Ogidi.',
  },
};

export default campuses;