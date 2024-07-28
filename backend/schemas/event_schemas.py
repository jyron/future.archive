from datetime import datetime
from typing import Optional

import pendulum
from pydantic import BaseModel, Field


def utc_now():
    return pendulum.now('UTC')

class EventCreate(BaseModel):
    title: str
    description: str
    start_date: datetime
    location_id: Optional[str] = None
    category: Optional[str] = None

class EventResponse(BaseModel):
    id: str
    title: str
    description: str
    start_date: Optional[datetime]
    location_id: Optional[str] = None
    category: Optional[str] = None