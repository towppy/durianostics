import React, { useState, useEffect } from 'react';
import './Header.css';
import { useLocation } from 'react-router-dom';

interface User {
  name: string;
  image_url: string;
}

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) setUser(JSON.parse(userData));
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <a href="/">
            <img src="/assets/images/icon.png" alt="Durianostics Logo" className="logo-img" />
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="nav-links">
          <a href="/" className={`nav-item${location.pathname === '/' ? ' current' : ''}`}>Home</a>
          <a href="/about" className={`nav-item${location.pathname === '/about' ? ' current' : ''}`}>About</a>
          <a href="/forum" className={`nav-item${location.pathname === '/forum' ? ' current' : ''}`}>Forum</a>
          {user && (
            <>
              <a href="/chatbot" className={`nav-item${location.pathname === '/chatbot' ? ' current' : ''}`}>Chatbot</a>
              <a href="/scanner" className={`nav-item${location.pathname === '/scanner' ? ' current' : ''}`}>Scanner</a>
              <a href="/analytics" className={`nav-item${location.pathname === '/analytics' ? ' current' : ''}`}>Analytics</a>
            </>
          )}
        </nav>

        {/* Desktop CTA/Profile */}
        <div className="cta-buttons">
          {user ? (
            <div className="profile-header">
              <span className="welcome-user">Welcome, {user.name}</span>
              <a href="/profile" className="profile-pic-link">
                <img src={user.image_url} alt="Profile" className="profile-pic" />
              </a>
            </div>
          ) : (
            <>
              <a href="/auth" className="btn-signin">Sign In</a>
          
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
        <a href="/" className={`nav-item${location.pathname === '/' ? ' current' : ''}`} onClick={toggleMobileMenu}>Home</a>
        <a href="/about" className={`nav-item${location.pathname === '/about' ? ' current' : ''}`} onClick={toggleMobileMenu}>About</a>
        <a href="/forum" className={`nav-item${location.pathname === '/forum' ? ' current' : ''}`} onClick={toggleMobileMenu}>Forum</a>
        {user && (
          <>
            <a href="/chatbot" className={`nav-item${location.pathname === '/chatbot' ? ' current' : ''}`} onClick={toggleMobileMenu}>Chatbot</a>
            <a href="/scanner" className={`nav-item${location.pathname === '/scanner' ? ' current' : ''}`} onClick={toggleMobileMenu}>Scanner</a>
            <a href="/analytics" className={`nav-item${location.pathname === '/analytics' ? ' current' : ''}`} onClick={toggleMobileMenu}>Analytics</a>
          </>
        )}
        {user ? (
          <div className="profile-header mobile-profile">
            <span className="welcome-user">Welcome, {user.name}</span>
            <a href="/profile" className="profile-pic-link">
              <img src={user.image_url} alt="Profile" className="profile-pic" />
            </a>
          </div>
        ) : (
          <>
            <a href="/auth" className="btn-signin">Sign In</a>
           
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
