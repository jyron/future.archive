from typing import Optional

from bson import ObjectId
from pydantic import BaseModel, Field


class TagModel(BaseModel):
    id: str = Field(default_factory=lambda: str(ObjectId()), alias="_id")
    name: str
    category: Optional[str] = None

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class PostTagModel(BaseModel):
    id: str = Field(default_factory=lambda: str(ObjectId()), alias="_id")
    post_id: str
    tag_id: str

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class EventTagModel(BaseModel):
    id: str = Field(default_factory=lambda: str(ObjectId()), alias="_id")
    event_id: str
    tag_id: str

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}