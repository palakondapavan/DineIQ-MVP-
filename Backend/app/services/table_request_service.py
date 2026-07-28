from datetime import datetime

from sqlalchemy.orm import Session

from app.models.restaurant_table import RestaurantTable
from app.models.customer_session import CustomerSession
from app.models.table_request import (
    TableRequest,
    TableRequestStatus
)


class TableRequestService:

    # ----------------------------------------
    # Customer Requests Table
    # ----------------------------------------

    @staticmethod
    def create_request(
        db: Session,
        table_id: int,
        customer_name: str,
        customer_mobile: str
    ):

        table = (
            db.query(RestaurantTable)
            .filter(
                RestaurantTable.table_id == table_id
            )
            .first()
        )

        if not table:
            raise ValueError(
                "Table not found."
            )

        if table.status == "OCCUPIED":
            raise ValueError(
                "Table is already occupied."
            )

        existing_request = (
            db.query(TableRequest)
            .filter(
                TableRequest.table_id == table_id,
                TableRequest.status == TableRequestStatus.PENDING
            )
            .first()
        )

        if existing_request:
            raise ValueError(
                "Table already has a pending request."
            )

        request = TableRequest(

            table_id=table_id,

            customer_name=customer_name,

            customer_mobile=customer_mobile,

            status=TableRequestStatus.PENDING

        )

        db.add(request)
        db.commit()
        db.refresh(request)

        return request

    # ----------------------------------------
    # Get Pending Requests
    # ----------------------------------------

    @staticmethod
    def get_pending_requests(
        db: Session
    ):

        return (
            db.query(TableRequest)
            .filter(
                TableRequest.status ==
                TableRequestStatus.PENDING
            )
            .order_by(
                TableRequest.requested_at.asc()
            )
            .all()
        )

    # ----------------------------------------
    # Accept Request
    # ----------------------------------------

    @staticmethod
    def accept_request(
        db: Session,
        request_id: int,
        waiter_id: int
    ):

        request = (
            db.query(TableRequest)
            .filter(
                TableRequest.request_id == request_id
            )
            .first()
        )

        if not request:
            raise ValueError(
                "Request not found."
            )

        if request.status != TableRequestStatus.PENDING:
            raise ValueError(
                "Request already processed."
            )

        # Check active session

        active_session = (
            db.query(CustomerSession)
            .filter(
                CustomerSession.table_id == request.table_id,
                CustomerSession.status == "ACTIVE"
            )
            .first()
        )

        if active_session:
            raise ValueError(
                "Table already has an active session."
            )

        # Accept request

        request.status = TableRequestStatus.ACCEPTED
        request.waiter_id = waiter_id
        request.accepted_at = datetime.now()

        # Occupy table

        table = (
            db.query(RestaurantTable)
            .filter(
                RestaurantTable.table_id == request.table_id
            )
            .first()
        )

        table.status = "OCCUPIED"

        # Create customer session

        session = CustomerSession(

            table_id=request.table_id,

            waiter_id=waiter_id,

            customer_name=request.customer_name,

            customer_mobile=request.customer_mobile,

            status="ACTIVE"

        )

        db.add(session)

        db.commit()

        db.refresh(request)

        return request

    # ----------------------------------------
    # Reject Request
    # ----------------------------------------

    @staticmethod
    def reject_request(
        db: Session,
        request_id: int
    ):

        request = (
            db.query(TableRequest)
            .filter(
                TableRequest.request_id == request_id
            )
            .first()
        )

        if not request:
            raise ValueError(
                "Request not found."
            )

        if request.status != TableRequestStatus.PENDING:
            raise ValueError(
                "Request already processed."
            )

        request.status = TableRequestStatus.REJECTED

        db.commit()
        db.refresh(request)

        return request
    
    # ----------------------------------------
    # get table request
    # ----------------------------------------  
    
    @staticmethod
    def get_request_by_id(db: Session, request_id: int):
        return (
            db.query(TableRequest)
            .filter(TableRequest.request_id == request_id)
            .first()
        )