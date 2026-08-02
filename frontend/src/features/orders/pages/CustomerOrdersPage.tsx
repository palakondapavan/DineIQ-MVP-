import { Navigate } from "react-router-dom";

import { sessionStorage } from "@/features/customer-session/utils/sessionStorage";

import { useCustomerOrders } from "../hooks/useCustomerOrders";

import OrdersHeader from "../components/OrdersHeader";
import OrdersEmpty from "../components/OrdersEmpty";
import OrdersList from "../components/OrdersList";
import OrdersSkeleton from "../components/OrdersSkeleton";

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-100">
        <main className="mx-auto max-w-5xl space-y-6 p-6">
          <OrdersHeader />

          <OrdersSkeleton />
        </main>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-slate-100">
        <main className="mx-auto max-w-5xl space-y-6 p-6">
          <OrdersHeader />

          <div className="rounded-3xl bg-white p-10 text-center shadow">
            <h2 className="text-xl font-semibold text-red-600">
              Unable to load orders
            </h2>

            <button
              onClick={() =>
                refetch()
              }
              className="mt-5 rounded-xl bg-indigo-600 px-6 py-3 text-white"
            >
              Retry
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <main className="mx-auto max-w-5xl space-y-6 p-6">
        <OrdersHeader />

        {orders.length === 0 ? (
          <OrdersEmpty />
        ) : (
          <OrdersList
            orders={orders}
          />
        )}
      </main>
    </div>
  );
}