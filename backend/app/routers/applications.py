from fastapi import APIRouter, HTTPException
from typing import List
from app.models.schemas import ApplicationCreate, ApplicationResponse
from app.database import get_database
import random
from datetime import datetime

router = APIRouter(prefix="/applications", tags=["Recruitment Applications"])

@router.get("/", response_model=List[ApplicationResponse])
async def list_applications():
    db = get_database()
    if db is None:
        return []
    cursor = db.applications.find()
    return await cursor.to_list(length=100)

@router.post("/", response_model=ApplicationResponse)
async def submit_application(app: ApplicationCreate):
    db = get_database()
    app_id = f"APP-{random.randint(1000, 9999)}"
    new_app = app.dict()
    new_app.update({
        "id": app_id,
        "status": "Pending",
        "submittedAt": datetime.now().strftime("%Y-%m-%d")
    })
    if db is not None:
        await db.applications.insert_one(new_app)
    return new_app

@router.patch("/{app_id}/status")
async def update_status(app_id: str, status: str):
    db = get_database()
    if db is not None:
        result = await db.applications.update_one({"id": app_id}, {"$set": {"status": status}})
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Application not found")
    return {"message": f"Application status updated to {status}"}
