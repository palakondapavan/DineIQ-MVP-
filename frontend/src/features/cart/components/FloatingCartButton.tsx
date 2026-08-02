import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart } from "lucide-react";

import { useCart } from "../hooks/useCart";
import { useCartDrawer } from "../hooks/useCartDrawer";

export default function FloatingCartButton() {
  const { totalItems } = useCart();

  const { open } = useCartDrawer();

  return (
    <AnimatePresence>
      {totalItems > 0 && (
        <motion.button
          initial={{
            scale: 0.6,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          exit={{
            scale: 0.6,
            opacity: 0,
          }}
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.92,
          }}
          transition={{
            type: "spring",
            stiffness: 350,
            damping: 22,
          }}
          onClick={open}
          className="
            fixed
            bottom-24
            right-6
            z-50
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-full
            bg-indigo-600
            text-white
            shadow-2xl
            transition
            hover:bg-indigo-700
          "
        >
          <ShoppingCart size={26} />

          {/* Badge */}
          <motion.div
            key={totalItems}
            initial={{
              scale: 0,
            }}
            animate={{
              scale: 1,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
            }}
            className="
              absolute
              -right-1
              -top-1
              flex
              h-7
              min-w-7
              items-center
              justify-center
              rounded-full
              border-2
              border-white
              bg-red-500
              px-1
              text-xs
              font-bold
              text-white
            "
          >
            {totalItems > 99
              ? "99+"
              : totalItems}
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}