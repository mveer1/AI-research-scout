// Application data
const appData = {
  userStats: {
    level: 15,
    xp: 2847,
    totalSearches: 156,
    papersFound: 2341,
    trendsAnalyzed: 89,
    achievementPoints: 420
  },
  achievements: [
    {"id": 1, "name": "First Search", "description": "Performed your first research query", "earned": true, "points": 10},
    {"id": 2, "name": "Trend Spotter", "description": "Identified 5 trending research topics", "earned": true, "points": 25},
    {"id": 3, "name": "Deep Researcher", "description": "Saved 50 research papers", "earned": true, "points": 50},
    {"id": 4, "name": "Data Explorer", "description": "Used all available data sources", "earned": false, "points": 75}
  ],
  recentActivity: [
    {"type": "search", "query": "machine learning in healthcare", "timestamp": "2 hours ago", "results": 45},
    {"type": "trend", "topic": "quantum computing", "timestamp": "1 day ago", "growth": "+15%"},
    {"type": "save", "paper": "Deep Learning for Medical Diagnosis", "timestamp": "2 days ago"}
  ],
  trendingTopics: [
    {"topic": "AI in Healthcare", "growth": "+45%", "papers": 234, "mentions": 1847},
    {"topic": "Quantum Computing", "growth": "+32%", "papers": 156, "mentions": 892},
    {"topic": "Climate Change ML", "growth": "+28%", "papers": 189, "mentions": 1234},
    {"topic": "Federated Learning", "growth": "+22%", "papers": 98, "mentions": 567}
  ],
  searchResults: {
    papers: [
      {
        "id": 1,
        "title": "Deep Learning Applications in Medical Imaging: A Comprehensive Review",
        "authors": ["Smith, J.", "Johnson, A.", "Williams, R."],
        "abstract": "This comprehensive review explores the current state and future prospects of deep learning applications in medical imaging, covering convolutional neural networks, transfer learning, and emerging architectures...",
        "publishedDate": "2024-01-15",
        "source": "arXiv",
        "citations": 156,
        "relevanceScore": 0.94,
        "tags": ["deep learning", "medical imaging", "CNN", "healthcare AI"]
      },
      {
        "id": 2,
        "title": "Quantum Machine Learning: Current Progress and Future Directions",
        "authors": ["Chen, L.", "Anderson, K.", "Brown, M."],
        "abstract": "Quantum machine learning represents a promising intersection of quantum computing and artificial intelligence. This paper reviews recent advances in quantum algorithms for machine learning tasks...",
        "publishedDate": "2024-01-12",
        "source": "Nature",
        "citations": 89,
        "relevanceScore": 0.87,
        "tags": ["quantum computing", "machine learning", "quantum algorithms"]
      }
    ],
    socialTrends: [
      {
        "id": 1,
        "platform": "twitter",
        "content": "Breakthrough in quantum computing could revolutionize AI research...",
        "engagement": 2847,
        "sentiment": "positive",
        "timestamp": "3 hours ago",
        "trending": true
      },
      {
        "id": 2,
        "platform": "reddit",
        "content": "Discussion: Latest developments in federated learning privacy",
        "engagement": 1456,
        "sentiment": "neutral",
        "timestamp": "5 hours ago",
        "trending": false
      }
    ]
  },
  trendData: [
    {"date": "2024-01-01", "aiHealthcare": 45, "quantumML": 23, "climateAI": 34},
    {"date": "2024-01-02", "aiHealthcare": 52, "quantumML": 28, "climateAI": 41},
    {"date": "2024-01-03", "aiHealthcare": 48, "quantumML": 35, "climateAI": 38},
    {"date": "2024-01-04", "aiHealthcare": 61, "quantumML": 42, "climateAI": 45},
    {"date": "2024-01-05", "aiHealthcare": 67, "quantumML": 38, "climateAI": 52}
  ]
};

// Global variables
let currentChart = null;
let currentTrendsChart = null;

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  setupNavigation();
  setupSearch();
  setupInteractiveElements();
  setupEventListeners();
  showToast('Welcome back to Smart Research Scout! 🚀', 'success');
}

// Navigation System - Fixed
function setupNavigation() {
  const navTabs = document.querySelectorAll('.nav-tab');
  const tabContents = document.querySelectorAll('.tab-content');

  navTabs.forEach(tab => {
    tab.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const targetTab = this.getAttribute('data-tab');
      console.log('Switching to tab:', targetTab); // Debug log
      
      // Update active nav tab
      navTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      
      // Update active content - Fixed selector and logic
      tabContents.forEach(content => {
        content.classList.remove('active');
        content.style.display = 'none';
      });
      
      const targetContent = document.getElementById(targetTab);
      if (targetContent) {
        targetContent.classList.add('active');
        targetContent.style.display = 'block';
        
        // Hide search results when switching away from search tab
        if (targetTab !== 'search') {
          const searchResults = document.querySelector('.search-results');
          if (searchResults) {
            searchResults.classList.add('hidden');
          }
        }
        
        // Handle specific tab initialization
        if (targetTab === 'trends') {
          setTimeout(() => initializeTrendsChart(), 200);
        }
        
        showToast(`Switched to ${targetTab.charAt(0).toUpperCase() + targetTab.slice(1)} 📑`, 'info');
      }
      
      // Add visual feedback
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 150);
    });
  });
}

// Search System
function setupSearch() {
  const mainSearchInput = document.getElementById('main-search');
  const quickSearchInput = document.querySelector('.quick-search');
  const searchButton = document.querySelector('.search-button');
  const searchBtn = document.querySelector('.search-btn');

  // Main search functionality
  if (searchButton) {
    searchButton.addEventListener('click', performSearch);
  }
  
  if (mainSearchInput) {
    mainSearchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        performSearch();
      }
    });
  }

  // Quick search functionality
  if (searchBtn && quickSearchInput) {
    searchBtn.addEventListener('click', function() {
      const query = quickSearchInput.value.trim();
      if (query) {
        // Switch to search tab and populate main search
        const searchTab = document.querySelector('[data-tab="search"]');
        if (searchTab) {
          searchTab.click();
          setTimeout(() => {
            if (mainSearchInput) {
              mainSearchInput.value = query;
              performSearch();
            }
          }, 300);
        }
      }
    });

    quickSearchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        searchBtn.click();
      }
    });
  }

  // Search suggestions
  setupSearchSuggestions();
  
  // History items clickable
  setupSearchHistory();
}

function setupSearchSuggestions() {
  const suggestionTags = document.querySelectorAll('.suggestion-tag');
  const mainSearchInput = document.getElementById('main-search');

  suggestionTags.forEach(tag => {
    tag.addEventListener('click', function() {
      if (mainSearchInput) {
        mainSearchInput.value = this.textContent;
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
          this.style.transform = 'scale(1)';
          performSearch();
        }, 150);
      }
    });
  });
}

function setupSearchHistory() {
  const historyItems = document.querySelectorAll('.history-item');
  const mainSearchInput = document.getElementById('main-search');

  historyItems.forEach(item => {
    item.addEventListener('click', function() {
      if (mainSearchInput) {
        mainSearchInput.value = this.textContent;
        performSearch();
      }
    });
  });
}

function performSearch() {
  const mainSearchInput = document.getElementById('main-search');
  if (!mainSearchInput) return;
  
  const query = mainSearchInput.value.trim();
  if (!query) {
    showToast('Please enter a search query', 'warning');
    return;
  }

  // Show loading state
  showLoading();
  
  // Simulate search delay
  setTimeout(() => {
    hideLoading();
    showSearchResults();
    showToast(`Found results for "${query}"`, 'success');
    
    // Update search history
    addToSearchHistory(query);
    
    // Award XP for search
    awardXP(5, 'Search performed');
  }, 2000);
}

function showSearchResults() {
  const searchResults = document.querySelector('.search-results');
  if (searchResults) {
    searchResults.classList.remove('hidden');
    
    // Initialize results chart if not already done
    setTimeout(() => {
      initializeResultsChart();
    }, 100);
  }
}

function addToSearchHistory(query) {
  const historyList = document.querySelector('.history-list');
  if (!historyList) return;
  
  const newItem = document.createElement('div');
  newItem.className = 'history-item';
  newItem.textContent = query;
  newItem.addEventListener('click', function() {
    const mainSearchInput = document.getElementById('main-search');
    if (mainSearchInput) {
      mainSearchInput.value = query;
      performSearch();
    }
  });
  
  historyList.insertBefore(newItem, historyList.firstChild);
  
  // Remove oldest item if more than 5
  const items = historyList.querySelectorAll('.history-item');
  if (items.length > 5) {
    historyList.removeChild(items[items.length - 1]);
  }
}

// Interactive Elements - Fixed
function setupInteractiveElements() {
  // Results tabs
  setupResultsTabs();
  
  // Toggle switches
  setupToggleSwitches();
  
  // Trending topics interaction
  setupTrendingTopics();
  
  // Achievement badges - Fixed
  setupAchievements();
  
  // Paper cards interaction
  setupPaperCards();
  
  // History repeat buttons
  setupHistoryButtons();
}

function setupResultsTabs() {
  const resultsTabs = document.querySelectorAll('.results-tab');
  const resultsContents = document.querySelectorAll('.results-content');

  resultsTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const targetResults = this.getAttribute('data-results');
      
      // Update active tab
      resultsTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      
      // Update active content
      resultsContents.forEach(content => content.classList.remove('active'));
      const targetContent = document.getElementById(targetResults + '-results');
      if (targetContent) {
        targetContent.classList.add('active');
      }
      
      // Initialize chart for trends tab
      if (targetResults === 'trends') {
        setTimeout(() => initializeResultsChart(), 100);
      }
    });
  });
}

function setupToggleSwitches() {
  const toggleSwitches = document.querySelectorAll('.toggle-switch input[type="checkbox"]');
  
  toggleSwitches.forEach(toggle => {
    toggle.addEventListener('change', function() {
      if (this.id === 'eli5-toggle') {
        const isEnabled = this.checked;
        showToast(isEnabled ? 'ELI5 mode enabled 🎈' : 'ELI5 mode disabled', 'info');
      }
    });
  });
}

function setupTrendingTopics() {
  const trendingItems = document.querySelectorAll('.trending-item');
  
  trendingItems.forEach(item => {
    item.addEventListener('click', function() {
      const topicElement = this.querySelector('.trending-info h3');
      if (topicElement) {
        const topic = topicElement.textContent;
        const searchTab = document.querySelector('[data-tab="search"]');
        if (searchTab) {
          searchTab.click();
          setTimeout(() => {
            const mainSearchInput = document.getElementById('main-search');
            if (mainSearchInput) {
              mainSearchInput.value = topic;
              performSearch();
            }
          }, 300);
        }
      }
    });
  });
}

// Fixed Achievement Setup
function setupAchievements() {
  // Handle both badge types with more specific selectors
  const achievementElements = document.querySelectorAll('.achievement-badge, .achievement-card');
  
  achievementElements.forEach(badge => {
    badge.addEventListener('click', function(e) {
      e.stopPropagation();
      
      const nameElement = this.querySelector('h4, h3, .badge-info h4');
      const name = nameElement ? nameElement.textContent : 'Achievement';
      
      if (this.classList.contains('earned')) {
        showToast(`🏆 Achievement: ${name} ✨`, 'success');
        // Add visual feedback
        this.style.transform = 'scale(1.05)';
        setTimeout(() => {
          this.style.transform = 'scale(1)';
        }, 200);
      } else if (this.classList.contains('locked')) {
        showToast(`🔒 ${name} - This achievement is locked`, 'info');
        // Add shake animation for locked achievements
        this.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
          this.style.animation = '';
        }, 500);
      }
    });
    
    // Add hover effects
    badge.addEventListener('mouseenter', function() {
      if (this.classList.contains('earned')) {
        this.style.transform = 'scale(1.02)';
      }
    });
    
    badge.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });
}

function setupPaperCards() {
  const saveButtons = document.querySelectorAll('.paper-actions .btn--outline');
  const summaryButtons = document.querySelectorAll('.paper-actions .btn--secondary');
  
  saveButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      this.textContent = 'Saved!';
      this.style.background = 'rgba(0, 255, 136, 0.2)';
      this.style.color = '#00ff88';
      this.style.borderColor = '#00ff88';
      this.disabled = true;
      awardXP(2, 'Paper saved');
      showToast('Paper saved to your collection 📚', 'success');
    });
  });
  
  summaryButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      showToast('Generating AI summary... 🤖', 'info');
      // Simulate summary generation
      setTimeout(() => {
        showToast('Summary ready! Check your notifications 📄', 'success');
        awardXP(3, 'Summary generated');
      }, 2000);
    });
  });
}

function setupHistoryButtons() {
  const repeatButtons = document.querySelectorAll('.history-search .btn--outline');
  
  repeatButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const queryElement = this.parentElement.querySelector('h3');
      if (queryElement) {
        const query = queryElement.textContent;
        const searchTab = document.querySelector('[data-tab="search"]');
        if (searchTab) {
          searchTab.click();
          setTimeout(() => {
            const mainSearchInput = document.getElementById('main-search');
            if (mainSearchInput) {
              mainSearchInput.value = query;
              performSearch();
            }
          }, 300);
        }
      }
    });
  });
}

// Chart Initialization
function initializeResultsChart() {
  const ctx = document.getElementById('trendsChart');
  if (!ctx || currentChart) return;

  currentChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: appData.trendData.map(d => new Date(d.date).toLocaleDateString()),
      datasets: [
        {
          label: 'AI in Healthcare',
          data: appData.trendData.map(d => d.aiHealthcare),
          borderColor: '#1FB8CD',
          backgroundColor: 'rgba(31, 184, 205, 0.1)',
          tension: 0.4,
          fill: true
        },
        {
          label: 'Quantum ML',
          data: appData.trendData.map(d => d.quantumML),
          borderColor: '#FFC185',
          backgroundColor: 'rgba(255, 193, 133, 0.1)',
          tension: 0.4,
          fill: true
        },
        {
          label: 'Climate AI',
          data: appData.trendData.map(d => d.climateAI),
          borderColor: '#B4413C',
          backgroundColor: 'rgba(180, 65, 60, 0.1)',
          tension: 0.4,
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: '#e2e8f0'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#94a3b8'
          },
          grid: {
            color: 'rgba(0, 212, 255, 0.1)'
          }
        },
        y: {
          ticks: {
            color: '#94a3b8'
          },
          grid: {
            color: 'rgba(0, 212, 255, 0.1)'
          }
        }
      }
    }
  });
}

function initializeTrendsChart() {
  const ctx = document.getElementById('mainTrendsChart');
  if (!ctx) return;
  
  // Destroy existing chart if it exists
  if (currentTrendsChart) {
    currentTrendsChart.destroy();
    currentTrendsChart = null;
  }

  currentTrendsChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: appData.trendData.map(d => new Date(d.date).toLocaleDateString()),
      datasets: [
        {
          label: 'AI in Healthcare',
          data: appData.trendData.map(d => d.aiHealthcare),
          borderColor: '#1FB8CD',
          backgroundColor: 'rgba(31, 184, 205, 0.2)',
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#1FB8CD',
          pointBorderColor: '#1FB8CD',
          pointHoverRadius: 8
        },
        {
          label: 'Quantum ML',
          data: appData.trendData.map(d => d.quantumML),
          borderColor: '#FFC185',
          backgroundColor: 'rgba(255, 193, 133, 0.2)',
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#FFC185',
          pointBorderColor: '#FFC185',
          pointHoverRadius: 8
        },
        {
          label: 'Climate AI',
          data: appData.trendData.map(d => d.climateAI),
          borderColor: '#B4413C',
          backgroundColor: 'rgba(180, 65, 60, 0.2)',
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#B4413C',
          pointBorderColor: '#B4413C',
          pointHoverRadius: 8
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 2000,
        easing: 'easeInOutQuart'
      },
      plugins: {
        legend: {
          labels: {
            color: '#e2e8f0',
            usePointStyle: true,
            padding: 20
          }
        },
        tooltip: {
          backgroundColor: 'rgba(26, 31, 46, 0.95)',
          titleColor: '#00d4ff',
          bodyColor: '#e2e8f0',
          borderColor: '#00d4ff',
          borderWidth: 1
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#94a3b8',
            font: {
              size: 12
            }
          },
          grid: {
            color: 'rgba(0, 212, 255, 0.1)',
            drawOnChartArea: true
          }
        },
        y: {
          ticks: {
            color: '#94a3b8',
            font: {
              size: 12
            }
          },
          grid: {
            color: 'rgba(0, 212, 255, 0.1)',
            drawOnChartArea: true
          }
        }
      },
      interaction: {
        intersect: false,
        mode: 'index'
      }
    }
  });
}

// Event Listeners
function setupEventListeners() {
  // Quick action buttons
  const quickActions = document.querySelectorAll('.stat-card, .trending-item');
  quickActions.forEach(action => {
    action.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-4px) scale(1.02)';
    });
    
    action.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Activity items
  const activityItems = document.querySelectorAll('.activity-item');
  activityItems.forEach(item => {
    item.addEventListener('click', function() {
      const activityIcon = this.querySelector('.activity-icon');
      if (activityIcon) {
        const type = activityIcon.classList[1];
        if (type === 'search') {
          const searchTab = document.querySelector('[data-tab="search"]');
          if (searchTab) searchTab.click();
        } else if (type === 'trend') {
          const trendsTab = document.querySelector('[data-tab="trends"]');
          if (trendsTab) trendsTab.click();
        }
      }
    });
  });

  // Form interactions
  const formControls = document.querySelectorAll('.form-control, input[type="text"], input[type="password"]');
  formControls.forEach(input => {
    input.addEventListener('focus', function() {
      this.style.borderColor = '#00d4ff';
      this.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.3)';
    });
    
    input.addEventListener('blur', function() {
      this.style.borderColor = 'rgba(0, 212, 255, 0.2)';
      this.style.boxShadow = 'none';
    });
  });

  // API key save button
  const saveKeysBtn = document.querySelector('.api-keys .btn--primary');
  if (saveKeysBtn) {
    saveKeysBtn.addEventListener('click', function() {
      showToast('API keys saved securely 🔐', 'success');
      awardXP(10, 'API keys configured');
    });
  }

  // Export buttons
  const exportButtons = document.querySelectorAll('.results-actions .btn--secondary');
  exportButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      showToast('Exporting results... 📄', 'info');
      setTimeout(() => {
        showToast('Export complete! Check your downloads 📥', 'success');
        awardXP(5, 'Results exported');
      }, 1500);
    });
  });
}

// Gamification System - Fixed XP calculation
function awardXP(amount, reason) {
  appData.userStats.xp += amount;
  
  // Update UI
  const xpElement = document.querySelector('.xp');
  if (xpElement) {
    xpElement.textContent = `${appData.userStats.xp} XP`;
  }
  
  // Check for level up - Fixed calculation
  const xpForCurrentLevel = appData.userStats.level * 200;
  const xpNeeded = xpForCurrentLevel + 200 - appData.userStats.xp; // XP needed for next level
  
  if (xpNeeded <= 0) {
    levelUp();
  } else {
    // Update progress bar - Fixed calculation
    const xpInCurrentLevel = appData.userStats.xp - xpForCurrentLevel;
    const progressPercentage = Math.max(0, Math.min(100, (xpInCurrentLevel / 200) * 100));
    
    const progressFill = document.querySelector('.progress-fill');
    const progressFillLarge = document.querySelector('.progress-fill-large');
    const progressText = document.querySelector('.progress-text');
    const nextLevel = document.querySelector('.next-level');
    
    if (progressFill) progressFill.style.width = `${progressPercentage}%`;
    if (progressFillLarge) progressFillLarge.style.width = `${progressPercentage}%`;
    if (progressText) progressText.textContent = `Next Level: ${Math.max(0, xpNeeded)} XP to go`;
    if (nextLevel) nextLevel.textContent = `Next Level: ${Math.max(0, xpNeeded)} XP to go`;
  }
  
  showToast(`+${amount} XP: ${reason} ⭐`, 'success');
}

function levelUp() {
  appData.userStats.level++;
  appData.userStats.xp = appData.userStats.xp - (appData.userStats.level - 1) * 200;
  
  // Update UI
  const levelElement = document.querySelector('.level');
  const xpElement = document.querySelector('.xp');
  const profileInfo = document.querySelector('.profile-info p');
  
  if (levelElement) levelElement.textContent = `LVL ${appData.userStats.level}`;
  if (xpElement) xpElement.textContent = `${appData.userStats.xp} XP`;
  if (profileInfo) profileInfo.textContent = `Level ${appData.userStats.level} Explorer • ${appData.userStats.xp} XP`;
  
  // Reset progress bar
  const progressPercentage = (appData.userStats.xp / 200) * 100;
  const progressFill = document.querySelector('.progress-fill');
  const progressFillLarge = document.querySelector('.progress-fill-large');
  
  if (progressFill) progressFill.style.width = `${progressPercentage}%`;
  if (progressFillLarge) progressFillLarge.style.width = `${progressPercentage}%`;
  
  // Level up celebration
  showToast(`🎉 LEVEL UP! You're now Level ${appData.userStats.level}! 🎉`, 'success');
  
  // Add visual celebration effect
  const avatar = document.querySelector('.user-avatar');
  if (avatar) {
    avatar.style.animation = 'pulse 1s ease-in-out 3';
  }
}

// Loading System
function showLoading() {
  const loadingOverlay = document.getElementById('loading-overlay');
  if (loadingOverlay) {
    loadingOverlay.classList.remove('hidden');
  }
}

function hideLoading() {
  const loadingOverlay = document.getElementById('loading-overlay');
  if (loadingOverlay) {
    loadingOverlay.classList.add('hidden');
  }
}

// Toast Notification System
function showToast(message, type = 'info') {
  const toastContainer = document.getElementById('toast-container');
  if (!toastContainer) return;
  
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  
  // Add type-specific styling
  switch(type) {
    case 'success':
      toast.style.borderColor = '#00ff88';
      break;
    case 'warning':
      toast.style.borderColor = '#FFC185';
      break;
    case 'error':
      toast.style.borderColor = '#B4413C';
      break;
    default:
      toast.style.borderColor = '#00d4ff';
  }
  
  toastContainer.appendChild(toast);
  
  // Auto remove after 4 seconds
  setTimeout(() => {
    if (toast.parentNode) {
      toast.style.animation = 'slideOut 0.3s ease forwards';
      setTimeout(() => {
        if (toast.parentNode) {
          toastContainer.removeChild(toast);
        }
      }, 300);
    }
  }, 4000);
}

// Utility Functions
function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
  // Ctrl/Cmd + K to focus search
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    const searchTab = document.querySelector('[data-tab="search"]');
    const mainSearchInput = document.getElementById('main-search');
    if (searchTab && mainSearchInput) {
      searchTab.click();
      setTimeout(() => mainSearchInput.focus(), 100);
    }
  }
  
  // Escape to close modals/overlays
  if (e.key === 'Escape') {
    hideLoading();
  }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
  
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
  
  .toast-success { border-left: 4px solid #00ff88; }
  .toast-warning { border-left: 4px solid #FFC185; }
  .toast-error { border-left: 4px solid #B4413C; }
  .toast-info { border-left: 4px solid #00d4ff; }
`;
document.head.appendChild(style);

// Easter egg - Konami code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A

document.addEventListener('keydown', function(e) {
  konamiCode.push(e.keyCode);
  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift();
  }
  
  if (konamiCode.join(',') === konamiSequence.join(',')) {
    showToast('🎮 Konami Code activated! Extra XP mode enabled! 🎮', 'success');
    awardXP(100, 'Konami Code discovered');
    konamiCode = [];
  }
});

// Performance optimization: Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}