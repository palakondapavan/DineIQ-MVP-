import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";

import { sessionStorage } from "@/features/customer-session/utils/sessionStorage";

import { useCustomerOrders } from "../hooks/useCustomerOrders";

import OrdersHeader from "../components/OrdersHeader";
import OrdersEmpty from "../components/OrdersEmpty";
import OrdersList from "../components/OrdersList";
import OrdersSkeleton from "../components/OrdersSkeleton";

import { useCustomerBill } from "@/features/bill/hooks/useCustomerBill";
import BillSummaryCard from "@/features/bill/components/BillSummaryCard";
import BillBottomSheet from "@/features/bill/components/BillBottomSheet";

import { useRef } from "react";

import BillFloatingBar from "@/features/bill/components/BillFloatingBar";
import { useBillVisibility } from "@/features/bill/hooks/useBillVisibility";


export default function CustomerOrdersPage() {
  const session =
    sessionStorage.load();

  const sessionId =
    session?.sessionId ?? null;

  /**
   * No active dining session.
   */
  if (!sessionId) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  const {
    data: orders = [],
    isLoading,
    isError,
    refetch,
  } = useCustomerOrders(
    sessionId
  );

  const {
    data: bill,
  } = useCustomerBill(
    sessionId
  );

  const billRef =
    useRef<HTMLDivElement>(null);

  const billVisible =
    useBillVisibility(
      billRef
    );

  console.log(
    "Bill Visible:",
    billVisible
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-indigo-50/30 to-slate-100">
        <main className="mx-auto max-w-5xl px-5 py-8">
          <OrdersHeader />

          <div className="mt-8">
            <OrdersSkeleton />
          </div>
        </main>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-indigo-50/30 to-slate-100">
        <main className="mx-auto max-w-5xl px-5 py-8">
          <OrdersHeader />

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="mt-8 rounded-[32px] border border-red-100 bg-white p-12 text-center shadow-xl"
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-red-500 to-rose-600 text-4xl text-white shadow-lg">
              ⚠
            </div>

            <h2 className="mt-6 text-2xl font-bold text-slate-900">
              Unable to load your orders
            </h2>

            <p className="mt-3 text-slate-500">
              Something went wrong while fetching
              your orders.
            </p>

            <button
              onClick={() =>
                refetch()
              }
              className="mt-8 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              Retry
            </button>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-indigo-50/30 to-slate-100">
      <main className="mx-auto max-w-5xl px-5 py-8">
        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.4,
          }}
        >
          <OrdersHeader />
        </motion.div>

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
            delay: 0.1,
            duration: 0.4,
          }}
          className="mt-8"
        >
          {orders.length === 0 ? (
            <OrdersEmpty />
          ) : (
            <div className="space-y-6">
              <OrdersList
                orders={orders}
              />

              {bill?.bill_generated && (
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
                    delay: 0.15,
                    duration: 0.4,
                  }}
                >
                  <div ref={billRef}>
                    <BillSummaryCard
                      bill={bill}
                    />  
                  </div>
                </motion.div>
              )}

              {bill && (
                <>
                  <BillBottomSheet
                    bill={bill}
                  />

                  <BillFloatingBar
                    bill={bill}
                    visible={!billVisible}
                  />
                </>
              )}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}