from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.testimonial import Testimonial
from app.repositories.base import BaseRepository


class TestimonialRepository(BaseRepository[Testimonial]):
    def __init__(self, db: Session) -> None:
        super().__init__(Testimonial, db)

    def get_all_ordered(self) -> list[Testimonial]:
        return list(
            self.db.scalars(
                select(Testimonial).order_by(Testimonial.order, Testimonial.id)
            ).all()
        )
