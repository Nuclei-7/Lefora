// /pages/LandingPage.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <header className="hero-section">
        <h1>Welcome to Lefora</h1>
        <p>Join the community of home gardeners and share your journey.</p>
        <button className="cta-button">Sign Up Now</button>
      </header>
      
      <section className="about-section">
        <h2>About Lefora</h2>
        <p>Lefora is a forum for home gardeners to share tips, tricks, and advice about gardening. Whether you're a beginner or an expert, our community is here to help you grow.</p>
      </section>

      <section className="featured-posts">
        <h2>Featured Posts</h2>
        {/* Here you can map through featured posts */}
        <div className="post-list">
          <div className="post-item">How to Start a Vegetable Garden</div>
          <div className="post-item">Best Indoor Plants for Beginners</div>
          <div className="post-item">Composting 101</div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
