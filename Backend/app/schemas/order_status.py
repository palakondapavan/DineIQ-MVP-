from enum import Enum
from pydantic import BaseModel


class OrderStatus(str, Enum):

    PLACED = "PLACED"

    ACCEPTED = "ACCEPTED"

    PREPARING = "PREPARING"

    READY = "READY"

    PARTIALLY_SERVED = "PARTIALLY_SERVED"

    SERVED = "SERVED"

    COMPLETED = "COMPLETED"

    CANCELLED = "CANCELLED"


class OrderStatusUpdate(BaseModel):
    status: OrderStatus