from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.project import Project
from app.repositories.base import BaseRepository


class ProjectRepository(BaseRepository[Project]):
    def __init__(self, db: Session) -> None:
        super().__init__(Project, db)

    def get_all_ordered(self, featured_only: bool = False) -> list[Project]:
        stmt = select(Project).order_by(Project.order, Project.id)
        if featured_only:
            stmt = stmt.where(Project.featured.is_(True))
        return list(self.db.scalars(stmt).all())
