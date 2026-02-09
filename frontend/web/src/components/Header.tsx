import React, { useState, useEffect } from 'react';
import './Header.css';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <a href="/">
            <div className="logo-icon">Y</div>
            <span className="logo-text">YourBrand</span>
          </a>
        </div>

        {/* Navigation */}
        <nav className="nav-links">
          <div
            className="dropdown"
            onMouseEnter={() => setActiveDropdown('products')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="dropbtn">
              Products <span className="arrow">▼</span>
            </button>
            {activeDropdown === 'products' && (
              <div className="dropdown-content">
                <a href="/products/feature-1">
                  <div className="title">Feature One</div>
                  <div className="desc">Description here</div>
                </a>
                <a href="/products/feature-2">
                  <div className="title">Feature Two</div>
                  <div className="desc">Description here</div>
                </a>
                <a href="/products/feature-3">
                  <div className="title">Feature Three</div>
                  <div className="desc">Description here</div>
                </a>
              </div>
            )}
          </div>

          <a href="/pricing" className="nav-item">Pricing</a>

          <div
            className="dropdown"
            onMouseEnter={() => setActiveDropdown('resources')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="dropbtn">
              Resources <span className="arrow">▼</span>
            </button>
            {activeDropdown === 'resources' && (
              <div className="dropdown-content">
                <a href="/blog">Blog</a>
                <a href="/docs">Documentation</a>
                <a href="/help">Help Center</a>
                <a href="/community">Community</a>
              </div>
            )}
          </div>

          <a href="/about" className="nav-item">About</a>
        </nav>

        {/* CTA Buttons */}
        <div className="cta-buttons">
          <a href="/login" className="btn-signin">Sign In</a>
          <a href="/signup" className="btn-signup">Get Started</a>
        </div>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
