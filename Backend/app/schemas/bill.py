from pydantic import BaseModel

from app.schemas.bill_status import BillStatus


class BillGenerate(BaseModel):

    session_id: int

    discount: float = 0


class BillResponse(BaseModel):

    bill_id: int

    session_id: int

    subtotal: float

    gst: float

    discount: float

    grand_total: float

    bill_status: BillStatus

    model_config = {
        "from_attributes": True
    }