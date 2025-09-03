// src/components/Navbar.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import Logo from '/school-logo.jpg';
import '../styles/landingstyle/Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src={Logo} alt="City Group of Schools" />
                <span className="logo-text">City Group of Schools</span>
            </div>
            <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
                <NavLink to="/" onClick={toggleMenu}>Home</NavLink>
                <NavLink to="/about" onClick={toggleMenu}>About</NavLink>
                <NavLink to="/admission" onClick={toggleMenu}>Admissions</NavLink>
                <NavLink to="/academics" onClick={toggleMenu}>Academics</NavLink>
                <NavLink to="/cbt" onClick={toggleMenu}>CBT</NavLink>
                <NavLink to="/newsandannouncements" onClick={toggleMenu}>Blogs</NavLink>
                <NavLink to="/contact" onClick={toggleMenu}>Contact</NavLink>
                <NavLink to="/legal" onClick={toggleMenu}>T&C's</NavLink>
                <NavLink to="/auth" onClick={toggleMenu} className="nav-button">Login</NavLink>
                <NavLink to="/resultchecker" onClick={toggleMenu}>Result Checker</NavLink>
            </div>
            <div className="navbar-toggle" onClick={toggleMenu}>
                {isOpen ? <FaTimes /> : <FaBars />}
            </div>
        </nav>
    );
};

export default Navbar;