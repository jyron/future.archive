from typing import List

from fastapi import APIRouter, Depends
from schemas.post_schemas import PostCreate, PostResponse
from services.post_service import PostService

router = APIRouter()

@router.post("/posts", response_model=PostResponse)
async def create_post(post: PostCreate, post_service: PostService = Depends()):
    return await post_service.create_post(post)

@router.get("/posts", response_model=List[PostResponse])
async def get_posts(post_service: PostService = Depends()):
    return await post_service.get_posts()