from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class AppointmentCreate(BaseModel):

    customer_id: UUID

    employee_id: UUID

    service_id: UUID

    appointment_date: datetime


class AppointmentResponse(BaseModel):

    id: UUID

    customer_id: UUID

    employee_id: UUID

    service_id: UUID

    appointment_date: datetime

    status: str

    model_config = ConfigDict(
        from_attributes=True
    )