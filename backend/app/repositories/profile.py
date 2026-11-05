from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.profile import Profile
from app.repositories.base import BaseRepository


class ProfileRepository(BaseRepository[Profile]):
    def __init__(self, db: Session) -> None:
        super().__init__(Profile, db)

    def get_first(self) -> Profile | None:
        """The profile table always has at most one row."""
        return self.db.scalars(select(Profile)).first()

    def get_or_create(self) -> Profile:
        profile = self.get_first()
        if profile is None:
            profile = self.create(name="", title="", bio="")
        return profile
