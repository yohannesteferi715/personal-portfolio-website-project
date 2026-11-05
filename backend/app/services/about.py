from sqlalchemy.orm import Session

from app.models.about import About
from app.repositories.about import AboutRepository
from app.schemas.about import AboutUpdate


class AboutService:
    def __init__(self, db: Session) -> None:
        self.repo = AboutRepository(db)

    def get(self) -> About:
        return self.repo.get_or_create()

    def update(self, payload: AboutUpdate) -> About:
        about = self.repo.get_or_create()
        data = payload.model_dump()

        # highlights: list[HighlightSchema] → list[dict]
        if "highlights" in data:
            data["highlights"] = [
                h if isinstance(h, dict) else h.model_dump()
                for h in data["highlights"]
            ]

        about = self.repo.update(about, **data)
        self.repo.save()
        return about
