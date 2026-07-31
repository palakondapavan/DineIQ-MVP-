import { X } from "lucide-react";

import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import CartSummary from "./CartSummary";

import { useCart } from "../hooks/useCart";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({
  open,
  onClose,
}: CartDrawerProps) {
  const { items, isEmpty } = useCart();

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0 z-40 bg-black/40
          transition-opacity duration-300
          ${
            open
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          }
        `}
      />

      {/* Drawer */}
      <aside
        className={`
          fixed
          bottom-0
          right-0
          z-50
          flex
          h-[90vh]
          w-full
          flex-col
          rounded-t-3xl
          bg-white
          shadow-2xl
          transition-transform
          duration-300

          md:top-0
          md:h-screen
          md:w-[430px]
          md:rounded-none

          ${
            open
              ? "translate-y-0"
              : "translate-y-full md:translate-x-full md:translate-y-0"
          }
        `}
      >
        {/* Handle (Mobile) */}
        <div className="flex justify-center py-3 md:hidden">
          <div className="h-1.5 w-12 rounded-full bg-slate-300" />
        </div>

        {/* Header */}
        <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-6 py-5">
          <div>
            <h2 className="text-xl font-bold">
              Your Cart
            </h2>

            <p className="text-sm text-slate-500">
              Review your order
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-slate-100"
          >
            <X size={22} />
          </button>
        </header>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          {isEmpty ? (
            <EmptyCart />
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <CartItem
                  key={`${item.item_id}-${item.variant_id}`}
                  item={item}
                />
              ))}
            </div>
          )}
        </div>

        {/* Summary */}
        {!isEmpty && (
          <footer className="border-t bg-white p-5">
            <CartSummary />
          </footer>
        )}
      </aside>
    </>
  );
}