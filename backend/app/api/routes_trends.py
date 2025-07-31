# backend/app/api/routes_trends.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional
from datetime import datetime, timedelta

from app.core.dependencies import get_db
from app.models.schemas import TrendsRequest, TrendsResponse
from app.services.trends_service import TrendsService

router = APIRouter()

@router.post("/analyze", response_model=TrendsResponse)
async def analyze_trends(
    request: TrendsRequest,
    db: AsyncSession = Depends(get_db)
):
    """Analyze trends for given keywords"""
    
    trends_service = TrendsService(db)
    
    try:
        trend_data = await trends_service.get_trends(
            keywords=request.keywords,
            timeframe=request.timeframe or "12m",
            geo=request.geo or "US"
        )
        
        return TrendsResponse(
            keywords=request.keywords,
            timeframe=request.timeframe,
            data=trend_data,
            generated_at=datetime.utcnow()
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/historical/{keyword}")
async def get_historical_trends(
    keyword: str,
    days: int = 365,
    db: AsyncSession = Depends(get_db)
):
    """Get historical trend data for a keyword"""
    trends_service = TrendsService(db)
    
    end_date = datetime.utcnow()
    start_date = end_date - timedelta(days=days)
    
    historical_data = await trends_service.get_historical_data(
        keyword=keyword,
        start_date=start_date,
        end_date=end_date
    )
    
    return {
        "keyword": keyword,
        "period": f"{days} days",
        "data": historical_data
    }
