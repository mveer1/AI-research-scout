# Smart Research Scout - Complete Production Architecture

## 🏗️ Full-Stack Application Architecture

This is a comprehensive, production-ready architecture for Smart Research Scout - an AI-powered research aggregation platform that fetches data from multiple sources and provides intelligent summarization and trend analysis.

## 📋 Project Structure

```
smart-research-scout/
├── 📁 backend/
│   ├── 📁 app/
│   │   ├── 📁 api/
│   │   │   ├── 📁 v1/
│   │   │   │   ├── 📁 endpoints/
│   │   │   │   │   ├── auth.py
│   │   │   │   │   ├── search.py
│   │   │   │   │   ├── trends.py
│   │   │   │   │   ├── papers.py
│   │   │   │   │   ├── social.py
│   │   │   │   │   └── users.py
│   │   │   │   ├── api.py
│   │   │   │   └── deps.py
│   │   │   └── __init__.py
│   │   ├── 📁 core/
│   │   │   ├── config.py
│   │   │   ├── security.py
│   │   │   ├── deps.py
│   │   │   └── __init__.py
│   │   ├── 📁 crud/
│   │   │   ├── crud_user.py
│   │   │   ├── crud_search.py
│   │   │   ├── crud_paper.py
│   │   │   └── __init__.py
│   │   ├── 📁 db/
│   │   │   ├── base.py
│   │   │   ├── session.py
│   │   │   ├── init_db.py
│   │   │   └── __init__.py
│   │   ├── 📁 models/
│   │   │   ├── user.py
│   │   │   ├── search.py
│   │   │   ├── paper.py
│   │   │   └── __init__.py
│   │   ├── 📁 schemas/
│   │   │   ├── user.py
│   │   │   ├── search.py
│   │   │   ├── paper.py
│   │   │   ├── trend.py
│   │   │   └── __init__.py
│   │   ├── 📁 services/
│   │   │   ├── 📁 retrievers/
│   │   │   │   ├── semantic_scholar.py
│   │   │   │   ├── arxiv_retriever.py
│   │   │   │   ├── pubmed_retriever.py
│   │   │   │   ├── reddit_retriever.py
│   │   │   │   ├── twitter_retriever.py
│   │   │   │   ├── google_trends.py
│   │   │   │   └── base_retriever.py
│   │   │   ├── 📁 rag/
│   │   │   │   ├── embeddings.py
│   │   │   │   ├── vector_store.py
│   │   │   │   ├── retrieval_qa.py
│   │   │   │   └── summarizer.py
│   │   │   ├── cache_service.py
│   │   │   ├── auth_service.py
│   │   │   └── __init__.py
│   │   ├── 📁 utils/
│   │   │   ├── logger.py
│   │   │   ├── rate_limiter.py
│   │   │   ├── validators.py
│   │   │   └── __init__.py
│   │   ├── main.py
│   │   └── __init__.py
│   ├── 📁 alembic/
│   │   ├── 📁 versions/
│   │   ├── env.py
│   │   ├── script.py.mako
│   │   └── alembic.ini
│   ├── 📁 tests/
│   │   ├── 📁 api/
│   │   ├── 📁 services/
│   │   ├── conftest.py
│   │   └── __init__.py
│   ├── Dockerfile
│   ├── requirements.txt
│   └── pyproject.toml
├── 📁 frontend/
│   ├── 📁 public/
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── favicon.ico
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   │   ├── 📁 common/
│   │   │   ├── 📁 dashboard/
│   │   │   ├── 📁 search/
│   │   │   ├── 📁 trends/
│   │   │   └── 📁 auth/
│   │   ├── 📁 hooks/
│   │   ├── 📁 services/
│   │   ├── 📁 store/
│   │   ├── 📁 types/
│   │   ├── 📁 utils/
│   │   ├── App.tsx
│   │   ├── index.tsx
│   │   └── index.css
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── Dockerfile
├── 📁 data/
│   └── sample_queries.json
├── 📁 docs/
│   ├── api_documentation.md
│   ├── deployment_guide.md
│   └── development_setup.md
├── 📁 scripts/
│   ├── setup.sh
│   ├── deploy.sh
│   └── backup.sh
├── 📁 .github/
│   └── 📁 workflows/
│       ├── ci.yml
│       ├── cd.yml
│       └── test.yml
├── docker-compose.yml
├── docker-compose.prod.yml
├── .env.example
├── .gitignore
├── README.md
└── DEPLOYMENT.md
```

## 🚀 Key Features

### Backend Features
- **Multi-Source Research Aggregation**: Semantic Scholar, ArXiv, PubMed APIs
- **Social Media Integration**: Reddit, Twitter trend analysis
- **Historical Trend Tracking**: Google Trends API integration
- **RAG Pipeline**: LangChain + Vector Database (Pinecone/ChromaDB)
- **Intelligent Summarization**: OpenAI/SentenceTransformers embeddings
- **Caching Layer**: Redis for performance optimization
- **Authentication**: JWT-based secure authentication
- **Rate Limiting**: Per-user API rate limiting
- **Database**: PostgreSQL with Alembic migrations
- **Async Processing**: FastAPI with background tasks
- **Comprehensive Logging**: Structured logging with monitoring

### Frontend Features
- **Modern React 18+ with TypeScript**
- **Dark, Gamified UI**: Cyberpunk-inspired design
- **Real-time Data Visualization**: Plotly.js/D3.js charts
- **Responsive Design**: Tailwind CSS
- **Progressive Web App**: Offline capabilities
- **State Management**: Redux Toolkit
- **Accessibility**: WCAG 2.1 compliant
- **Error Boundaries**: Comprehensive error handling

### Infrastructure
- **Docker Compose**: Multi-service orchestration
- **CI/CD Pipeline**: GitHub Actions
- **Cloud Deployment**: Azure-ready configuration
- **Monitoring**: Prometheus/Grafana ready
- **Security**: HTTPS, CORS, security headers
- **Scalability**: Horizontal scaling preparation

## 🔧 Technology Stack

### Backend
- **Framework**: FastAPI 0.104+
- **Database**: PostgreSQL 15
- **Cache**: Redis 7
- **Vector DB**: Pinecone (configurable to ChromaDB)
- **AI/ML**: LangChain, OpenAI, SentenceTransformers
- **Authentication**: JWT with python-jose
- **ORM**: SQLAlchemy 2.0 with Alembic
- **HTTP Client**: httpx for async requests
- **Task Queue**: Celery (optional background processing)

### Frontend
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS 3.3+
- **State Management**: Redux Toolkit + RTK Query
- **Charts**: Plotly.js, D3.js
- **HTTP Client**: Axios with interceptors
- **Build Tool**: Vite
- **Testing**: Jest + React Testing Library

### DevOps
- **Containerization**: Docker + Docker Compose
- **CI/CD**: GitHub Actions
- **Cloud**: Azure Container Registry + Azure App Service
- **Monitoring**: OpenTelemetry ready
- **Logging**: Structured JSON logging

## ⚙️ Configuration Management

### Environment Variables (.env)
```bash
# 🚨 CONFIGURE THESE - Database Configuration
DATABASE_URL=postgresql://user:password@db:5432/research_scout
POSTGRES_USER=research_user
POSTGRES_PASSWORD=your_secure_password
POSTGRES_DB=research_scout

# 🚨 CONFIGURE THESE - Redis Configuration
REDIS_URL=redis://redis:6379/0

# 🚨 CONFIGURE THESE - JWT Security
SECRET_KEY=your-super-secret-jwt-key-change-this-in-production
ACCESS_TOKEN_EXPIRE_MINUTES=30

# 🚨 CONFIGURE THESE - API Keys (Required for functionality)
OPENAI_API_KEY=sk-your-openai-api-key
SEMANTIC_SCHOLAR_API_KEY=your-semantic-scholar-key
PUBMED_API_KEY=your-pubmed-ncbi-api-key
REDDIT_CLIENT_ID=your-reddit-client-id
REDDIT_CLIENT_SECRET=your-reddit-client-secret
TWITTER_BEARER_TOKEN=your-twitter-api-bearer-token
GOOGLE_TRENDS_API_KEY=your-google-trends-api-key

# 🚨 CONFIGURE THESE - Vector Database (Choose one)
VECTOR_DB_TYPE=pinecone  # Options: pinecone, chromadb
PINECONE_API_KEY=your-pinecone-api-key
PINECONE_ENVIRONMENT=your-pinecone-environment
PINECONE_INDEX_NAME=research-scout-index

# ChromaDB Configuration (if using ChromaDB instead of Pinecone)
CHROMADB_HOST=chromadb
CHROMADB_PORT=8000

# 🚨 CONFIGURE THESE - Embedding Model Choice
EMBEDDING_MODEL=openai  # Options: openai, sentence-transformers
SENTENCE_TRANSFORMERS_MODEL=all-mpnet-base-v2

# Application Settings
ENVIRONMENT=development  # Options: development, staging, production
DEBUG=true
LOG_LEVEL=INFO
CORS_ORIGINS=["http://localhost:3000","http://localhost:8080"]

# Rate Limiting
RATE_LIMIT_PER_MINUTE=60
RATE_LIMIT_PER_HOUR=1000

# Background Tasks
CELERY_BROKER_URL=redis://redis:6379/1
CELERY_RESULT_BACKEND=redis://redis:6379/2
```

## 🚨 SETUP STEPS - WHAT YOU NEED TO CONFIGURE

### 1. API Keys Setup (REQUIRED)
```bash
# 🔑 Get these API keys:
# - OpenAI API Key: https://platform.openai.com/api-keys
# - Semantic Scholar API: https://www.semanticscholar.org/product/api
# - PubMed/NCBI API: https://www.ncbi.nlm.nih.gov/account/
# - Reddit API: https://www.reddit.com/prefs/apps
# - Twitter API: https://developer.twitter.com/
# - Pinecone API: https://www.pinecone.io/
```

### 2. Database Setup (REQUIRED)
```bash
# 🗄️ Configure PostgreSQL credentials in .env
# Update database connection settings
# Run migrations after setup
```

### 3. Vector Database Choice (REQUIRED)
```bash
# 🔍 Choose either Pinecone (hosted) or ChromaDB (self-hosted)
# Update VECTOR_DB_TYPE in .env
# Configure corresponding API keys
```

### 4. Cloud Deployment (OPTIONAL)
```bash
# ☁️ For Azure deployment:
# - Create Azure Container Registry
# - Set up Azure App Service
# - Configure GitHub secrets for CI/CD
```

## 🏃‍♂️ Quick Start

### 1. Clone and Setup
```bash
git clone <your-repo>
cd smart-research-scout
cp .env.example .env
# 🚨 EDIT .env file with your configuration
```

### 2. Development Mode
```bash
# Start all services
docker-compose up -d

# Check services are running
docker-compose ps

# View logs
docker-compose logs -f backend
```

### 3. Access Applications
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **Redis Insight**: http://localhost:8001

## 📊 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/refresh` - Refresh token

### Search & Research
- `POST /api/v1/search/papers` - Search research papers
- `GET /api/v1/search/suggestions` - Get search suggestions
- `POST /api/v1/search/summarize` - Summarize search results

### Trends Analysis
- `GET /api/v1/trends/topics` - Get trending topics
- `GET /api/v1/trends/historical` - Historical trend data
- `POST /api/v1/trends/analyze` - Analyze custom trends

### User Management
- `GET /api/v1/users/profile` - Get user profile
- `PUT /api/v1/users/profile` - Update user profile
- `GET /api/v1/users/history` - Search history

## 🔒 Security Features

- **JWT Authentication** with refresh tokens
- **Rate Limiting** per user and endpoint
- **CORS Configuration** with whitelist
- **SQL Injection Protection** via SQLAlchemy ORM
- **Input Validation** with Pydantic schemas
- **Security Headers** (HSTS, CSP, etc.)
- **API Key Rotation** support
- **Encrypted Environment Variables**

## 📈 Monitoring & Observability

### Logging
- **Structured JSON logging** with correlation IDs
- **Request/Response logging** with timing
- **Error tracking** with stack traces
- **Performance monitoring** for database queries

### Metrics
- **API Response Times** by endpoint
- **Database Connection Pool** metrics
- **Cache Hit/Miss Ratios** for Redis
- **External API Usage** tracking
- **User Activity Metrics**

### Health Checks
- `GET /health` - Application health
- `GET /health/db` - Database connectivity
- `GET /health/redis` - Redis connectivity
- `GET /health/external` - External API status

## 🚀 Deployment Options

### 1. Docker Compose (Development)
```bash
docker-compose up -d
```

### 2. Azure Container Instances
```bash
# Configured in .github/workflows/cd.yml
# Automatically deploys on main branch
```

### 3. Kubernetes (Production)
```bash
# Helm charts provided in k8s/
helm install research-scout ./k8s/helm-chart
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
pytest tests/ -v --cov=app
```

### Frontend Tests
```bash
cd frontend
npm test -- --coverage
```

### Integration Tests
```bash
docker-compose -f docker-compose.test.yml up --abort-on-container-exit
```

## 📖 Additional Documentation

- **API Documentation**: http://localhost:8000/docs (auto-generated)
- **Development Setup**: See `docs/development_setup.md`
- **Deployment Guide**: See `docs/deployment_guide.md`
- **Architecture Decisions**: See `docs/architecture.md`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

---

**Next Steps**: Follow the individual file contents below to set up your complete application architecture.