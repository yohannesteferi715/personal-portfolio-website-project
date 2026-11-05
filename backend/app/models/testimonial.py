from sqlalchemy import Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base
from app.models.base import IntPKMixin, TimestampMixin


class Testimonial(IntPKMixin, TimestampMixin, Base):
    __tablename__ = "testimonials"

    quote: Mapped[str] = mapped_column(Text, nullable=False)
    author: Mapped[str] = mapped_column(String(200), nullable=False)
    role: Mapped[str] = mapped_column(String(200), default="")
    avatar_url: Mapped[str] = mapped_column(String(500), default="")
    order: Mapped[int] = mapped_column(Integer, default=0)

    def __repr__(self) -> str:
        return f"<Testimonial id={self.id} author={self.author!r}>"
