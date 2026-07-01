from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.user import UserCreate, UserResponse
from app.services.user_service import UserService

from fastapi import HTTPException

from app.core.auth import create_access_token
from app.schemas.user import UserLogin, Token
from uuid import UUID

    
from app.core.dependencies import get_current_admin


router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=201,
)
def register_user(
    user: UserCreate,
    db: Session = Depends(get_db),
):
    return UserService.create_user(db, user)

@router.post(
    "/login",
    response_model=Token,
)
def login(
    credentials: UserLogin,
    db: Session = Depends(get_db),
):

    user = UserService.authenticate_user(
        db,
        credentials.email,
        credentials.password,
    )

    if user is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password",
        )

    token = create_access_token(
        {
            "sub": str(user.id),
            "email": user.email,
            "role": user.role,
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "role": user.role,
        "user_id": str(user.id),
    }
    
from app.core.dependencies import get_current_user

@router.get("/me")
def me(
    current_user=Depends(get_current_user),
):

    return current_user

@router.get("/pending", response_model=list[UserResponse])
def get_pending_users(
    db: Session = Depends(get_db),
    current_admin=Depends(get_current_admin),
):
    return UserService.get_pending_users(db)

@router.put(
    "/{user_id}/approve",
    response_model=UserResponse,
)
def approve_user(
    user_id: UUID,
    db: Session = Depends(get_db),
    current_admin=Depends(get_current_admin),
):

    return UserService.approve_user(
        db,
        user_id,
    )
    
@router.get(
    "/clients",
    response_model=list[UserResponse],
)
def get_clients(
    db: Session = Depends(get_db),
):

    return UserService.list_clients(db)
