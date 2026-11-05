from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import get_current_admin
from app.schemas.skill import SkillCreate, SkillRead, SkillUpdate
from app.services.skill import SkillService

router = APIRouter(prefix="/skills", tags=["Skills"])


@router.get("", response_model=list[SkillRead], summary="List all skills")
def list_skills(
    category: str | None = Query(default=None, description="Filter by category"),
    db: Session = Depends(get_db),
):
    return SkillService(db).list(category=category)


@router.post(
    "", response_model=SkillRead, status_code=status.HTTP_201_CREATED,
    summary="Create a skill (admin)", dependencies=[Depends(get_current_admin)],
)
def create_skill(payload: SkillCreate, db: Session = Depends(get_db)):
    return SkillService(db).create(payload)


@router.put(
    "/{skill_id}", response_model=SkillRead,
    summary="Update a skill (admin)", dependencies=[Depends(get_current_admin)],
)
def update_skill(skill_id: int, payload: SkillUpdate, db: Session = Depends(get_db)):
    return SkillService(db).update(skill_id, payload)


@router.delete(
    "/{skill_id}", status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete a skill (admin)", dependencies=[Depends(get_current_admin)],
)
def delete_skill(skill_id: int, db: Session = Depends(get_db)):
    SkillService(db).delete(skill_id)
