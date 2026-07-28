from pydantic import BaseModel
from typing import List

class CustomerOrderItemCreate(BaseModel):
    variant_id: int
    quantity: int
    note: str | None = None


class CustomerOrderCreate(BaseModel):
    table_id: int
    session_id: int
    items: List[CustomerOrderItemCreate]


class CustomerOrderResponse(BaseModel):
    order_id: int
    status: str
    estimated_time: int