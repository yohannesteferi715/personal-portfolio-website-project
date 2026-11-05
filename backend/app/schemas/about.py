from typing import Optional
from pydantic import BaseModel, ConfigDict


class HighlightSchema(BaseModel):
    icon: str
    title: str
    description: str


class AboutRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    paragraphs: list[str]
    mission_quote: str
    highlights: list[HighlightSchema]


class AboutUpdate(BaseModel):
    """Full replacement — all fields required for a PUT."""
    paragraphs: list[str] = []
    mission_quote: str = ""
    highlights: list[HighlightSchema] = []
