# backend/app/services/research_service.py
import asyncio
import aiohttp
from typing import List, Dict, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime
import xml.etree.ElementTree as ET

from app.models.database import ResearchPaper
from app.core.config import settings, API_ENDPOINTS

class ResearchService:
    def __init__(self, db: AsyncSession, vector_db):
        self.db = db
        self.vector_db = vector_db
    
    async def search_papers(
        self, 
        query: str, 
        sources: List[str], 
        limit: int = 20
    ) -> List[Dict]:
        """Search papers across multiple sources in parallel"""
        
        tasks = []
        if "semantic_scholar" in sources:
            tasks.append(self._search_semantic_scholar(query, limit))
        if "arxiv" in sources:
            tasks.append(self._search_arxiv(query, limit))
        if "pubmed" in sources:
            tasks.append(self._search_pubmed(query, limit))
        
        results = await asyncio.gather(*tasks, return_exceptions=True)
        
        # Combine and deduplicate results
        papers = []
        for result in results:
            if isinstance(result, list):
                papers.extend(result)
        
        # Store papers in database and vector store
        await self._store_papers(papers)
        
        return papers[:limit]
    
    async def _search_semantic_scholar(self, query: str, limit: int) -> List[Dict]:
        """Search Semantic Scholar API"""
        async with aiohttp.ClientSession() as session:
            url = f"{API_ENDPOINTS['semantic_scholar']}/paper/search"
            params = {
                "query": query,
                "limit": limit,
                "fields": "title,abstract,authors,year,citationCount,url"
            }
            
            async with session.get(url, params=params) as response:
                if response.status == 200:
                    data = await response.json()
                    return [self._format_semantic_scholar_paper(paper) 
                           for paper in data.get("data", [])]
        return []
    
    async def _search_arxiv(self, query: str, limit: int) -> List[Dict]:
        """Search ArXiv API"""
        async with aiohttp.ClientSession() as session:
            url = API_ENDPOINTS["arxiv"]
            params = {
                "search_query": f"all:{query}",
                "start": 0,
                "max_results": limit
            }
            
            async with session.get(url, params=params) as response:
                if response.status == 200:
                    xml_data = await response.text()
                    return self._parse_arxiv_xml(xml_data)
        return []
    
    async def _search_pubmed(self, query: str, limit: int) -> List[Dict]:
        """Search PubMed API"""
        # Implementation for PubMed search
        return []
    
    def _format_semantic_scholar_paper(self, paper: Dict) -> Dict:
        """Format Semantic Scholar response"""
        return {
            "id": paper.get("paperId"),
            "title": paper.get("title"),
            "abstract": paper.get("abstract"),
            "authors": [author.get("name") for author in paper.get("authors", [])],
            "year": paper.get("year"),
            "citations": paper.get("citationCount", 0),
            "url": paper.get("url"),
            "source": "semantic_scholar"
        }
    
    def _parse_arxiv_xml(self, xml_data: str) -> List[Dict]:
        """Parse ArXiv XML response"""
        papers = []
        root = ET.fromstring(xml_data)
        
        for entry in root.findall("{http://www.w3.org/2005/Atom}entry"):
            paper = {
                "id": entry.find("{http://www.w3.org/2005/Atom}id").text,
                "title": entry.find("{http://www.w3.org/2005/Atom}title").text,
                "abstract": entry.find("{http://www.w3.org/2005/Atom}summary").text,
                "authors": [author.find("{http://www.w3.org/2005/Atom}name").text 
                           for author in entry.findall("{http://www.w3.org/2005/Atom}author")],
                "published": entry.find("{http://www.w3.org/2005/Atom}published").text,
                "url": entry.find("{http://www.w3.org/2005/Atom}id").text,
                "source": "arxiv"
            }
            papers.append(paper)
        
        return papers
    
    async def _store_papers(self, papers: List[Dict]):
        """Store papers in database and vector store"""
        for paper in papers:
            # Check if paper already exists
            existing = await self.db.execute(
                select(ResearchPaper).where(ResearchPaper.external_id == paper["id"])
            )
            
            if not existing.scalar_one_or_none():
                # Create new paper record
                db_paper = ResearchPaper(
                    external_id=paper["id"],
                    source=paper["source"],
                    title=paper["title"],
                    abstract=paper.get("abstract"),
                    authors=paper.get("authors", []),
                    url=paper["url"],
                    citations_count=paper.get("citations", 0)
                )
                
                self.db.add(db_paper)
        
        await self.db.commit()
