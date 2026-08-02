import {
  AnimatePresence,
  motion,
} from "framer-motion";
import { X } from "lucide-react";

import { useVariant } from "../hooks/useVariant";
import VariantQuantityCard from "./VariantQuantityCard";

export default function VariantBottomSheet() {
  const {
    isOpen,
    menuItem,
    close,

    increase,
    decrease,
    getQuantity,

    totalItems,
    totalPrice,

    confirm,
  } = useVariant();

  if (!menuItem) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              type: "spring",
              damping: 28,
              stiffness: 280,
            }}
            className="
              fixed
              bottom-0
              left-0
              right-0
              z-50
              flex
              max-h-[90vh]
              flex-col
              rounded-t-3xl
              bg-white
              shadow-2xl

              md:left-auto
              md:right-6
              md:bottom-6
              md:h-[720px]
              md:w-[460px]
              md:rounded-3xl
            "
          >
            {/* Drag Handle */}
            <div className="flex justify-center py-3 md:hidden">
              <div className="h-1.5 w-14 rounded-full bg-slate-300" />
            </div>

            {/* Header */}
            <div className="flex items-start justify-between border-b px-6 pb-5">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {menuItem.item_name}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Choose one or more variants
                </p>
              </div>

              <button
                onClick={close}
                className="rounded-xl p-2 transition hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* Variant List */}
            <div className="flex-1 space-y-4 overflow-y-auto p-6">
              {menuItem.variants.map(
                (variant) => (
                  <VariantQuantityCard
                    key={variant.variant_id}
                    variant={variant}
                    quantity={getQuantity(
                      variant.variant_id
                    )}
                    onIncrease={increase}
                    onDecrease={decrease}
                  />
                )
              )}
            </div>

            {/* Sticky Footer */}
            <div className="border-t bg-white p-6 shadow-[0_-6px_20px_rgba(0,0,0,0.06)]">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    Items Selected
                  </p>

                  <h3 className="text-xl font-bold text-slate-900">
                    {totalItems}
                  </h3>
                </div>

                <div className="text-right">
                  <p className="text-sm text-slate-500">
                    Total Amount
                  </p>

                  <h3 className="text-3xl font-bold text-indigo-600">
                    ₹{totalPrice}
                  </h3>
                </div>
              </div>

              <button
                onClick={confirm}
                disabled={totalItems === 0}
                className="
                  h-14
                  w-full
                  rounded-2xl
                  bg-indigo-600
                  text-lg
                  font-semibold
                  text-white
                  transition
                  hover:bg-indigo-700
                  disabled:cursor-not-allowed
                  disabled:bg-slate-300
                "
              >
                {totalItems === 0
                  ? "Select Variants"
                  : `Add ${totalItems} Item${
                      totalItems > 1
                        ? "s"
                        : ""
                    } • ₹${totalPrice}`}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}