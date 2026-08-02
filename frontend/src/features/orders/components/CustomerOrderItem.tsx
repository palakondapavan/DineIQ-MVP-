import type {
  CustomerOrderItem,
} from "../types/customerOrder.types";

import OrderStatusChip from "./OrderStatusChip";

interface Props {
  item: CustomerOrderItem;
}

export default function CustomerOrderItem({
  item,
}: Props) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4">
      <div>
        <h4 className="font-semibold">
          {item.item_name ??
            "Menu Item"}
        </h4>

        {item.variant_name && (
          <p className="text-sm text-slate-500">
            {item.variant_name}
          </p>
        )}

        <p className="mt-1 text-sm text-slate-500">
          Qty × {item.quantity}
        </p>
      </div>

      <div className="text-right">
        <OrderStatusChip
          status={item.item_status}
        />

        <p className="mt-2 font-semibold text-green-600">
          ₹
          {item.price_at_order *
            item.quantity}
        </p>
      </div>
    </div>
  );
}