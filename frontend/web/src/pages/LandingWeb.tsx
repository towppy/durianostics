import React from "react";
import "../../styles/LandingWeb.css";
import { Footer } from "../components/Footer";

interface Article {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  external?: boolean;
}

interface LandingWebProps {
  heroImageUrl?: string;
}

const articles: Article[] = [
  {
    title: "Understanding Durian Ripeness",
    description: "Learn how to identify the perfect durian using AI diagnostics.",
    imageUrl: "/assets/images/article1.jpg",
    link: "https://example.com/durian-ripeness",
    external: true,
  },
  {
    title: "Top Durian Varieties in 2026",
    description: "A complete guide to the most popular durian varieties this year.",
    imageUrl: "/assets/images/article2.jpg",
    link: "/articles/top-varieties",
    external: false,
  },
  {
    title: "AI in Agriculture",
    description: "Discover how AI is transforming fruit quality analysis.",
    imageUrl: "/assets/images/article3.jpg",
    link: "https://example.com/ai-agriculture",
    external: true,
  },
];

const LandingWeb: React.FC<LandingWebProps> = ({ heroImageUrl }) => {
  return (
    <div className="landing-web">
      {/* Hero Section */}
     <section className="hero">
  <div className="hero-slider">
    <div className="hero-slide" />
    <div className="hero-slide" />
    <div className="hero-slide" />
    <div className="hero-slide" />
  </div>

  <div className="hero-overlay" />

  <div className="hero-content">
    <h1>Welcome to Durianostics</h1>
    <p>
      AI-powered durian diagnostics to help you make informed decisions
      and enjoy the perfect fruit every time.
    </p>
    <button className="cta-button">Get Started</button>
  </div>
</section>

      {/* Featured Articles */}
      <section className="articles-section">
        <h2>Featured Articles</h2>
        <div className="articles-grid">
          {articles.map((article, idx) => (
            <a
              href={article.link}
              key={idx}
              className="article-card"
              target={article.external ? "_blank" : "_self"}
              rel={article.external ? "noopener noreferrer" : undefined}
            >
              <div className="article-image">
                <img src={article.imageUrl} alt={article.title} />
              </div>
              <div className="article-content">
                <h3>{article.title}</h3>
                <p>{article.description}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      
      <Footer />
    </div>
  );
};

export default LandingWeb;
