// src/data/campuses.js
import SchoolLogo from '../assets/Head-campus.jpg';
import AdaziCampusLogo from '../assets/Adazi-campus.jpg';

const campuses = {
  abor: {
    code: 'AB', // Added campus code
    logo: SchoolLogo,
    name: 'City Comprehensive Secondary School, Ogidi',
    address: 'Off St. Monica\'s Junction, Gen. Hosp. Road, Abor Ogidi, Anambra State, Nigeria.',
  },
  umuoji: {
    code: 'UM', // Added campus code
    logo: SchoolLogo,
    name: 'City Comprehensive Secondary School, Umuoji',
    address: 'Ifite/Uruedeke Road, Umuoji, Anambra State, Nigeria.',
  },
  adazi: {
    code: 'AD', // Added campus code
    logo: AdaziCampusLogo,
    name: 'City Model Secondary School, Adazi Ogidi',
    address: 'Behind St. John The Baptist Cath. Church, Adazi Ogidi.',
  },
};

export default campuses;