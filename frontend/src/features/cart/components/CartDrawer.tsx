import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

import { useCart } from "../hooks/useCart";
import { useCartDrawer } from "../hooks/useCartDrawer";

import CartHeader from "./CartHeader";
import CartSummary from "./CartSummary";
import EmptyCart from "./EmptyCart";
import CartList from "./CartList";

import PlaceOrderButton from "@/features/orders/components/PlaceOrderButton";

export default function CartDrawer() {
  const {
    items,
    totalItems,
  } = useCart();

  const {
    isOpen,
    close,
  } = useCartDrawer();

  /**
   * Close drawer using ESC
   */
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (event.key === "Escape") {
        close();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.2,
            }}
            onClick={close}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          />

          {/* Mobile Drawer */}
          <motion.div
            initial={{
              y: "100%",
            }}
            animate={{
              y: 0,
            }}
            exit={{
              y: "100%",
            }}
            transition={{
              type: "spring",
              stiffness: 320,
              damping: 30,
            }}
            className="
              fixed
              bottom-0
              left-0
              right-0
              z-50
              flex
              h-[90vh]
              flex-col
              rounded-t-3xl
              bg-slate-50
              shadow-2xl
              md:hidden
            "
          >
            {/* Drag Handle */}
            <div className="flex justify-center py-3">
              <div className="h-1.5 w-14 rounded-full bg-slate-300" />
            </div>

            <CartHeader
              totalItems={totalItems}
              onClose={close}
            />

            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <EmptyCart
                  onClose={close}
                />
              ) : (
                <CartList />
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t bg-white p-6">
                <CartSummary />

                <div className="mt-6">
                  <PlaceOrderButton />
                </div>
              </div>
            )}
          </motion.div>

          {/* Desktop Drawer */}
          <motion.div
            initial={{
              x: "100%",
            }}
            animate={{
              x: 0,
            }}
            exit={{
              x: "100%",
            }}
            transition={{
              type: "spring",
              stiffness: 320,
              damping: 30,
            }}
            className="
              fixed
              right-0
              top-0
              z-50
              hidden
              h-screen
              w-[460px]
              flex-col
              border-l
              bg-slate-50
              shadow-2xl
              md:flex
            "
          >
            <CartHeader
              totalItems={totalItems}
              onClose={close}
            />

            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <EmptyCart
                  onClose={close}
                />
              ) : (
                <CartList />
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t bg-white p-6">
                <CartSummary />

                <div className="mt-6">
                  <PlaceOrderButton />
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}