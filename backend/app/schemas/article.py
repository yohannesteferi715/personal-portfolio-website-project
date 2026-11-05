from typing import Optional
from pydantic import BaseModel, ConfigDict


class ArticleRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    slug: str
    excerpt: str
    content: str
    tags: list[str]
    published: bool
    order: int


class ArticleCreate(BaseModel):
    title: str
    slug: str = ""
    excerpt: str = ""
    content: str = ""
    tags: list[str] = []
    published: bool = True
    order: int = 0


class ArticleUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    tags: Optional[list[str]] = None
    published: Optional[bool] = None
    order: Optional[int] = None
