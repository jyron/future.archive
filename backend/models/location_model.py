from typing import Optional

from bson import ObjectId
from pydantic import BaseModel, Field, validator


class LocationModel(BaseModel):
    id: str = Field(default_factory=lambda: str(ObjectId()), alias="_id")
    name: str
    coordinates: Optional[dict] = Field(default=None, description="A dictionary with 'lat' and 'lng' keys")

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
