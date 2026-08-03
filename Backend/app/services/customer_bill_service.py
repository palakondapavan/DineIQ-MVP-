from sqlalchemy.orm import (
    Session,
    joinedload,
)

from app.models.bill import Bill
from app.models.order import Order
from app.models.order_item import OrderItem

from app.schemas.bill_status import BillStatus
from app.schemas.order_item_status import (
    OrderItemStatus,
)

from datetime import datetime


from app.models.customer_session import CustomerSession
from app.models.restaurant_table import RestaurantTable

from app.schemas.bill_status import BillStatus
from app.schemas.order_item_status import OrderItemStatus
from app.schemas.customer_session_status import CustomerSessionStatus
from app.schemas.restaurant_table import TableStatus

from app.models.menu_variant import MenuVariant



class CustomerBillService:

    GST_PERCENTAGE = 5

    # ----------------------------------------
    # Get / Generate Bill
    # ----------------------------------------

    @staticmethod
    def get_or_generate_bill(
        db: Session,
        session_id: int,
    ):

        served_items = (
            db.query(OrderItem)
            .join(Order)
            .options(
                joinedload(
                    OrderItem.variant
                ).joinedload(
                    MenuVariant.menu_item
                )
            )
            .filter(
                Order.session_id == session_id,
                OrderItem.item_status
                == OrderItemStatus.SERVED.value,
            )
            .all()
        )

        if not served_items:

            return {
                "bill_generated": False,
                "session_id": session_id,
                "subtotal": 0,
                "gst": 0,
                "discount": 0,
                "grand_total": 0,
                "bill_status": None,
                "items": [],
            }

        subtotal = sum(
            float(item.price_at_order)
            * item.quantity
            for item in served_items
        )

        gst = (
            subtotal
            * CustomerBillService.GST_PERCENTAGE
        ) / 100

        bill = (
            db.query(Bill)
            .filter(
                Bill.session_id == session_id
            )
            .order_by(
                Bill.bill_id.desc()
            )
            .first()
        )

        # -----------------------------
        # Existing Bill
        # -----------------------------

        if bill:

            # Already Paid
            if (
                bill.bill_status
                == BillStatus.PAID.value
            ):

                items = []

                for item in served_items:

                    items.append({

                        "order_item_id":
                            item.order_item_id,

                        "item_name":
                            item.variant.menu_item.item_name,

                        "variant_name":
                            item.variant.variant_name,

                        "quantity":
                            item.quantity,

                        "unit_price":
                            float(
                                item.price_at_order
                            ),

                        "subtotal":
                            float(
                                item.price_at_order
                            )
                            * item.quantity,

                    })

                return {

                    "bill_generated": True,

                    "bill_id":
                        bill.bill_id,

                    "session_id":
                        session_id,

                    "subtotal":
                        float(
                            bill.subtotal
                        ),

                    "gst":
                        float(
                            bill.gst
                        ),

                    "discount":
                        float(
                            bill.discount
                        ),

                    "grand_total":
                        float(
                            bill.grand_total
                        ),

                    "bill_status":
                        bill.bill_status,

                    "items":
                        items,
                }

            # Pending → update totals

            if (
                bill.bill_status
                == BillStatus.PENDING.value
            ):

                bill.subtotal = subtotal

                bill.gst = gst

                bill.grand_total = (
                    subtotal
                    + gst
                    - float(
                        bill.discount
                    )
                )

            # Cancelled → create new bill

            elif (
                bill.bill_status
                == BillStatus.CANCELLED.value
            ):

                bill = Bill(

                    session_id=session_id,

                    subtotal=subtotal,

                    gst=gst,

                    discount=0,

                    grand_total=subtotal
                    + gst,

                    bill_status=
                        BillStatus.PENDING.value,

                )

                db.add(bill)

        else:

            bill = Bill(

                session_id=session_id,

                subtotal=subtotal,

                gst=gst,

                discount=0,

                grand_total=subtotal
                + gst,

                bill_status=
                    BillStatus.PENDING.value,

            )

            db.add(bill)

        db.commit()

        db.refresh(bill)

        items = []

        for item in served_items:

            items.append({

                "order_item_id":
                    item.order_item_id,

                "item_name":
                    item.variant.menu_item.item_name,

                "variant_name":
                    item.variant.variant_name,

                "quantity":
                    item.quantity,

                "unit_price":
                    float(
                        item.price_at_order
                    ),

                "subtotal":
                    float(
                        item.price_at_order
                    )
                    * item.quantity,

            })

        return {

            "bill_generated": True,

            "bill_id":
                bill.bill_id,

            "session_id":
                session_id,

            "subtotal":
                float(
                    bill.subtotal
                ),

            "gst":
                float(
                    bill.gst
                ),

            "discount":
                float(
                    bill.discount
                ),

            "grand_total":
                float(
                    bill.grand_total
                ),

            "bill_status":
                bill.bill_status,

            "items":
                items,
        }
        
    # ----------------------------------------
    # Pay Bill
    # ----------------------------------------

    @staticmethod
    def pay_bill(
        db: Session,
        bill_id: int,
    ):

        bill = (
            db.query(Bill)
            .filter(
                Bill.bill_id == bill_id
            )
            .first()
        )

        if not bill:
            raise ValueError(
                "Bill not found."
            )

        if (
            bill.bill_status
            == BillStatus.PAID.value
        ):
            raise ValueError(
                "Bill already paid."
            )

        session = bill.session

        if not session:
            raise ValueError(
                "Customer session not found."
            )

        active_items = (
            db.query(OrderItem)
            .join(Order)
            .filter(
                Order.session_id == session.session_id,
                OrderItem.item_status.notin_(
                    [
                        OrderItemStatus.SERVED.value,
                        OrderItemStatus.CANCELLED.value,
                        OrderItemStatus.REJECTED.value,
                    ]
                ),
            )
            .count()
        )

        if active_items > 0:
            raise ValueError(
                "Some order items are still active."
            )

        bill.bill_status = (
            BillStatus.PAID.value
        )

        session.status = (
            CustomerSessionStatus.COMPLETED.value
        )

        session.ended_at = datetime.utcnow()

        table = (
            db.query(RestaurantTable)
            .filter(
                RestaurantTable.table_id
                == session.table_id
            )
            .first()
        )

        if table:
            table.status = (
                TableStatus.AVAILABLE.value
            )

        db.commit()

        db.refresh(bill)

        return {
            "bill_generated": True,
            "bill_id": bill.bill_id,
            "session_id": session.session_id,
            "subtotal": float(
                bill.subtotal
            ),
            "gst": float(
                bill.gst
            ),
            "discount": float(
                bill.discount
            ),
            "grand_total": float(
                bill.grand_total
            ),
            "bill_status": bill.bill_status,
            "items": [],
        }
        
        
    # ----------------------------------------
    # Recalculate Bill
    # ----------------------------------------

    @staticmethod
    def recalculate_bill(
        db: Session,
        session_id: int,
    ):

        served_items = (
            db.query(OrderItem)
            .join(Order)
            .filter(
                Order.session_id == session_id,
                OrderItem.item_status
                == OrderItemStatus.SERVED.value,
            )
            .all()
        )

        if not served_items:
            return

        subtotal = sum(
            float(item.price_at_order)
            * item.quantity
            for item in served_items
        )

        gst = (
            subtotal
            * CustomerBillService.GST_PERCENTAGE
        ) / 100

        bill = (
            db.query(Bill)
            .filter(
                Bill.session_id == session_id,
                Bill.bill_status == BillStatus.PENDING.value,
            )
            .first()
        )

        if bill:

            bill.subtotal = subtotal

            bill.gst = gst

            bill.grand_total = (
                subtotal
                + gst
                - float(bill.discount)
            )

        else:

            bill = Bill(
                session_id=session_id,
                subtotal=subtotal,
                gst=gst,
                discount=0,
                grand_total=subtotal + gst,
                bill_status=BillStatus.PENDING.value,
            )

            db.add(bill)

        db.flush()