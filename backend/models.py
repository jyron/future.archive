from datetime import UTC, datetime

from mongoengine import DateTimeField, Document, ListField, StringField


class Post(Document):
    content = StringField(required=True)
    created_at = DateTimeField(default=datetime.now(UTC))
    event_id = StringField()
    location_id = StringField()
    author_name = StringField()
    tag_ids = ListField(StringField())

    meta = {'collection': 'posts'}

class Event(Document):
    title = StringField(required=True)
    description = StringField()
    date = DateTimeField()
    location_id = StringField()
    tag_ids = ListField(StringField())

    meta = {'collection': 'events'}

class Tag(Document):
    name = StringField(required=True, unique=True)
    category = StringField()

    meta = {'collection': 'tags'}