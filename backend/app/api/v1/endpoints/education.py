from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import get_current_admin
from app.schemas.education import EducationCreate, EducationRead, EducationUpdate
from app.services.education import EducationService

router = APIRouter(prefix="/education", tags=["Education"])


@router.get("", response_model=list[EducationRead], summary="List education entries")
def list_education(db: Session = Depends(get_db)):
    return EducationService(db).list()


@router.post(
    "", response_model=EducationRead, status_code=status.HTTP_201_CREATED,
    summary="Create education entry (admin)", dependencies=[Depends(get_current_admin)],
)
def create_education(payload: EducationCreate, db: Session = Depends(get_db)):
    return EducationService(db).create(payload)


@router.put(
    "/{eid}", response_model=EducationRead,
    summary="Update education entry (admin)", dependencies=[Depends(get_current_admin)],
)
def update_education(eid: int, payload: EducationUpdate, db: Session = Depends(get_db)):
    return EducationService(db).update(eid, payload)


@router.delete(
    "/{eid}", status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete education entry (admin)", dependencies=[Depends(get_current_admin)],
)
def delete_education(eid: int, db: Session = Depends(get_db)):
    EducationService(db).delete(eid)
