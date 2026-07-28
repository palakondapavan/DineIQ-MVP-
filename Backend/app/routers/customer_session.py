from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status
)

from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.customer_session import (
    CustomerSessionStart,
    CustomerSessionResponse
)

from app.services.customer_session_service import (
    CustomerSessionService
)

from app.dependencies.auth import (
    require_roles
)

router = APIRouter(
    prefix="/sessions",
    tags=["Customer Sessions"]
)


# --------------------------------------------------
# Start Customer Session
# ADMIN, MANAGER, WAITER
# --------------------------------------------------

@router.post(
    "/start",
    response_model=CustomerSessionResponse,
    status_code=status.HTTP_201_CREATED
)
def start_session(
    session: CustomerSessionStart,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "ADMIN",
            "MANAGER",
            "WAITER"
        )
    )
):

    try:

        return CustomerSessionService.start_session(
            db,
            session
        )

    except ValueError as e:

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


# --------------------------------------------------
# Get Session By ID
# ADMIN, MANAGER, WAITER
# --------------------------------------------------

@router.get(
    "/{session_id}",
    response_model=CustomerSessionResponse
)
def get_session(
    session_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "ADMIN",
            "MANAGER",
            "WAITER"
        )
    )
):

    session = CustomerSessionService.get_session(
        db,
        session_id
    )

    if not session:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Session not found."
        )

    return session


# --------------------------------------------------
# Close Session
# ADMIN, MANAGER, WAITER
# --------------------------------------------------

@router.put(
    "/{session_id}/close",
    response_model=CustomerSessionResponse
)
def close_session(
    session_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "ADMIN",
            "MANAGER",
            "WAITER"
        )
    )
):

    try:

        return CustomerSessionService.close_session(
            db,
            session_id
        )

    except ValueError as e:

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )