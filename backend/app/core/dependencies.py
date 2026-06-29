from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt

from app.core.auth import SECRET_KEY, ALGORITHM

security = HTTPBearer()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
):

    token = credentials.credentials

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM],
        )

        return payload

    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Invalid token",
        )
def get_current_admin(
    current_user=Depends(get_current_user),
):

    if current_user["role"] != "admin":

        raise HTTPException(
            status_code=403,
            detail="Admin access required.",
        )

    return current_user