from collections.abc import Generator

from sqlalchemy import create_engine, event
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker

from app.core.config import settings


# ── Engine ────────────────────────────────────────────────────────────────────

_is_sqlite = settings.DATABASE_URL.startswith("sqlite")

engine_kwargs: dict = {"echo": settings.DEBUG}

if _is_sqlite:
    engine_kwargs["connect_args"] = {"check_same_thread": False}

engine = create_engine(settings.DATABASE_URL, **engine_kwargs)

# SQLite-specific WAL mode + foreign keys
if _is_sqlite:

    @event.listens_for(engine, "connect")
    def _set_sqlite_pragma(dbapi_conn, _connection_record):
        cursor = dbapi_conn.cursor()
        cursor.execute("PRAGMA journal_mode=WAL")
        cursor.execute("PRAGMA foreign_keys=ON")
        cursor.close()


# ── Session factory ───────────────────────────────────────────────────────────

SessionLocal = sessionmaker(
    bind=engine,
    autocommit=False,
    autoflush=False,
    expire_on_commit=False,
)


# ── Declarative base ──────────────────────────────────────────────────────────

class Base(DeclarativeBase):
    """All ORM models inherit from this class."""
    pass


# ── Dependency ────────────────────────────────────────────────────────────────

def get_db() -> Generator[Session, None, None]:
    """FastAPI dependency that yields a database session per request."""
    db = SessionLocal()
    try:
        yield db
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()


# ── Table creation (dev fallback — production uses Alembic) ───────────────────

def create_all_tables() -> None:
    from app.models import about, article, education, experience, profile, project, skill, testimonial  # noqa: F401

    Base.metadata.create_all(bind=engine)
