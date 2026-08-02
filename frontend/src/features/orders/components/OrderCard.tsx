import { Trash2 } from "lucide-react";

import { useCancelOrder } from "../hooks/useCancelOrder";

import type {
  CustomerOrder,
} from "../types/customerOrder.types";

import OrderItem from "./OrderItem";
import OrderStatusChip from "./OrderStatusChip";

interface Props {
  order: CustomerOrder;
}

export default function OrderCard({
  order,
}: Props) {
  const cancelOrder =
    useCancelOrder();

  const editable =
    order.status === "PLACED" ||
    order.status === "ACCEPTED";

  async function handleCancel() {
    const confirmed = window.confirm(
      "Cancel this entire order?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await cancelOrder.mutateAsync(
        order.order_id
      );
    } catch (error) {
      console.error(error);

      alert(
        "Unable to cancel order."
      );
    }
  }

  return (
    <div className="rounded-3xl bg-white p-6 shadow">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">
            Order #{order.order_id}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {order.items.length} Items
          </p>
        </div>

        <OrderStatusChip
          status={order.status}
        />
      </div>

      {/* Items */}
      <div className="mt-6 space-y-4">
        {order.items.map((item) => (
          <OrderItem
            key={item.order_item_id}
            item={item}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6 border-t pt-5">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-slate-700">
            Total
          </span>

          <span className="text-xl font-bold text-green-600">
            ₹{order.total_amount}
          </span>
        </div>

        {editable && (
          <button
            onClick={handleCancel}
            disabled={
              cancelOrder.isPending
            }
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 py-3 font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-50"
          >
            <Trash2 size={18} />

            {cancelOrder.isPending
              ? "Cancelling..."
              : "Cancel Order"}
          </button>
        )}
      </div>
    </div>
  );
}