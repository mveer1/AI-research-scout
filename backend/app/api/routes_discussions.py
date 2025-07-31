# backend/app/api/routes_discussions.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional

from app.core.dependencies import get_db
from app.models.schemas import DiscussionRequest, DiscussionResponse
from app.services.discussion_service import DiscussionService

router = APIRouter()

@router.post("/search", response_model=DiscussionResponse)
async def search_discussions(
    request: DiscussionRequest,
    db: AsyncSession = Depends(get_db)
):
    """Search for discussions across social platforms"""
    
    discussion_service = DiscussionService(db)
    
    try:
        discussions = await discussion_service.search_discussions(
            query=request.query,
            sources=request.sources or ["reddit"],
            limit=request.limit or 50,
            sort_by=request.sort_by or "relevance"
        )
        
        return DiscussionResponse(
            query=request.query,
            discussions=discussions,
            total_count=len(discussions),
            sources=request.sources
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/sentiment/{discussion_id}")
async def get_discussion_sentiment(
    discussion_id: str,
    db: AsyncSession = Depends(get_db)
):
    """Get sentiment analysis for a specific discussion"""
    discussion_service = DiscussionService(db)
    
    sentiment = await discussion_service.analyze_sentiment(discussion_id)
    
    return {
        "discussion_id": discussion_id,
        "sentiment": sentiment
    }
