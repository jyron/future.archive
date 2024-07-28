from typing import List
from models.event_model import EventModel
from schemas.event_schemas import EventCreate, EventResponse
from db.mongodb import get_database

class EventService:
    def __init__(self):
        self.db = get_database()
        self.collection = self.db["events"]

    async def create_event(self, event: EventCreate) -> EventResponse:
        event_dict = event.dict()
        result = await self.collection.insert_one(event_dict)
        created_event = await self.collection.find_one({"_id": result.inserted_id})
        return EventResponse(**created_event)

    async def get_events(self) -> List[EventResponse]:
        cursor = self.collection.find()
        events = await cursor.to_list(length=None)
        return [EventResponse(**event) for event in events]