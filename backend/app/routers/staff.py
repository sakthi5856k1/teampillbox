from fastapi import APIRouter, HTTPException
from typing import List, Optional
from app.models.schemas import StaffCreate, StaffResponse
from app.database import get_database
import uuid
from datetime import datetime

router = APIRouter(prefix="/staff", tags=["Staff Roster"])

@router.get("/", response_model=List[StaffResponse])
async def get_all_staff(rank: Optional[str] = None):
    db = get_database()
    if db is None:
        # Fallback mock data if MongoDB is disconnected
        return []
    
    query = {}
    if rank and rank != "All":
        query["department"] = rank
        
    cursor = db.staff.find(query)
    staff_list = await cursor.to_list(length=100)
    return staff_list

@router.post("/", response_model=StaffResponse)
async def create_staff_member(staff: StaffCreate):
    db = get_database()
    new_doc = staff.dict()
    new_doc["id"] = f"ems-{uuid.uuid4().hex[:4]}"
    new_doc["joinDate"] = datetime.now().strftime("%Y-%m-%d")
    
    if db is not None:
        await db.staff.insert_one(new_doc)
    return new_doc

@router.delete("/{staff_id}")
async def delete_staff_member(staff_id: str):
    db = get_database()
    if db is not None:
        result = await db.staff.delete_one({"id": staff_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Staff member not found")
    return {"message": "Staff member deleted successfully"}
