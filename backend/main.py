"""
Application entry point.

Run with:
    uvicorn main:app --reload --port 8000
"""
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.api.v1.router import api_router
from app.core.config import settings
from app.core.database import create_all_tables


@asynccontextmanager
async def lifespan(_app: FastAPI):
    create_all_tables()
    _auto_seed()
    yield


def _auto_seed() -> None:
    """Run the seed once if the profiles table is empty."""
    from sqlalchemy import select
    from app.core.database import SessionLocal
    from app.models.profile import Profile

    with SessionLocal() as db:
        if db.scalars(select(Profile)).first():
            return

    from app.seed import run as seed_run
    seed_run()


app = FastAPI(
    title=settings.APP_TITLE,
    description=settings.APP_DESCRIPTION,
    version=settings.APP_VERSION,
    lifespan=lifespan,
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

settings.UPLOADS_DIR.mkdir(parents=True, exist_ok=True)
app.mount("/api/uploads", StaticFiles(directory=str(settings.UPLOADS_DIR)), name="uploads")

app.include_router(api_router)


@app.get("/", tags=["Health"])
def root():
    return {
        "status": "online",
        "service": settings.APP_TITLE,
        "version": settings.APP_VERSION,
        "docs": "/api/docs",
    }


@app.get("/health", tags=["Health"])
def health_check():
    return {"status": "healthy"}


if __name__ == "__main__":
    import os
    import uvicorn

    port = int(os.environ.get("PORT", 8001))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=settings.DEBUG)
