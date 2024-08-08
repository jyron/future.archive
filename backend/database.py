from mongoengine import connect


def init_db():
    connect('future_archive', host='mongodb://localhost:27017')