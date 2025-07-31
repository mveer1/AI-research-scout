# backend/app/models/schemas.py
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime

# Request Models
class SearchRequest(BaseModel):
    query: str
    sources: Optional[List[str]] = None
    limit: Optional[int] = 20

class TrendsRequest(BaseModel):
    keywords: List[str]
    timeframe: Optional[str] = "12m"
    geo: Optional[str] = "US"

class DiscussionRequest(BaseModel):
    query: str
    sources: Optional[List[str]] = None
    limit: Optional[int] = 50
    sort_by: Optional[str] = "relevance"

class SummaryRequest(BaseModel):
    query: str
    sources: List[str]
    summary_type: Optional[str] = "comprehensive"
    eli5_mode: Optional[bool] = False

# Response Models
class ResearchPaper(BaseModel):
    id: str
    title: str
    abstract: Optional[str]
    authors: List[str]
    url: str
    source: str
    citations: int
    published_date: Optional[str]

class SearchResponse(BaseModel):
    query: str
    results: List[ResearchPaper]
    total_count: int
    sources_searched: List[str]

class TrendPoint(BaseModel):
    date: datetime
    value: float
    related_queries: Optional[List[str]]

class TrendsResponse(BaseModel):
    keywords: List[str]
    timeframe: str
    data: List[TrendPoint]
    generated_at: datetime

class Discussion(BaseModel):
    id: str
    title: str
    content: str
    author: str
    url: str
    score: int
    comments: int
    sentiment: Optional[float]
    source: str

class DiscussionResponse(BaseModel):
    query: str
    discussions: List[Discussion]
    total_count: int
    sources: List[str]

class SummaryResponse(BaseModel):
    query: str
    summary: str
    sources: List[str]
    confidence_score: float
    eli5_version: Optional[str]
