from sqlalchemy import Boolean, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base
from app.models.base import IntPKMixin, JSONList, TimestampMixin


class Article(IntPKMixin, TimestampMixin, Base):
    __tablename__ = "articles"

    title: Mapped[str] = mapped_column(String(300), nullable=False)
    slug: Mapped[str] = mapped_column(String(300), nullable=False, unique=True)
    excerpt: Mapped[str] = mapped_column(Text, default="")
    content: Mapped[str] = mapped_column(Text, default="")
    tags: Mapped[list] = mapped_column(JSONList, default=list)
    published: Mapped[bool] = mapped_column(Boolean, default=True)
    order: Mapped[int] = mapped_column(Integer, default=0)

    def __repr__(self) -> str:
        return f"<Article id={self.id} title={self.title!r}>"
