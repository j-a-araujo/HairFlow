import uuid

from sqlalchemy import Boolean, String
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base

from sqlalchemy.orm import relationship


class Employee(Base):

    __tablename__ = "employees"

    id: Mapped[uuid.UUID] = mapped_column(
        primary_key=True,
        default=uuid.uuid4,
    )

    first_name: Mapped[str] = mapped_column(String(50))

    last_name: Mapped[str] = mapped_column(String(50))

    email: Mapped[str] = mapped_column(
        String(255),
        unique=True,
    )

    phone: Mapped[str] = mapped_column(String(20))

    speciality: Mapped[str] = mapped_column(String(100))

    active: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
    )
    
    appointments = relationship(
        "Appointment",
        back_populates="employee",
    )