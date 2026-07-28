from typing import Optional

from pydantic import BaseModel

from app.schemas.payment_status import (
    PaymentMethod,
    PaymentStatus
)


class PaymentCreate(BaseModel):

    bill_id: int

    payment_method: PaymentMethod


class PaymentResponse(BaseModel):

    payment_id: int

    bill_id: int

    payment_method: PaymentMethod

    amount: float

    payment_status: PaymentStatus

    transaction_reference: Optional[str]

    model_config = {
        "from_attributes": True
    }