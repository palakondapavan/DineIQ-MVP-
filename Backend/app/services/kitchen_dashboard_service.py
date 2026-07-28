from sqlalchemy.orm import Session

from app.models.order import Order


class KitchenDashboardService:

    # ----------------------------------------
    # Kitchen Dashboard
    # ----------------------------------------

    @staticmethod
    def get_dashboard(
        db: Session
    ):

        dashboard = {

            "new_orders": 0,

            "accepted_orders": 0,

            "preparing_orders": 0,

            "ready_orders": 0,

            "new_order_list": [],

            "accepted_order_list": [],

            "preparing_order_list": [],

            "ready_order_list": []

        }

        # ========================================
        # Get All Orders
        # ========================================

        orders = (

            db.query(Order)

            .order_by(
                Order.ordered_at.asc()
            )

            .all()

        )

        # ========================================
        # Categorize Orders
        # ========================================

        for order in orders:

            order_data = {

                "order_id": order.order_id,

                "table_number": order.session.table.table_number,

                "customer_name": order.session.customer_name,

                "total_amount": float(
                    order.total_amount
                ),

                "ordered_at":
                    order.ordered_at.isoformat(),

                "items": [

                    f"{item.variant.variant_name} x{item.quantity}"

                    for item in order.items

                ]

            }

            # -----------------------------
            # PLACED
            # -----------------------------

            if order.status == "PLACED":

                dashboard[
                    "new_order_list"
                ].append(order_data)

            # -----------------------------
            # ACCEPTED
            # -----------------------------

            elif order.status == "ACCEPTED":

                dashboard[
                    "accepted_order_list"
                ].append(order_data)

            # -----------------------------
            # PREPARING
            # -----------------------------

            elif order.status == "PREPARING":

                dashboard[
                    "preparing_order_list"
                ].append(order_data)

            # -----------------------------
            # READY
            # -----------------------------

            elif order.status == "READY":

                dashboard[
                    "ready_order_list"
                ].append(order_data)

        # ========================================
        # Counts
        # ========================================

        dashboard["new_orders"] = len(
            dashboard["new_order_list"]
        )

        dashboard["accepted_orders"] = len(
            dashboard["accepted_order_list"]
        )

        dashboard["preparing_orders"] = len(
            dashboard["preparing_order_list"]
        )

        dashboard["ready_orders"] = len(
            dashboard["ready_order_list"]
        )

        return dashboard