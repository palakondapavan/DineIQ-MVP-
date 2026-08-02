import { useCart } from "../hooks/useCart";

export default function CartSummary() {
  const {
    subtotal,
    totalItems,
  } = useCart();

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900">
          Order Summary
        </h3>

        <p className="text-sm text-slate-500">
          Review your order before placing it.
        </p>
      </div>

      {/* Summary */}
      <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex items-center justify-between">
          <span className="text-slate-600">
            Items
          </span>

          <span className="font-medium">
            {totalItems}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-600">
            Subtotal
          </span>

          <span className="font-medium">
            ₹{subtotal}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-600">
            GST
          </span>

          <span className="font-medium">
            ₹0
          </span>
        </div>

        <div className="border-t border-dashed pt-3">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-slate-900">
              Grand Total
            </span>

            <span className="text-2xl font-bold text-green-600">
              ₹{subtotal}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}