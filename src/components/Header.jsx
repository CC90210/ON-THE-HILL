import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        <a href="#" className="logo">
          <span className="logo-text">ON THE HILL</span>
          <span className="logo-sub">Window Cleaning</span>
        </a>

        <button 
          className="mobile-toggle" 
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span className={`bar ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`bar ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`bar ${isMenuOpen ? 'open' : ''}`}></span>
        </button>

        <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <a href="#services" onClick={closeMenu}>Services</a>
          <a href="#work" onClick={closeMenu}>Our Work</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#testimonials" onClick={closeMenu}>Reviews</a>
          <a href="#estimate" className="cta-button" onClick={closeMenu}>Get Estimate</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
