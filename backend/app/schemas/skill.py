from typing import Optional
from pydantic import BaseModel, ConfigDict


class SkillRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    category: Optional[str]


class SkillCreate(BaseModel):
    name: str
    category: Optional[str] = None


class SkillUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
