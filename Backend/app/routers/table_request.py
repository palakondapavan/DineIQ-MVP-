from typing import List

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status
)

from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.table_request import (
    TableRequestCreate,
    TableRequestResponse
)

from app.services.table_request_service import (
    TableRequestService
)

from app.dependencies.auth import (
    require_roles
)

router = APIRouter(
    prefix="/table-requests",
    tags=["Table Requests"]
)


# ----------------------------------------
# Customer Requests Table
# ----------------------------------------

@router.post(
    "/tables/{table_id}/request",
    response_model=TableRequestResponse,
    status_code=status.HTTP_201_CREATED
)
def create_request(
    table_id: int,
    request: TableRequestCreate,
    db: Session = Depends(get_db)
):

    try:

        return TableRequestService.create_request(
            db=db,
            table_id=table_id,
            customer_name=request.customer_name,
            customer_mobile=request.customer_mobile
        )

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


# ----------------------------------------
# Waiter Gets Pending Requests
# ----------------------------------------

@router.get(
    "/pending",
    response_model=List[TableRequestResponse]
)
def get_pending_requests(
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "WAITER",
            "MANAGER",
            "ADMIN"
        )
    )
):

    return TableRequestService.get_pending_requests(
        db
    )


# ----------------------------------------
# Waiter Accept Request
# ----------------------------------------

@router.put(
    "/{request_id}/accept",
    response_model=TableRequestResponse
)
def accept_request(
    request_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles("WAITER")
    )
):

    try:

        return TableRequestService.accept_request(
            db,
            request_id,
            current_user.staff_id
        )

    except ValueError as e:

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


# ----------------------------------------
# Waiter Reject Request
# ----------------------------------------

@router.put(
    "/{request_id}/reject",
    response_model=TableRequestResponse
)
def reject_request(
    request_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles("WAITER")
    )
):

    try:

        return TableRequestService.reject_request(
            db,
            request_id
        )

    except ValueError as e:

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@router.get(
    "/{request_id}",
    response_model=TableRequestResponse
)
def get_request(
    request_id: int,
    db: Session = Depends(get_db)
):
    request = TableRequestService.get_request_by_id(
        db,
        request_id
    )

    if not request:
        raise HTTPException(
            status_code=404,
            detail="Request not found"
        )

    return request