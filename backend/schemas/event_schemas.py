from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class EventCreate(BaseModel):
    title: str
    description: str
    start_date: datetime
    end_date: datetime
    location_id: Optional[str] = None
    category: Optional[str] = None

class EventResponse(BaseModel):
    id: str
    title: str
    description: str
    start_date: datetime
    end_date: datetime
    location_id: Optional[str] = None
    category: Optional[str] = None