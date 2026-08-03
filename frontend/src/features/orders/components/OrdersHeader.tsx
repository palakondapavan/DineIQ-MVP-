import { motion } from "framer-motion";
import {
  ArrowLeft,
  Receipt,
  UtensilsCrossed,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { sessionStorage } from "@/features/customer-session/utils/sessionStorage";

export default function OrdersHeader() {
  const navigate = useNavigate();

  const stored = sessionStorage.load();

  function handleBack() {
    if (stored?.requestId) {
      navigate(
        `/customer/menu/${stored.requestId}`
      );
    } else {
      navigate(-1);
    }
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.35,
      }}
      className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 p-7 text-white shadow-2xl"
    >
      {/* Decorative Blobs */}

      <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10 blur-2xl" />

      <div className="absolute -bottom-8 left-1/3 h-24 w-24 rounded-full bg-white/10 blur-xl" />

      <div className="relative flex items-center">
        {/* Back Button */}

        <button
          onClick={handleBack}
          className="mr-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur transition-all hover:bg-white/20"
        >
          <ArrowLeft size={22} />
        </button>

        {/* Title */}

        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
              <Receipt size={22} />
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Your Orders
              </h1>

              <p className="mt-1 text-sm text-indigo-100">
                Track every dish in
                real-time
              </p>
            </div>
          </div>
        </div>

        {/* Table Card */}

        {stored?.tableId && (
          <div className="rounded-2xl border border-white/20 bg-white/10 px-5 py-3 backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-white/15 p-2">
                <UtensilsCrossed
                  size={18}
                />
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-indigo-100">
                  Table
                </p>

                <p className="text-xl font-bold">
                  #{stored.tableId}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}