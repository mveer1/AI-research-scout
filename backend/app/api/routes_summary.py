# backend/app/api/routes_summary.py
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional
import json

from app.core.dependencies import get_db, get_vector_db
from app.models.schemas import SummaryRequest, SummaryResponse
from app.services.rag_service import RAGService

router = APIRouter()

@router.post("/generate", response_model=SummaryResponse)
async def generate_summary(
    request: SummaryRequest,
    db: AsyncSession = Depends(get_db),
    vector_db = Depends(get_vector_db)
):
    """Generate AI-powered summary from research data"""
    
    rag_service = RAGService(db, vector_db)
    
    try:
        summary = await rag_service.generate_summary(
            query=request.query,
            sources=request.sources,
            summary_type=request.summary_type or "comprehensive",
            eli5_mode=request.eli5_mode or False
        )
        
        return SummaryResponse(
            query=request.query,
            summary=summary.content,
            sources=summary.sources,
            confidence_score=summary.confidence,
            eli5_version=summary.eli5_content if request.eli5_mode else None
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/stream")
async def stream_summary(
    request: SummaryRequest,
    db: AsyncSession = Depends(get_db),
    vector_db = Depends(get_vector_db)
):
    """Stream AI-powered summary generation"""
    
    async def generate_stream():
        rag_service = RAGService(db, vector_db)
        
        async for chunk in rag_service.stream_summary(request.query):
            yield f"data: {json.dumps({'content': chunk})}\n\n"
        
        yield f"data: {json.dumps({'done': True})}\n\n"
    
    return StreamingResponse(
        generate_stream(),
        media_type="text/plain",
        headers={"Cache-Control": "no-cache"}
    )
