from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class Product(BaseModel):
    id: str
    title: str
    description: str
    type: str  # 'guide', 'ebook', 'course'
    price: float = 0.0
    content: str
    download_url: Optional[str] = None
    video_url: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ProductResponse(BaseModel):
    id: str
    title: str
    description: str
    type: str
    price: float
    content: str
    download_url: Optional[str] = None
    video_url: Optional[str] = None