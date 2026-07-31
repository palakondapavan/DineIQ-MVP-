import { Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useVariant } from "../hooks/useVariant";

export default function VariantBottomSheet() {
  const {
    isOpen,
    menuItem,
    selectedVariant,
    close,
    selectVariant,
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
              rounded-t-3xl
              bg-white
              shadow-2xl

              md:left-auto
              md:right-6
              md:bottom-6
              md:w-[420px]
              md:rounded-3xl
            "
          >
            {/* Drag Handle */}
            <div className="flex justify-center py-3 md:hidden">
              <div className="h-1.5 w-14 rounded-full bg-slate-300" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between border-b px-6 pb-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {menuItem.item_name}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Choose your preferred variant
                </p>
              </div>

              <button
                onClick={close}
                className="rounded-xl p-2 transition hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* Variants */}
            <div className="space-y-3 p-6">
              {menuItem.variants.map((variant) => {
                const active =
                  selectedVariant?.variant_id ===
                  variant.variant_id;

                return (
                  <button
                    key={variant.variant_id}
                    onClick={() =>
                      selectVariant(variant)
                    }
                    className={`
                      flex
                      w-full
                      items-center
                      justify-between
                      rounded-2xl
                      border
                      p-4
                      text-left
                      transition

                      ${
                        active
                          ? "border-indigo-600 bg-indigo-50"
                          : "border-slate-200 hover:border-indigo-300"
                      }
                    `}
                  >
                    <div>
                      <h3 className="font-semibold">
                        {variant.variant_name}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        ₹{variant.price}
                      </p>
                    </div>

                    {active && (
                      <Check
                        className="text-indigo-600"
                        size={22}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Footer */}
            <div className="border-t p-6">
              <button
                onClick={confirm}
                disabled={!selectedVariant}
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
                {selectedVariant
                  ? `Add • ₹${selectedVariant.price}`
                  : "Select Variant"}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}