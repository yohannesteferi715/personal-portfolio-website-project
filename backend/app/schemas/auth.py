from pydantic import BaseModel, Field


class LoginRequest(BaseModel):
    username: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class ChangePasswordRequest(BaseModel):
    current_password: str = Field(..., min_length=1, description="Current password")
    new_password: str = Field(..., min_length=6, description="New password (minimum 6 chars)")
    confirm_password: str = Field(..., min_length=6, description="Confirmation of new password")


class ChangePasswordResponse(BaseModel):
    message: str
    access_token: str | None = None

