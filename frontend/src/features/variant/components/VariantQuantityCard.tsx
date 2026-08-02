import { motion } from "framer-motion";
import {
  Minus,
  Plus,
  Check,
} from "lucide-react";

import type { Variant } from "../types/variant.types";

interface VariantQuantityCardProps {
  variant: Variant;

  quantity: number;

  onIncrease: (
    variant: Variant
  ) => void;

  onDecrease: (
    variant: Variant
  ) => void;
}

export default function VariantQuantityCard({
  variant,
  quantity,
  onIncrease,
  onDecrease,
}: VariantQuantityCardProps) {
  const selected = quantity > 0;

  return (
    <motion.div
      layout
      whileTap={{ scale: 0.99 }}
      className={`
        rounded-2xl
        border
        p-5
        transition-all
        duration-200

        ${
          selected
            ? "border-indigo-600 bg-indigo-50 shadow-md"
            : "border-slate-200 bg-white hover:border-indigo-300 hover:shadow-sm"
        }
      `}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-slate-900">
              {variant.variant_name}
            </h3>

            {selected && (
              <Check
                size={18}
                className="text-indigo-600"
              />
            )}
          </div>

          <p className="mt-1 text-sm text-slate-500">
            Choose quantity
          </p>
        </div>

        <div className="text-right">
          <p className="text-2xl font-bold text-indigo-600">
            ₹{variant.price}
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
          <button
            onClick={() =>
              onDecrease(variant)
            }
            disabled={quantity === 0}
            className="
              rounded-lg
              p-2
              transition
              hover:bg-slate-100
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            <Minus size={18} />
          </button>

          <motion.span
            key={quantity}
            initial={{
              scale: 0.8,
              opacity: 0.5,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              duration: 0.15,
            }}
            className="min-w-8 text-center text-lg font-bold"
          >
            {quantity}
          </motion.span>

          <button
            onClick={() =>
              onIncrease(variant)
            }
            className="
              rounded-lg
              p-2
              transition
              hover:bg-slate-100
            "
          >
            <Plus size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}