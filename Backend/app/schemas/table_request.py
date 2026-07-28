from datetime import datetime
from pydantic import BaseModel


class TableRequestCreate(BaseModel):

    customer_name: str

    customer_mobile: str


class TableRequestResponse(BaseModel):

    request_id: int

    table_id: int

    customer_name: str

    customer_mobile: str

    waiter_id: int | None

    status: str

    requested_at: datetime

    accepted_at: datetime | None

    class Config:
        from_attributes = True