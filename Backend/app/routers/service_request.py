from typing import List

from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies.auth import get_current_user
from app.enums import StaffRole

from app.schemas.service_request import (
    ServiceRequestCreate,
    ServiceRequestResponse,
    ServiceRequestDashboardResponse
)

from app.services.service_request_service import (
    ServiceRequestService
)

router = APIRouter(
    prefix="/service-requests",
    tags=["Service Requests"]
)


# ----------------------------------------
# Customer Creates Request
# ----------------------------------------

@router.post(
    "/",
    response_model=ServiceRequestResponse
)
def create_request(
    request: ServiceRequestCreate,
    db: Session = Depends(get_db)
):

    try:

        return ServiceRequestService.create_request(
            db,
            request
        )

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


# ----------------------------------------
# Waiter/Admin View Pending Requests
# ----------------------------------------

@router.get(
    "/",
    response_model=List[ServiceRequestDashboardResponse]
)
def get_requests(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    # Only Waiter or Admin
    if current_user.role not in (
        StaffRole.WAITER,
        StaffRole.ADMIN
    ):

        raise HTTPException(
            status_code=403,
            detail="Only waiters or admins can view service requests."
        )

    return ServiceRequestService.get_pending_requests(
        db
    )


# ----------------------------------------
# Waiter Completes Request
# ----------------------------------------

@router.put(
    "/{request_id}/complete",
    response_model=ServiceRequestResponse
)
def complete_request(
    request_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    # Only Waiter
    if current_user.role != StaffRole.WAITER:

        raise HTTPException(
            status_code=403,
            detail="Only waiters can complete service requests."
        )

    try:

        return ServiceRequestService.complete_request(
            db,
            request_id,
            current_user.staff_id
        )

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )