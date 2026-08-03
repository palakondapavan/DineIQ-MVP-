from typing import List

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status
)

from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.category import (
    CategoryCreate,
    CategoryUpdate,
    CategoryResponse
)

from app.services.category_service import (
    CategoryService
)

from app.dependencies.auth import (
    require_roles
)

router = APIRouter(
    prefix="/categories",
    tags=["Categories"]
)



# --------------------------------------------------
# Get All Categories
# ADMIN, MANAGER, WAITER, CHEF, CASHIER
# --------------------------------------------------

@router.get(
    "/",
    response_model=List[CategoryResponse]
)
def get_all_categories(
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "ADMIN",
            "MANAGER",
            "WAITER",
            "CHEF",
            "CASHIER"
        )
    )
):

    return CategoryService.get_all_categories(db)


# --------------------------------------------------
# Get Category By ID
# ADMIN, MANAGER, WAITER, CHEF, CASHIER
# --------------------------------------------------

@router.get(
    "/{category_id}",
    response_model=CategoryResponse
)
def get_category(
    category_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "ADMIN",
            "MANAGER",
            "WAITER",
            "CHEF",
            "CASHIER"
        )
    )
):

    category = CategoryService.get_category_by_id(
        db,
        category_id
    )

    if not category:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found."
        )

    return category


# --------------------------------------------------
# Create Category
# ADMIN, MANAGER
# --------------------------------------------------

@router.post(
    "/",
    response_model=CategoryResponse,
    status_code=status.HTTP_201_CREATED
)
def create_category(
    category: CategoryCreate,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "ADMIN",
            "MANAGER"
        )
    )
):

    return CategoryService.create_category(
        db,
        category
    )


# --------------------------------------------------
# Update Category
# ADMIN, MANAGER
# --------------------------------------------------

@router.put(
    "/{category_id}",
    response_model=CategoryResponse
)
def update_category(
    category_id: int,
    category: CategoryUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "ADMIN",
            "MANAGER"
        )
    )
):

    updated_category = CategoryService.update_category(
        db,
        category_id,
        category
    )

    if not updated_category:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found."
        )

    return updated_category


# --------------------------------------------------
# Delete Category
# ADMIN ONLY
# --------------------------------------------------

@router.delete(
    "/{category_id}"
)
def delete_category(
    category_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "ADMIN"
        )
    )
):

    deleted = CategoryService.delete_category(
        db,
        category_id
    )

    if not deleted:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found."
        )

    return {
        "message": "Category deleted successfully."
    }