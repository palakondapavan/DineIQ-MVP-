from sqlalchemy.orm import Session

from app.models.table_request import (
    TableRequest,
    TableRequestStatus
)

from app.models.service_request import (
    ServiceRequest,
    ServiceRequestStatus
)

from app.models.order import Order
from app.models.customer_session import CustomerSession
from app.models.bill import Bill

from app.schemas.order_status import OrderStatus
from app.schemas.order_item_status import OrderItemStatus
from app.schemas.fulfillment_type import FulfillmentType


class WaiterDashboardService:

    # ----------------------------------------
    # Waiter Dashboard
    # ----------------------------------------

    @staticmethod
    def get_dashboard(
        db: Session
    ):

        # ========================================
        # Pending Table Requests
        # ========================================

        pending_table_requests = (

            db.query(TableRequest)

            .filter(
                TableRequest.status ==
                TableRequestStatus.PENDING
            )

            .order_by(
                TableRequest.requested_at
            )

            .all()

        )

        table_requests = []

        for request in pending_table_requests:

            table_requests.append({

                "request_id": request.request_id,

                "table_number": request.table.table_number,

                "customer_name": request.customer_name,

                "customer_mobile": request.customer_mobile,

                "requested_at":
                    request.requested_at.isoformat()

            })

        # ========================================
        # Pending Service Requests
        # ========================================

        pending_service_requests = (

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

        service_requests = []

        for request in pending_service_requests:

            session = request.session

            table = session.table

            service_requests.append({

                "request_id": request.request_id,

                "table_number": table.table_number,

                "customer_name": session.customer_name,

                "request_type": request.request_type.value,

                "requested_at":
                    request.requested_at.isoformat()

            })

        # ========================================
        # Waiter Orders
        #
        # READY            -> Kitchen items ready
        # PLACED           -> Direct items waiting acceptance
        # ACCEPTED         -> Direct items accepted
        # PARTIALLY_SERVED -> Remaining items
        # ========================================

        waiter_orders_db = (

            db.query(Order)

            .filter(
                Order.status.in_(
                    [
                        OrderStatus.PLACED.value,
                        OrderStatus.ACCEPTED.value,
                        OrderStatus.READY.value,
                        OrderStatus.PARTIALLY_SERVED.value
                    ]
                )
            )

            .order_by(
                Order.updated_at
            )

            .all()

        )

        ready_order_list = []

        for order in waiter_orders_db:

            session = order.session
            table = session.table

            pending_items = []

            for item in order.items:

                fulfillment = (
                    item.variant.menu_item.fulfillment_type
                )

                # Kitchen items waiting to be served
                if (
                    fulfillment == FulfillmentType.KITCHEN.value
                    and
                    item.item_status == OrderItemStatus.READY.value
                ):
                    pending_items.append({

                        "order_item_id": item.order_item_id,

                        "item_name": item.variant.menu_item.item_name,

                        "quantity": item.quantity,

                        "fulfillment_type": item.variant.menu_item.fulfillment_type,

                        "item_status": item.item_status

                    })

                # Direct items waiting waiter
                elif (
                    fulfillment == FulfillmentType.DIRECT.value
                    and
                    item.item_status in (
                        OrderItemStatus.PLACED.value,
                        OrderItemStatus.ACCEPTED.value,
                    )
                ):
                    pending_items.append({

                        "order_item_id": item.order_item_id,

                        "item_name": item.variant.menu_item.item_name,

                        "quantity": item.quantity,

                        "fulfillment_type": item.variant.menu_item.fulfillment_type,

                        "item_status": item.item_status

                    })

            if not pending_items:
                continue

            ready_order_list.append({

                "order_id": order.order_id,

                "table_number": table.table_number,

                "customer_name": session.customer_name,

                "total_amount": float(order.total_amount),

                "pending_items": pending_items

            })
        # ========================================
        # Active Tables
        # ========================================

        active_sessions = (

            db.query(CustomerSession)

            .filter(
                CustomerSession.status == "ACTIVE"
            )

            .all()

        )

        active_table_list = []

        for session in active_sessions:

            bill = (

                db.query(Bill)

                .filter(
                    Bill.session_id ==
                    session.session_id
                )

                .first()

            )

            active_table_list.append({

                "session_id":
                    session.session_id,

                "table_number":
                    session.table.table_number,

                "customer_name":
                    session.customer_name,

                "started_at":
                    session.started_at.isoformat(),

                "total_orders":
                    len(session.orders),

                "bill_generated":
                    bill is not None

            })

        # ========================================
        # Dashboard Response
        # ========================================

        return {

            "pending_table_requests":
                len(table_requests),

            "pending_service_requests":
                len(service_requests),

            "ready_orders":
                len(ready_order_list),

            "active_tables":
                len(active_table_list),

            "table_requests":
                table_requests,

            "service_requests":
                service_requests,

            "ready_order_list":
                ready_order_list,

            "active_table_list":
                active_table_list

        }