from fastapi import APIRouter
from typing import List
from app.models.schemas import AnnouncementCreate, AnnouncementResponse
from app.database import get_database
from datetime import datetime

router = APIRouter(prefix="/announcements", tags=["Announcements"])

@router.get("/", response_model=List[AnnouncementResponse])
async def list_announcements():
    db = get_database()
    if db is None:
        return []
    cursor = db.announcements.find()
    return await cursor.to_list(length=100)

@router.post("/", response_model=AnnouncementResponse)
async def post_announcement(news: AnnouncementCreate):
    db = get_database()
    news_doc = news.dict()
    news_doc["id"] = f"ann-{int(datetime.now().timestamp())}"
    news_doc["date"] = datetime.now().strftime("%Y-%m-%d")
    if db is not None:
        await db.announcements.insert_one(news_doc)
    return news_doc
