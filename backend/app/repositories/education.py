from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.education import Education
from app.repositories.base import BaseRepository


class EducationRepository(BaseRepository[Education]):
    def __init__(self, db: Session) -> None:
        super().__init__(Education, db)

    def get_all_ordered(self) -> list[Education]:
        return list(self.db.scalars(select(Education).order_by(Education.order, Education.id)).all())
