import { motion } from "framer-motion";
import {
  Flame,
  Leaf,
  Minus,
  Plus,
} from "lucide-react";

import type { MenuItem } from "../../types/customerMenu.types";

interface MenuCardProps {
  item: MenuItem;

  quantity: number;

  onAdd: (itemId: number) => void;

  onIncrease: (itemId: number) => void;

  onDecrease: (itemId: number) => void;
}

export default function MenuCard({
  item,
  quantity,
  onAdd,
  onIncrease,
  onDecrease,
}: MenuCardProps) {
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

          {!item.is_available ? null : quantity === 0 ? (
            <button
              onClick={() =>
                onAdd(item.item_id)
              }
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2 font-semibold text-white hover:bg-indigo-700"
            >
              <Plus size={18} />
              Add
            </button>
          ) : (
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-2">
              <button
                onClick={() =>
                  onDecrease(item.item_id)
                }
              >
                <Minus size={18} />
              </button>

              <span>{quantity}</span>

              <button
                onClick={() =>
                  onIncrease(item.item_id)
                }
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