from typing import List

from fastapi import APIRouter, Depends
from schemas.event_schemas import EventCreate, EventResponse
from services.event_service import EventService

router = APIRouter()

@router.post("/events", response_model=EventResponse)
async def create_event(event: EventCreate, event_service: EventService = Depends()):
    return await event_service.create_event(event)

@router.get("/events", response_model=List[EventResponse])
async def get_events(event_service: EventService = Depends()):
    return await event_service.get_events()