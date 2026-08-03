import { useState } from "react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  CreditCard,
  Receipt,
  Store,
  X,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useBillSheet,
} from "../context/BillSheetProvider";

import {
  usePayBill,
} from "../hooks/usePayBill";

import type {
  CustomerBill,
} from "../types/customerBill.types";

import BillItem from "./BillItem";
import BillFooter from "./BillFooter";

import {
  useConfirmDialog,
} from "@/shared/components/confirm-dialog";

import {
  sessionStorage,
} from "@/features/customer-session/utils/sessionStorage";

interface Props {
  bill: CustomerBill;
}

export default function BillBottomSheet({
  bill,
}: Props) {

  const {
    open,
    closeSheet,
  } = useBillSheet();

  const payBill =
    usePayBill();

  const confirm =
    useConfirmDialog();

  const navigate =
    useNavigate();

  const [
    success,
    setSuccess,
  ] = useState(false);

  if (
    !bill.bill_generated
  ) {
    return null;
  }

  async function handlePay() {

    if (
      !bill.bill_id
    ) {
      return;
    }

    const confirmed =
      await confirm({

        variant: "success",

        title: "Confirm Payment",

        description:
          `Pay ₹${bill.grand_total} and complete your dining session?`,

        confirmText:
          "Pay Now",

        cancelText:
          "Cancel",

      });

    if (!confirmed) {
      return;
    }

    try {

      await payBill.mutateAsync(
        bill.bill_id
      );

      setSuccess(
        true
      );

      setSuccess(true);

    } catch (error) {

      console.error(error);

    }

  }

  return (

    <AnimatePresence>

      {open && (

        <>

          <motion.div

            initial={{
              opacity: 0,
            }}

            animate={{
              opacity: 1,
            }}

            exit={{
              opacity: 0,
            }}

            onClick={
              closeSheet
            }

            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"

          />

          <motion.div

            initial={{
              y: "100%",
            }}

            animate={{
              y: 0,
            }}

            exit={{
              y: "100%",
            }}

            transition={{
              type: "spring",
              stiffness: 240,
              damping: 28,
            }}

            className="
              fixed
              bottom-0
              left-0
              right-0
              z-50
              flex
              max-h-[92vh]
              flex-col
              overflow-hidden
              rounded-t-[32px]
              bg-white
              shadow-2xl
            "

          >

            {/* Handle */}

            <div className="flex justify-center py-3">

              <div className="h-1.5 w-14 rounded-full bg-slate-300" />

            </div>

            {/* Header */}

            <div className="border-b border-slate-200 px-6 pb-5">

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-4">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white">

                    <Store size={24} />

                  </div>

                  <div>

                    <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">

                      Receipt

                    </p>

                    <h2 className="text-2xl font-black">

                      DineIQ

                    </h2>

                    <p className="text-sm text-slate-500">

                      Bill #{bill.bill_id}

                    </p>

                  </div>

                </div>

                <button

                  onClick={
                    closeSheet
                  }

                  className="rounded-xl p-2 hover:bg-slate-100"

                >

                  <X />

                </button>

              </div>

            </div>

            {/* Items */}

            <div className="flex-1 overflow-y-auto px-6 py-5">

              <div className="space-y-4">

                {bill.items.map(
                  (item) => (

                    <BillItem

                      key={
                        item.order_item_id
                      }

                      item={
                        item
                      }

                    />

                  )
                )}

              </div>
              <div className="mt-8">
                <BillFooter
                  bill={bill}
                />
              </div>
            </div>

            {/* Bottom Action */}

            <div className="border-t border-slate-200 bg-white p-6">

              <button
                onClick={
                  handlePay
                }
                disabled={
                  payBill.isPending ||
                  success ||
                  bill.bill_status ===
                    "PAID"
                }
                className="
                  flex
                  h-14
                  w-full
                  items-center
                  justify-center
                  gap-3
                  rounded-2xl
                  bg-gradient-to-r
                  from-emerald-600
                  to-green-500
                  text-lg
                  font-bold
                  text-white
                  shadow-lg
                  transition
                  hover:-translate-y-0.5
                  hover:shadow-xl
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                <CreditCard
                  size={20}
                />

                {payBill.isPending
                  ? "Processing Payment..."
                  : success
                  ? "Payment Successful"
                  : `Pay ₹${bill.grand_total}`}
              </button>

              <p className="mt-3 text-center text-xs text-slate-400">
                Secure payment powered by DineIQ
              </p>

            </div>

            {/* Success Overlay */}

            <AnimatePresence>

              {success && (

                <motion.div
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  className="
                    absolute
                    inset-0
                    flex
                    items-center
                    justify-center
                    bg-white/95
                    backdrop-blur-sm
                  "
                >

                  <motion.div
                    initial={{
                      scale: 0.8,
                    }}
                    animate={{
                      scale: 1,
                    }}
                    transition={{
                      type: "spring",
                    }}
                    className="text-center"
                  >

                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-xl">

                      <Receipt
                        size={42}
                      />

                    </div>

                    <h2 className="mt-6 text-3xl font-black text-slate-900">

                      Payment Successful

                    </h2>

                    <p className="mt-3 text-slate-500">

                      Thank you for dining with us.

                    </p>

                    <div className="mt-6 flex items-center justify-center gap-2 text-emerald-600">

                      <motion.div
                        animate={{
                          rotate: 360,
                        }}
                        transition={{
                          repeat:
                            Infinity,
                          duration: 1,
                          ease: "linear",
                        }}
                        className="h-4 w-4 rounded-full border-2 border-emerald-600 border-t-transparent"
                      />

                      <span className="font-medium">

                        Closing your session...

                      </span>

                    </div>

                  </motion.div>

                </motion.div>

              )}

            </AnimatePresence>

          </motion.div>

        </>

      )}

    </AnimatePresence>

  );

}