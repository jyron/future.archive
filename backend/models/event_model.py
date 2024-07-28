from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional
from bson import ObjectId

class EventModel(BaseModel):
    id: str = Field(default_factory=lambda: str(ObjectId()), alias="_id")
    title: str
    description: str
    start_date: datetime
    end_date: datetime
    location_id: Optional[str] = None
    category: Optional[str] = None

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}