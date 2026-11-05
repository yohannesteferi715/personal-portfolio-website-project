from sqlalchemy.orm import Session

from app.core.exceptions import NotFoundError
from app.models.education import Education
from app.repositories.education import EducationRepository
from app.schemas.education import EducationCreate, EducationUpdate


class EducationService:
    def __init__(self, db: Session) -> None:
        self.repo = EducationRepository(db)

    def list(self) -> list[Education]:
        return self.repo.get_all_ordered()

    def get_or_404(self, eid: int) -> Education:
        e = self.repo.get(eid)
        if not e:
            raise NotFoundError("Education", eid)
        return e

    def create(self, payload: EducationCreate) -> Education:
        e = self.repo.create(**payload.model_dump())
        self.repo.save()
        return e

    def update(self, eid: int, payload: EducationUpdate) -> Education:
        e = self.get_or_404(eid)
        e = self.repo.update(e, **payload.model_dump(exclude_unset=True))
        self.repo.save()
        return e

    def delete(self, eid: int) -> None:
        e = self.get_or_404(eid)
        self.repo.delete(e)
        self.repo.save()
