from sqlalchemy import select
from sqlalchemy.orm import Session
from fastapi import HTTPException

from app.models.user import User
from app.schemas.user import UserCreate
from app.core.security import hash_password
from app.core.security import verify_password


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
            role="client",
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

        if user is None or not verify_password(password, user.password_hash):
            return None
        return user
    