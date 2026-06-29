from uuid import UUID

from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.appointment import Appointment
from app.schemas.appointment import AppointmentCreate


class AppointmentService:

    @staticmethod
    def create_appointment(
        db: Session,
        appointment: AppointmentCreate,
    ):

        db_appointment = Appointment(
            customer_id=appointment.customer_id,
            employee_id=appointment.employee_id,
            service_id=appointment.service_id,
            appointment_date=appointment.appointment_date,
        )

        db.add(db_appointment)
        db.commit()
        db.refresh(db_appointment)

        return db_appointment

    @staticmethod
    def list_appointments(
        db: Session,
    ):

        return db.scalars(
            select(Appointment)
        ).all()

    @staticmethod
    def get_appointment(
        db: Session,
        appointment_id: UUID,
    ):

        appointment = db.get(
            Appointment,
            appointment_id,
        )

        if appointment is None:
            raise HTTPException(
                status_code=404,
                detail="Appointment not found",
            )

        return appointment

    @staticmethod
    def delete_appointment(
        db: Session,
        appointment_id: UUID,
    ):

        appointment = AppointmentService.get_appointment(
            db,
            appointment_id,
        )

        db.delete(appointment)

        db.commit()