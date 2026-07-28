from typing import List
from pydantic import BaseModel


class LiveOrderItemResponse(BaseModel):

    order_item_id: int

    variant_name: str

    quantity: int

    special_instruction: str | None = None

    model_config = {
        "from_attributes": True
    }


class LiveOrderResponse(BaseModel):

    order_id: int

    status: str

    total_amount: float

    items: List[LiveOrderItemResponse]

    model_config = {
        "from_attributes": True
    }