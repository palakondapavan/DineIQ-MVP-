from sqlalchemy.orm import Session
from sqlalchemy import and_

from app.models.customer_session import CustomerSession
from app.models.restaurant_table import RestaurantTable
from app.schemas.customer_session import CustomerSessionStart


class CustomerSessionService:

    @staticmethod
    def start_session(
        db: Session,
        session: CustomerSessionStart
    ):

        # -----------------------------
        # Check Table Exists
        # -----------------------------
        table = (
            db.query(RestaurantTable)
            .filter(
                RestaurantTable.table_id == session.table_id
            )
            .first()
        )

        if not table:
            raise ValueError("Table not found")

        # -----------------------------
        # Check Table Active
        # -----------------------------
        if not table.is_active:
            raise ValueError("Table is inactive")

        # -----------------------------
        # Check Table Status
        # -----------------------------
        if table.status != "AVAILABLE":
            raise ValueError(
                "Table is already occupied"
            )

        # -----------------------------
        # Check Active Session
        # -----------------------------
        active_session = (
            db.query(CustomerSession)
            .filter(
                and_(
                    CustomerSession.table_id == session.table_id,
                    CustomerSession.status == "ACTIVE"
                )
            )
            .first()
        )

        if active_session:
            raise ValueError(
                "Active session already exists"
            )

        # -----------------------------
        # Create Session
        # -----------------------------
        new_session = CustomerSession(
            table_id=session.table_id,
            customer_name=session.customer_name,
            customer_mobile=session.customer_mobile,
            status="ACTIVE"
        )

        db.add(new_session)

        # -----------------------------
        # Update Table Status
        # -----------------------------
        table.status = "OCCUPIED"

        db.commit()

        db.refresh(new_session)

        return new_session

    @staticmethod
    def get_session(
        db: Session,
        session_id: int
    ):

        return (
            db.query(CustomerSession)
            .filter(
                CustomerSession.session_id == session_id
            )
            .first()
        )

    @staticmethod
    def close_session(
        db: Session,
        session_id: int
    ):

        session = (
            db.query(CustomerSession)
            .filter(
                CustomerSession.session_id == session_id
            )
            .first()
        )

        if not session:
            raise ValueError("Session not found")

        table = (
            db.query(RestaurantTable)
            .filter(
                RestaurantTable.table_id == session.table_id
            )
            .first()
        )

        session.status = "COMPLETED"

        from sqlalchemy.sql import func
        session.ended_at = func.now()

        table.status = "AVAILABLE"

        db.commit()

        db.refresh(session)

        return session
    
    
    @staticmethod
    def resume_session(
        db: Session,
        table_id: int,
        customer_mobile: str
    ):

        return (
            db.query(CustomerSession)
            .filter(
                and_(
                    CustomerSession.table_id == table_id,
                    CustomerSession.customer_mobile == customer_mobile,
                    CustomerSession.status == "ACTIVE"
                )
            )
            .first()
        )