from datetime import datetime
from typing import Optional

from bson import ObjectId
from pydantic import BaseModel, Field


class PostModel(BaseModel):
    id: str = Field(default_factory=lambda: str(ObjectId()), alias="_id")
    content: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    event_id: Optional[str] = None
    location_id: Optional[str] = None
    author_name: Optional[str] = None

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}