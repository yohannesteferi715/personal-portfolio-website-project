"""
File upload helper — handles validation, storage, and URL generation.
All upload paths are relative to settings.UPLOADS_DIR.
"""
import shutil
from pathlib import Path

from fastapi import UploadFile

from app.core.config import settings
from app.core.exceptions import UploadError


def _validate(file: UploadFile) -> None:
    if file.content_type not in settings.ALLOWED_IMAGE_TYPES:
        allowed = ", ".join(sorted(settings.ALLOWED_IMAGE_TYPES))
        raise UploadError(f"Invalid file type '{file.content_type}'. Allowed: {allowed}")


def save_image(file: UploadFile, sub_dir: str, filename: str) -> str:
    """
    Validate, store and return the public URL for an uploaded image.

    Args:
        file:     FastAPI UploadFile object.
        sub_dir:  Sub-directory under UPLOADS_DIR, e.g. 'projects' or 'profile'.
        filename: Target filename including extension, e.g. 'project-5.jpg'.

    Returns:
        Public URL string served by the /api/uploads mount.
    """
    _validate(file)

    dest_dir: Path = settings.UPLOADS_DIR / sub_dir
    dest_dir.mkdir(parents=True, exist_ok=True)

    dest: Path = dest_dir / filename
    file.file.seek(0)
    with dest.open("wb") as out:
        shutil.copyfileobj(file.file, out)

    return f"/api/uploads/{sub_dir}/{filename}"


def save_pdf(file: UploadFile, sub_dir: str, filename: str) -> str:
    """
    Validate and store an uploaded PDF document.

    Returns:
        Public URL string served by the /api/uploads mount.
    """
    ext = Path(file.filename or "cv.pdf").suffix.lower()
    is_pdf = ext == ".pdf" or file.content_type in ["application/pdf", "application/x-pdf"]
    if not is_pdf:
        raise UploadError("Only PDF documents (.pdf) are allowed for CV uploads.")

    dest_dir: Path = settings.UPLOADS_DIR / sub_dir
    dest_dir.mkdir(parents=True, exist_ok=True)

    dest: Path = dest_dir / filename
    file.file.seek(0)
    with dest.open("wb") as out:
        shutil.copyfileobj(file.file, out)

    return f"/api/uploads/{sub_dir}/{filename}"


def delete_uploaded_file(url: str) -> bool:
    """
    Delete a physical file from settings.UPLOADS_DIR given its public URL.
    """
    if not url or not url.startswith("/api/uploads/"):
        return False
    rel_path = url.replace("/api/uploads/", "", 1)
    file_path = settings.UPLOADS_DIR / rel_path
    if file_path.exists() and file_path.is_file():
        file_path.unlink()
        return True
    return False


def image_extension(file: UploadFile) -> str:
    """Return the file extension (with dot) from the original filename."""
    return Path(file.filename or "upload.jpg").suffix or ".jpg"
