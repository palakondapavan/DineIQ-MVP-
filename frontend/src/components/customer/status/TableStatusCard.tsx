import { motion } from "framer-motion";
import {
  LoaderCircle,
  Clock3,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import StatusTimeline from "./StatusTimeline";
import StatusChecklist from "./StatusChecklist";

export default function TableStatusCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="mb-8 overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50 shadow-xl"
    >
      <div className="p-7">

        <div className="flex items-start gap-5">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">

            <LoaderCircle
              className="h-7 w-7 animate-spin text-blue-600"
            />

          </div>

          <div className="flex-1">

            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
              TABLE ACTIVATION
            </span>

            <h2 className="mt-3 text-2xl font-bold text-slate-900">
              Waiting for Waiter Approval
            </h2>

            <p className="mt-2 text-slate-600 leading-relaxed">
              Your request has been received successfully.
              A waiter will activate your table shortly.
              You can explore the menu and prepare your cart while waiting.
            </p>

          </div>

        </div>

        <div className="mt-8">

          <StatusTimeline />

        </div>

        <div className="mt-8">

          <StatusChecklist />

        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-4">

          <div className="flex items-center gap-3">

            <Clock3 className="h-5 w-5 text-blue-600" />

            <div>

              <p className="text-sm font-medium text-slate-700">
                Estimated Approval Time
              </p>

              <p className="text-sm text-slate-500">
                Usually less than 1 minute
              </p>

            </div>

          </div>

        </div>

        <Button
          disabled
          className="mt-8 h-12 w-full rounded-xl"
        >
          Waiting for Approval...
        </Button>

      </div>
    </motion.div>
  );
}