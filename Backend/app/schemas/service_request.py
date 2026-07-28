from enum import Enum

from pydantic import BaseModel


class ServiceRequestType(str, Enum):
    WAITER = "WAITER"
    WATER = "WATER"
    BILL = "BILL"
    ASSISTANCE = "ASSISTANCE"


class ServiceRequestStatus(str, Enum):
    PENDING = "PENDING"
    COMPLETED = "COMPLETED"


# ----------------------------------------
# Create Request
# ----------------------------------------

class ServiceRequestCreate(BaseModel):

    session_id: int

    request_type: ServiceRequestType


# ----------------------------------------
# Response
# ----------------------------------------

class ServiceRequestResponse(BaseModel):

    request_id: int

    session_id: int

    waiter_id: int | None = None

    request_type: ServiceRequestType

    status: ServiceRequestStatus

    model_config = {
        "from_attributes": True
    }
    
# ----------------------------------------
# Waiter Dashboard Response
# ----------------------------------------

class ServiceRequestDashboardResponse(BaseModel):

    request_id: int

    table_number: str

    customer_name: str | None = None

    customer_mobile: str | None = None

    request_type: ServiceRequestType

    status: ServiceRequestStatus

    requested_at: str

    model_config = {
        "from_attributes": True
    }