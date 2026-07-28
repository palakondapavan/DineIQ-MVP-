from enum import Enum

from pydantic import BaseModel


class OrderItemStatus(str, Enum):

    PLACED = "PLACED"

    ACCEPTED = "ACCEPTED"

    PREPARING = "PREPARING"

    READY = "READY"

    SERVED = "SERVED"

    REJECTED = "REJECTED"

    CANCELLED = "CANCELLED"


class OrderItemStatusUpdate(BaseModel):

    status: OrderItemStatus