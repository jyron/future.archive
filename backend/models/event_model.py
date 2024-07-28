from datetime import UTC, datetime
from typing import List, Optional

from bson import ObjectId
from pydantic import BaseModel, Field


class EventModel(BaseModel):
    id: str = Field(default_factory=lambda: str(ObjectId()), alias="_id")
    title: str
    description: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(UTC))
    event_start: Optional[datetime] = None
    event_end: Optional[datetime] = None
    location_id: Optional[str] = None
    tag_ids: List[str] = Field(default_factory=list)
    
    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}