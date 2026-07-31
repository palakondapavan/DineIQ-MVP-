import { ShoppingBag } from "lucide-react";

import { useCart } from "../hooks/useCart";

interface CartButtonProps {
  onClick: () => void;
}

export default function CartButton({
  onClick,
}: CartButtonProps) {
  const {
    totalItems,
    subtotal,
    isEmpty,
  } = useCart();

  if (isEmpty) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="
        fixed
        bottom-6
        right-6
        z-50
        flex
        items-center
        gap-4
        rounded-full
        bg-indigo-600
        px-5
        py-4
        text-white
        shadow-2xl
        transition-all
        duration-200
        hover:scale-105
        hover:bg-indigo-700
        active:scale-95
      "
    >
      <div className="relative">
        <ShoppingBag size={24} />

        <span
          className="
            absolute
            -right-3
            -top-3
            flex
            h-6
            w-6
            items-center
            justify-center
            rounded-full
            bg-red-500
            text-xs
            font-bold
            text-white
          "
        >
          {totalItems}
        </span>
      </div>

      <div className="flex flex-col items-start">
        <span className="text-sm font-medium">
          View Cart
        </span>

        <span className="text-xs text-indigo-100">
          ₹{subtotal.toFixed(2)}
        </span>
      </div>
    </button>
  );
}