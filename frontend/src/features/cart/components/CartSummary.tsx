import { useCart } from "../hooks/useCart";

export default function CartSummary() {
  const {
    subtotal,
    totalItems,
    grandTotal,
  } = useCart();

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-slate-600">
        <span>
          Items ({totalItems})
        </span>

        <span>
          ₹{subtotal.toFixed(2)}
        </span>
      </div>

      <div className="flex justify-between text-slate-600">
        <span>Taxes & Charges</span>

        <span>Included</span>
      </div>

      <div className="flex justify-between border-t pt-4 text-lg font-bold">
        <span>Total</span>

        <span>
          ₹{grandTotal.toFixed(2)}
        </span>
      </div>

      <button
        className="
          h-14
          w-full
          rounded-xl
          bg-green-600
          text-lg
          font-semibold
          text-white
          transition
          hover:bg-green-700
        "
      >
        Place Order
      </button>
    </div>
  );
}