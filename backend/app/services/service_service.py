from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.service import Service
from app.schemas.service import ServiceCreate


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
        