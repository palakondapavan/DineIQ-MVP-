from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies.auth import get_current_user

from app.enums import StaffRole

from app.schemas.waiter_dashboard import (
    WaiterDashboardResponse
)

from app.services.waiter_dashboard_service import (
    WaiterDashboardService
)

from app.services.order_service import (
    OrderService
)


router = APIRouter(
    prefix="/waiter",
    tags=["Waiter Dashboard"]
)


# =====================================================
# Role Validation
# =====================================================

def validate_waiter(current_user):

    if current_user.role not in (
        StaffRole.WAITER,
        StaffRole.ADMIN
    ):

        raise HTTPException(
            status_code=403,
            detail="Access denied."
        )


# =====================================================
# Waiter Dashboard
# =====================================================

@router.get(
    "/dashboard",
    response_model=WaiterDashboardResponse
)
def waiter_dashboard(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    validate_waiter(current_user)

    return WaiterDashboardService.get_dashboard(
        db
    )


# =====================================================
# Accept Direct Item
# =====================================================

@router.put("/order-items/{order_item_id}/accept")
def accept_direct_item(
    order_item_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    validate_waiter(current_user)

    try:

        order = OrderService.accept_direct_item(
            db,
            order_item_id
        )

        if not order:

            raise HTTPException(
                status_code=404,
                detail="Order item not found."
            )

        return {
            "success": True,
            "order_id": order.order_id,
            "status": order.status
        }

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


# =====================================================
# Reject Direct Item
# =====================================================

@router.put("/order-items/{order_item_id}/reject")
def reject_direct_item(
    order_item_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    validate_waiter(current_user)

    try:

        order = OrderService.reject_direct_item(
            db,
            order_item_id
        )

        if not order:

            raise HTTPException(
                status_code=404,
                detail="Order item not found."
            )

        return {
            "success": True,
            "order_id": order.order_id,
            "status": order.status
        }

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


# =====================================================
# Serve Single Order Item
# =====================================================

@router.put("/order-items/{order_item_id}/serve")
def serve_order_item(
    order_item_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    validate_waiter(current_user)

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

        return {
            "success": True,
            "order_id": order.order_id,
            "status": order.status
        }

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


# =====================================================
# Serve Complete Order
# =====================================================

@router.put("/orders/{order_id}/serve")
def serve_complete_order(
    order_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    validate_waiter(current_user)

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

        return {
            "success": True,
            "order_id": order.order_id,
            "status": order.status
        }

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )