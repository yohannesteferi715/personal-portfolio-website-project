from sqlalchemy.orm import Session

from app.models.profile import Profile
from app.repositories.profile import ProfileRepository
from app.schemas.profile import ProfileCreate, ProfileUpdate


class ProfileService:
    def __init__(self, db: Session) -> None:
        self.repo = ProfileRepository(db)

    def get(self) -> Profile:
        return self.repo.get_or_create()

    def update(self, payload: ProfileUpdate) -> Profile:
        profile = self.repo.get_or_create()
        data = payload.model_dump(exclude_unset=True)

        # social_links must be converted from list[SocialLinkSchema] → list[dict]
        if "social_links" in data and data["social_links"] is not None:
            data["social_links"] = [
                lnk if isinstance(lnk, dict) else lnk.model_dump()
                for lnk in data["social_links"]
            ]

        profile = self.repo.update(profile, **data)
        self.repo.save()
        return profile

    def update_photo_url(self, url: str) -> Profile:
        profile = self.repo.get_or_create()
        profile = self.repo.update(profile, profile_photo_url=url)
        self.repo.save()
        return profile
