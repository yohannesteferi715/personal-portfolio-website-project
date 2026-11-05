from fastapi import APIRouter

from app.api.v1.endpoints import (
    about, articles, auth, education, experience, meta, profile, projects, skills, testimonials,
)

api_router = APIRouter(prefix="/api/v1")

api_router.include_router(meta.router)
api_router.include_router(auth.router)
api_router.include_router(profile.router)
api_router.include_router(skills.router)
api_router.include_router(about.router)
api_router.include_router(projects.router)
api_router.include_router(experience.router)
api_router.include_router(testimonials.router)
api_router.include_router(education.router)
api_router.include_router(articles.router)
