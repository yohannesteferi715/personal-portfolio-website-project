from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.experience import Experience
from app.repositories.base import BaseRepository


class ExperienceRepository(BaseRepository[Experience]):
    def __init__(self, db: Session) -> None:
        super().__init__(Experience, db)

    def get_all_ordered(self) -> list[Experience]:
        return list(
            self.db.scalars(
                select(Experience).order_by(Experience.order, Experience.id)
            ).all()
        )
