from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, field_validator, validator
from utils import PydanticObjectId


class PostCreate(BaseModel):
    content: str
    event_id: Optional[str] = None
    location_id: Optional[str] = None
    author_name: Optional[str] = None
    tag_ids: List[str] = []

class PostResponse(BaseModel):
    id: str
    content: str
    created_at: datetime
    event_id: Optional[str] = None
    location_id: Optional[str] = None
    author_name: Optional[str] = None
    tag_ids: List[str]

    @validator("id", pre=True, always=True)
    def stringify_objectid(cls, v):
        return str(v)

class EventCreate(BaseModel):
    title: str
    description: Optional[str] = None
    date: Optional[datetime] = None
    location_id: Optional[str] = None
    tag_ids: List[str] = []

class EventResponse(BaseModel):
    id: str
    title: str
    description: Optional[str]
    date: Optional[datetime]
    location_id: Optional[str]
    tag_ids: List[str]

    @validator("id", pre=True, always=True)
    def stringify_objectid(cls, v):
        return str(v)

class TagCreate(BaseModel):
    name: str
    category: Optional[str] = None

class TagResponse(BaseModel):
    id: str
    name: str
    category: Optional[str]