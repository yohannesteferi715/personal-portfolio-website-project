from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import get_current_admin
from app.schemas.experience import ExperienceCreate, ExperienceRead, ExperienceUpdate
from app.services.experience import ExperienceService

router = APIRouter(prefix="/experience", tags=["Experience"])


@router.get("", response_model=list[ExperienceRead], summary="List experience entries")
def list_experience(db: Session = Depends(get_db)):
    return ExperienceService(db).list()


@router.post(
    "", response_model=ExperienceRead, status_code=status.HTTP_201_CREATED,
    summary="Create experience entry (admin)", dependencies=[Depends(get_current_admin)],
)
def create_experience(payload: ExperienceCreate, db: Session = Depends(get_db)):
    return ExperienceService(db).create(payload)


@router.put(
    "/{exp_id}", response_model=ExperienceRead,
    summary="Update experience entry (admin)", dependencies=[Depends(get_current_admin)],
)
def update_experience(exp_id: int, payload: ExperienceUpdate, db: Session = Depends(get_db)):
    return ExperienceService(db).update(exp_id, payload)


@router.delete(
    "/{exp_id}", status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete experience entry (admin)", dependencies=[Depends(get_current_admin)],
)
def delete_experience(exp_id: int, db: Session = Depends(get_db)):
    ExperienceService(db).delete(exp_id)
