from datetime import UTC, datetime
from typing import List, Optional

from bson import ObjectId
from pydantic import BaseModel, Field


class PostModel(BaseModel):
    id: str = Field(default_factory=lambda: str(ObjectId()), alias="_id")
    content: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(UTC))
    event_id: Optional[str] = None
    location_id: Optional[str] = None
    author_name: Optional[str] = None
    tag_ids: List[str] = Field(default_factory=list)

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}