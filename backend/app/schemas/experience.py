from typing import Optional
from pydantic import BaseModel, ConfigDict


class ExperienceRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    period: str
    role: str
    company: str
    description: str
    employment_type: str = "Full-time"
    start_date: Optional[str]
    end_date: Optional[str]
    technologies: list[str]
    current: bool
    order: int


class ExperienceCreate(BaseModel):
    period: str
    role: str
    company: str
    description: str
    employment_type: str = "Full-time"
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    technologies: list[str] = []
    current: bool = False
    order: int = 0


class ExperienceUpdate(BaseModel):
    period: Optional[str] = None
    role: Optional[str] = None
    company: Optional[str] = None
    description: Optional[str] = None
    employment_type: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    technologies: Optional[list[str]] = None
    current: Optional[bool] = None
    order: Optional[int] = None
