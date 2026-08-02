import { motion } from "framer-motion";
import {
  Flame,
  Leaf,
  Minus,
  Plus,
  ShoppingBag,
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
    increaseQuantity,
    decreaseQuantity,

    getItemQuantity,
    getVariantCount,
    hasItem,
    items,
  } = useCart();

  const hasVariants =
    item.variants.length > 1;

  const totalQuantity =
    getItemQuantity(item.item_id);

  const variantCount =
    getVariantCount(item.item_id);

  const itemExists =
    hasItem(item.item_id);

  const cartItem =
    items.find(
      (itemInCart) =>
        itemInCart.item_id ===
        item.item_id
    ) ?? null;

  const startingPrice =
    item.variants.length > 0
      ? Math.min(
          ...item.variants.map(
            (variant) => variant.price
          )
        )
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

        {hasVariants && (
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

          <p className="mt-1 line-clamp-2 text-sm text-slate-500">
            {item.description}
          </p>
        </div>

        {/* Price */}
        <div>
          {hasVariants && (
            <p className="text-xs text-slate-400">
              Starts From
            </p>
          )}

          <h3 className="text-2xl font-bold text-indigo-600">
            ₹{startingPrice}
          </h3>
        </div>

        {/* Variant Summary */}
        {hasVariants && itemExists && (
          <div className="rounded-xl border border-indigo-100 bg-indigo-50 px-3 py-2">
            <div className="flex items-center gap-2">
              <ShoppingBag
                size={16}
                className="text-indigo-600"
              />

              <div>
                <p className="text-sm font-semibold text-indigo-700">
                  {variantCount} Variant
                  {variantCount > 1
                    ? "s"
                    : ""}{" "}
                  Added
                </p>

                <p className="text-xs text-indigo-500">
                  {totalQuantity} Item
                  {totalQuantity > 1
                    ? "s"
                    : ""}{" "}
                  in Cart
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-end">
          {!item.is_available ? null : hasVariants ? (
            <button
              onClick={() => open(item)}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2 font-semibold text-white transition hover:bg-indigo-700"
            >
              <Plus size={18} />

              {itemExists
                ? "Add More"
                : "Customize"}
            </button>
          ) : totalQuantity === 0 ? (
            <button
              onClick={() => open(item)}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2 font-semibold text-white transition hover:bg-indigo-700"
            >
              <Plus size={18} />
              Add
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

              <span className="min-w-6 text-center font-semibold">
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