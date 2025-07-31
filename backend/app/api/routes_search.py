# backend/app/api/routes_search.py
from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional
import asyncio
from datetime import datetime

from app.core.dependencies import get_db, get_vector_db
from app.models.schemas import SearchRequest, SearchResponse, ResearchPaper
from app.services.research_service import ResearchService
from app.models.database import SearchQuery

router = APIRouter()

@router.post("/papers", response_model=SearchResponse)
async def search_research_papers(
    request: SearchRequest,
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_db),
    vector_db = Depends(get_vector_db)
):
    """Search for research papers across multiple sources"""
    
    start_time = datetime.utcnow()
    research_service = ResearchService(db, vector_db)
    
    try:
        # Perform parallel searches across sources
        papers = await research_service.search_papers(
            query=request.query,
            sources=request.sources or ["semantic_scholar", "arxiv", "pubmed"],
            limit=request.limit or 20
        )
        
        # Log search query
        background_tasks.add_task(
            log_search_query,
            db,
            request.query,
            len(papers),
            (datetime.utcnow() - start_time).total_seconds()
        )
        
        return SearchResponse(
            query=request.query,
            results=papers,
            total_count=len(papers),
            sources_searched=request.sources or ["semantic_scholar", "arxiv", "pubmed"]
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/papers/{paper_id}")
async def get_paper_details(
    paper_id: str,
    db: AsyncSession = Depends(get_db)
):
    """Get detailed information about a specific paper"""
    # Implementation for fetching paper details
    pass

async def log_search_query(db: AsyncSession, query: str, results_count: int, response_time: float):
    """Background task to log search queries"""
    search_query = SearchQuery(
        query_text=query,
        response_time=response_time,
        results_count=results_count,
        timestamp=datetime.utcnow()
    )
    db.add(search_query)
    await db.commit()
