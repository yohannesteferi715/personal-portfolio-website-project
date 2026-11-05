import re

from sqlalchemy.orm import Session

from app.core.exceptions import NotFoundError
from app.models.article import Article
from app.repositories.article import ArticleRepository
from app.schemas.article import ArticleCreate, ArticleUpdate


def _slugify(title: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-")


class ArticleService:
    def __init__(self, db: Session) -> None:
        self.repo = ArticleRepository(db)

    def list(self, published_only: bool = False) -> list[Article]:
        return self.repo.get_all_ordered(published_only=published_only)

    def get_or_404(self, aid: int) -> Article:
        a = self.repo.get(aid)
        if not a:
            raise NotFoundError("Article", aid)
        return a

    def get_by_slug(self, slug: str) -> Article:
        a = self.repo.get_by_slug(slug)
        if not a:
            raise NotFoundError("Article", slug)
        return a

    def create(self, payload: ArticleCreate) -> Article:
        data = payload.model_dump()
        if not data.get("slug"):
            data["slug"] = _slugify(data["title"])
        a = self.repo.create(**data)
        self.repo.save()
        return a

    def update(self, aid: int, payload: ArticleUpdate) -> Article:
        a = self.get_or_404(aid)
        data = payload.model_dump(exclude_unset=True)
        if "title" in data and not data.get("slug"):
            pass  # keep existing slug
        a = self.repo.update(a, **data)
        self.repo.save()
        return a

    def delete(self, aid: int) -> None:
        a = self.get_or_404(aid)
        self.repo.delete(a)
        self.repo.save()
