from datetime import datetime

from sqlalchemy.orm import Session

from app.models.payment import Payment
from app.models.bill import Bill
from app.models.customer_session import CustomerSession
from app.models.restaurant_table import RestaurantTable

from app.schemas.payment import PaymentCreate
from app.schemas.payment_status import PaymentStatus


class PaymentService:

    # ------------------------------------
    # Make Payment
    # ------------------------------------

    @staticmethod
    def make_payment(
        db: Session,
        payment: PaymentCreate
    ):

        try:

            # -----------------------------
            # Check Bill
            # -----------------------------

            bill = (
                db.query(Bill)
                .filter(
                    Bill.bill_id == payment.bill_id
                )
                .first()
            )

            if not bill:

                raise ValueError(
                    "Bill not found."
                )

            # -----------------------------
            # Bill Already Paid?
            # -----------------------------

            if bill.bill_status == "PAID":

                raise ValueError(
                    "Bill is already paid."
                )

            # -----------------------------
            # Duplicate Payment Check
            # -----------------------------

            existing_payment = (
                db.query(Payment)
                .filter(
                    Payment.bill_id == payment.bill_id
                )
                .first()
            )

            if existing_payment:

                raise ValueError(
                    "Payment already exists for this bill."
                )

            # -----------------------------
            # Generate Transaction Reference
            # -----------------------------

            transaction_reference = (
                f"{payment.payment_method.value}-"
                f"{datetime.now().strftime('%Y%m%d%H%M%S')}"
            )

            # -----------------------------
            # Create Payment
            # -----------------------------

            new_payment = Payment(

                bill_id=bill.bill_id,

                payment_method=payment.payment_method.value,

                amount=bill.grand_total,

                payment_status=PaymentStatus.SUCCESS.value,

                transaction_reference=transaction_reference,

                paid_at=datetime.now()

            )

            db.add(new_payment)

            # -----------------------------
            # Mark Bill as PAID
            # -----------------------------

            bill.bill_status = "PAID"

            # -----------------------------
            # Close Customer Session
            # -----------------------------

            session = (
                db.query(CustomerSession)
                .filter(
                    CustomerSession.session_id == bill.session_id
                )
                .first()
            )

            if session:

                session.status = "COMPLETED"

                # -------------------------
                # Make Table AVAILABLE
                # -------------------------

                table = (
                    db.query(RestaurantTable)
                    .filter(
                        RestaurantTable.table_id == session.table_id
                    )
                    .first()
                )

                if table:

                    table.status = "AVAILABLE"

            # -----------------------------
            # Commit
            # -----------------------------

            db.commit()

            db.refresh(new_payment)

            return new_payment

        except Exception:

            db.rollback()

            raise

    # ------------------------------------
    # Get All Payments
    # ------------------------------------

    @staticmethod
    def get_all_payments(
        db: Session
    ):

        return (
            db.query(Payment)
            .order_by(
                Payment.payment_id.desc()
            )
            .all()
        )

    # ------------------------------------
    # Get Payment By ID
    # ------------------------------------

    @staticmethod
    def get_payment(
        db: Session,
        payment_id: int
    ):

        return (
            db.query(Payment)
            .filter(
                Payment.payment_id == payment_id
            )
            .first()
        )