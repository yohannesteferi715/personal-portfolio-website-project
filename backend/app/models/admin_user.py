from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base
from app.models.base import IntPKMixin, TimestampMixin


class AdminUser(IntPKMixin, TimestampMixin, Base):
    """Admin credentials stored with bcrypt hashing."""

    __tablename__ = "admin_users"

    username: Mapped[str] = mapped_column(String(80), unique=True, index=True, nullable=False)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)

    def __repr__(self) -> str:
        return f"<AdminUser id={self.id} username={self.username!r}>"
