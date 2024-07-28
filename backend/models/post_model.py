from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional
from bson import ObjectId

class PostModel(BaseModel):
    id: str = Field(default_factory=lambda: str(ObjectId()), alias="_id")
    content: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    event_id: Optional[str] = None
    location_id: Optional[str] = None
    author_name: Optional[str] = None

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}