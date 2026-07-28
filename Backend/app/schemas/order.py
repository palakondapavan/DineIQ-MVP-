from typing import List, Optional

from pydantic import BaseModel

from app.schemas.order_item import (
    OrderItemCreate,
    OrderItemResponse
)


# ------------------------------------------------
# Customer Places Order
# ------------------------------------------------

class OrderCreate(BaseModel):

    table_id: int

    remarks: Optional[str] = None

    items: List[OrderItemCreate]


# ------------------------------------------------
# Order Response
# ------------------------------------------------

class OrderResponse(BaseModel):

    order_id: int

    session_id: int

    waiter_id: Optional[int]

    chef_id: Optional[int] = None

    status: str

    total_amount: float

    remarks: Optional[str]

    items: List[OrderItemResponse] = []

    model_config = {
        "from_attributes": True
    }