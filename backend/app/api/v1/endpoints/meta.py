from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.database import get_db
from app.schemas.common import HealthRead, StatsRead
from app.services.stats import StatsService

router = APIRouter(tags=["Meta"])


@router.get("/health", response_model=HealthRead, summary="Health check")
def health():
    return HealthRead(status="ok", version=settings.APP_VERSION)


@router.get("/stats", response_model=StatsRead, summary="Content counts")
def stats(db: Session = Depends(get_db)):
    return StatsService(db).get()
