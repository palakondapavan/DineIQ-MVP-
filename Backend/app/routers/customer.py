from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.customer import UpdateOrderItem
from app.schemas.customer_session import CustomerSessionResponse
from app.schemas.order import OrderResponse

from app.services.customer_service import CustomerService
from app.schemas.cart import CartOrderResponse
from app.schemas.live_order import LiveOrderResponse


router = APIRouter(
    prefix="/customer",
    tags=["Customer"]
)


# ----------------------------------------
# Get Active Session By Table
# ----------------------------------------

@router.get(
    "/session/{table_id}",
    response_model=CustomerSessionResponse
)
def get_active_session(
    table_id: int,
    db: Session = Depends(get_db)
):

    session = CustomerService.get_active_session(
        db,
        table_id
    )

    if not session:

        raise HTTPException(
            status_code=404,
            detail="No active session found."
        )

    return session


# ----------------------------------------
# Get Orders of Session
# ----------------------------------------

@router.get(
    "/session/{session_id}/orders",
    response_model=List[OrderResponse]
)
def get_session_orders(
    session_id: int,
    db: Session = Depends(get_db)
):

    return CustomerService.get_session_orders(
        db,
        session_id
    )
    
# ----------------------------------------
# Customer Cart
# ----------------------------------------

@router.get(
    "/cart/{session_id}",
    response_model=list[CartOrderResponse]
)
def get_cart(
    session_id: int,
    db: Session = Depends(get_db)
):

    return CustomerService.get_cart(
        db,
        session_id
    )


# ----------------------------------------
# Update Item Quantity
# ----------------------------------------

@router.put(
    "/order-items/{item_id}",
    response_model=dict
)
def update_order_item(
    item_id: int,
    data: UpdateOrderItem,
    db: Session = Depends(get_db)
):

    try:

        CustomerService.update_order_item(
            db,
            item_id,
            data.quantity
        )

        return {
            "message": "Quantity updated successfully."
        }

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


# ----------------------------------------
# Delete Order Item
# ----------------------------------------

@router.delete(
    "/order-items/{item_id}",
    response_model=dict
)
def delete_order_item(
    item_id: int,
    db: Session = Depends(get_db)
):

    try:

        return CustomerService.delete_order_item(
            db,
            item_id
        )

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


# ----------------------------------------
# Cancel Entire Order
# ----------------------------------------

@router.delete(
    "/orders/{order_id}",
    response_model=OrderResponse
)
def cancel_order(
    order_id: int,
    db: Session = Depends(get_db)
):

    try:

        return CustomerService.cancel_order(
            db,
            order_id
        )

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )
        
# ----------------------------------------
# Live Orders
# ----------------------------------------

@router.get(
    "/orders/live/{session_id}",
    response_model=list[LiveOrderResponse]
)
def get_live_orders(
    session_id: int,
    db: Session = Depends(get_db)
):

    return CustomerService.get_live_orders(
        db,
        session_id
    )