import { motion } from "framer-motion";
import {
  Flame,
  Leaf,
  Minus,
  Plus,
} from "lucide-react";

import { useCart } from "@/features/cart/hooks/useCart";
import { useVariant } from "@/features/variant/hooks/useVariant";

import type { MenuItem } from "../../types/customerMenu.types";

interface MenuCardProps {
  item: MenuItem;
}

export default function MenuCard({
  item,
}: MenuCardProps) {
  const { open } = useVariant();

  const {
    items,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const cartItems = items.filter(
    (cartItem) =>
      cartItem.item_id === item.item_id
  );

  const totalQuantity = cartItems.reduce(
    (sum, cartItem) => sum + cartItem.quantity,
    0
  );

  const hasMultipleVariants =
    cartItems.length > 1;

  const cartItem = cartItems[0] ?? null;

  const price =
    item.variants.length > 0
      ? item.variants[0].price
      : 0;

  return (
    <motion.div
      layout
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="overflow-hidden rounded-2xl bg-white shadow transition hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative h-52 bg-slate-100">
        {item.image_url ? (
          <img
            src={item.image_url}
            alt={item.item_name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-400">
            No Image
          </div>
        )}

        {item.food_type === "VEG" ? (
          <div className="absolute right-3 top-3 rounded-full bg-white p-2 shadow">
            <Leaf
              size={18}
              className="text-green-600"
            />
          </div>
        ) : (
          <div className="absolute right-3 top-3 rounded-full bg-white p-2 shadow">
            <div className="h-4 w-4 rounded-full bg-red-600" />
          </div>
        )}

        {!item.is_available && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <span className="rounded-full bg-red-600 px-4 py-2 text-white">
              Out of Stock
            </span>
          </div>
        )}

        {item.variants.length > 1 && (
          <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
            <Flame size={12} />
            {item.variants.length} Variants
          </div>
        )}
      </div>

      {/* Body */}
      <div className="space-y-4 p-5">
        <div>
          <h3 className="text-lg font-bold text-slate-800">
            {item.item_name}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {item.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-indigo-600">
            ₹{price}
          </span>

          {!item.is_available ? null : totalQuantity === 0 ? (
            <button
              onClick={() => open(item)}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2 font-semibold text-white hover:bg-indigo-700"
            >
              <Plus size={18} />
              Add
            </button>
          ) : hasMultipleVariants ? (
            <button
              className="rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700"
            >
              {totalQuantity} in Cart
            </button>
          ) : (
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-2">
              <button
                onClick={() => {
                  if (!cartItem) return;

                  decreaseQuantity(
                    cartItem.item_id,
                    cartItem.variant_id
                  );
                }}
              >
                <Minus size={18} />
              </button>

              <span className="min-w-6 text-center">
                {totalQuantity}
              </span>

              <button
                onClick={() => {
                  if (!cartItem) return;

                  increaseQuantity(
                    cartItem.item_id,
                    cartItem.variant_id
                  );
                }}
              >
                <Plus size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}