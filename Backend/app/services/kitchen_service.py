from sqlalchemy.orm import Session

from app.models.order import Order
from app.models.order_item import OrderItem

from app.schemas.order_status import OrderStatus
from app.schemas.order_item_status import OrderItemStatus

from app.schemas.fulfillment_type import FulfillmentType

class KitchenService:

    # =====================================================
    # GET ALL KITCHEN ORDERS
    # =====================================================

    @staticmethod
    def get_all_orders(
        db: Session
    ):

        orders = (
            db.query(Order)
            .filter(
                Order.status.in_(
                    [
                        OrderStatus.PLACED.value,
                        OrderStatus.ACCEPTED.value,
                        OrderStatus.PREPARING.value,
                        OrderStatus.READY.value,
                    ]
                )
            )
            .order_by(
                Order.order_id.asc()
            )
            .all()
        )

        kitchen_orders = []

        for order in orders:

            has_pending_kitchen_work = any(
                (
                    item.variant.menu_item.fulfillment_type
                    == FulfillmentType.KITCHEN.value
                )
                and
                (
                    item.item_status in (
                        OrderItemStatus.PLACED.value,
                        OrderItemStatus.ACCEPTED.value,
                        OrderItemStatus.PREPARING.value,
                    )
                )
                for item in order.items
            )

            if has_pending_kitchen_work:
                kitchen_orders.append(order)

        return kitchen_orders

    # =====================================================
    # GET KITCHEN ORDER BY ID
    # =====================================================

    @staticmethod
    def get_order(
        db: Session,
        order_id: int
    ):

        return (
            db.query(Order)
            .filter(
                Order.order_id == order_id
            )
            .first()
        )


    # =====================================================
    # Validate Kitchen Item
    # =====================================================

    @staticmethod
    def validate_kitchen_item(
        order_item: OrderItem
    ):

        if (
            order_item.variant.menu_item.fulfillment_type
            != FulfillmentType.KITCHEN.value
        ):

            raise ValueError(
                "This item is Direct Service."
            )

    # =====================================================
    # ACCEPT COMPLETE ORDER
    # =====================================================

    @staticmethod
    def accept_order(
        db: Session,
        order_id: int,
        current_user
    ):

        try:

            order = (
                db.query(Order)
                .filter(
                    Order.order_id == order_id
                )
                .first()
            )

            if not order:
                return None
            
            has_kitchen_items = any(
                item.variant.menu_item.fulfillment_type
                == FulfillmentType.KITCHEN.value
                for item in order.items
            )

            if not has_kitchen_items:

                raise ValueError(
                    "This order has no kitchen items."
                )

            if order.status != OrderStatus.PLACED.value:

                raise ValueError(
                    "Only PLACED orders can be accepted."
                )

            # ---------------------------------------------
            # Accept complete order
            # ---------------------------------------------

            order.status = OrderStatus.ACCEPTED.value

            order.chef_id = current_user.staff_id

            # ---------------------------------------------
            # Accept all PLACED items
            # ---------------------------------------------

            for item in order.items:

                # Only Kitchen Items
                if (
                    item.variant.menu_item.fulfillment_type
                    != FulfillmentType.KITCHEN.value
                ):
                    continue

                if item.item_status == OrderItemStatus.PLACED.value:

                    item.item_status = (
                        OrderItemStatus.ACCEPTED.value
                    )

            db.commit()

            db.refresh(order)

            return order

        except Exception:

            db.rollback()

            raise
        


    # =====================================================
    # ACCEPT SINGLE ORDER ITEM
    # =====================================================

    @staticmethod
    def accept_item(
        db: Session,
        order_item_id: int,
        current_user
    ):  

        try:

            order_item = (
                db.query(OrderItem)
                .filter(
                    OrderItem.order_item_id == order_item_id
                )
                .first()
            )

            if not order_item:
                return None
            
            KitchenService.validate_kitchen_item(
                order_item
            )

            if (
                order_item.item_status
                != OrderItemStatus.PLACED.value
            ):

                raise ValueError(
                    "Only PLACED items can be accepted."
                )

            order = order_item.order

            # Assign chef if order has no chef yet
            if order.chef_id is None:

                order.chef_id = current_user.staff_id

            order_item.item_status = (
                OrderItemStatus.ACCEPTED.value
            )

            KitchenService.recalculate_order_status(
                order
            )

            db.commit()

            db.refresh(order)

            return order

        except Exception:

            db.rollback()

            raise

    # =====================================================
    # REJECT SINGLE ORDER ITEM
    # =====================================================

    @staticmethod
    def reject_item(
        db: Session,
        order_item_id: int
    ):

        try:

            order_item = (
                db.query(OrderItem)
                .filter(
                    OrderItem.order_item_id == order_item_id
                )
                .first()
            )

            if not order_item:
                return None
            
            KitchenService.validate_kitchen_item(
                order_item
            )

            if (
                order_item.item_status
                != OrderItemStatus.PLACED.value
            ):

                raise ValueError(
                    "Only PLACED items can be rejected."
                )

            order_item.item_status = (
                OrderItemStatus.REJECTED.value
            )

            order = order_item.order

            KitchenService.recalculate_order_status(
                order
            )

            db.commit()

            db.refresh(order)

            return order

        except Exception:

            db.rollback()

            raise

    # =====================================================
    # START PREPARING SINGLE ITEM
    # =====================================================

    @staticmethod
    def prepare_item(
        db: Session,
        order_item_id: int
    ):

        try:

            order_item = (
                db.query(OrderItem)
                .filter(
                    OrderItem.order_item_id == order_item_id
                )
                .first()
            )

            if not order_item:
                return None
            
            KitchenService.validate_kitchen_item(
                order_item
            )

            # ---------------------------------------------
            # Only ACCEPTED item can start preparing
            # ---------------------------------------------

            if (
                order_item.item_status
                != OrderItemStatus.ACCEPTED.value
            ):

                raise ValueError(
                    "Only ACCEPTED items can start preparing."
                )

            order_item.item_status = (
                OrderItemStatus.PREPARING.value
            )

            order = order_item.order

            KitchenService.recalculate_order_status(
                order
            )

            db.commit()

            db.refresh(order)

            return order

        except Exception:

            db.rollback()

            raise

    # =====================================================
    # MARK SINGLE ITEM READY
    # =====================================================

    @staticmethod
    def ready_item(
        db: Session,
        order_item_id: int
    ):

        try:

            order_item = (
                db.query(OrderItem)
                .filter(
                    OrderItem.order_item_id == order_item_id
                )
                .first()
            )

            if not order_item:
                return None
            
            KitchenService.validate_kitchen_item(
                order_item
            )

            # ---------------------------------------------
            # Only PREPARING item can become READY
            # ---------------------------------------------

            if (
                order_item.item_status
                != OrderItemStatus.PREPARING.value
            ):

                raise ValueError(
                    "Only PREPARING items can be marked READY."
                )

            order_item.item_status = (
                OrderItemStatus.READY.value
            )

            order = order_item.order

            KitchenService.recalculate_order_status(
                order
            )

            db.commit()

            db.refresh(order)

            return order

        except Exception:

            db.rollback()

            raise

    # =====================================================
    # RECALCULATE PARENT ORDER STATUS
    # =====================================================

    @staticmethod
    def recalculate_order_status(
        order: Order
    ):

        # ---------------------------------------------
        # Ignore rejected / cancelled items
        # ---------------------------------------------

        active_items = [
            item
            for item in order.items
            if item.item_status not in (
                OrderItemStatus.REJECTED.value,
                OrderItemStatus.CANCELLED.value,
            )
        ]

        if not active_items:

            order.status = OrderStatus.CANCELLED.value
            return

        # =================================================
        # ALL SERVED
        # =================================================

        if all(
            item.item_status == OrderItemStatus.SERVED.value
            for item in active_items
        ):

            order.status = OrderStatus.SERVED.value
            return

        # =================================================
        # PARTIALLY SERVED
        # =================================================

        if any(
            item.item_status == OrderItemStatus.SERVED.value
            for item in active_items
        ):

            order.status = OrderStatus.PARTIALLY_SERVED.value
            return

        # =================================================
        # READY
        #
        # Kitchen Items -> READY
        # Direct Items  -> ACCEPTED
        # =================================================

        all_ready = True

        for item in active_items:

            fulfillment = (
                item.variant.menu_item.fulfillment_type
            )

            if fulfillment == FulfillmentType.KITCHEN.value:

                if item.item_status != OrderItemStatus.READY.value:

                    all_ready = False
                    break

            else:

                if item.item_status != OrderItemStatus.ACCEPTED.value:

                    all_ready = False
                    break

        if all_ready:

            order.status = OrderStatus.READY.value
            return

        # =================================================
        # PREPARING
        #
        # Any kitchen item preparing OR ready
        # =================================================

        if any(
            (
                item.variant.menu_item.fulfillment_type
                == FulfillmentType.KITCHEN.value
            )
            and
            (
                item.item_status in (
                    OrderItemStatus.PREPARING.value,
                    OrderItemStatus.READY.value,
                )
            )
            for item in active_items
        ):

            order.status = OrderStatus.PREPARING.value
            return

        # =================================================
        # ACCEPTED
        #
        # Kitchen -> ACCEPTED
        # Direct  -> ACCEPTED
        # =================================================

        if all(
            item.item_status == OrderItemStatus.ACCEPTED.value
            for item in active_items
        ):

            order.status = OrderStatus.ACCEPTED.value
            return

        # =================================================
        # Otherwise PLACED
        # =================================================

        order.status = OrderStatus.PLACED.value