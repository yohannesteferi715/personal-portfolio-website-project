from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict


BASE_DIR = Path(__file__).resolve().parent.parent.parent   # …/backend


class Settings(BaseSettings):
    # ── Application ───────────────────────────────────────────────────────────
    APP_TITLE: str = "Portfolio API"
    APP_DESCRIPTION: str = "Backend-focused full-stack software engineer portfolio."
    APP_VERSION: str = "4.0.0"
    DEBUG: bool = False

    # ── Database ──────────────────────────────────────────────────────────────
    # PostgreSQL for production, SQLite fallback for local dev
    DATABASE_URL: str = f"sqlite:///{BASE_DIR / 'portfolio.db'}"

    # ── Security / JWT ─────────────────────────────────────────────────────────
    SECRET_KEY: str = "dev-secret-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440   # 24 hours
    ADMIN_USERNAME: str = "admin"
    ADMIN_PASSWORD: str = "admin1234"

    # ── CORS ──────────────────────────────────────────────────────────────────
    CORS_ORIGINS: list[str] = [
        "http://localhost:5173",
        "http://localhost:4173",
        "http://127.0.0.1:5173",
    ]

    # ── File uploads ──────────────────────────────────────────────────────────
    UPLOADS_DIR: Path = BASE_DIR / "uploads"
    ALLOWED_IMAGE_TYPES: set[str] = {"image/jpeg", "image/png", "image/webp"}

    model_config = SettingsConfigDict(
        env_file=BASE_DIR / ".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )


settings = Settings()
