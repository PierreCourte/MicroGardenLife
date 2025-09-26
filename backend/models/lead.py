from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime

class Lead(BaseModel):
    name: str
    email: EmailStr
    source: str = "lead-magnet"
    created_at: datetime = Field(default_factory=datetime.utcnow)

class LeadCreate(BaseModel):
    name: str
    email: EmailStr
    source: Optional[str] = "lead-magnet"