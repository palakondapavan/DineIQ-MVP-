from sqlalchemy.orm import Session
from sqlalchemy import func

from app.models.bill import Bill
from app.models.order import Order

from app.schemas.bill import BillGenerate
from app.schemas.bill_status import BillStatus
from app.schemas.order_status import OrderStatus


class BillService:

    GST_PERCENTAGE = 5

    # ------------------------------------
    # Generate Bill
    # ------------------------------------

    @staticmethod
    def generate_bill(
        db: Session,
        bill: BillGenerate
    ):

        try:

            # --------------------------------
            # Existing Bill?
            # --------------------------------

            existing_bill = (
                db.query(Bill)
                .filter(
                    Bill.session_id == bill.session_id
                )
                .order_by(Bill.bill_id.desc())
                .first()
            )

            if existing_bill:

                if existing_bill.bill_status == BillStatus.PENDING.value:

                    raise ValueError(
                        "A pending bill already exists. Cancel it before generating a new bill."
                    )

                if existing_bill.bill_status == BillStatus.PAID.value:

                    raise ValueError(
                        "Session has already been paid."
                    )

                # If CANCELLED → continue and create a new bill

            # --------------------------------
            # Get All Served Orders
            # --------------------------------

            served_orders = (

                db.query(Order)

                .filter(

                    Order.session_id == bill.session_id,

                    Order.status == OrderStatus.SERVED.value

                )

                .all()

            )

            if not served_orders:

                raise ValueError(
                    "No served orders found for this session."
                )

            # --------------------------------
            # Calculate Subtotal
            # --------------------------------

            subtotal = sum(

                float(order.total_amount)

                for order in served_orders

            )

            # --------------------------------
            # Validate Discount
            # --------------------------------

            if bill.discount < 0:

                raise ValueError(
                    "Discount cannot be negative."
                )

            if bill.discount > subtotal:

                raise ValueError(
                    "Discount cannot exceed subtotal."
                )

            # --------------------------------
            # GST
            # --------------------------------

            gst = (
                subtotal *
                BillService.GST_PERCENTAGE
            ) / 100

            grand_total = (

                subtotal +

                gst -

                bill.discount

            )

            # --------------------------------
            # Create Bill
            # --------------------------------

            new_bill = Bill(

                session_id=bill.session_id,

                subtotal=subtotal,

                gst=gst,

                discount=bill.discount,

                grand_total=grand_total,

                bill_status=BillStatus.PENDING.value

            )

            db.add(new_bill)

            db.commit()

            db.refresh(new_bill)

            return new_bill

        except Exception:

            db.rollback()

            raise

    # ------------------------------------
    # Get All Bills
    # ------------------------------------

    @staticmethod
    def get_all_bills(
        db: Session
    ):

        return (

            db.query(Bill)

            .order_by(
                Bill.bill_id.desc()
            )

            .all()

        )

    # ------------------------------------
    # Get Bill
    # ------------------------------------

    @staticmethod
    def get_bill(
        db: Session,
        bill_id: int
    ):

        return (

            db.query(Bill)

            .filter(
                Bill.bill_id == bill_id
            )

            .first()

        )

    # ------------------------------------
    # Mark Bill Paid
    # ------------------------------------

    @staticmethod
    def mark_bill_paid(
        db: Session,
        bill_id: int
    ):

        bill = (

            db.query(Bill)

            .filter(
                Bill.bill_id == bill_id
            )

            .first()

        )

        if not bill:

            return None

        bill.bill_status = BillStatus.PAID.value

        db.commit()

        db.refresh(bill)

        return bill
    
    
    # ------------------------------------
    # Cancel Bill
    # ------------------------------------

    @staticmethod
    def cancel_bill(
        db: Session,
        bill_id: int
    ):

        bill = (
            db.query(Bill)
            .filter(
                Bill.bill_id == bill_id
            )
            .first()
        )

        if not bill:
            return None

        if bill.bill_status == BillStatus.PAID.value:

            raise ValueError(
                "Paid bill cannot be cancelled."
            )

        if bill.bill_status == BillStatus.CANCELLED.value:

            raise ValueError(
                "Bill already cancelled."
            )

        bill.bill_status = BillStatus.CANCELLED.value

        db.commit()

        db.refresh(bill)

        return bill   