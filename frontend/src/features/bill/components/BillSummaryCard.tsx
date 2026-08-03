import {
  forwardRef,
} from "react";

import { motion } from "framer-motion";

import {
  ChevronRight,
  Receipt,
  Sparkles,
} from "lucide-react";

import type {
  CustomerBill,
} from "../types/customerBill.types";

import {
  useBillSheet,
} from "../context/BillSheetProvider";

interface Props {
  bill: CustomerBill;
}

const BillSummaryCard = forwardRef<
  HTMLButtonElement,
  Props
>(function BillSummaryCard(
  {
    bill,
  },
  ref
) {
  const {
    openSheet,
  } = useBillSheet();

  if (!bill.bill_generated) {
    return null;
  }

  return (
    <motion.button
      ref={ref}
      onClick={openSheet}
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      whileHover={{
        y: -4,
        scale: 1.01,
      }}
      whileTap={{
        scale: 0.98,
      }}
      transition={{
        duration: 0.3,
      }}
      className="
        group
        relative
        w-full
        overflow-hidden
        rounded-[32px]
        border
        border-emerald-200/70
        bg-white
        p-7
        text-left
        shadow-xl
        transition-all
      "
    >
      {/* Background Glow */}

      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-emerald-200/30 blur-3xl" />

      <div className="absolute -left-10 bottom-0 h-28 w-28 rounded-full bg-green-100/40 blur-2xl" />

      {/* Shine */}

      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition duration-700 group-hover:translate-x-full group-hover:opacity-100" />

      <div className="relative">

        {/* Header */}

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-5">

            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-lg">

              <Receipt size={30} />

            </div>

            <div>

              <div className="flex items-center gap-2">

                <Sparkles
                  size={15}
                  className="text-amber-500"
                />

                <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">

                  Ready

                </span>

              </div>

              <h3 className="mt-1 text-2xl font-bold text-slate-900">

                Your Bill

              </h3>

              <p className="mt-1 text-sm text-slate-500">

                View your receipt and complete payment

              </p>

            </div>

          </div>

          <div className="rounded-2xl bg-slate-100 p-3 transition group-hover:bg-emerald-50">

            <ChevronRight
              size={22}
              className="text-slate-600 transition group-hover:text-emerald-600"
            />

          </div>

        </div>

        {/* Divider */}

        <div className="my-6 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        {/* Totals */}

        <div className="grid grid-cols-3 gap-4">

          <div className="rounded-2xl bg-slate-50 p-4">

            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">

              Items

            </p>

            <p className="mt-2 text-2xl font-bold text-slate-900">

              {bill.items.length}

            </p>

          </div>

          <div className="rounded-2xl bg-slate-50 p-4">

            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">

              GST

            </p>

            <p className="mt-2 text-2xl font-bold text-slate-900">

              ₹{bill.gst}

            </p>

          </div>

          <div className="rounded-2xl bg-emerald-50 p-4">

            <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">

              Total

            </p>

            <p className="mt-2 text-3xl font-black text-emerald-600">

              ₹{bill.grand_total}

            </p>

          </div>

        </div>

        {/* Footer */}

        <div className="mt-6 flex items-center justify-between rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 px-5 py-4 text-white shadow-lg">

          <div>

            <p className="text-xs uppercase tracking-wider text-emerald-100">

              Payment Status

            </p>

            <p className="mt-1 text-lg font-bold">

              {bill.bill_status}

            </p>

          </div>

          <div className="flex items-center gap-2 rounded-xl bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">

            View Receipt

            <ChevronRight size={18} />

          </div>

        </div>

      </div>

    </motion.button>
  );
});

BillSummaryCard.displayName =
  "BillSummaryCard";

export default BillSummaryCard;