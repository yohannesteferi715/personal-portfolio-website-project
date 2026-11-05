from fastapi import APIRouter, Depends, HTTPException, status

from app.core.config import settings
from app.core.security import create_access_token, verify_password
from app.schemas.auth import LoginRequest, TokenResponse

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/login", response_model=TokenResponse, summary="Admin login")
def login(payload: LoginRequest):
    if payload.username != settings.ADMIN_USERNAME or payload.password != settings.ADMIN_PASSWORD:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )
    token = create_access_token(payload.username)
    return TokenResponse(access_token=token)
