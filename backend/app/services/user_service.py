from sqlalchemy import UUID, select
from sqlalchemy.orm import Session
from fastapi import HTTPException

from app.models.user import User
from app.schemas.user import UserCreate
from app.core.security import hash_password
from app.core.security import verify_password
from sqlalchemy import select 
from app.models.employee import Employee

class UserService:

    @staticmethod
    def create_user(db: Session, user: UserCreate):

        existing_user = db.scalar(
            select(User).where(User.email == user.email)
        )

        if existing_user:
            raise HTTPException(
                status_code=409,
                detail="Email already registered."
            )

        db_user = User(
            first_name=user.first_name,
            last_name=user.last_name,
            email=user.email,
            password_hash=hash_password(user.password),
            role=user.role,
        )

        db.add(db_user)
        db.commit()
        db.refresh(db_user)

        return db_user
    
    @staticmethod
    def authenticate_user(db: Session, email: str, password: str):
        user = db.scalar(
            select(User).where(User.email == email)
        )

        if user is None:
            return None
        if not verify_password(password, user.password_hash):
            return None
        if user.status == "pending":
            raise HTTPException(
                status_code=403,
                detail="User account is pending approval."
            )
        if user.status == "rejected":
            raise HTTPException(
                status_code=403,
                detail="User account has been rejected."
            )
        return user
    
    @staticmethod
    def get_pending_users(db: Session):
        return db.scalars(
            select(User).where(User.status == "pending")
        ).all()
        
    
    @staticmethod
    def approve_user(
        db: Session,
        user_id: UUID,
    ):

        user = db.scalar(
            select(User).where(User.id == user_id)
        )

        if user is None:
            raise HTTPException(
                status_code=404,
                detail="User not found",
            )

        user.status = "active"

        if user.role == "employee":

            existing_employee = db.scalar(
                select(Employee).where(
                    Employee.email == user.email
                )
            )

            if existing_employee is None:

                new_employee = Employee(
                    first_name=user.first_name,
                    last_name=user.last_name,
                    email=user.email,
                    phone="",
                    speciality="General",
                    active=True,
                )

                db.add(new_employee)

        db.commit()

        db.refresh(user)

        return user

    @staticmethod
    def list_clients(
        db: Session,
    ):

        return db.scalars(
            select(User).where(
                User.role == "client",
                User.status == "active",
            )
        ).all()