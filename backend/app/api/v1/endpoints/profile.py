from fastapi import APIRouter, Depends, File, UploadFile
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import get_current_admin
from app.schemas.profile import ProfileRead, ProfileUpdate
from app.schemas.common import MessageRead
from app.services.profile import ProfileService
from app.services.upload import delete_uploaded_file, image_extension, save_image, save_pdf

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


@router.post(
    "/cv", response_model=MessageRead,
    summary="Upload CV PDF document (admin)", dependencies=[Depends(get_current_admin)],
)
async def upload_cv(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    profile_service = ProfileService(db)
    current_profile = profile_service.get()
    if current_profile.cv_url:
        delete_uploaded_file(current_profile.cv_url)

    url = save_pdf(file, "cv", "Yohannes_Teferi_CV.pdf")
    profile_service.update_cv_url(url)
    return {"message": url}


@router.delete(
    "/cv", response_model=MessageRead,
    summary="Delete uploaded CV PDF document (admin)", dependencies=[Depends(get_current_admin)],
)
def delete_cv(db: Session = Depends(get_db)):
    profile_service = ProfileService(db)
    current_profile = profile_service.get()
    if current_profile.cv_url:
        delete_uploaded_file(current_profile.cv_url)
        profile_service.update_cv_url(None)
    return {"message": "CV document deleted successfully."}
