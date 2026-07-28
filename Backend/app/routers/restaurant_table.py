from typing import List

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status
)

from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.restaurant_table import (
    RestaurantTableCreate,
    RestaurantTableUpdate,
    RestaurantTableResponse
)

from app.services.restaurant_table_service import (
    RestaurantTableService
)

from app.dependencies.auth import (
    require_roles
)

router = APIRouter(
    prefix="/tables",
    tags=["Restaurant Tables"]
)


# --------------------------------------------------
# Get All Tables
# ADMIN, MANAGER, WAITER, CASHIER
# --------------------------------------------------

@router.get(
    "/",
    response_model=List[RestaurantTableResponse]
)
def get_tables(
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "ADMIN",
            "MANAGER",
            "WAITER",
            "CASHIER"
        )
    )
):

    return RestaurantTableService.get_all_tables(db)


# --------------------------------------------------
# Get Table By ID
# ADMIN, MANAGER, WAITER, CASHIER
# --------------------------------------------------

@router.get(
    "/{table_id}",
    response_model=RestaurantTableResponse
)
def get_table(
    table_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "ADMIN",
            "MANAGER",
            "WAITER",
            "CASHIER"
        )
    )
):

    table = RestaurantTableService.get_table_by_id(
        db,
        table_id
    )

    if not table:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Table not found."
        )

    return table


# --------------------------------------------------
# Create Table
# ADMIN, MANAGER
# --------------------------------------------------

@router.post(
    "/",
    response_model=RestaurantTableResponse,
    status_code=status.HTTP_201_CREATED
)
def create_table(
    table: RestaurantTableCreate,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "ADMIN",
            "MANAGER"
        )
    )
):

    return RestaurantTableService.create_table(
        db,
        table
    )


# --------------------------------------------------
# Update Table
# ADMIN, MANAGER
# --------------------------------------------------

@router.put(
    "/{table_id}",
    response_model=RestaurantTableResponse
)
def update_table(
    table_id: int,
    table: RestaurantTableUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "ADMIN",
            "MANAGER"
        )
    )
):

    updated = RestaurantTableService.update_table(
        db,
        table_id,
        table
    )

    if not updated:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Table not found."
        )

    return updated


# --------------------------------------------------
# Delete Table
# ADMIN ONLY
# --------------------------------------------------

@router.delete(
    "/{table_id}"
)
def delete_table(
    table_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "ADMIN"
        )
    )
):

    deleted = RestaurantTableService.delete_table(
        db,
        table_id
    )

    if not deleted:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Table not found."
        )

    return {
        "message": "Table deleted successfully."
    }