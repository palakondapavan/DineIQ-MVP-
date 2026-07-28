from typing import List
from pydantic import BaseModel


# ----------------------------------------
# Pending Table Request
# ----------------------------------------

class PendingTableRequest(BaseModel):

    request_id: int

    table_number: str

    customer_name: str | None = None

    customer_mobile: str | None = None

    requested_at: str


# ----------------------------------------
# Pending Service Request
# ----------------------------------------

class PendingServiceRequest(BaseModel):

    request_id: int

    table_number: str

    customer_name: str | None = None

    request_type: str

    requested_at: str


# ----------------------------------------
# Waiter Pending Item
# ----------------------------------------

class PendingOrderItem(BaseModel):

    order_item_id: int

    item_name: str

    quantity: int

    fulfillment_type: str

    item_status: str


# ----------------------------------------
# Waiter Order
# ----------------------------------------

class ReadyOrder(BaseModel):

    order_id: int

    table_number: str

    customer_name: str | None = None

    total_amount: float

    pending_items: List[PendingOrderItem]


# ----------------------------------------
# Active Table
# ----------------------------------------

class ActiveTable(BaseModel):

    session_id: int

    table_number: str

    customer_name: str | None = None

    started_at: str

    total_orders: int

    bill_generated: bool


# ----------------------------------------
# Dashboard
# ----------------------------------------

class WaiterDashboardResponse(BaseModel):

    pending_table_requests: int

    pending_service_requests: int

    ready_orders: int

    active_tables: int

    table_requests: List[PendingTableRequest]

    service_requests: List[PendingServiceRequest]

    ready_order_list: List[ReadyOrder]

    active_table_list: List[ActiveTable]