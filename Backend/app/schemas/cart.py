from typing import List
from pydantic import BaseModel


class CartItemResponse(BaseModel):

    order_item_id: int

    variant_id: int

    variant_name: str

    quantity: int

    unit_price: float

    subtotal: float

    special_instruction: str | None = None

    model_config = {
        "from_attributes": True
    }


class CartOrderResponse(BaseModel):

    order_id: int

    total_amount: float

    items: List[CartItemResponse]

    model_config = {
        "from_attributes": True
    }