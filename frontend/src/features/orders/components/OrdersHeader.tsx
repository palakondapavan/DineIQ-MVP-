import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { sessionStorage } from "@/features/customer-session/utils/sessionStorage";

export default function OrdersHeader() {
  const navigate = useNavigate();

  const stored = sessionStorage.load();

  function handleBack() {
    if (stored?.requestId) {
      navigate(
        `/customer/menu/${stored.requestId}`
      );
    } else {
      navigate(-1);
    }
  }

  return (
    <div className="flex items-center gap-4 rounded-3xl bg-white p-6 shadow">
      <button
        onClick={handleBack}
        className="rounded-xl p-2 transition hover:bg-slate-100"
      >
        <ArrowLeft size={22} />
      </button>

      <div className="flex-1">
        <h1 className="text-2xl font-bold text-slate-900">
          Your Orders
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Track your live orders
        </p>
      </div>

      {stored?.tableId && (
        <div className="rounded-xl bg-indigo-50 px-4 py-2">
          <p className="text-xs font-medium text-slate-500">
            Table
          </p>

          <p className="text-lg font-bold text-indigo-600">
            {stored.tableId}
          </p>
        </div>
      )}
    </div>
  );
}