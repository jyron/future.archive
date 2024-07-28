from datetime import datetime
from typing import Optional

from bson import ObjectId
from pydantic import BaseModel, Field


class EventModel(BaseModel):
    id: str = Field(default_factory=lambda: str(ObjectId()), alias="_id")
    title: str
    description: str
    start_date: datetime
    end_date: Optional[datetime]
    location_id: Optional[str] = None
    category: Optional[str] = None

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}