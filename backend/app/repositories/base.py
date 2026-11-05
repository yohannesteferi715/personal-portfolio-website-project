"""
Generic base repository.
Every domain repository inherits from this and gets basic CRUD for free.
"""
from typing import Any, Generic, Type, TypeVar

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.core.database import Base

ModelT = TypeVar("ModelT", bound=Base)


class BaseRepository(Generic[ModelT]):
    def __init__(self, model: Type[ModelT], db: Session) -> None:
        self.model = model
        self.db = db

    # ── Reads ──────────────────────────────────────────────────────────────────

    def get(self, pk: int) -> ModelT | None:
        return self.db.get(self.model, pk)

    def get_all(self) -> list[ModelT]:
        return list(self.db.scalars(select(self.model)).all())

    def count(self) -> int:
        return self.db.scalar(select(func.count()).select_from(self.model)) or 0

    # ── Writes ─────────────────────────────────────────────────────────────────

    def create(self, **kwargs: Any) -> ModelT:
        instance = self.model(**kwargs)
        self.db.add(instance)
        self.db.flush()          # get the PK without committing yet
        self.db.refresh(instance)
        return instance

    def update(self, instance: ModelT, **kwargs: Any) -> ModelT:
        for key, value in kwargs.items():
            if hasattr(instance, key):
                setattr(instance, key, value)
        self.db.add(instance)
        self.db.flush()
        self.db.refresh(instance)
        return instance

    def delete(self, instance: ModelT) -> None:
        self.db.delete(instance)
        self.db.flush()

    def save(self) -> None:
        """Commit the current unit of work."""
        self.db.commit()
