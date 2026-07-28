from fastapi import APIRouter
from typing import List
from app.models.schemas import CertificateCreate, CertificateResponse
from app.database import get_database
import random
from datetime import datetime

router = APIRouter(prefix="/certificates", tags=["Certificates"])

@router.get("/", response_model=List[CertificateResponse])
async def list_certificates():
    db = get_database()
    if db is None:
        return []
    cursor = db.certificates.find()
    return await cursor.to_list(length=100)

@router.post("/", response_model=CertificateResponse)
async def create_certificate(cert: CertificateCreate):
    db = get_database()
    cert_doc = cert.dict()
    cert_doc["id"] = f"CERT-{random.randint(500, 999)}"
    cert_doc["date"] = datetime.now().strftime("%Y-%m-%d")
    if db is not None:
        await db.certificates.insert_one(cert_doc)
    return cert_doc
