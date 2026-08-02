import { motion, AnimatePresence } from "framer-motion";
import { Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { sessionStorage } from "@/features/customer-session/utils/sessionStorage";

export default function FloatingOrdersButton() {
  const navigate = useNavigate();

  const stored = sessionStorage.load();

  if (!stored?.sessionId) {
    return null;
  }

  return (
    <AnimatePresence>
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
          scale: 0.95,
        }}
        transition={{
          type: "spring",
          stiffness: 350,
          damping: 22,
        }}
        onClick={() =>
          navigate("/customer/session/${sessionId}/orders")
        }
        className="
          fixed
          bottom-24
          left-6
          z-50
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-full
          bg-white
          text-slate-700
          shadow-2xl
          transition
          hover:bg-slate-100
        "
      >
        <Package size={26} />
      </motion.button>
    </AnimatePresence>
  );
}