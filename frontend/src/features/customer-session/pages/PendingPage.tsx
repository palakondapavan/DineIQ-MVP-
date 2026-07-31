import { motion } from "framer-motion";
import {
  Clock3,
  UtensilsCrossed,
} from "lucide-react";
import { useParams } from "react-router-dom";

export default function PendingPage() {
  const { tableId } = useParams();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50 px-5 py-10">
      <motion.div
        initial={{
          opacity: 0,
          y: 25,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.45,
        }}
        className="w-full max-w-md"
      >
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-10 text-center text-white">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
              <UtensilsCrossed size={30} />
            </div>

            <h1 className="text-3xl font-bold">
              DineIQ
            </h1>

            <p className="mt-2 text-amber-100">
              Table Currently Unavailable
            </p>

            <div className="mt-6 inline-flex rounded-full bg-white/15 px-5 py-2 backdrop-blur">
              <span className="font-semibold">
                Table #{tableId}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6 p-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
              <Clock3
                size={32}
                className="text-amber-600"
              />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800">
                Pending Customer Request
              </h2>

              <p className="mt-3 text-slate-600">
                Another customer has already
                requested this table and is waiting
                for waiter approval.
              </p>

              <p className="mt-4 text-sm text-slate-500">
                Please wait until the request is
                accepted or rejected before
                scanning this QR code again.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}