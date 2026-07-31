import { useState } from "react";
import { useParams } from "react-router-dom";

import WaitingBanner from "../components/WaitingBanner";

import MenuHeader from "../components/Menu/MenuHeader";
import MenuSearch from "../components/Menu/MenuSearch";
import CategoryTabs from "../components/Menu/CategoryTabs";
import MenuGrid from "../components/Menu/MenuGrid";

import { useCustomerMenu } from "../hooks/useCustomerMenu";
import { useRequestMonitor } from "../hooks/useRequestMonitor";
import { useActiveSession } from "../hooks/useActiveSession";

import { sessionStorage } from "../utils/sessionStorage";

import { useCart } from "@/features/cart/hooks/useCart";

export default function CustomerMenuPage() {
  const { requestId } = useParams<{
    requestId: string;
  }>();

  const stored = sessionStorage.load();

  const [sessionId, setSessionId] =
    useState<number | null>(
      stored?.sessionId ?? null
    );

  /**
   * Monitor request until waiter accepts.
   */
  const monitor = useRequestMonitor({
    requestId: Number(requestId),

    onSessionCreated: (id) => {
      setSessionId(id);
    },
  });

  /**
   * Active Session
   */
  const {
    session,
    hasSession,
    canPlaceOrders,
  } = useActiveSession(sessionId);

  /**
   * Menu
   */
  const {
    categories,
    menuItems,
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
    isLoading: menuLoading,
    isError: menuError,
  } = useCustomerMenu();

  /**
   * Cart
   */
  const { totalItems } = useCart();

  if (menuLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-500">
          Loading menu...
        </p>
      </div>
    );
  }

  if (menuError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <h2 className="text-xl font-semibold text-red-600">
            Unable to load menu
          </h2>

          <p className="mt-2 text-slate-500">
            Please try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {!hasSession &&
        monitor.isPending && (
          <WaitingBanner />
        )}

      <main className="mx-auto max-w-7xl space-y-6 p-6">
        <MenuHeader
          customerName={
            session?.customer_name ??
            "Guest"
          }
          tableId={
            session?.table_id ??
            stored?.tableId ??
            0
          }
        />

        <MenuSearch
          value={search}
          onChange={setSearch}
        />

        <CategoryTabs
          categories={categories}
          selectedCategory={
            selectedCategory
          }
          onSelect={
            setSelectedCategory
          }
        />

        <MenuGrid
          items={menuItems}
        />

        {/* Floating Cart */}
        <div className="fixed bottom-24 right-6">
          <button
            disabled={totalItems === 0}
            className="rounded-full bg-indigo-600 px-6 py-4 font-semibold text-white shadow-xl transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cart ({totalItems})
          </button>
        </div>

        {/* Place Order */}
        <div className="sticky bottom-0 rounded-2xl bg-white p-5 shadow-xl">
          <button
            disabled={
              !canPlaceOrders ||
              totalItems === 0
            }
            className="h-14 w-full rounded-xl bg-green-600 text-lg font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {canPlaceOrders
              ? "Place Order"
              : "Waiting for Waiter..."}
          </button>
        </div>
      </main>
    </div>
  );
}