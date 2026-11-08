from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.database import get_db
from app.core.security import create_access_token, get_current_admin, hash_password, verify_password
from app.models.admin_user import AdminUser
from app.schemas.auth import (
    ChangePasswordRequest,
    ChangePasswordResponse,
    LoginRequest,
    TokenResponse,
)

router = APIRouter(prefix="/auth", tags=["Auth"])


def _get_or_init_admin(db: Session, username: str) -> AdminUser | None:
    admin = db.scalars(select(AdminUser).where(AdminUser.username == username)).first()
    if not admin and username == settings.ADMIN_USERNAME:
        # Auto-initialize with default settings password on first access
        admin = AdminUser(
            username=settings.ADMIN_USERNAME,
            hashed_password=hash_password(settings.ADMIN_PASSWORD),
        )
        db.add(admin)
        db.commit()
        db.refresh(admin)
    return admin


@router.post("/login", response_model=TokenResponse, summary="Admin login")
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    admin = _get_or_init_admin(db, payload.username)
    if not admin or not verify_password(payload.password, admin.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password.",
        )
    token = create_access_token(admin.username)
    return TokenResponse(access_token=token)


@router.post(
    "/change-password",
    response_model=ChangePasswordResponse,
    summary="Change admin password (admin only)",
)
def change_password(
    payload: ChangePasswordRequest,
    current_username: str = Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    if payload.new_password != payload.confirm_password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="New password and confirmation do not match.",
        )

    if len(payload.new_password) < 6:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="New password must be at least 6 characters long.",
        )

    admin = _get_or_init_admin(db, current_username)
    if not admin:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Admin user not found.",
        )

    if not verify_password(payload.current_password, admin.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Current password is incorrect.",
        )

    # Hash and persist new password
    admin.hashed_password = hash_password(payload.new_password)
    db.commit()

    # Issue a fresh JWT access token
    new_token = create_access_token(admin.username)

    return ChangePasswordResponse(
        message="Password changed successfully.",
        access_token=new_token,
    )


@router.get("/me", summary="Get authenticated admin status")
def get_me(current_username: str = Depends(get_current_admin)):
    return {"username": current_username, "authenticated": True}

