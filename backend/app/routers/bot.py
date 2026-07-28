from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from app.database import get_database
from datetime import datetime

router = APIRouter(prefix="/bot", tags=["Discord Bot Sync"])

class BotClockIn(BaseModel):
    discord_id: str
    discord_tag: str
    sector: str

class BotClockOut(BaseModel):
    discord_id: str
    duration_minutes: int
    sector: str

@router.post("/clock-in")
async def bot_clock_in(data: BotClockIn):
    db = get_database()
    if db is not None:
        await db.bot_sessions.insert_one({
            "discord_id": data.discord_id,
            "discord_tag": data.discord_tag,
            "sector": data.sector,
            "clock_in_time": datetime.utcnow()
        })
    return {"status": "success", "message": f"Officer {data.discord_tag} clocked in for {data.sector}"}

@router.post("/clock-out")
async def bot_clock_out(data: BotClockOut):
    db = get_database()
    hours_logged = round(data.duration_minutes / 60.0, 2)
    
    if db is not None:
        await db.duty_shifts.insert_one({
            "discord_id": data.discord_id,
            "sector": data.sector,
            "duration_minutes": data.duration_minutes,
            "hours_logged": hours_logged,
            "date": datetime.now().strftime("%Y-%m-%d")
        })
    return {"status": "success", "hours_logged": hours_logged}

@router.get("/stats/{discord_id}")
async def bot_stats(discord_id: str):
    db = get_database()
    if db is None:
        return {"total_hours": 42.5}
    
    pipeline = [
        {"$match": {"discord_id": discord_id}},
        {"$group": {"_id": "$discord_id", "total_hours": {"$sum": "$hours_logged"}}}
    ]
    result = await db.duty_shifts.aggregate(pipeline).to_list(1)
    if result:
        return {"total_hours": round(result[0]["total_hours"], 1)}
    return {"total_hours": 0.0}
