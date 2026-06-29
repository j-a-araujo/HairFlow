import uuid

from sqlalchemy import Boolean, Float, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base

from sqlalchemy.orm import relationship

class Service(Base):
    __tablename__ = "services"

    id: Mapped[uuid.UUID] = mapped_column(
        primary_key=True,
        default=uuid.uuid4,
    )

    name: Mapped[str] = mapped_column(
        String(100),
        unique=True,
    )

    description: Mapped[str] = mapped_column(
        String(255),
    )

    duration: Mapped[int] = mapped_column(
        Integer,
    )

    price: Mapped[float] = mapped_column(
        Float,
    )

    active: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
    )
    
    appointments = relationship(
        "Appointment",
        back_populates="service",
    )
    