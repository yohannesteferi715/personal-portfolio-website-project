from fastapi import APIRouter, Depends, File, UploadFile
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import get_current_admin
from app.schemas.profile import ProfileRead, ProfileUpdate
from app.schemas.common import MessageRead
from app.services.profile import ProfileService
from app.services.upload import image_extension, save_image

router = APIRouter(prefix="/profile", tags=["Profile"])


@router.get("", response_model=ProfileRead, summary="Get portfolio profile")
def get_profile(db: Session = Depends(get_db)):
    return ProfileService(db).get()


@router.put(
    "", response_model=ProfileRead,
    summary="Update profile fields (admin)", dependencies=[Depends(get_current_admin)],
)
def update_profile(payload: ProfileUpdate, db: Session = Depends(get_db)):
    return ProfileService(db).update(payload)


@router.post(
    "/photo", response_model=MessageRead,
    summary="Upload profile photo (admin)", dependencies=[Depends(get_current_admin)],
)
async def upload_profile_photo(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    ext = image_extension(file)
    url = save_image(file, "profile", f"profile-photo{ext}")
    ProfileService(db).update_photo_url(url)
    return {"message": url}
