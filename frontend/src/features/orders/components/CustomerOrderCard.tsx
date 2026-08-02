import type {
  CustomerOrder,
} from "../types/customerOrder.types";

import CustomerOrderItem from "./CustomerOrderItem";
import OrderStatusChip from "./OrderStatusChip";

interface Props {
  order: CustomerOrder;
}

export default function CustomerOrderCard({
  order,
}: Props) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">
            Order #{order.order_id}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {order.items.length} Items
          </p>
        </div>

        <OrderStatusChip
          status={order.status}
        />
      </div>

      <div className="mt-5 space-y-3">
        {order.items.map((item) => (
          <CustomerOrderItem
            key={
              item.order_item_id
            }
            item={item}
          />
        ))}
      </div>

      <div className="mt-5 border-t pt-4">
        <div className="flex items-center justify-between">
          <span className="font-semibold">
            Total
          </span>

          <span className="text-xl font-bold text-green-600">
            ₹{order.total_amount}
          </span>
        </div>
      </div>
    </div>
  );
}