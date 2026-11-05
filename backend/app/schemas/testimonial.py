from typing import Optional
from pydantic import BaseModel, ConfigDict


class TestimonialRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    quote: str
    author: str
    role: str
    avatar_url: str
    order: int


class TestimonialCreate(BaseModel):
    quote: str
    author: str
    role: str = ""
    avatar_url: str = ""
    order: int = 0


class TestimonialUpdate(BaseModel):
    quote: Optional[str] = None
    author: Optional[str] = None
    role: Optional[str] = None
    avatar_url: Optional[str] = None
    order: Optional[int] = None
