from uuid import UUID

from fastapi import APIRouter, Depends, Response
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.appointment import (
    AppointmentCreate,
    AppointmentResponse,
    AppointmentUpdate,
)
from app.services.appointment_service import AppointmentService

router = APIRouter(
    prefix="/appointments",
    tags=["Appointments"],
)


@router.post(
    "",
    response_model=AppointmentResponse,
    status_code=201,
)
def create_appointment(
    appointment: AppointmentCreate,
    db: Session = Depends(get_db),
):

    return AppointmentService.create_appointment(
        db,
        appointment,
    )


@router.get(
    "",
    response_model=list[AppointmentResponse],
)
def get_appointments(
    db: Session = Depends(get_db),
):

    return AppointmentService.list_appointments(db)


@router.get(
    "/{appointment_id}",
    response_model=AppointmentResponse,
)
def get_appointment(
    appointment_id: UUID,
    db: Session = Depends(get_db),
):

    return AppointmentService.get_appointment(
        db,
        appointment_id,
    )


@router.delete(
    "/{appointment_id}",
    status_code=204,
)
def delete_appointment(
    appointment_id: UUID,
    db: Session = Depends(get_db),
):

    AppointmentService.delete_appointment(
        db,
        appointment_id,
    )

    return Response(status_code=204)

@router.put(
    "/{appointment_id}",
    response_model=AppointmentResponse,
)
def update_appointment(
    appointment_id: UUID,
    appointment: AppointmentCreate,
    db: Session = Depends(get_db),
):

    return AppointmentService.update_appointment(
        db,
        appointment_id,
        appointment,
    )
    