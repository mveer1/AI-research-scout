// frontend/src/pages/HomePage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar/SearchBar';
import { motion } from 'framer-motion';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    navigate(`/results?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="home-page">
      <motion.div 
        className="hero-section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="hero-title">
          Smart Research Scout
        </h1>
        <p className="hero-subtitle">
          Discover the latest research, trends, and discussions on any topic
        </p>
        
        <SearchBar 
          onSearch={handleSearch}
          placeholder="Search for research papers, trends, discussions..."
          className="hero-search"
        />
      </motion.div>

      <motion.div 
        className="features-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <div className="feature-card">
          <div className="feature-icon">📚</div>
          <h3>Research Papers</h3>
          <p>Access millions of papers from Semantic Scholar, ArXiv, and PubMed</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">📈</div>
          <h3>Trend Analysis</h3>
          <p>Visualize historical trends and emerging topics</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">💬</div>
          <h3>Discussions</h3>
          <p>Find relevant conversations from Reddit and social media</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">🤖</div>
          <h3>AI Insights</h3>
          <p>Get intelligent summaries and analysis powered by AI</p>
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;
