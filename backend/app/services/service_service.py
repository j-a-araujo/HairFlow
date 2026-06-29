from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.service import Service
from app.schemas.service import ServiceCreate

from uuid import UUID
from fastapi import HTTPException

class ServiceService:

    @staticmethod
    def create_service(
        db: Session,
        service: ServiceCreate,
    ):

        db_service = Service(
            name=service.name,
            description=service.description,
            duration=service.duration,
            price=service.price,
        )

        db.add(db_service)
        db.commit()
        db.refresh(db_service)

        return db_service

    @staticmethod
    def list_services(db: Session):

        return db.scalars(
            select(Service)
        ).all()
        
    @staticmethod
    def get_service(db: Session, service_id: UUID):
        service = db.get(Service, service_id)
        if service is None:
            raise HTTPException(status_code=404, detail="Service not found")
        return service
    
    @staticmethod
    def update_service(
        db: Session,
        service_id: UUID,
        service: ServiceCreate,
    ):
        db_service = db.get(Service, service_id)
        if db_service is None:
            raise HTTPException(status_code=404, detail="Service not found")

        db_service.name = service.name
        db_service.description = service.description
        db_service.duration = service.duration
        db_service.price = service.price

        db.commit()
        db.refresh(db_service)

        return db_service

    @staticmethod
    def delete_service(db: Session, service_id: UUID):
        service = ServiceService.get_service(db, service_id)
        db.delete(service)
        db.commit()
    