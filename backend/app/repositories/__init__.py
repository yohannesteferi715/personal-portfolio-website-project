from app.repositories.about import AboutRepository
from app.repositories.article import ArticleRepository
from app.repositories.base import BaseRepository
from app.repositories.education import EducationRepository
from app.repositories.experience import ExperienceRepository
from app.repositories.profile import ProfileRepository
from app.repositories.project import ProjectRepository
from app.repositories.skill import SkillRepository
from app.repositories.testimonial import TestimonialRepository

__all__ = [
    "BaseRepository", "ProfileRepository", "SkillRepository",
    "AboutRepository", "ProjectRepository", "ExperienceRepository",
    "TestimonialRepository", "EducationRepository", "ArticleRepository",
]
