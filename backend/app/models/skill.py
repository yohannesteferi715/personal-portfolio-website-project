from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base
from app.models.base import IntPKMixin, TimestampMixin


class Skill(IntPKMixin, TimestampMixin, Base):
    __tablename__ = "skills"

    name: Mapped[str] = mapped_column(String(100), nullable=False, unique=True)
    category: Mapped[str | None] = mapped_column(String(50), nullable=True)

    def __repr__(self) -> str:
        return f"<Skill id={self.id} name={self.name!r} category={self.category!r}>"
