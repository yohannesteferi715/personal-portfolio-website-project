from sqlalchemy.orm import Session

from app.core.exceptions import NotFoundError
from app.models.skill import Skill
from app.repositories.skill import SkillRepository
from app.schemas.skill import SkillCreate, SkillUpdate


class SkillService:
    def __init__(self, db: Session) -> None:
        self.repo = SkillRepository(db)

    def list(self, category: str | None = None) -> list[Skill]:
        if category:
            return self.repo.get_by_category(category)
        return self.repo.get_all_ordered()

    def get_or_404(self, skill_id: int) -> Skill:
        skill = self.repo.get(skill_id)
        if not skill:
            raise NotFoundError("Skill", skill_id)
        return skill

    def create(self, payload: SkillCreate) -> Skill:
        skill = self.repo.create(**payload.model_dump())
        self.repo.save()
        return skill

    def update(self, skill_id: int, payload: SkillUpdate) -> Skill:
        skill = self.get_or_404(skill_id)
        skill = self.repo.update(skill, **payload.model_dump(exclude_unset=True))
        self.repo.save()
        return skill

    def delete(self, skill_id: int) -> None:
        skill = self.get_or_404(skill_id)
        self.repo.delete(skill)
        self.repo.save()
