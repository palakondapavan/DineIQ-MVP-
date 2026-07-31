import { Minus, Plus, Trash2 } from "lucide-react";

import type { CartItem as CartItemType } from "../types/cart.types";
import { useCart } from "../hooks/useCart";

interface Props {
  item: CartItemType;
}

export default function CartItem({
  item,
}: Props) {
  const {
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    updateNotes,
  } = useCart();

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex gap-4">
        <img
          src={
            item.image_url ||
            "https://placehold.co/120x120?text=Food"
          }
          alt={item.item_name}
          className="h-24 w-24 rounded-xl object-cover"
        />

        <div className="flex flex-1 flex-col">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold">
                {item.item_name}
              </h3>

              {item.variant_name && (
                <p className="text-sm text-slate-500">
                  {item.variant_name}
                </p>
              )}
            </div>

            <button
              onClick={() =>
                removeItem(
                  item.item_id,
                  item.variant_id
                )
              }
              className="text-red-500 transition hover:text-red-700"
            >
              <Trash2 size={18} />
            </button>
          </div>

          <p className="mt-2 font-semibold text-indigo-600">
            ₹{item.price}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-3 rounded-xl border px-3 py-2">
              <button
                onClick={() =>
                  decreaseQuantity(
                    item.item_id,
                    item.variant_id
                  )
                }
              >
                <Minus size={16} />
              </button>

              <span className="min-w-[24px] text-center font-semibold">
                {item.quantity}
              </span>

              <button
                onClick={() =>
                  increaseQuantity(
                    item.item_id,
                    item.variant_id
                  )
                }
              >
                <Plus size={16} />
              </button>
            </div>

            <span className="font-bold">
              ₹
              {(
                item.price *
                item.quantity
              ).toFixed(2)}
            </span>
          </div>

          <textarea
            value={item.notes}
            onChange={(e) =>
              updateNotes(
                item.item_id,
                item.variant_id,
                e.target.value
              )
            }
            placeholder="Special instructions..."
            className="mt-4 rounded-xl border p-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            rows={2}
          />
        </div>
      </div>
    </div>
  );
}