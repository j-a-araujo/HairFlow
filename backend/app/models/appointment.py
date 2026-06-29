import uuid
from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class Appointment(Base):

    __tablename__ = "appointments"

    id: Mapped[uuid.UUID] = mapped_column(
        primary_key=True,
        default=uuid.uuid4,
    )

    customer_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("users.id")
    )

    employee_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("employees.id")
    )

    service_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("services.id")
    )

    appointment_date: Mapped[datetime] = mapped_column(
        DateTime
    )

    status: Mapped[str] = mapped_column(
        String(20),
        default="pending",
    )

    customer = relationship(
        "User",
        back_populates="appointments",
    )

    employee = relationship(
        "Employee",
        back_populates="appointments",
    )

    service = relationship(
        "Service",
        back_populates="appointments",
    )