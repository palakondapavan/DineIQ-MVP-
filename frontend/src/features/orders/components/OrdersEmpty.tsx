import { Package } from "lucide-react";

export default function OrdersEmpty() {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl bg-white py-20 shadow">
      <Package
        size={70}
        className="text-slate-300"
      />

      <h2 className="mt-5 text-2xl font-bold">
        No Orders Yet
      </h2>

      <p className="mt-2 text-slate-500">
        Place your first order
        from the menu.
      </p>
    </div>
  );
}