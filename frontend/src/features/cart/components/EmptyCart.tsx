import { ShoppingCart } from "lucide-react";

export default function EmptyCart() {
  return (
    <div className="flex h-full flex-col items-center justify-center py-20 text-center">
      <div className="rounded-full bg-slate-100 p-6">
        <ShoppingCart
          size={48}
          className="text-slate-400"
        />
      </div>

      <h3 className="mt-6 text-xl font-bold">
        Your cart is empty
      </h3>

      <p className="mt-2 max-w-xs text-slate-500">
        Browse the menu and add your
        favorite dishes.
      </p>
    </div>
  );
}