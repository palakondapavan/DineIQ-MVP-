from typing import List

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status
)

from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.menu_item import (
    MenuItemCreate,
    MenuItemUpdate,
    MenuItemResponse
)

from app.services.menu_item_service import (
    MenuItemService
)

from app.dependencies.auth import (
    require_roles
)

router = APIRouter(
    prefix="/menu-items",
    tags=["Menu Items"]
)


# ------------------------------------
# Get All Menu Items
# ADMIN, MANAGER, WAITER, CHEF
# ------------------------------------

@router.get(
    "/",
    response_model=List[MenuItemResponse]
)
def get_all_menu_items(
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
    return MenuItemService.get_all_menu_items(db)


# ------------------------------------
# Get Menu Item By ID
# ADMIN, MANAGER, WAITER, CHEF
# ------------------------------------

@router.get(
    "/{item_id}",
    response_model=MenuItemResponse
)
def get_menu_item(
    item_id: int,
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

    item = MenuItemService.get_menu_item_by_id(
        db,
        item_id
    )

    if not item:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Menu item not found."
        )

    return item


# ------------------------------------
# Create Menu Item
# ADMIN, MANAGER
# ------------------------------------

@router.post(
    "/",
    response_model=MenuItemResponse,
    status_code=status.HTTP_201_CREATED
)
def create_menu_item(
    item: MenuItemCreate,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "ADMIN",
            "MANAGER"
        )
    )
):

    try:

        return MenuItemService.create_menu_item(
            db,
            item
        )

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


# ------------------------------------
# Update Menu Item
# ADMIN, MANAGER
# ------------------------------------

@router.put(
    "/{item_id}",
    response_model=MenuItemResponse
)
def update_menu_item(
    item_id: int,
    item: MenuItemUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "ADMIN",
            "MANAGER"
        )
    )
):

    try:

        updated = MenuItemService.update_menu_item(
            db,
            item_id,
            item
        )

        if not updated:

            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Menu item not found."
            )

        return updated

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


# ------------------------------------
# Delete Menu Item
# ADMIN ONLY
# ------------------------------------

@router.delete(
    "/{item_id}"
)
def delete_menu_item(
    item_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "ADMIN"
        )
    )
):

    deleted = MenuItemService.delete_menu_item(
        db,
        item_id
    )

    if not deleted:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Menu item not found."
        )

    return {
        "message": "Menu item deleted successfully."
    }