from datetime import datetime

from sqlalchemy.orm import Session

from app.models.customer_session import CustomerSession
from app.models.service_request import (
    ServiceRequest,
    ServiceRequestStatus
)

from app.schemas.service_request import (
    ServiceRequestCreate
)


class ServiceRequestService:

    # ----------------------------------------
    # Customer Creates Request
    # ----------------------------------------

    @staticmethod
    def create_request(
        db: Session,
        request: ServiceRequestCreate
    ):

        session = (
            db.query(CustomerSession)
            .filter(
                CustomerSession.session_id == request.session_id
            )
            .first()
        )

        if not session:
            raise ValueError(
                "Session not found."
            )

        if session.status != "ACTIVE":
            raise ValueError(
                "Session is not active."
            )

        # Prevent duplicate pending request
        existing = (
            db.query(ServiceRequest)
            .filter(
                ServiceRequest.session_id == request.session_id,
                ServiceRequest.request_type == request.request_type,
                ServiceRequest.status == ServiceRequestStatus.PENDING
            )
            .first()
        )

        if existing:
            raise ValueError(
                "Request already pending."
            )

        new_request = ServiceRequest(

            session_id=request.session_id,

            request_type=request.request_type,

            status=ServiceRequestStatus.PENDING

        )

        db.add(new_request)

        db.commit()

        db.refresh(new_request)

        return new_request

    # ----------------------------------------
    # Waiter Dashboard
    # ----------------------------------------

    @staticmethod
    def get_pending_requests(
        db: Session
    ):

        requests = (

            db.query(ServiceRequest)

            .filter(
                ServiceRequest.status ==
                ServiceRequestStatus.PENDING
            )

            .order_by(
                ServiceRequest.requested_at
            )

            .all()

        )

        response = []

        for request in requests:

            session = request.session

            table = session.table

            response.append({

                "request_id": request.request_id,

                "table_number": table.table_number,

                "customer_name": session.customer_name,

                "customer_mobile": session.customer_mobile,

                "request_type": request.request_type,

                "status": request.status,

                "requested_at":
                    request.requested_at.isoformat()

            })

        return response

    # ----------------------------------------
    # Complete Request
    # ----------------------------------------

    @staticmethod
    def complete_request(
        db: Session,
        request_id: int,
        waiter_id: int
    ):

        request = (
            db.query(ServiceRequest)
            .filter(
                ServiceRequest.request_id == request_id
            )
            .first()
        )

        if not request:
            raise ValueError(
                "Request not found."
            )

        if request.status == ServiceRequestStatus.COMPLETED:
            raise ValueError(
                "Request already completed."
            )

        request.status = ServiceRequestStatus.COMPLETED

        request.waiter_id = waiter_id

        request.completed_at = datetime.now()

        db.commit()

        db.refresh(request)

        return request