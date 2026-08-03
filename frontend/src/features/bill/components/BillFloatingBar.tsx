import { motion, AnimatePresence } from "framer-motion";
import { Receipt, ChevronUp } from "lucide-react";

import type { CustomerBill } from "../types/customerBill.types";

import { useBillSheet } from "../context/BillSheetProvider";

interface Props {
  bill: CustomerBill;
  visible: boolean;
}

export default function BillFloatingBar({
  bill,
  visible,
}: Props) {
  const { openSheet } = useBillSheet();

  if (!bill.bill_generated) {
    return null;
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{
            y: 120,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          exit={{
            y: 120,
            opacity: 0,
          }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 25,
          }}
          onClick={openSheet}
          className="
            fixed
            bottom-6
            left-1/2
            z-40
            flex
            w-[92%]
            max-w-md
            -translate-x-1/2
            items-center
            justify-between
            rounded-3xl
            border
            border-emerald-200
            bg-white/90
            px-5
            py-4
            shadow-2xl
            backdrop-blur-xl
          "
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 text-white">
              <Receipt size={22} />
            </div>

            <div className="text-left">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                Bill Ready
              </p>

              <p className="text-lg font-bold text-slate-900">
                ₹{bill.grand_total}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600">
            View Bill
            <ChevronUp size={18} />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}