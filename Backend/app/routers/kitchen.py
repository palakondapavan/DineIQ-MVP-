from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status
)

from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.kitchen import (
    KitchenOrderResponse
)

from app.services.kitchen_service import (
    KitchenService
)

from app.dependencies.auth import (
    require_roles
)


router = APIRouter(
    prefix="/kitchen",
    tags=["Kitchen"]
)


# =======================================================
# GET ALL KITCHEN ORDERS
# =======================================================

@router.get(
    "/orders",
    response_model=list[KitchenOrderResponse]
)
def get_all_orders(
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "ADMIN",
            "MANAGER",
            "CHEF"
        )
    )
):

    return KitchenService.get_all_orders(db)


# =======================================================
# GET KITCHEN ORDER BY ID
# =======================================================

@router.get(
    "/orders/{order_id}",
    response_model=KitchenOrderResponse
)
def get_order(
    order_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "ADMIN",
            "MANAGER",
            "CHEF"
        )
    )
):

    order = KitchenService.get_order(
        db,
        order_id
    )

    if not order:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found."
        )

    return order


# =======================================================
# ACCEPT COMPLETE ORDER
# =======================================================

@router.put(
    "/orders/{order_id}/accept",
    response_model=KitchenOrderResponse
)
def accept_order(
    order_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "ADMIN",
            "MANAGER",
            "CHEF"
        )
    )
):

    try:

        order = KitchenService.accept_order(
            db,
            order_id,
            current_user
        )

        if not order:

            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Order not found."
            )

        return order

    except ValueError as e:

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


# =======================================================
# ACCEPT SINGLE ORDER ITEM
# =======================================================

@router.put(
    "/order-items/{order_item_id}/accept",
    response_model=KitchenOrderResponse
)
def accept_order_item(
    order_item_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "ADMIN",
            "MANAGER",
            "CHEF"
        )
    )
):

    try:

        order = KitchenService.accept_item(
            db,
            order_item_id,
            current_user
        )

        if not order:

            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Order item not found."
            )

        return order

    except ValueError as e:

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


# =======================================================
# REJECT SINGLE ORDER ITEM
# =======================================================

@router.put(
    "/order-items/{order_item_id}/reject",
    response_model=KitchenOrderResponse
)
def reject_order_item(
    order_item_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "ADMIN",
            "MANAGER",
            "CHEF"
        )
    )
):

    try:

        order = KitchenService.reject_item(
            db,
            order_item_id
        )

        if not order:

            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Order item not found."
            )

        return order

    except ValueError as e:

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


# =======================================================
# START PREPARING SINGLE ORDER ITEM
# =======================================================

@router.put(
    "/order-items/{order_item_id}/prepare",
    response_model=KitchenOrderResponse
)
def prepare_order_item(
    order_item_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "ADMIN",
            "MANAGER",
            "CHEF"
        )
    )
):

    try:

        order = KitchenService.prepare_item(
            db,
            order_item_id
        )

        if not order:

            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Order item not found."
            )

        return order

    except ValueError as e:

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


# =======================================================
# MARK SINGLE ORDER ITEM READY
# =======================================================

@router.put(
    "/order-items/{order_item_id}/ready",
    response_model=KitchenOrderResponse
)
def ready_order_item(
    order_item_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "ADMIN",
            "MANAGER",
            "CHEF"
        )
    )
):

    try:

        order = KitchenService.ready_item(
            db,
            order_item_id
        )

        if not order:

            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Order item not found."
            )

        return order

    except ValueError as e:

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )