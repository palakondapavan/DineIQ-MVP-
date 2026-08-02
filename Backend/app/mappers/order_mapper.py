from app.models.order import Order


class OrderMapper:

    @staticmethod
    def to_response(order: Order):

        return {
            "order_id": order.order_id,
            "session_id": order.session_id,
            "waiter_id": order.waiter_id,
            "chef_id": order.chef_id,
            "status": order.status,
            "total_amount": float(order.total_amount),
            "remarks": order.remarks,
            "items": [
                {
                    "order_item_id": item.order_item_id,
                    "variant_id": item.variant_id,

                    "variant_name": item.variant.variant_name,

                    "item_name": item.variant.menu_item.item_name,

                    "image_url": item.variant.menu_item.image_url,

                    "food_type": item.variant.menu_item.food_type,

                    "quantity": item.quantity,

                    "price_at_order": float(item.price_at_order),

                    "item_status": item.item_status,

                    "special_instruction": item.special_instruction,
                }
                for item in order.items
            ],
        }