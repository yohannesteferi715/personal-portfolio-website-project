from sqlalchemy import Boolean, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base
from app.models.base import IntPKMixin, JSONList, TimestampMixin


class Profile(IntPKMixin, TimestampMixin, Base):
    """Single-row table — one portfolio owner."""

    __tablename__ = "profiles"

    name: Mapped[str] = mapped_column(String(120), nullable=False)
    title: Mapped[str] = mapped_column(String(200), nullable=False)

    # Hero headline parts
    headline_prefix: Mapped[str] = mapped_column(String(80), default="Crafting")
    headline_highlight: Mapped[str] = mapped_column(String(80), default="digital")
    headline_suffix: Mapped[str] = mapped_column(String(80), default="experiences with")
    headline_italic: Mapped[str] = mapped_column(String(80), default="precision.")

    bio: Mapped[str] = mapped_column(Text, nullable=False)
    years_experience: Mapped[int] = mapped_column(Integer, default=0)
    profile_photo_url: Mapped[str] = mapped_column(String(500), default="")
    cv_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    available_for_work: Mapped[bool] = mapped_column(Boolean, default=True)

    # Contact info (used in Contact section)
    email: Mapped[str | None] = mapped_column(String(200), nullable=True)
    phone: Mapped[str | None] = mapped_column(String(50), nullable=True)
    location: Mapped[str | None] = mapped_column(String(200), nullable=True)

    # Stored as JSON array: [{platform: str, href: str}, …]
    social_links: Mapped[list] = mapped_column(JSONList, default=list)

    def __repr__(self) -> str:
        return f"<Profile id={self.id} name={self.name!r}>"
