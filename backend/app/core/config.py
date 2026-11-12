from pathlib import Path
import re
from typing import Any
from pydantic import field_validator
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

    @property
    def clean_database_url(self) -> str:
        """Sanitize database URL (strips quotes, bracketed passwords, and fixes postgres:// for SQLAlchemy)."""
        url = self.DATABASE_URL.strip().strip("'\"")
        url = re.sub(r":\[([^\]]+)\]@", r":\1@", url)
        if url.startswith("postgres://"):
            url = url.replace("postgres://", "postgresql://", 1)
        return url

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

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: Any) -> list[str]:
        if isinstance(v, str):
            v = v.strip()
            if v.startswith("[") and v.endswith("]"):
                import json
                try:
                    return json.loads(v)
                except Exception:
                    pass
            return [origin.strip() for origin in v.split(",") if origin.strip()]
        elif isinstance(v, (list, set, tuple)):
            return list(v)
        return v

    # ── File uploads ──────────────────────────────────────────────────────────
    UPLOADS_DIR: Path = BASE_DIR / "uploads"
    ALLOWED_IMAGE_TYPES: set[str] = {"image/jpeg", "image/png", "image/webp"}

    # ── Supabase Cloud Storage ────────────────────────────────────────────────
    SUPABASE_URL: str | None = None
    SUPABASE_SERVICE_KEY: str | None = None
    SUPABASE_BUCKET: str = "bucket_portiolio"

    @property
    def supabase_base_url(self) -> str | None:
        """Normalized Supabase project base URL (strips /rest/v1 and quotes)."""
        if not self.SUPABASE_URL:
            return None
        url = self.SUPABASE_URL.strip().strip("'\"")
        return re.sub(r"/rest/v1/?$", "", url).rstrip("/")

    @property
    def supabase_bucket(self) -> str:
        """Sanitized bucket name without extraneous quotes."""
        return (self.SUPABASE_BUCKET or "bucket_portiolio").strip().strip("'\"")

    @property
    def supabase_is_configured(self) -> bool:
        """True if Supabase URL, Service Key, and Bucket are available."""
        return bool(self.supabase_base_url and self.SUPABASE_SERVICE_KEY and self.supabase_bucket)

    model_config = SettingsConfigDict(
        env_file=(BASE_DIR / ".env", BASE_DIR.parent / ".env"),
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )


settings = Settings()
