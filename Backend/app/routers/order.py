from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status
)

from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.order import (
    OrderCreate,
    OrderResponse
)

from app.schemas.order_status import (
    OrderStatusUpdate
)

from app.services.order_service import (
    OrderService
)

from app.dependencies.auth import (
    require_roles
)

router = APIRouter(
    prefix="/orders",
    tags=["Orders"]
)


# -------------------------------------------------------
# Place Order
# ADMIN, MANAGER, WAITER
# -------------------------------------------------------

# -------------------------------------------------------
# Place Order
# CUSTOMER - No staff login required
#
# OrderService validates that the table has an
# ACTIVE customer session before creating the order.
# -------------------------------------------------------

@router.post(
    "/place",
    response_model=OrderResponse,
    status_code=status.HTTP_201_CREATED
)
def place_order(
    order: OrderCreate,
    db: Session = Depends(get_db)
):

    try:

        return OrderService.place_order(
            db=db,
            order=order
        )

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )

# -------------------------------------------------------
# Get All Orders
# ADMIN, MANAGER, WAITER, CHEF
# -------------------------------------------------------

@router.get(
    "/",
    response_model=list[OrderResponse]
)
def get_all_orders(
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

    return OrderService.get_all_orders(db)


# -------------------------------------------------------
# Get Order By ID
# ADMIN, MANAGER, WAITER, CHEF
# -------------------------------------------------------

@router.get(
    "/{order_id}",
    response_model=OrderResponse
)
def get_order_by_id(
    order_id: int,
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

    order = OrderService.get_order_by_id(
        db,
        order_id
    )

    if not order:

        raise HTTPException(
            status_code=404,
            detail="Order not found."
        )

    return order


# -------------------------------------------------------
# Update Order Status
# ADMIN, MANAGER, CHEF
# -------------------------------------------------------

@router.put(
    "/{order_id}/status",
    response_model=OrderResponse
)
def update_order_status(
    order_id: int,
    request: OrderStatusUpdate,
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

        order = OrderService.update_order_status(
            db,
            order_id,
            request.status
        )

        if not order:

            raise HTTPException(
                status_code=404,
                detail="Order not found."
            )

        return order

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )
        
        
        
# -------------------------------------------------------
# Serve Order
# ADMIN, MANAGER, WAITER
# -------------------------------------------------------

@router.put(
    "/{order_id}/serve",
    response_model=OrderResponse
)
def serve_order(
    order_id: int,
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

        order = OrderService.serve_order(
            db,
            order_id
        )

        if not order:

            raise HTTPException(
                status_code=404,
                detail="Order not found."
            )

        return order

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )
        
        
        
# -------------------------------------------------------
# Serve Single Order Item
# ADMIN, MANAGER, WAITER
# -------------------------------------------------------

@router.put(
    "/items/{order_item_id}/serve",
    response_model=OrderResponse
)
def serve_order_item(
    order_item_id: int,
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

        order = OrderService.serve_order_item(
            db,
            order_item_id
        )

        if not order:

            raise HTTPException(
                status_code=404,
                detail="Order item not found."
            )

        return order

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


# -------------------------------------------------------
# Cancel Order
# ADMIN, MANAGER
# -------------------------------------------------------

@router.delete(
    "/{order_id}"
)
def cancel_order(
    order_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "ADMIN",
            "MANAGER"
        )
    )
):

    order = OrderService.cancel_order(
        db,
        order_id
    )

    if not order:

        raise HTTPException(
            status_code=404,
            detail="Order not found."
        )

    return {
        "message": "Order cancelled successfully."
    }
    
    
    
    
    
@router.put(
    "/items/{order_item_id}/serve",
    response_model=OrderResponse
)
def serve_order_item(
    order_item_id: int,
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

        order = OrderService.serve_order_item(
            db,
            order_item_id
        )

        if not order:
            raise HTTPException(
                status_code=404,
                detail="Order item not found."
            )

        return order

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )