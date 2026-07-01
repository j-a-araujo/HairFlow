from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class AppointmentBase(BaseModel):
    customer_id: UUID
    employee_id: UUID
    service_id: UUID
    appointment_date: datetime


class AppointmentCreate(AppointmentBase):
    pass


class AppointmentUpdate(AppointmentBase):
    status: str


class AppointmentResponse(AppointmentBase):
    id: UUID
    status: str

    model_config = ConfigDict(
        from_attributes=True
    )

class AppointmentListResponse(BaseModel):

    id: UUID

    customer_name: str

    employee_name: str

    service_name: str

    appointment_date: datetime

    status: str