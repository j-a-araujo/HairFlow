from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user import UserCreate
from app.core.security import hash_password


class UserService:

    @staticmethod
    def create_user(db: Session, user: UserCreate):

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