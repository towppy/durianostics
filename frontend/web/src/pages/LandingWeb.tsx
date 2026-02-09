// LandingWeb.tsx
import React from "react";
import "../../styles/LandingWeb.css";

const LandingWeb: React.FC = () => {
  return (
    <>
      <div className="landing-web">
      {/* Hero Section */}
      <section className="hero">
        <div className="decor-circle circle1"></div>
        <div className="decor-circle circle2"></div>

        <h1>Welcome to Durianostics</h1>
        <p>
          See how you can determine your durians with just a few clicks. Our AI-powered platform provides accurate and fast durian diagnostics to help you make informed decisions.
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
