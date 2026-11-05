from typing import Optional
from pydantic import BaseModel, ConfigDict


class ProjectRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    description: str
    problem: str = ""
    approach: str = ""
    architecture: str = ""
    image_url: str
    tags: list[str]
    category: str = "full-stack"
    live_url: Optional[str]
    github_url: Optional[str]
    featured: bool
    order: int


class ProjectCreate(BaseModel):
    title: str
    description: str
    problem: str = ""
    approach: str = ""
    architecture: str = ""
    image_url: str = ""
    tags: list[str] = []
    category: str = "full-stack"
    live_url: Optional[str] = None
    github_url: Optional[str] = None
    featured: bool = True
    order: int = 0


class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    problem: Optional[str] = None
    approach: Optional[str] = None
    architecture: Optional[str] = None
    image_url: Optional[str] = None
    tags: Optional[list[str]] = None
    category: Optional[str] = None
    live_url: Optional[str] = None
    github_url: Optional[str] = None
    featured: Optional[bool] = None
    order: Optional[int] = None
