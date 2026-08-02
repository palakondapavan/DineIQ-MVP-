import {
  Leaf,
  Minus,
  Plus,
  Trash2,
} from "lucide-react";

import type { CartItem as CartItemType } from "../types/cart.types";

import { useCart } from "../hooks/useCart";

import SpecialInstruction from "./SpecialInstruction";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({
  item,
}: CartItemProps) {
  const {
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    updateNotes,
  } = useCart();

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="p-5">
        <div className="flex gap-4">
          {/* Image */}
          <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100">
            {item.image_url ? (
              <img
                src={item.image_url}
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
          <div className="flex flex-1 flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Leaf
                      size={16}
                      className="text-green-600"
                    />

                    <h3 className="text-lg font-semibold text-slate-900">
                      {item.item_name}
                    </h3>
                  </div>

                  {item.variant_name && (
                    <span className="mt-2 inline-flex rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">
                      {item.variant_name}
                    </span>
                  )}
                </div>

                <button
                  onClick={() =>
                    removeItem(
                      item.item_id,
                      item.variant_id
                    )
                  }
                  className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <p className="mt-3 text-sm text-slate-500">
                ₹{item.price} each
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center rounded-xl border border-slate-200">
                <button
                  onClick={() =>
                    decreaseQuantity(
                      item.item_id,
                      item.variant_id
                    )
                  }
                  className="p-3 transition hover:bg-slate-100"
                >
                  <Minus size={16} />
                </button>

                <span className="min-w-10 text-center font-semibold">
                  {item.quantity}
                </span>

                <button
                  onClick={() =>
                    increaseQuantity(
                      item.item_id,
                      item.variant_id
                    )
                  }
                  className="p-3 transition hover:bg-slate-100"
                >
                  <Plus size={16} />
                </button>
              </div>

              <div className="text-right">
                <p className="text-xs text-slate-400">
                  Total
                </p>

                <p className="text-xl font-bold text-green-600">
                  ₹
                  {item.price *
                    item.quantity}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="mt-5 border-t pt-5">
          <SpecialInstruction
            value={item.notes}
            onSave={(notes) =>
              updateNotes(
                item.item_id,
                item.variant_id,
                notes
              )
            }
          />
        </div>
      </div>
    </div>
  );
}