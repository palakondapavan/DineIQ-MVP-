from pydantic import BaseModel
from typing import List


class CustomerBillItemResponse(
    BaseModel
):
    order_item_id: int

    item_name: str

    variant_name: str | None = None

    quantity: int

    unit_price: float

    subtotal: float


class CustomerBillResponse(
    BaseModel
):
    bill_generated: bool

    bill_id: int | None = None

    session_id: int

    subtotal: float

    gst: float

    discount: float

    grand_total: float

    bill_status: str | None = None

    items: List[
        CustomerBillItemResponse
    ] = []