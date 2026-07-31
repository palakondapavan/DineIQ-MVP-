import { useParams } from "react-router-dom";

import WaitingBanner from "../components/WaitingBanner";

import MenuHeader from "../components/Menu/MenuHeader";
import MenuSearch from "../components/Menu/MenuSearch";
import CategoryTabs from "../components/Menu/CategoryTabs";
import MenuGrid from "../components/Menu/MenuGrid";

import { useCustomerSession } from "../hooks/useCustomerSession";
import { useCustomerMenu } from "../hooks/useCustomerMenu";
import { useCart } from "../hooks/useCart";

import { useRequestMonitor } from "../hooks/useRequestMonitor";
import { sessionStorage } from "../utils/sessionStorage";

export default function CustomerMenuPage() {
  const { requestId } = useParams<{
    requestId: string;
  }>();

  const id = Number(requestId);

  const stored = sessionStorage.load();

  const monitor = useRequestMonitor({
    requestId: id,
  });



  const {
    categories,
    menuItems,
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
    isLoading: menuLoading,
  } = useCustomerMenu();

  const {
    cart,
    addItem,
    increase,
    decrease,
    totalItems,
  } = useCart();

  if (menuLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-500">
          Loading menu...
        </p>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-slate-100">
      {stored?.sessionId === null &&
      monitor.isPending && (
          <WaitingBanner />
      )}

      <main className="mx-auto max-w-7xl space-y-6 p-6">
        <MenuHeader
            customerName="Guest"
            tableId={stored?.tableId ?? 0}
        />

        <MenuSearch
          value={search}
          onChange={setSearch}
        />

        <CategoryTabs
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />

        <MenuGrid
          items={menuItems}
          cart={cart}
          onAdd={addItem}
          onIncrease={increase}
          onDecrease={decrease}
        />

        <div className="fixed bottom-6 right-6">
          <button
            disabled={totalItems === 0}
            className="rounded-full bg-indigo-600 px-6 py-4 font-semibold text-white shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cart ({totalItems})
          </button>
        </div>

        <div className="sticky bottom-0 mt-8 rounded-2xl bg-white p-5 shadow-xl">
          <button
            disabled={
              stored?.sessionId === null ||
              totalItems === 0
          }
            className="h-14 w-full rounded-xl bg-green-600 text-lg font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {
              stored?.sessionId
                  ? "Place Order"
                  : "Waiting for Waiter..."
          }
          </button>
        </div>
      </main>
    </div>
  );
}