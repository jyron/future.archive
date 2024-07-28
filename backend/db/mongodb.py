from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.server_api import ServerApi

MONGO_URL = "mongodb://localhost:27017"
DB_NAME = "future_archive"

client = AsyncIOMotorClient(MONGO_URL, server_api=ServerApi('1'))

def get_database():
    return client[DB_NAME]