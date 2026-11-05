from sqlalchemy import Text
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base
from app.models.base import IntPKMixin, JSONList, TimestampMixin


class About(IntPKMixin, TimestampMixin, Base):
    """Single-row table — the About Me section content."""

    __tablename__ = "about"

    # List of paragraph strings
    paragraphs: Mapped[list] = mapped_column(JSONList, default=list)

    mission_quote: Mapped[str] = mapped_column(Text, default="")

    # List of {icon: str, title: str, description: str}
    highlights: Mapped[list] = mapped_column(JSONList, default=list)

    def __repr__(self) -> str:
        return f"<About id={self.id}>"
