import {
  Check,
  ChefHat,
  Clock3,
  PackageCheck,
  PackageOpen,
  Truck,
  XCircle,
} from "lucide-react";

interface Props {
  status: string;
}

const statusConfig: Record<
  string,
  {
    label: string;
    icon: typeof Clock3;
    className: string;
    pulse?: boolean;
  }
> = {
  PLACED: {
    label: "Placed",
    icon: Clock3,
    className:
      "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200",
  },

  ACCEPTED: {
    label: "Accepted",
    icon: Check,
    className:
      "bg-gradient-to-r from-indigo-50 to-violet-50 text-indigo-700 border border-indigo-200",
  },

  PREPARING: {
    label: "Preparing",
    icon: ChefHat,
    className:
      "bg-gradient-to-r from-amber-50 to-orange-50 text-orange-700 border border-orange-200",
    pulse: true,
  },

  READY: {
    label: "Ready",
    icon: PackageCheck,
    className:
      "bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-200",
  },

  PARTIALLY_SERVED: {
    label: "Partially Served",
    icon: Truck,
    className:
      "bg-gradient-to-r from-cyan-50 to-sky-50 text-cyan-700 border border-cyan-200",
  },

  SERVED: {
    label: "Served",
    icon: Check,
    className:
      "bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 border border-emerald-200",
  },

  REJECTED: {
    label: "Rejected",
    icon: XCircle,
    className:
      "bg-gradient-to-r from-red-50 to-rose-50 text-red-700 border border-red-200",
  },

  CANCELLED: {
    label: "Cancelled",
    icon: PackageOpen,
    className:
      "bg-gradient-to-r from-slate-100 to-slate-50 text-slate-700 border border-slate-300",
  },
};

export default function OrderStatusChip({
  status,
}: Props) {
  const config =
    statusConfig[status];

  if (!config) {
    return (
      <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">
        {status}
      </span>
    );
  }

  const Icon = config.icon;

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-2
        rounded-full
        px-4
        py-2
        text-xs
        font-semibold
        shadow-sm
        backdrop-blur-sm
        ${config.className}
      `}
    >
      <Icon
        size={14}
        className={
          config.pulse
            ? "animate-pulse"
            : ""
        }
      />

      {config.label}
    </span>
  );
}