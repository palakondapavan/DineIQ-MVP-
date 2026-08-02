import {
  Minus,
  Plus,
  Trash2,
} from "lucide-react";

import type {
  CustomerOrderItem,
} from "../types/customerOrder.types";

import {
  useUpdateOrderItem,
} from "../hooks/useUpdateOrderItem";

import {
  useDeleteOrderItem,
} from "../hooks/useDeleteOrderItem";

import OrderStatusChip from "./OrderStatusChip";

interface Props {
  item: CustomerOrderItem;
}

export default function OrderItem({
  item,
}: Props) {

    const editable =
    item.item_status === "PLACED" ||
    item.item_status === "ACCEPTED";

  const updateItem =
    useUpdateOrderItem();

  const deleteItem =
    useDeleteOrderItem();

  async function increaseQuantity() {
    try {
      await updateItem.mutateAsync({
        itemId: item.order_item_id,
        quantity: item.quantity + 1,
      });
    } catch (error) {
      console.error(error);
    }
  }

    async function decreaseQuantity() {
    try {
        await updateItem.mutateAsync({
        itemId: item.order_item_id,
        quantity: item.quantity - 1,
        });
    } catch (error) {
        console.error(error);
    }
    }

  async function removeItem() {
    const confirmed = window.confirm(
      "Remove this item?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteItem.mutateAsync(
        item.order_item_id
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex gap-4">
        {/* Food Image */}
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-slate-100">
          {item.image_url ? (
            <img
              src={item.image_url ?? undefined}
              alt={item.item_name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-slate-400">
              No Image
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-1 flex-col">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="text-base font-semibold text-slate-900">
                {item.item_name}
              </h4>

              {item.variant_name && (
                <p className="mt-1 text-sm text-slate-500">
                  {item.variant_name}
                </p>
              )}

              {item.food_type && (
                <div className="mt-2">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      item.food_type === "VEG"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.food_type}
                  </span>
                </div>
              )}
            </div>

            <OrderStatusChip
              status={item.item_status}
            />
          </div>

          <div className="mt-4 flex items-center justify-between">
            {editable ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={decreaseQuantity}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 transition hover:bg-slate-100"
                >
                  <Minus size={16} />
                </button>

                <span className="w-6 text-center font-semibold">
                  {item.quantity}
                </span>

                <button
                  onClick={increaseQuantity}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 transition hover:bg-slate-100"
                >
                  <Plus size={16} />
                </button>
              </div>
            ) : (
              <span className="text-sm text-slate-500">
                Qty × {item.quantity}
              </span>
            )}

            <span className="text-lg font-bold text-green-600">
              ₹
              {item.price_at_order *
                item.quantity}
            </span>
          </div>

          {item.special_instruction && (
            <div className="mt-3 rounded-xl bg-amber-50 p-3 text-sm text-amber-700">
              <span className="font-semibold">
                Note:
              </span>{" "}
              {item.special_instruction}
            </div>
          )}

          {editable && (
            <button
              onClick={removeItem}
              className="mt-4 flex items-center gap-2 text-sm font-semibold text-red-600 transition hover:text-red-700"
            >
              <Trash2 size={16} />
              Remove Item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}