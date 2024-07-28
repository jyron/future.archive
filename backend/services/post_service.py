from typing import List
from models.post_model import PostModel
from schemas.post_schemas import PostCreate, PostResponse
from db.mongodb import get_database

class PostService:
    def __init__(self):
        self.db = get_database()
        self.collection = self.db["posts"]

    async def create_post(self, post: PostCreate) -> PostResponse:
        post_dict = post.dict()
        result = await self.collection.insert_one(post_dict)
        created_post = await self.collection.find_one({"_id": result.inserted_id})
        return PostResponse(**created_post)

    async def get_posts(self) -> List[PostResponse]:
        cursor = self.collection.find()
        posts = await cursor.to_list(length=None)
        return [PostResponse(**post) for post in posts]