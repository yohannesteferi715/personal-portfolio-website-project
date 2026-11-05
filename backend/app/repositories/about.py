from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.about import About
from app.repositories.base import BaseRepository


class AboutRepository(BaseRepository[About]):
    def __init__(self, db: Session) -> None:
        super().__init__(About, db)

    def get_first(self) -> About | None:
        return self.db.scalars(select(About)).first()

    def get_or_create(self) -> About:
        about = self.get_first()
        if about is None:
            about = self.create(paragraphs=[], mission_quote="", highlights=[])
        return about
