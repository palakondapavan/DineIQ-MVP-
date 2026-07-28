from sqlalchemy.orm import Session

from app.models.order import Order
from app.models.order_item import OrderItem
from app.models.customer_session import CustomerSession
from app.models.menu_variant import MenuVariant

from app.schemas.order import OrderCreate
from app.schemas.order_status import OrderStatus

from app.schemas.order_item_status import OrderItemStatus

from app.schemas.fulfillment_type import FulfillmentType



class OrderService:

    # -----------------------------------------
    # Place Order
    # -----------------------------------------

    @staticmethod
    def place_order(
        db: Session,
        order: OrderCreate
    ):

        try:

            # -----------------------------
            # Order contains items?
            # -----------------------------

            if not order.items:

                raise ValueError(
                    "Order must contain at least one item."
                )

            # -----------------------------
            # Find Active Session By Table
            # -----------------------------

            session = (
                db.query(CustomerSession)
                .filter(
                    CustomerSession.table_id == order.table_id,
                    CustomerSession.status == "ACTIVE"
                )
                .first()
            )

            if not session:

                raise ValueError(
                    "No active session found for this table. Please request a waiter first."
                )

            # -----------------------------
            # Prevent duplicate variants
            # -----------------------------

            variant_ids = set()

            for item in order.items:

                if item.variant_id in variant_ids:

                    raise ValueError(
                        f"Duplicate variant ID {item.variant_id}."
                    )

                variant_ids.add(item.variant_id)



            # -----------------------------
            # Waiter Assigned To Session
            # -----------------------------

            waiter_id = session.waiter_id
            # -----------------------------
            # Create Order
            # -----------------------------

            new_order = Order(

                session_id=session.session_id,

                waiter_id=waiter_id,

                remarks=order.remarks,

                status=OrderStatus.PLACED.value
            )

            db.add(new_order)

            db.flush()

            total_amount = 0

            # -----------------------------
            # Create Order Items
            # -----------------------------

            for item in order.items:

                variant = (
                    db.query(MenuVariant)
                    .filter(
                        MenuVariant.variant_id == item.variant_id
                    )
                    .first()
                )

                if not variant:

                    raise ValueError(
                        f"Variant ID {item.variant_id} not found."
                    )

                if not variant.is_available:

                    raise ValueError(
                        f"{variant.variant_name} is unavailable."
                    )

                order_item = OrderItem(

                    order_id=new_order.order_id,

                    variant_id=item.variant_id,

                    quantity=item.quantity,

                    price_at_order=variant.price,

                    item_status=OrderItemStatus.PLACED.value,

                    special_instruction=item.special_instruction
                )

                db.add(order_item)

                total_amount += (

                    variant.price *
                    item.quantity
                )

            new_order.total_amount = total_amount

            db.commit()

            db.refresh(new_order)

            return new_order

        except Exception:

            db.rollback()

            raise

    # -----------------------------------------
    # Get All Orders
    # -----------------------------------------

    @staticmethod
    def get_all_orders(
        db: Session
    ):

        return (

            db.query(Order)

            .order_by(
                Order.order_id.desc()
            )

            .all()
        )

    # -----------------------------------------
    # Get Order By ID
    # -----------------------------------------

    @staticmethod
    def get_order_by_id(
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

    # -----------------------------------------
    # Update Order Status
    # -----------------------------------------

    @staticmethod
    def update_order_status(
        db: Session,
        order_id: int,
        status: str
    ):

        order = (

            db.query(Order)

            .filter(
                Order.order_id == order_id
            )

            .first()
        )

        if not order:

            return None

        allowed_status = [

            status.value

            for status in OrderStatus
        ]

        if status not in allowed_status:

            raise ValueError(
                "Invalid order status."
            )

        order.status = status
        for item in order.items:
            item.item_status = status

        db.commit()

        db.refresh(order)

        return order
    
    
    # -----------------------------------------
    # Serve Complete Order
    # -----------------------------------------

    @staticmethod
    def serve_order(
        db: Session,
        order_id: int
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

            # ---------------------------------
            # Complete order can only be served
            # when all active items are READY
            # ---------------------------------

            if order.status != OrderStatus.READY.value:

                raise ValueError(
                    "Only READY orders can be served completely."
                )

            # ---------------------------------
            # Ignore REJECTED / CANCELLED Items
            # ---------------------------------

            active_items = [
                item
                for item in order.items
                if item.item_status not in (
                    OrderItemStatus.REJECTED.value,
                    OrderItemStatus.CANCELLED.value,
                )
            ]

            if not active_items:

                raise ValueError(
                    "Order has no active items to serve."
                )

            # ---------------------------------
            # Safety Check
            # ---------------------------------

            for item in active_items:

                fulfillment = (
                    item.variant.menu_item.fulfillment_type
                )

                if fulfillment == FulfillmentType.KITCHEN.value:

                    if item.item_status != OrderItemStatus.READY.value:
                        raise ValueError(
                            "Kitchen items must be READY."
                        )

                else:

                    if item.item_status != OrderItemStatus.ACCEPTED.value:
                        raise ValueError(
                            "Direct items must be ACCEPTED."
                        )



            # ---------------------------------
            # Serve Only Active Items
            # ---------------------------------

            for item in active_items:

                item.item_status = (
                    OrderItemStatus.SERVED.value
                )

            order.status = OrderStatus.SERVED.value

            db.commit()

            db.refresh(order)

            return order

        except Exception:

            db.rollback()

            raise

    # -----------------------------------------
    # Cancel Order
    # -----------------------------------------

    @staticmethod
    def cancel_order(
        db: Session,
        order_id: int
    ):

        order = (

            db.query(Order)

            .filter(
                Order.order_id == order_id
            )

            .first()
        )

        if not order:

            return None

        order.status = OrderStatus.CANCELLED.value

        for item in order.items:

            item.item_status = OrderStatus.CANCELLED.value

        db.commit()

        db.refresh(order)

        return order
    
    
    
    # ----------------------------------------- 
    # Serve Single Order Item
    # -----------------------------------------

    @staticmethod
    def serve_order_item(
        db: Session,
        order_item_id: int
    ):

        try:

            # ---------------------------------
            # Find Order Item
            # ---------------------------------

            order_item = (
                db.query(OrderItem)
                .filter(
                    OrderItem.order_item_id == order_item_id
                )
                .first()
            )

            if not order_item:
                return None

            # ---------------------------------
            # Already Served
            # ---------------------------------

            if (
                order_item.item_status
                == OrderItemStatus.SERVED.value
            ):

                raise ValueError(
                    "Item already served."
                )

            # ---------------------------------
            # Only READY Items Can Be Served
            # ---------------------------------

            fulfillment = (
                order_item.variant.menu_item.fulfillment_type
            )

            if fulfillment == FulfillmentType.KITCHEN.value:

                if (
                    order_item.item_status
                    != OrderItemStatus.READY.value
                ):
                    raise ValueError(
                        "Kitchen items must be READY."
                    )

            else:

                if (
                    order_item.item_status
                    != OrderItemStatus.ACCEPTED.value
                ):
                    raise ValueError(
                        "Direct items must be ACCEPTED."
                    )



            # ---------------------------------
            # Mark Item Served
            # ---------------------------------

            order_item.item_status = (
                OrderItemStatus.SERVED.value
            )

            order = order_item.order

            # ---------------------------------
            # Get Active Order Items
            #
            # REJECTED and CANCELLED items
            # must NOT affect serving progress
            # ---------------------------------

            active_items = [
                item
                for item in order.items
                if item.item_status not in (
                    OrderItemStatus.REJECTED.value,
                    OrderItemStatus.CANCELLED.value,
                )
            ]

            if not active_items:

                raise ValueError(
                    "Order has no active items to serve."
                )

            # ---------------------------------
            # Check Whether All Active Items
            # Have Been Served
            # ---------------------------------

            all_served = all(
                item.item_status
                == OrderItemStatus.SERVED.value
                for item in active_items
            )

            if all_served:

                order.status = (
                    OrderStatus.SERVED.value
                )

            else:

                order.status = (
                    OrderStatus.PARTIALLY_SERVED.value
                )

            db.commit()

            db.refresh(order)

            return order

        except Exception:

            db.rollback()

            raise
        
    @staticmethod
    def accept_direct_item(
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

            if (
                order_item.variant.menu_item.fulfillment_type
                != FulfillmentType.DIRECT.value
            ):
                raise ValueError(
                    "Only DIRECT items can be accepted."
                )

            if (
                order_item.item_status
                != OrderItemStatus.PLACED.value
            ):
                raise ValueError(
                    "Only PLACED items can be accepted."
                )

            order_item.item_status = (
                OrderItemStatus.ACCEPTED.value
            )

            from app.services.kitchen_service import KitchenService

            KitchenService.recalculate_order_status(
                order_item.order
            )

            db.commit()

            db.refresh(order_item.order)

            return order_item.order

        except Exception:

            db.rollback()

            raise
        
        
        
        
    @staticmethod
    def reject_direct_item(
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

            if (
                order_item.variant.menu_item.fulfillment_type
                != FulfillmentType.DIRECT.value
            ):
                raise ValueError(
                    "Only DIRECT items can be rejected."
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

            from app.services.kitchen_service import KitchenService

            KitchenService.recalculate_order_status(
                order_item.order
            )

            db.commit()

            db.refresh(order_item.order)

            return {
                "success": True,
                "order_id": order_item.order.order_id,
                "status": order_item.order.status
            }

        except Exception:

            db.rollback()

            raise