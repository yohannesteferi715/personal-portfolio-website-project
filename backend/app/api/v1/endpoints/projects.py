from fastapi import APIRouter, Depends, File, Form, Query, UploadFile, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import get_current_admin
from app.schemas.project import ProjectCreate, ProjectRead, ProjectUpdate
from app.services.project import ProjectService

router = APIRouter(prefix="/projects", tags=["Projects"])


@router.get("", response_model=list[ProjectRead], summary="List projects")
def list_projects(
    featured: bool = Query(default=False, description="Return only featured projects"),
    category: str | None = Query(default=None, description="Filter by category (backend/frontend/full-stack/devops)"),
    technology: str | None = Query(default=None, description="Filter by technology"),
    db: Session = Depends(get_db),
):
    projects = ProjectService(db).list(featured_only=featured)
    if category:
        projects = [p for p in projects if p.category == category]
    if technology:
        projects = [p for p in projects if technology.lower() in [t.lower() for t in (p.tags or [])]]
    return projects


@router.get("/{project_id}", response_model=ProjectRead, summary="Get a single project")
def get_project(project_id: int, db: Session = Depends(get_db)):
    return ProjectService(db).get_or_404(project_id)


@router.post(
    "", response_model=ProjectRead, status_code=status.HTTP_201_CREATED,
    summary="Create a project (admin)", dependencies=[Depends(get_current_admin)],
)
async def create_project(
    title: str = Form(...),
    description: str = Form(...),
    problem: str = Form(""),
    approach: str = Form(""),
    architecture: str = Form(""),
    tags: str = Form(""),
    category: str = Form("full-stack"),
    live_url: str = Form(""),
    github_url: str = Form(""),
    featured: bool = Form(True),
    order: int = Form(0),
    image: UploadFile = File(None),
    db: Session = Depends(get_db),
):
    payload = ProjectCreate(
        title=title, description=description, problem=problem, approach=approach,
        architecture=architecture,
        tags=[t.strip() for t in tags.split(",") if t.strip()],
        category=category,
        live_url=live_url or None, github_url=github_url or None,
        featured=featured, order=order,
    )
    return ProjectService(db).create(payload, image)


@router.put(
    "/{project_id}", response_model=ProjectRead,
    summary="Update a project (admin)", dependencies=[Depends(get_current_admin)],
)
async def update_project(
    project_id: int,
    title: str = Form(None),
    description: str = Form(None),
    problem: str = Form(None),
    approach: str = Form(None),
    architecture: str = Form(None),
    tags: str = Form(None),
    category: str = Form(None),
    live_url: str = Form(None),
    github_url: str = Form(None),
    featured: bool = Form(None),
    order: int = Form(None),
    image: UploadFile = File(None),
    db: Session = Depends(get_db),
):
    payload = ProjectUpdate(
        title=title, description=description, problem=problem, approach=approach,
        architecture=architecture,
        tags=[t.strip() for t in tags.split(",") if t.strip()] if tags is not None else None,
        category=category,
        live_url=live_url or None, github_url=github_url or None,
        featured=featured, order=order,
    )
    return ProjectService(db).update(project_id, payload, image)


@router.delete(
    "/{project_id}", status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete a project (admin)", dependencies=[Depends(get_current_admin)],
)
def delete_project(project_id: int, db: Session = Depends(get_db)):
    ProjectService(db).delete(project_id)
