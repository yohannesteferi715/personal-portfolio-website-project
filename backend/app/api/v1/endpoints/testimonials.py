from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import get_current_admin
from app.schemas.testimonial import TestimonialCreate, TestimonialRead, TestimonialUpdate
from app.services.testimonial import TestimonialService

router = APIRouter(prefix="/testimonials", tags=["Testimonials"])


@router.get("", response_model=list[TestimonialRead], summary="List testimonials")
def list_testimonials(db: Session = Depends(get_db)):
    return TestimonialService(db).list()


@router.post(
    "", response_model=TestimonialRead, status_code=status.HTTP_201_CREATED,
    summary="Create a testimonial (admin)", dependencies=[Depends(get_current_admin)],
)
def create_testimonial(payload: TestimonialCreate, db: Session = Depends(get_db)):
    return TestimonialService(db).create(payload)


@router.put(
    "/{t_id}", response_model=TestimonialRead,
    summary="Update a testimonial (admin)", dependencies=[Depends(get_current_admin)],
)
def update_testimonial(t_id: int, payload: TestimonialUpdate, db: Session = Depends(get_db)):
    return TestimonialService(db).update(t_id, payload)


@router.delete(
    "/{t_id}", status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete a testimonial (admin)", dependencies=[Depends(get_current_admin)],
)
def delete_testimonial(t_id: int, db: Session = Depends(get_db)):
    TestimonialService(db).delete(t_id)
