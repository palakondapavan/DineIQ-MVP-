import { motion } from "framer-motion";
import {
  Clock3,
  UtensilsCrossed,
} from "lucide-react";

interface TableStatusBannerProps {
  status: "PENDING" | "ACCEPTED" | "REJECTED";
}

export default function TableStatusBanner({
  status,
}: TableStatusBannerProps) {

  if (status === "PENDING") {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mb-8 overflow-hidden rounded-2xl border border-orange-200 bg-orange-50"
      >
        <div className="flex items-start gap-4 p-5">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-100">

            <Clock3 className="h-6 w-6 text-orange-600" />

          </div>

          <div className="flex-1">

            <div className="flex items-center gap-2">

              <UtensilsCrossed className="h-4 w-4 text-orange-600" />

              <h3 className="text-base font-semibold text-slate-900">
                Table Activation Pending
              </h3>

            </div>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Your table request has been received.
              A waiter will activate your table shortly.
            </p>

            <p className="mt-2 text-sm font-medium text-orange-700">
              You can browse the menu and add items to your cart while you wait.
            </p>

          </div>

        </div>
      </motion.div>
    );
  }

  if (status === "ACCEPTED") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-8 overflow-hidden rounded-2xl border border-green-200 bg-green-50"
      >
        <div className="flex items-start gap-4 p-5">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">

            <span className="text-xl">✅</span>

          </div>

          <div>

            <h3 className="text-base font-semibold text-slate-900">
              Table Activated
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Your table has been activated successfully.
              You can now place your order.
            </p>

          </div>

        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mb-8 overflow-hidden rounded-2xl border border-red-200 bg-red-50"
    >
      <div className="flex items-start gap-4 p-5">

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100">

          <span className="text-xl">❌</span>

        </div>

        <div>

          <h3 className="text-base font-semibold text-slate-900">
            Table Request Declined
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            We couldn't activate your table.
            Please contact a waiter for assistance.
          </p>

        </div>

      </div>
    </motion.div>
  );
}