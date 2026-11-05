from sqlalchemy import Boolean, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base
from app.models.base import IntPKMixin, JSONList, TimestampMixin


class Project(IntPKMixin, TimestampMixin, Base):
    __tablename__ = "projects"

    title: Mapped[str] = mapped_column(String(200), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)

    # New fields for deeper project presentation
    problem: Mapped[str] = mapped_column(Text, default="")
    approach: Mapped[str] = mapped_column(Text, default="")
    architecture: Mapped[str] = mapped_column(Text, default="")

    image_url: Mapped[str] = mapped_column(String(500), default="")

    # List of tag strings e.g. ["Django", "React"]
    tags: Mapped[list] = mapped_column(JSONList, default=list)

    # Category for filtering: "backend", "frontend", "full-stack", "devops"
    category: Mapped[str] = mapped_column(String(50), default="full-stack")

    live_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    github_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    featured: Mapped[bool] = mapped_column(Boolean, default=True)
    order: Mapped[int] = mapped_column(Integer, default=0)

    def __repr__(self) -> str:
        return f"<Project id={self.id} title={self.title!r}>"
