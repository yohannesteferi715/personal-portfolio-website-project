from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.skill import Skill
from app.repositories.base import BaseRepository


class SkillRepository(BaseRepository[Skill]):
    def __init__(self, db: Session) -> None:
        super().__init__(Skill, db)

    def get_all_ordered(self) -> list[Skill]:
        return list(self.db.scalars(select(Skill).order_by(Skill.id)).all())

    def get_by_category(self, category: str) -> list[Skill]:
        return list(
            self.db.scalars(
                select(Skill)
                .where(Skill.category == category)
                .order_by(Skill.id)
            ).all()
        )

    def get_by_name(self, name: str) -> Skill | None:
        return self.db.scalars(
            select(Skill).where(Skill.name == name)
        ).first()
