"""
File upload helper — handles validation, local fallback storage, and Supabase Cloud Storage.
All local upload paths are relative to settings.UPLOADS_DIR.
When Supabase is configured, uploads are saved both locally and pushed to Supabase Cloud Storage,
returning the public CDN URL.
"""
import logging
import mimetypes
import shutil
from pathlib import Path

import httpx
from fastapi import UploadFile

from app.core.config import settings
from app.core.exceptions import UploadError

logger = logging.getLogger(__name__)


def _validate_image(file: UploadFile) -> None:
    if file.content_type not in settings.ALLOWED_IMAGE_TYPES:
        allowed = ", ".join(sorted(settings.ALLOWED_IMAGE_TYPES))
        raise UploadError(f"Invalid file type '{file.content_type}'. Allowed: {allowed}")


def _upload_to_supabase(content: bytes, sub_dir: str, filename: str, content_type: str) -> str | None:
    """
    Attempt to upload file content to Supabase Cloud Storage bucket.
    Returns public URL on success, or None on failure (falls back to local).
    """
    if not settings.supabase_is_configured:
        return None

    base_url = settings.supabase_base_url
    bucket = settings.supabase_bucket
    key = settings.SUPABASE_SERVICE_KEY
    object_path = f"{sub_dir}/{filename}".lstrip("/")
    endpoint = f"{base_url}/storage/v1/object/{bucket}/{object_path}"

    headers = {
        "Authorization": f"Bearer {key}",
        "apikey": key,
        "Content-Type": content_type or "application/octet-stream",
        "x-upsert": "true",
    }

    try:
        with httpx.Client(timeout=15.0) as client:
            resp = client.post(endpoint, headers=headers, content=content)
            if resp.status_code in (200, 201):
                public_url = f"{base_url}/storage/v1/object/public/{bucket}/{object_path}"
                logger.info("Successfully uploaded %s to Supabase: %s", object_path, public_url)
                return public_url
            else:
                logger.warning(
                    "Supabase upload returned HTTP %s for %s: %s",
                    resp.status_code,
                    object_path,
                    resp.text,
                )
    except Exception as exc:
        logger.warning("Failed to upload to Supabase storage (%s): %s", object_path, exc)

    return None


def _delete_from_supabase(sub_dir_and_file: str) -> bool:
    """
    Delete an object from Supabase bucket given its subpath (e.g. 'cv/my_cv.pdf').
    """
    if not settings.supabase_is_configured:
        return False

    base_url = settings.supabase_base_url
    bucket = settings.supabase_bucket
    key = settings.SUPABASE_SERVICE_KEY
    endpoint = f"{base_url}/storage/v1/object/{bucket}"

    headers = {
        "Authorization": f"Bearer {key}",
        "apikey": key,
        "Content-Type": "application/json",
    }

    try:
        with httpx.Client(timeout=10.0) as client:
            resp = client.request(
                "DELETE",
                endpoint,
                headers=headers,
                json={"prefixes": [sub_dir_and_file.lstrip("/")]},
            )
            return resp.status_code in (200, 204)
    except Exception as exc:
        logger.warning("Failed to delete %s from Supabase: %s", sub_dir_and_file, exc)
        return False


def save_image(file: UploadFile, sub_dir: str, filename: str) -> str:
    """
    Validate, store locally and to Supabase Cloud Storage (if configured).
    Returns the public Supabase URL, or local URL fallback (/api/uploads/...).
    """
    _validate_image(file)

    dest_dir: Path = settings.UPLOADS_DIR / sub_dir
    dest_dir.mkdir(parents=True, exist_ok=True)

    dest: Path = dest_dir / filename
    file.file.seek(0)
    with dest.open("wb") as out:
        shutil.copyfileobj(file.file, out)

    file_bytes = dest.read_bytes()
    content_type = file.content_type or mimetypes.guess_type(filename)[0] or "image/jpeg"

    supabase_url = _upload_to_supabase(file_bytes, sub_dir, filename, content_type)
    if supabase_url:
        return supabase_url

    return f"/api/uploads/{sub_dir}/{filename}"


def save_pdf(file: UploadFile, sub_dir: str, filename: str) -> str:
    """
    Validate and store an uploaded PDF document both locally and to Supabase Cloud Storage.
    Returns the public Supabase URL or local URL fallback.
    """
    ext = Path(file.filename or "cv.pdf").suffix.lower()
    content_type = (file.content_type or "").lower()
    is_pdf = ext == ".pdf" or "pdf" in content_type or (content_type == "application/octet-stream" and ext == ".pdf")
    if not is_pdf:
        raise UploadError("Only PDF documents (.pdf) are allowed for CV uploads.")

    dest_dir: Path = settings.UPLOADS_DIR / sub_dir
    dest_dir.mkdir(parents=True, exist_ok=True)

    dest: Path = dest_dir / filename
    file.file.seek(0)
    with dest.open("wb") as out:
        shutil.copyfileobj(file.file, out)

    file_bytes = dest.read_bytes()
    pdf_content_type = "application/pdf"

    supabase_url = _upload_to_supabase(file_bytes, sub_dir, filename, pdf_content_type)
    if supabase_url:
        return supabase_url

    return f"/api/uploads/{sub_dir}/{filename}"


def delete_uploaded_file(url: str) -> bool:
    """
    Delete a physical file from Supabase and/or settings.UPLOADS_DIR given its public URL.
    """
    if not url:
        return False

    deleted = False

    # Check if this is a Supabase public URL
    if settings.supabase_base_url and url.startswith(settings.supabase_base_url):
        public_prefix = f"{settings.supabase_base_url}/storage/v1/object/public/{settings.supabase_bucket}/"
        if url.startswith(public_prefix):
            rel_path = url[len(public_prefix):]
            _delete_from_supabase(rel_path)
            local_path = settings.UPLOADS_DIR / rel_path
            if local_path.exists() and local_path.is_file():
                local_path.unlink()
            deleted = True
            return deleted

    # Check if this is a local relative URL
    if url.startswith("/api/uploads/"):
        rel_path = url.replace("/api/uploads/", "", 1)
        local_path = settings.UPLOADS_DIR / rel_path
        if local_path.exists() and local_path.is_file():
            local_path.unlink()
            deleted = True

        # Also attempt to clean from Supabase if configured
        if settings.supabase_is_configured:
            _delete_from_supabase(rel_path)

        return deleted

    return False


def image_extension(file: UploadFile) -> str:
    """Return the file extension (with dot) from the original filename."""
    return Path(file.filename or "upload.jpg").suffix or ".jpg"
