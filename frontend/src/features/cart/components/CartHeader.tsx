import {
  ShoppingBag,
  X,
} from "lucide-react";

interface CartHeaderProps {
  totalItems: number;
  onClose: () => void;
}

export default function CartHeader({
  totalItems,
  onClose,
}: CartHeaderProps) {
  return (
    <div className="sticky top-0 z-10 border-b bg-white/95 px-6 py-5 backdrop-blur">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100">
            <ShoppingBag
              size={22}
              className="text-indigo-600"
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Your Cart
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Review your order before placing it
            </p>

            <p className="mt-1 text-sm font-medium text-indigo-600">
              {totalItems}{" "}
              {totalItems === 1
                ? "item"
                : "items"}{" "}
              added
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="
            rounded-xl
            p-2
            text-slate-500
            transition
            hover:bg-slate-100
            hover:text-slate-900
          "
        >
          <X size={22} />
        </button>
      </div>
    </div>
  );
}