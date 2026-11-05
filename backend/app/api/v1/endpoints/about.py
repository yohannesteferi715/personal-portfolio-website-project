from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import get_current_admin
from app.schemas.about import AboutRead, AboutUpdate
from app.services.about import AboutService

router = APIRouter(prefix="/about", tags=["About"])


@router.get("", response_model=AboutRead, summary="Get about section")
def get_about(db: Session = Depends(get_db)):
    return AboutService(db).get()


@router.put(
    "", response_model=AboutRead,
    summary="Replace about section content (admin)", dependencies=[Depends(get_current_admin)],
)
def update_about(payload: AboutUpdate, db: Session = Depends(get_db)):
    return AboutService(db).update(payload)
