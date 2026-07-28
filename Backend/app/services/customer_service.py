from sqlalchemy.orm import Session

from app.models.customer_session import CustomerSession
from app.models.order import Order
from app.models.order_item import OrderItem

from app.schemas.order_status import OrderStatus


class CustomerService:

    # ----------------------------------------
    # Get Active Session
    # ----------------------------------------

    @staticmethod
    def get_active_session(
        db: Session,
        table_id: int
    ):

        return (
            db.query(CustomerSession)
            .filter(
                CustomerSession.table_id == table_id,
                CustomerSession.status == "ACTIVE"
            )
            .first()
        )

    # ----------------------------------------
    # Get Orders of Session
    # ----------------------------------------

    @staticmethod
    def get_session_orders(
        db: Session,
        session_id: int
    ):

        return (
            db.query(Order)
            .filter(
                Order.session_id == session_id
            )
            .order_by(Order.order_id)
            .all()
        )
        
        
    # ----------------------------------------
    # Get Editable Cart
    # ----------------------------------------

    @staticmethod
    def get_cart(
        db: Session,
        session_id: int
    ):

        orders = (
            db.query(Order)
            .filter(
                Order.session_id == session_id,
                Order.status.in_([
                    OrderStatus.PLACED.value,
                    OrderStatus.ACCEPTED.value
                ])
            )
            .all()
        )

        cart = []

        for order in orders:

            items = []

            for item in order.items:

                items.append({

                    "order_item_id": item.order_item_id,

                    "variant_id": item.variant_id,

                    "variant_name": item.variant.variant_name,

                    "quantity": item.quantity,

                    "unit_price": float(item.price_at_order),

                    "subtotal": (
                        float(item.price_at_order)
                        * item.quantity
                    ),

                    "special_instruction":
                        item.special_instruction

                })

            cart.append({

                "order_id": order.order_id,

                "total_amount":
                    float(order.total_amount),

                "items": items

            })

        return cart

    # ----------------------------------------
    # Update Quantity
    # ----------------------------------------

    @staticmethod
    def update_order_item(
        db: Session,
        item_id: int,
        quantity: int
    ):

        item = (
            db.query(OrderItem)
            .filter(
                OrderItem.order_item_id == item_id
            )
            .first()
        )

        if not item:
            raise ValueError(
                "Order item not found."
            )

        order = item.order

        if order.status not in [
            OrderStatus.PLACED.value,
            OrderStatus.ACCEPTED.value
        ]:
            raise ValueError(
                "Order can no longer be modified."
            )

        if quantity <= 0:
            raise ValueError(
                "Quantity must be greater than zero."
            )

        item.quantity = quantity

        CustomerService.recalculate_order_total(
            db,
            order.order_id
        )

        db.commit()

        db.refresh(item)

        return item

    # ----------------------------------------
    # Delete Order Item
    # ----------------------------------------

    @staticmethod
    def delete_order_item(
        db: Session,
        item_id: int
    ):

        item = (
            db.query(OrderItem)
            .filter(
                OrderItem.order_item_id == item_id
            )
            .first()
        )

        if not item:
            raise ValueError(
                "Order item not found."
            )

        order = item.order

        if order.status not in [
            OrderStatus.PLACED.value,
            OrderStatus.ACCEPTED.value
        ]:
            raise ValueError(
                "Order can no longer be modified."
            )

        db.delete(item)

        db.flush()

        remaining_items = (
            db.query(OrderItem)
            .filter(
                OrderItem.order_id == order.order_id
            )
            .count()
        )

        if remaining_items == 0:

            order.status = OrderStatus.CANCELLED.value

            order.total_amount = 0

        else:

            CustomerService.recalculate_order_total(
                db,
                order.order_id
            )

        db.commit()

        return {
            "message": "Item removed successfully."
        }

    # ----------------------------------------
    # Cancel Entire Order
    # ----------------------------------------

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
            raise ValueError(
                "Order not found."
            )

        if order.status not in [
            OrderStatus.PLACED.value,
            OrderStatus.ACCEPTED.value
        ]:
            raise ValueError(
                "Order cannot be cancelled."
            )

        order.status = OrderStatus.CANCELLED.value

        db.commit()

        db.refresh(order)

        return order

    # ----------------------------------------
    # Recalculate Total
    # ----------------------------------------

    @staticmethod
    def recalculate_order_total(
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

        total = 0

        for item in order.items:

            total += (
                float(item.price_at_order)
                * item.quantity
            )

        order.total_amount = total

        db.flush()
        
        
    # ----------------------------------------
    # Live Orders
    # ----------------------------------------

    @staticmethod
    def get_live_orders(
        db: Session,
        session_id: int
    ):

        orders = (
            db.query(Order)
            .filter(
                Order.session_id == session_id,
                Order.status.in_([
                    OrderStatus.PREPARING.value,
                    OrderStatus.READY.value,
                    OrderStatus.SERVED.value
                ])
            )
            .order_by(Order.order_id.desc())
            .all()
        )

        response = []

        for order in orders:

            items = []

            for item in order.items:

                items.append({

                    "order_item_id": item.order_item_id,

                    "variant_name": item.variant.variant_name,

                    "quantity": item.quantity,

                    "special_instruction": item.special_instruction

                })

            response.append({

                "order_id": order.order_id,

                "status": order.status,

                "total_amount": float(order.total_amount),

                "items": items

            })

        return response