interface Props {
  status: string;
}

const statusStyles: Record<
  string,
  string
> = {
  PLACED:
    "bg-blue-100 text-blue-700",

  ACCEPTED:
    "bg-indigo-100 text-indigo-700",

  PREPARING:
    "bg-amber-100 text-amber-700",

  READY:
    "bg-green-100 text-green-700",

  PARTIALLY_SERVED:
    "bg-cyan-100 text-cyan-700",

  SERVED:
    "bg-emerald-100 text-emerald-700",

  REJECTED:
    "bg-red-100 text-red-700",

  CANCELLED:
    "bg-slate-200 text-slate-700",
};

const statusLabels: Record<
  string,
  string
> = {
  PLACED: "Placed",

  ACCEPTED: "Accepted",

  PREPARING: "Preparing",

  READY: "Ready",

  PARTIALLY_SERVED:
    "Partially Served",

  SERVED: "Served",

  REJECTED: "Rejected",

  CANCELLED: "Cancelled",
};

export default function OrderStatusChip({
  status,
}: Props) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
        statusStyles[status] ??
        "bg-slate-100 text-slate-600"
      }`}
    >
      {statusLabels[status] ??
        status}
    </span>
  );
}