from typing import List
from pydantic import BaseModel


# ----------------------------------------
# Kitchen Order
# ----------------------------------------

class KitchenOrder(BaseModel):

    order_id: int

    table_number: str

    customer_name: str | None = None

    total_amount: float

    ordered_at: str

    items: List[str]


# ----------------------------------------
# Kitchen Dashboard
# ----------------------------------------

class KitchenDashboardResponse(BaseModel):

    new_orders: int

    accepted_orders: int

    preparing_orders: int

    ready_orders: int

    new_order_list: List[KitchenOrder]

    accepted_order_list: List[KitchenOrder]

    preparing_order_list: List[KitchenOrder]

    ready_order_list: List[KitchenOrder]