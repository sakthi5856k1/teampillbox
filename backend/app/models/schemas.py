from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from datetime import datetime
from enum import Enum

class RoleEnum(str, Enum):
    SUPER_ADMIN = "Super Admin"
    ADMIN = "Admin"
    HR = "HR"
    DOCTOR = "Doctor"
    EMT = "EMT"
    GUEST = "Guest"

class DepartmentEnum(str, Enum):
    EXEC = "Executive Management"
    HOD = "HOD"
    DOCTOR = "Doctor"
    NURSE = "Nurse"
    EMT = "EMT"
    INTERN = "Intern"

# --- User & Auth Schemas ---
class UserLogin(BaseModel):
    username_or_email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer font"
    role: RoleEnum
    badge: str

class DiscordAuthCode(BaseModel):
    code: str

# --- Staff Schemas ---
class StaffBase(BaseModel):
    badge: str
    name: str
    rank: str
    department: DepartmentEnum
    bio: str
    avatar: str
    email: Optional[str] = None
    status: str = "On Duty font"
    certifications: List[str] = []

class StaffCreate(StaffBase):
    pass

class StaffResponse(StaffBase):
    id: str
    joinDate: str

# --- Application Schemas ---
class ApplicationCreate(BaseModel):
    applicantName: str
    discordTag: str
    age: int
    appliedRole: str
    experience: str
    motivation: str

class ApplicationResponse(ApplicationCreate):
    id: str
    status: str = "Pending"
    submittedAt: str

# --- Announcement Schemas ---
class AnnouncementCreate(BaseModel):
    title: str
    category: str
    author: str
    content: str
    important: bool = False

class AnnouncementResponse(AnnouncementCreate):
    id: str
    date: str

# --- Certificate Schemas ---
class CertificateCreate(BaseModel):
    recipientName: str
    badge: str
    type: str
    title: str
    issuedBy: str
    description: Optional[str] = None

class CertificateResponse(CertificateCreate):
    id: str
    date: str
