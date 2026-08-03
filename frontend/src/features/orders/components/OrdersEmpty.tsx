import { motion } from "framer-motion";
import {
  ArrowRight,
  PackageSearch,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { sessionStorage } from "@/features/customer-session/utils/sessionStorage";

export default function OrdersEmpty() {
  const navigate = useNavigate();

  const stored =
    sessionStorage.load();

  function handleBrowseMenu() {
    if (stored?.requestId) {
      navigate(
        `/customer/menu/${stored.requestId}`
      );
    }
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
      }}
      className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-xl"
    >
      {/* Hero */}

      <div className="relative bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 px-8 py-10 text-center">
        <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/10 blur-2xl" />

        <div className="absolute -bottom-8 left-10 h-24 w-24 rounded-full bg-white/10 blur-xl" />

        <motion.div
          animate={{
            y: [0, -6, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-white/15 backdrop-blur"
        >
          <PackageSearch
            size={52}
            className="text-white"
          />
        </motion.div>
      </div>

      {/* Content */}

      <div className="px-8 py-10 text-center">
        <h2 className="text-3xl font-bold text-slate-900">
          No Orders Yet
        </h2>

        <p className="mx-auto mt-4 max-w-md text-slate-500">
          Looks like you haven't ordered anything
          yet. Explore our delicious menu and place
          your first order.
        </p>

        {stored?.requestId && (
          <button
            onClick={
              handleBrowseMenu
            }
            className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-7 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            Browse Menu

            <ArrowRight
              size={18}
            />
          </button>
        )}
      </div>
    </motion.div>
  );
}