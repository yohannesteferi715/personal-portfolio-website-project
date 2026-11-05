from fastapi import UploadFile
from sqlalchemy.orm import Session

from app.core.exceptions import NotFoundError
from app.models.project import Project
from app.repositories.project import ProjectRepository
from app.schemas.project import ProjectCreate, ProjectUpdate
from app.services.upload import image_extension, save_image


class ProjectService:
    def __init__(self, db: Session) -> None:
        self.repo = ProjectRepository(db)

    def list(self, featured_only: bool = False) -> list[Project]:
        return self.repo.get_all_ordered(featured_only=featured_only)

    def get_or_404(self, project_id: int) -> Project:
        project = self.repo.get(project_id)
        if not project:
            raise NotFoundError("Project", project_id)
        return project

    def create(self, payload: ProjectCreate, image: UploadFile | None) -> Project:
        data = payload.model_dump()
        if image and image.filename:
            project = self.repo.create(**data)
            self.repo.save()
            ext = image_extension(image)
            url = save_image(image, "projects", f"project-{project.id}{ext}")
            project = self.repo.update(project, image_url=url)
            self.repo.save()
        else:
            project = self.repo.create(**data)
            self.repo.save()
        return project

    def update(self, project_id: int, payload: ProjectUpdate, image: UploadFile | None) -> Project:
        project = self.get_or_404(project_id)
        data = payload.model_dump(exclude_unset=True)
        if image and image.filename:
            ext = image_extension(image)
            url = save_image(image, "projects", f"project-{project_id}{ext}")
            data["image_url"] = url
        project = self.repo.update(project, **data)
        self.repo.save()
        return project

    def delete(self, project_id: int) -> None:
        project = self.get_or_404(project_id)
        self.repo.delete(project)
        self.repo.save()
