from typing import Optional

from pydantic import BaseModel, Field


class OrderItemCreate(BaseModel):

    variant_id: int

    quantity: int = Field(
        ...,
        gt=0
    )

    special_instruction: Optional[str] = None


class OrderItemResponse(BaseModel):

    order_item_id: int

    variant_id: int

    # -------- Variant Details --------

    variant_name: str

    # -------- Menu Item Details --------

    item_name: str

    image_url: str | None = None

    food_type: str

    # -------- Order Details --------

    quantity: int

    price_at_order: float

    item_status: str

    special_instruction: Optional[str]

    model_config = {
        "from_attributes": True
    }