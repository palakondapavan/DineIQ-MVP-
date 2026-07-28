import { ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";

interface FloatingCartProps {
  onOpen: () => void;
}

export default function FloatingCart({
  onOpen,
}: FloatingCartProps) {
  const totalItems = useCartStore((state) =>
    state.getTotalItems()
  );

  const subtotal = useCartStore((state) =>
    state.getSubtotal()
  );

  if (totalItems === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 120, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed bottom-5 left-1/2 z-50 w-[95%] max-w-lg -translate-x-1/2"
      >
        <Button
          onClick={onOpen}
          className="flex h-16 w-full items-center justify-between rounded-2xl px-6 text-base shadow-xl"
        >
          <div className="flex items-center gap-3">
            <ShoppingCart size={22} />

            <div className="text-left">
              <p className="font-semibold">
                {totalItems} Item{totalItems > 1 ? "s" : ""}
              </p>

              <p className="text-xs opacity-80">
                Ready to order
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="font-bold">
              ₹{subtotal}
            </p>

            <p className="text-xs opacity-80">
              View Cart →
            </p>
          </div>
        </Button>
      </motion.div>
    </AnimatePresence>
  );
}