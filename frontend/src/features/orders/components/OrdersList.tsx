import type {
  CustomerOrder,
} from "../types/customerOrder.types";

import OrderCard from "./OrderCard";

interface OrdersListProps {
  orders: CustomerOrder[];
}

export default function OrdersList({
  orders,
}: OrdersListProps) {
  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <OrderCard
          key={order.order_id}
          order={order}
        />
      ))}
    </div>
  );
}