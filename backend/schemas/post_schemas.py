from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class PostCreate(BaseModel):
    content: str
    event_id: Optional[str] = None
    location_id: Optional[str] = None
    author_name: Optional[str] = None

class PostResponse(BaseModel):
    id: str
    content: str
    timestamp: datetime
    event_id: Optional[str] = None
    location_id: Optional[str] = None
    author_name: Optional[str] = None