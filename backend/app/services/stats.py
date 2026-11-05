from sqlalchemy.orm import Session

from app.repositories.experience import ExperienceRepository
from app.repositories.project import ProjectRepository
from app.repositories.skill import SkillRepository
from app.repositories.testimonial import TestimonialRepository
from app.schemas.common import StatsRead


class StatsService:
    def __init__(self, db: Session) -> None:
        self.db = db

    def get(self) -> StatsRead:
        return StatsRead(
            projects=ProjectRepository(self.db).count(),
            experiences=ExperienceRepository(self.db).count(),
            testimonials=TestimonialRepository(self.db).count(),
            skills=SkillRepository(self.db).count(),
        )
