// LandingWeb.tsx
import React from "react";
import "../../styles/LandingWeb.css";

import Header from "../components/Header";

const LandingWeb: React.FC = () => {
  return (
    <>
      <Header />
      <div className="landing-web">
      {/* Hero Section */}
      <section className="hero">
        <div className="decor-circle circle1"></div>
        <div className="decor-circle circle2"></div>

        <h1>Welcome to Our Product</h1>
        <p>
          Discover amazing features that make your life easier. Fast, reliable, and beautifully designed.
        </p>
        <button className="cta-button">Get Started</button>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Features</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="icon">⚡</div>
            <h3>Fast Performance</h3>
            <p>Lightning-fast speed so you can get things done efficiently.</p>
          </div>
          <div className="feature-card">
            <div className="icon">🔒</div>
            <h3>Secure</h3>
            <p>Your data stays safe with advanced security features.</p>
          </div>
          <div className="feature-card">
            <div className="icon">✨</div>
            <h3>User-Friendly</h3>
            <p>Intuitive interface designed to make your workflow seamless.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="decor-circle circle3"></div>
        <div className="decor-circle circle4"></div>

        <h2>Ready to get started?</h2>
        <p>Sign up today and experience the difference!</p>
        <button className="cta-button">Sign Up Now</button>
      </section>
      </div>
    </>
  );
};

export default LandingWeb;
