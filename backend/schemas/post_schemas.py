from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel


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