"""
Idempotent database seeder.

Run from the command line:
    python -m app.seed
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.database import SessionLocal, create_all_tables
from app.models.about import About
from app.models.article import Article
from app.models.education import Education
from app.models.experience import Experience
from app.models.profile import Profile
from app.models.project import Project
from app.models.skill import Skill
from app.models.testimonial import Testimonial
from app.seed_data import SEED_DATA


def run() -> None:
    create_all_tables()

    with SessionLocal() as db:
        _seed_profile(db, SEED_DATA["profile"])
        _seed_skills(db, SEED_DATA["skills"])
        _seed_about(db, SEED_DATA["about"])
        _seed_projects(db, SEED_DATA["projects"])
        _seed_experiences(db, SEED_DATA["experiences"])
        _seed_education(db, SEED_DATA["education"])
        _seed_testimonials(db, SEED_DATA["testimonials"])
        _seed_articles(db, SEED_DATA["articles"])
        db.commit()

    print("\n  ✓  Database seeded successfully.\n")


def _seed_profile(db: Session, p: dict) -> None:
    if db.scalars(select(Profile)).first():
        print("  –  Profile already exists, skipping.")
        return
    db.add(Profile(**p))
    print("  ✓  Profile seeded.")


def _seed_skills(db: Session, skills: list) -> None:
    if db.scalars(select(Skill)).first():
        print("  –  Skills already exist, skipping.")
        return
    for sk in skills:
        db.add(Skill(**sk))
    print(f"  ✓  {len(skills)} skills seeded.")


def _seed_about(db: Session, a: dict) -> None:
    if db.scalars(select(About)).first():
        print("  –  About already exists, skipping.")
        return
    db.add(About(**a))
    print("  ✓  About seeded.")


def _seed_projects(db: Session, projects: list) -> None:
    if db.scalars(select(Project)).first():
        print("  –  Projects already exist, skipping.")
        return
    for pr in projects:
        db.add(Project(**pr))
    print(f"  ✓  {len(projects)} projects seeded.")


def _seed_experiences(db: Session, experiences: list) -> None:
    if db.scalars(select(Experience)).first():
        print("  –  Experiences already exist, skipping.")
        return
    for ex in experiences:
        db.add(Experience(**ex))
    print(f"  ✓  {len(experiences)} experience entries seeded.")


def _seed_education(db: Session, education: list) -> None:
    if db.scalars(select(Education)).first():
        print("  –  Education already exists, skipping.")
        return
    for ed in education:
        db.add(Education(**ed))
    print(f"  ✓  {len(education)} education entries seeded.")


def _seed_testimonials(db: Session, testimonials: list) -> None:
    if db.scalars(select(Testimonial)).first():
        print("  –  Testimonials already exist, skipping.")
        return
    for t in testimonials:
        db.add(Testimonial(**t))
    print(f"  ✓  {len(testimonials)} testimonials seeded.")


def _seed_articles(db: Session, articles: list) -> None:
    if db.scalars(select(Article)).first():
        print("  –  Articles already exist, skipping.")
        return
    for a in articles:
        db.add(Article(**a))
    print(f"  ✓  {len(articles)} articles seeded.")


if __name__ == "__main__":
    run()
