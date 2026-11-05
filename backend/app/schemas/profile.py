from typing import Optional
from pydantic import BaseModel, ConfigDict, EmailStr, HttpUrl, field_validator


class SocialLinkSchema(BaseModel):
    platform: str
    href: str


# ── Read (response) ───────────────────────────────────────────────────────────

class ProfileRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    title: str
    headline_prefix: str
    headline_highlight: str
    headline_suffix: str
    headline_italic: str
    bio: str
    years_experience: int
    profile_photo_url: str
    cv_url: Optional[str]
    available_for_work: bool
    email: Optional[str]
    phone: Optional[str]
    location: Optional[str]
    social_links: list[SocialLinkSchema]


# ── Create ────────────────────────────────────────────────────────────────────

class ProfileCreate(BaseModel):
    name: str
    title: str
    headline_prefix: str = "Crafting"
    headline_highlight: str = "digital"
    headline_suffix: str = "experiences with"
    headline_italic: str = "precision."
    bio: str
    years_experience: int = 0
    profile_photo_url: str = ""
    cv_url: Optional[str] = None
    available_for_work: bool = True
    email: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    social_links: list[SocialLinkSchema] = []


# ── Update (all fields optional for PATCH semantics) ─────────────────────────

class ProfileUpdate(BaseModel):
    name: Optional[str] = None
    title: Optional[str] = None
    headline_prefix: Optional[str] = None
    headline_highlight: Optional[str] = None
    headline_suffix: Optional[str] = None
    headline_italic: Optional[str] = None
    bio: Optional[str] = None
    years_experience: Optional[int] = None
    profile_photo_url: Optional[str] = None
    cv_url: Optional[str] = None
    available_for_work: Optional[bool] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    social_links: Optional[list[SocialLinkSchema]] = None
