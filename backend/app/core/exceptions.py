from fastapi import HTTPException, status


class NotFoundError(HTTPException):
    def __init__(self, resource: str, resource_id: int | str | None = None):
        detail = f"{resource} not found"
        if resource_id is not None:
            detail = f"{resource} with id={resource_id} not found"
        super().__init__(status_code=status.HTTP_404_NOT_FOUND, detail=detail)


class ValidationError(HTTPException):
    def __init__(self, detail: str):
        super().__init__(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=detail)


class UploadError(HTTPException):
    def __init__(self, detail: str):
        super().__init__(status_code=status.HTTP_400_BAD_REQUEST, detail=detail)
