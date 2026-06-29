import uuid 
from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class User(Base):
    __tablename__ ="users"
    id: Mapped[uuid.UUID] = mapped_column(
        primary_key=True,
        default=uuid.uuid4,
    )
    
    first_name: Mapped[str] = mapped_column(String(50))
    
    last_name: Mapped[str] = mapped_column(String(50))
    
    email: Mapped[str] = mapped_column(String(255), 
                                       unique=True, index=True)
    
    password_hash: Mapped[str] = mapped_column(String(255))
    
    role: Mapped[str] = mapped_column(String(20))
    
    status: Mapped[str] = mapped_column(String(20), default="pending")
    
    appointments = relationship(
        "Appointment",
        back_populates="customer",
        )
    
