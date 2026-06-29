from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.service import ServiceCreate, ServiceResponse
from app.services.service_service import ServiceService

from uuid import UUID
from fastapi import Response

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

@router.get(
    "/{service_id}",
    response_model=ServiceResponse,
)
def get_service(
    service_id: UUID,
    db: Session = Depends(get_db),
):
    return ServiceService.get_service(db, service_id)

@router.put(
    "/{service_id}",
    response_model=ServiceResponse,
)
def update_service(
    service_id: UUID,
    service: ServiceCreate,
    db: Session = Depends(get_db),
):
    return ServiceService.update_service(db, service_id, service)   

@router.delete(
    "/{service_id}",
    status_code=204,
)
def delete_service(
    service_id: UUID,
    db: Session = Depends(get_db),
):
    ServiceService.delete_service(db, service_id)
    return Response(status_code=204)    