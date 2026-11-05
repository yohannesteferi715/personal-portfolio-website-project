from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import get_current_admin
from app.schemas.article import ArticleCreate, ArticleRead, ArticleUpdate
from app.services.article import ArticleService

router = APIRouter(prefix="/articles", tags=["Articles"])


@router.get("", response_model=list[ArticleRead], summary="List articles")
def list_articles(
    published: bool = True,
    db: Session = Depends(get_db),
):
    return ArticleService(db).list(published_only=published)


@router.get("/{slug}", response_model=ArticleRead, summary="Get article by slug")
def get_article(slug: str, db: Session = Depends(get_db)):
    return ArticleService(db).get_by_slug(slug)


@router.post(
    "", response_model=ArticleRead, status_code=status.HTTP_201_CREATED,
    summary="Create article (admin)", dependencies=[Depends(get_current_admin)],
)
def create_article(payload: ArticleCreate, db: Session = Depends(get_db)):
    return ArticleService(db).create(payload)


@router.put(
    "/{aid}", response_model=ArticleRead,
    summary="Update article (admin)", dependencies=[Depends(get_current_admin)],
)
def update_article(aid: int, payload: ArticleUpdate, db: Session = Depends(get_db)):
    return ArticleService(db).update(aid, payload)


@router.delete(
    "/{aid}", status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete article (admin)", dependencies=[Depends(get_current_admin)],
)
def delete_article(aid: int, db: Session = Depends(get_db)):
    ArticleService(db).delete(aid)
