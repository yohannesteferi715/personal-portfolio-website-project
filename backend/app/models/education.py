from sqlalchemy import String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base
from app.models.base import IntPKMixin, JSONList, TimestampMixin


class Education(IntPKMixin, TimestampMixin, Base):
    __tablename__ = "education"

    institution: Mapped[str] = mapped_column(String(200), nullable=False)
    degree: Mapped[str] = mapped_column(String(200), nullable=False)
    field_of_study: Mapped[str] = mapped_column(String(200), default="")
    start_date: Mapped[str] = mapped_column(String(20), default="")
    end_date: Mapped[str] = mapped_column(String(20), default="")
    description: Mapped[str] = mapped_column(Text, default="")
    # Optional list of relevant coursework
    coursework: Mapped[list] = mapped_column(JSONList, default=list)
    order: Mapped[int] = mapped_column(default=0)

    def __repr__(self) -> str:
        return f"<Education id={self.id} degree={self.degree!r}>"
