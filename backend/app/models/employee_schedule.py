import uuid
from datetime import time

from sqlalchemy import ForeignKey, Time
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class EmployeeSchedule(Base):

    __tablename__ = "employee_schedules"

    id: Mapped[uuid.UUID] = mapped_column(
        primary_key=True,
        default=uuid.uuid4,
    )

    employee_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("employees.id")
    )

    weekday: Mapped[int]

    start_time: Mapped[time] = mapped_column(Time)

    end_time: Mapped[time] = mapped_column(Time)