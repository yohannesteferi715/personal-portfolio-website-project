"""
Shared column types and mixins used across all ORM models.
"""
import json
from typing import Any

from sqlalchemy import DateTime, Integer, Text, func
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.types import TypeDecorator

from app.core.config import settings
from app.core.database import Base  # noqa: F401 — re-exported for convenience


# ── JSON column type ──────────────────────────────────────────────────────────
# Uses native JSONB on PostgreSQL, falls back to TEXT on SQLite.

class JSONList(TypeDecorator):
    """Stores a Python list as JSON (JSONB on PG, TEXT on SQLite)."""

    impl = Text
    cache_ok = True

    def load_dialect_impl(self, dialect):
        if dialect.name == "postgresql":
            return dialect.type_descriptor(JSONB())
        return dialect.type_descriptor(Text())

    def process_bind_param(self, value: Any, dialect) -> Any:
        if value is None:
            return None if dialect.name == "postgresql" else "[]"
        return json.dumps(value, ensure_ascii=False) if dialect.name != "postgresql" else value

    def process_result_value(self, value: Any, dialect) -> list:
        if value is None:
            return []
        if isinstance(value, list):
            return value
        try:
            return json.loads(value)
        except (ValueError, TypeError):
            return []


# ── Timestamp mixin ───────────────────────────────────────────────────────────

class TimestampMixin:
    """Adds created_at / updated_at columns to any model."""

    created_at: Mapped[Any] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )
    updated_at: Mapped[Any] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )


# ── Integer primary-key mixin ─────────────────────────────────────────────────

class IntPKMixin:
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
