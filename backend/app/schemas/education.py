from typing import Optional
from pydantic import BaseModel, ConfigDict


class EducationRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    institution: str
    degree: str
    field_of_study: str
    start_date: str
    end_date: str
    description: str
    coursework: list[str]
    order: int


class EducationCreate(BaseModel):
    institution: str
    degree: str
    field_of_study: str = ""
    start_date: str = ""
    end_date: str = ""
    description: str = ""
    coursework: list[str] = []
    order: int = 0


class EducationUpdate(BaseModel):
    institution: Optional[str] = None
    degree: Optional[str] = None
    field_of_study: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    description: Optional[str] = None
    coursework: Optional[list[str]] = None
    order: Optional[int] = None
