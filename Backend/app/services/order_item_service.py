from sqlalchemy.orm import Session

from app.models.order import Order
from app.models.order_item import OrderItem

from app.schemas.order_status import OrderStatus
from app.schemas.order_item_status import OrderItemStatus

from app.services.customer_bill_service import (
    CustomerBillService,
)


class OrderItemService:

    # -----------------------------------------
    # Recalculate Order Status
    # -----------------------------------------

    @staticmethod
    def recalculate_order_status(
        order: Order,
    ):

        # Ignore cancelled/rejected items
        active_items = [
            item
            for item in order.items
            if item.item_status not in [
                OrderItemStatus.CANCELLED.value,
                OrderItemStatus.REJECTED.value,
            ]
        ]

        # ---------------------------------
        # No active items remaining
        # ---------------------------------

        if not active_items:

            if all(
                item.item_status
                == OrderItemStatus.CANCELLED.value
                for item in order.items
            ):
                order.status = (
                    OrderStatus.CANCELLED.value
                )

            elif all(
                item.item_status
                == OrderItemStatus.REJECTED.value
                for item in order.items
            ):
                order.status = (
                    OrderStatus.REJECTED.value
                )

            else:
                order.status = (
                    OrderStatus.CANCELLED.value
                )

            return

        statuses = {
            item.item_status
            for item in active_items
        }

        # ---------------------------------
        # All Served
        # ---------------------------------

        if statuses == {
            OrderItemStatus.SERVED.value
        }:

            order.status = (
                OrderStatus.SERVED.value
            )

            return

        # ---------------------------------
        # All Ready / Served
        # ---------------------------------

        if all(
            status in [
                OrderItemStatus.READY.value,
                OrderItemStatus.SERVED.value,
            ]
            for status in statuses
        ):

            if (
                OrderStatus.PARTIALLY_SERVED.value
                in [
                    status.value
                    for status in OrderStatus
                ]
                and OrderItemStatus.SERVED.value
                in statuses
                and OrderItemStatus.READY.value
                in statuses
            ):
                order.status = (
                    OrderStatus.PARTIALLY_SERVED.value
                )
            else:
                order.status = (
                    OrderStatus.READY.value
                )

            return

        # ---------------------------------
        # Preparing
        # ---------------------------------

        if (
            OrderItemStatus.PREPARING.value
            in statuses
        ):

            order.status = (
                OrderStatus.PREPARING.value
            )

            return

        # ---------------------------------
        # Accepted
        # ---------------------------------

        if (
            OrderItemStatus.ACCEPTED.value
            in statuses
        ):

            order.status = (
                OrderStatus.ACCEPTED.value
            )

            return

        # ---------------------------------
        # Placed
        # ---------------------------------

        order.status = (
            OrderStatus.PLACED.value
        )