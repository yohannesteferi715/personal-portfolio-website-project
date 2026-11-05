from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.article import Article
from app.repositories.base import BaseRepository


class ArticleRepository(BaseRepository[Article]):
    def __init__(self, db: Session) -> None:
        super().__init__(Article, db)

    def get_all_ordered(self, published_only: bool = False) -> list[Article]:
        stmt = select(Article).order_by(Article.order, Article.id)
        if published_only:
            stmt = stmt.where(Article.published.is_(True))
        return list(self.db.scalars(stmt).all())

    def get_by_slug(self, slug: str) -> Article | None:
        return self.db.scalars(select(Article).where(Article.slug == slug)).first()
