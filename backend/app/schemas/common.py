from pydantic import BaseModel


class StatsRead(BaseModel):
    projects: int
    experiences: int
    testimonials: int
    skills: int


class HealthRead(BaseModel):
    status: str
    version: str


class MessageRead(BaseModel):
    message: str
