from sqlalchemy import Boolean, Date, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base
from app.models.base import IntPKMixin, JSONList, TimestampMixin


class Experience(IntPKMixin, TimestampMixin, Base):
    __tablename__ = "experiences"

    period: Mapped[str] = mapped_column(String(100), nullable=False)
    role: Mapped[str] = mapped_column(String(200), nullable=False)
    company: Mapped[str] = mapped_column(String(200), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)

    # New fields for richer experience presentation
    employment_type: Mapped[str] = mapped_column(String(50), default="Full-time")
    start_date: Mapped[str | None] = mapped_column(String(20), nullable=True)
    end_date: Mapped[str | None] = mapped_column(String(20), nullable=True)

    # List of technology strings e.g. ["Python", "Django"]
    technologies: Mapped[list] = mapped_column(JSONList, default=list)

    current: Mapped[bool] = mapped_column(Boolean, default=False)
    order: Mapped[int] = mapped_column(Integer, default=0)

    def __repr__(self) -> str:
        return f"<Experience id={self.id} role={self.role!r} company={self.company!r}>"
