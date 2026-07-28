from pydantic import BaseModel


class KitchenOrderResponse(BaseModel):

    order_id: int
    session_id: int

    waiter_id: int | None = None
    chef_id: int | None = None

    status: str
    total_amount: float
    remarks: str | None = None

    class Config:
        from_attributes = True