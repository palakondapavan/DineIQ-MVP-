from sqlalchemy.orm import Session

from app.models.order import Order
from app.models.order_item import OrderItem

from app.schemas.order_status import OrderStatus
from app.schemas.order_item_status import OrderItemStatus


class OrderItemService:

    # -----------------------------------------
    # Recalculate Order Status
    # -----------------------------------------

    @staticmethod
    def recalculate_order_status(
        order: Order
    ):

        pass

    # -----------------------------------------
    # Update Item Status
    # -----------------------------------------

    @staticmethod
    def update_item_status(
        db: Session,
        order_item_id: int,
        status: OrderItemStatus
    ):

        accepted_items = [
            item for item in order.items
            if item.item_status != OrderItemStatus.REJECTED.value
        ]