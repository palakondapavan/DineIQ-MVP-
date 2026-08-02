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

import FloatingCartButton from "@/features/cart/components/FloatingCartButton";
import CartDrawer from "@/features/cart/components/CartDrawer";

import OrdersBottomBar  from "@/features/orders/components/OrdersBottomBar";

export default function CustomerMenuPage() {
  const { requestId } = useParams<{
    requestId: string;
  }>();

  /**
   * Session
   */
  const stored = sessionStorage.load();

  const sessionId =
    stored?.sessionId ?? null;

  /**
   * Waiter Approval Monitor
   */
  const monitor = useRequestMonitor({
    requestId: Number(requestId),

    enabled: sessionId === null,

    onSessionCreated: () => {},
  });

  /**
   * Active Session
   */
  const {
    session,
    hasSession,
  } = useActiveSession(sessionId);

  /**
   * Customer Menu
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

      <main className="mx-auto max-w-7xl space-y-6 p-6 pb-10">
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
      </main>

      {/* Floating Orders FAB */}
      <OrdersBottomBar  />


      {/* Floating Cart FAB */}
      <FloatingCartButton />

      {/* Cart Drawer */}
      <CartDrawer />
    </div>
  );
}