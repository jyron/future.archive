from models import Event, Post, Tag
from schemas import EventCreate, PostCreate, TagCreate


class PostService:
    @staticmethod
    def create_post(post: PostCreate):
        new_post = Post(**post.dict())
        new_post.save()
        return new_post

    @staticmethod
    def get_posts():
        return list(Post.objects)

    @staticmethod
    def get_post(post_id: str):
        return Post.objects(id=post_id).first()

class EventService:
    @staticmethod
    def create_event(event: EventCreate):
        new_event = Event(**event.dict())
        new_event.save()
        return new_event

    @staticmethod
    def get_events():
        return list(Event.objects)

    @staticmethod
    def get_event(event_id: str):
        return Event.objects(id=event_id).first()

class TagService:
    @staticmethod
    def create_tag(tag: TagCreate):
        new_tag = Tag(**tag.dict())
        new_tag.save()
        return new_tag

    @staticmethod
    def get_tags():
        return list(Tag.objects)

    @staticmethod
    def get_tag(tag_id: str):
        return Tag.objects(id=tag_id).first()