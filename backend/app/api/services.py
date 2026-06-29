from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.service import ServiceCreate, ServiceResponse
from app.services.service_service import ServiceService

router = APIRouter(
    prefix="/services",
    tags=["Services"],
)


@router.post(
    "",
    response_model=ServiceResponse,
    status_code=201,
)
def create_service(
    service: ServiceCreate,
    db: Session = Depends(get_db),
):
    return ServiceService.create_service(db, service)


@router.get(
    "",
    response_model=list[ServiceResponse],
)
def get_services(
    db: Session = Depends(get_db),
):
    return ServiceService.list_services(db)