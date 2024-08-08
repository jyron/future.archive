from typing import List

from fastapi import APIRouter, HTTPException
from schemas import (EventCreate, EventResponse, PostCreate, PostResponse,
                     TagCreate, TagResponse)
from services import EventService, PostService, TagService

router = APIRouter()

@router.post("/posts", response_model=PostResponse)
def create_post(post: PostCreate):
    return PostService.create_post(post)

@router.get("/posts", response_model=List[PostResponse])
def get_posts():
    return PostService.get_posts()

@router.get("/posts/{post_id}", response_model=PostResponse)
def get_post(post_id: str):
    post = PostService.get_post(post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post

@router.post("/events", response_model=EventResponse)
def create_event(event: EventCreate):
    return EventService.create_event(event)

@router.get("/events", response_model=List[EventResponse])
def get_events():
    return EventService.get_events()

@router.get("/events/{event_id}", response_model=EventResponse)
def get_event(event_id: str):
    event = EventService.get_event(event_id)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event

@router.post("/tags", response_model=TagResponse)
def create_tag(tag: TagCreate):
    return TagService.create_tag(tag)

@router.get("/tags", response_model=List[TagResponse])
def get_tags():
    return TagService.get_tags()

@router.get("/tags/{tag_id}", response_model=TagResponse)
def get_tag(tag_id: str):
    tag = TagService.get_tag(tag_id)
    if not tag:
        raise HTTPException(status_code=404, detail="Tag not found")
    return tag