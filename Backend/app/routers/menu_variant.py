from typing import List

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status
)

from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.menu_variant import (
    MenuVariantCreate,
    MenuVariantUpdate,
    MenuVariantResponse
)

from app.services.menu_variant_service import (
    MenuVariantService
)

from app.dependencies.auth import (
    require_roles
)

router = APIRouter(
    prefix="/menu-variants",
    tags=["Menu Variants"]
)


# ------------------------------------
# Get All Menu Variants
# ADMIN, MANAGER, WAITER, CHEF
# ------------------------------------

@router.get(
    "/",
    response_model=List[MenuVariantResponse]
)
def get_all_menu_variants(
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "ADMIN",
            "MANAGER",
            "WAITER",
            "CHEF"
        )
    )
):

    return MenuVariantService.get_all_menu_variants(db)


# ------------------------------------
# Get Menu Variant By ID
# ADMIN, MANAGER, WAITER, CHEF
# ------------------------------------

@router.get(
    "/{variant_id}",
    response_model=MenuVariantResponse
)
def get_menu_variant(
    variant_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "ADMIN",
            "MANAGER",
            "WAITER",
            "CHEF"
        )
    )
):

    variant = MenuVariantService.get_menu_variant_by_id(
        db,
        variant_id
    )

    if not variant:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Menu Variant not found."
        )

    return variant


# ------------------------------------
# Create Menu Variant
# ADMIN, MANAGER
# ------------------------------------

@router.post(
    "/",
    response_model=MenuVariantResponse,
    status_code=status.HTTP_201_CREATED
)
def create_menu_variant(
    variant: MenuVariantCreate,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "ADMIN",
            "MANAGER"
        )
    )
):

    try:

        return MenuVariantService.create_menu_variant(
            db,
            variant
        )

    except ValueError as e:

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


# ------------------------------------
# Update Menu Variant
# ADMIN, MANAGER
# ------------------------------------

@router.put(
    "/{variant_id}",
    response_model=MenuVariantResponse
)
def update_menu_variant(
    variant_id: int,
    variant: MenuVariantUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "ADMIN",
            "MANAGER"
        )
    )
):

    try:

        updated_variant = MenuVariantService.update_menu_variant(
            db,
            variant_id,
            variant
        )

        if not updated_variant:

            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Menu Variant not found."
            )

        return updated_variant

    except ValueError as e:

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


# ------------------------------------
# Delete Menu Variant
# ADMIN ONLY
# ------------------------------------

@router.delete(
    "/{variant_id}"
)
def delete_menu_variant(
    variant_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "ADMIN"
        )
    )
):

    deleted = MenuVariantService.delete_menu_variant(
        db,
        variant_id
    )

    if not deleted:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Menu Variant not found."
        )

    return {
        "message": "Menu Variant deleted successfully."
    }