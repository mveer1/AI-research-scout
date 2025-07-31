// frontend/src/pages/ResultsPage.tsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import SearchBar from '../components/SearchBar/SearchBar';
import ResearchCard from '../components/ResultCards/ResearchCard';
import TrendVisualization from '../components/TrendVisualization/TrendVisualization';
import DiscussionCard from '../components/ResultCards/DiscussionCard';
import SummaryCard from '../components/ResultCards/SummaryCard';
import { searchAPI } from '../services/api';
import { motion } from 'framer-motion';

const ResultsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('research');
  const [eli5Mode, setEli5Mode] = useState(false);
  
  const query = searchParams.get('q') || '';

  // Fetch research papers
  const { data: researchData, isLoading: researchLoading } = useQuery({
    queryKey: ['research', query],
    queryFn: () => searchAPI.searchPapers(query),
    enabled: !!query,
  });

  // Fetch trends
  const { data: trendsData, isLoading: trendsLoading } = useQuery({
    queryKey: ['trends', query],
    queryFn: () => searchAPI.getTrends([query]),
    enabled: !!query,
  });

  // Fetch discussions
  const { data: discussionsData, isLoading: discussionsLoading } = useQuery({
    queryKey: ['discussions', query],
    queryFn: () => searchAPI.getDiscussions(query),
    enabled: !!query,
  });

  // Fetch AI summary
  const { data: summaryData, isLoading: summaryLoading } = useQuery({
    queryKey: ['summary', query, eli5Mode],
    queryFn: () => searchAPI.getSummary(query, eli5Mode),
    enabled: !!query,
  });

  const handleNewSearch = (newQuery: string) => {
    setSearchParams({ q: newQuery });
  };

  const tabs = [
    { id: 'research', label: 'Research Papers', count: researchData?.results?.length || 0 },
    { id: 'trends', label: 'Trends', count: trendsData?.data?.length || 0 },
    { id: 'discussions', label: 'Discussions', count: discussionsData?.discussions?.length || 0 },
    { id: 'summary', label: 'AI Summary', count: summaryData ? 1 : 0 },
  ];

  return (
    <div className="results-page">
      <div className="search-header">
        <SearchBar 
          onSearch={handleNewSearch}
          placeholder="Search for research papers, trends, discussions..."
          className="results-search"
        />
        
        <div className="search-controls">
          <label className="eli5-toggle">
            <input
              type="checkbox"
              checked={eli5Mode}
              onChange={(e) => setEli5Mode(e.target.checked)}
            />
            <span>ELI5 Mode</span>
          </label>
        </div>
      </div>

      <div className="results-container">
        <div className="tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label} {tab.count > 0 && <span className="count">({tab.count})</span>}
            </button>
          ))}
        </div>

        <div className="tab-content">
          {activeTab === 'research' && (
            <motion.div 
              className="research-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {researchLoading ? (
                <div className="loading">Loading research papers...</div>
              ) : (
                <div className="cards-grid">
                  {researchData?.results?.map((paper, index) => (
                    <ResearchCard key={paper.id} paper={paper} />
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'trends' && (
            <motion.div 
              className="trends-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {trendsLoading ? (
                <div className="loading">Loading trends data...</div>
              ) : (
                <TrendVisualization data={trendsData} />
              )}
            </motion.div>
          )}

          {activeTab === 'discussions' && (
            <motion.div 
              className="discussions-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {discussionsLoading ? (
                <div className="loading">Loading discussions...</div>
              ) : (
                <div className="cards-grid">
                  {discussionsData?.discussions?.map((discussion) => (
                    <DiscussionCard key={discussion.id} discussion={discussion} />
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'summary' && (
            <motion.div 
              className="summary-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {summaryLoading ? (
                <div className="loading">Generating AI summary...</div>
              ) : (
                <SummaryCard summary={summaryData} eli5Mode={eli5Mode} />
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
