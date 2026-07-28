from typing import List

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status
)

from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.staff import (
    StaffCreate,
    StaffUpdate,
    StaffResponse
)

from app.services.staff_service import StaffService

from app.dependencies.auth import (
    require_roles
)

router = APIRouter(
    prefix="/staff",
    tags=["Staff"]
)


# ------------------------------------
# Get All Staff
# ADMIN, MANAGER
# ------------------------------------

@router.get(
    "/",
    response_model=List[StaffResponse]
)
def get_all_staff(
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "ADMIN",
            "MANAGER"
        )
    )
):

    return StaffService.get_all_staff(db)


# ------------------------------------
# Get Staff By ID
# ADMIN, MANAGER
# ------------------------------------

@router.get(
    "/{staff_id}",
    response_model=StaffResponse
)
def get_staff(
    staff_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "ADMIN",
            "MANAGER"
        )
    )
):

    staff = StaffService.get_staff_by_id(
        db,
        staff_id
    )

    if not staff:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Staff member not found."
        )

    return staff


# ------------------------------------
# Create Staff
# ADMIN ONLY
# ------------------------------------

@router.post(
    "/",
    response_model=StaffResponse,
    status_code=status.HTTP_201_CREATED
)
def create_staff(
    staff: StaffCreate,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles("ADMIN")
    )
):

    try:

        return StaffService.create_staff(
            db,
            staff
        )

    except ValueError as e:

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


# ------------------------------------
# Update Staff
# ADMIN ONLY
# ------------------------------------

@router.put(
    "/{staff_id}",
    response_model=StaffResponse
)
def update_staff(
    staff_id: int,
    staff: StaffUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles("ADMIN")
    )
):

    try:

        updated_staff = StaffService.update_staff(
            db,
            staff_id,
            staff
        )

        if not updated_staff:

            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Staff member not found."
            )

        return updated_staff

    except ValueError as e:

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


# ------------------------------------
# Delete Staff
# ADMIN ONLY
# ------------------------------------

@router.delete(
    "/{staff_id}"
)
def delete_staff(
    staff_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles("ADMIN")
    )
):

    deleted = StaffService.delete_staff(
        db,
        staff_id
    )

    if not deleted:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Staff member not found."
        )

    return {
        "message": "Staff deleted successfully."
    }