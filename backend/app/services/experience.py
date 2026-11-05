from sqlalchemy.orm import Session

from app.core.exceptions import NotFoundError
from app.models.experience import Experience
from app.repositories.experience import ExperienceRepository
from app.schemas.experience import ExperienceCreate, ExperienceUpdate


class ExperienceService:
    def __init__(self, db: Session) -> None:
        self.repo = ExperienceRepository(db)

    def list(self) -> list[Experience]:
        return self.repo.get_all_ordered()

    def get_or_404(self, exp_id: int) -> Experience:
        exp = self.repo.get(exp_id)
        if not exp:
            raise NotFoundError("Experience", exp_id)
        return exp

    def create(self, payload: ExperienceCreate) -> Experience:
        exp = self.repo.create(**payload.model_dump())
        self.repo.save()
        return exp

    def update(self, exp_id: int, payload: ExperienceUpdate) -> Experience:
        exp = self.get_or_404(exp_id)
        exp = self.repo.update(exp, **payload.model_dump(exclude_unset=True))
        self.repo.save()
        return exp

    def delete(self, exp_id: int) -> None:
        exp = self.get_or_404(exp_id)
        self.repo.delete(exp)
        self.repo.save()
