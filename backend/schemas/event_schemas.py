from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, Field


class EventCreate(BaseModel):
    title: str
    description: str
    event_start: Optional[datetime] = None
    event_end: Optional[datetime] = None
    location_id: Optional[str] = None
    tag_ids: List[str] = []

class EventResponse(BaseModel):
    id: str
    title: str
    description: str
    created_at: datetime
    event_start: Optional[datetime] = None
    event_end: Optional[datetime] = None
    location_id: Optional[str] = None
    tag_ids: List[str]