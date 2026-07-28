from enum import Enum
from pydantic import BaseModel


class PaymentStatus(str, Enum):
    PENDING = "PENDING"
    SUCCESS = "SUCCESS"
    FAILED = "FAILED"


class PaymentMethod(str, Enum):
    CASH = "CASH"
    CARD = "CARD"
    UPI = "UPI"


class PaymentStatusUpdate(BaseModel):
    payment_status: PaymentStatus