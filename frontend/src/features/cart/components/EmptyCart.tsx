import { ShoppingCart } from "lucide-react";

interface EmptyCartProps {
  onClose: () => void;
}

export default function EmptyCart({
  onClose,
}: EmptyCartProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-8 py-20 text-center">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-indigo-100">
        <ShoppingCart
          size={44}
          className="text-indigo-600"
        />
      </div>

      <h2 className="mt-6 text-2xl font-bold text-slate-900">
        Your cart is empty
      </h2>

      <p className="mt-3 max-w-sm text-slate-500">
        Browse the menu and add your favorite dishes to
        start your order.
      </p>

      <button
        onClick={onClose}
        className="mt-8 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
      >
        Continue Ordering
      </button>
    </div>
  );
}