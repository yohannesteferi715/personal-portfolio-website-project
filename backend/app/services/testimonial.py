from sqlalchemy.orm import Session

from app.core.exceptions import NotFoundError
from app.models.testimonial import Testimonial
from app.repositories.testimonial import TestimonialRepository
from app.schemas.testimonial import TestimonialCreate, TestimonialUpdate


class TestimonialService:
    def __init__(self, db: Session) -> None:
        self.repo = TestimonialRepository(db)

    def list(self) -> list[Testimonial]:
        return self.repo.get_all_ordered()

    def get_or_404(self, t_id: int) -> Testimonial:
        t = self.repo.get(t_id)
        if not t:
            raise NotFoundError("Testimonial", t_id)
        return t

    def create(self, payload: TestimonialCreate) -> Testimonial:
        t = self.repo.create(**payload.model_dump())
        self.repo.save()
        return t

    def update(self, t_id: int, payload: TestimonialUpdate) -> Testimonial:
        t = self.get_or_404(t_id)
        t = self.repo.update(t, **payload.model_dump(exclude_unset=True))
        self.repo.save()
        return t

    def delete(self, t_id: int) -> None:
        t = self.get_or_404(t_id)
        self.repo.delete(t)
        self.repo.save()
