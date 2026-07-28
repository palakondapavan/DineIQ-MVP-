from pydantic import BaseModel


class UpdateOrderItem(BaseModel):
    quantity: int