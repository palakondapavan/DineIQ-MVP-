from typing import List

from fastapi import (
    Depends,
    HTTPException,
    status
)

from jose import JWTError

from sqlalchemy.orm import Session

from app.database import get_db

from app.models.staff import Staff

from app.core.security import (
    oauth2_scheme,
    decode_access_token
)


# ------------------------------------
# Get Current Logged-in User
# ------------------------------------

def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials.",
        headers={
            "WWW-Authenticate": "Bearer"
        }
    )

    try:

        payload = decode_access_token(token)

        if payload is None:
            raise credentials_exception

        staff_id = payload.get("staff_id")

        if staff_id is None:
            raise credentials_exception

    except JWTError:
        raise credentials_exception

    staff = (
        db.query(Staff)
        .filter(
            Staff.staff_id == staff_id
        )
        .first()
    )

    if staff is None:
        raise credentials_exception

    if staff.status != "ACTIVE":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Staff account is inactive."
        )

    return staff


# ------------------------------------
# Role Based Authorization
# ------------------------------------

def require_roles(
    *roles: str
):

    def role_checker(
        current_user: Staff = Depends(
            get_current_user
        )
    ):

        if current_user.role not in roles:

            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You don't have permission to access this resource."
            )

        return current_user

    return role_checker