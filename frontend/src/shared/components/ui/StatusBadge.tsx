import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { CheckCircle2, Clock3, AlertCircle, XCircle } from "lucide-react";

type StatusVariant =
  | "success"
  | "warning"
  | "error"
  | "info"
  | "neutral";

interface StatusBadgeProps {
  label: string;
  variant?: StatusVariant;
  icon?: LucideIcon;
}

const variants = {
  success: {
    className:
      "bg-emerald-50 text-emerald-700 border border-emerald-200",
    icon: CheckCircle2,
  },
  warning: {
    className:
      "bg-amber-50 text-amber-700 border border-amber-200",
    icon: Clock3,
  },
  error: {
    className:
      "bg-red-50 text-red-700 border border-red-200",
    icon: XCircle,
  },
  info: {
    className:
      "bg-indigo-50 text-indigo-700 border border-indigo-200",
    icon: AlertCircle,
  },
  neutral: {
    className:
      "bg-slate-100 text-slate-700 border border-slate-200",
    icon: Clock3,
  },
} as const;

export default function StatusBadge({
  label,
  variant = "neutral",
  icon,
}: StatusBadgeProps) {
  const DefaultIcon = variants[variant].icon;
  const Icon = icon ?? DefaultIcon;

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={`
        inline-flex
        items-center
        gap-2
        rounded-full
        px-3
        py-1.5
        text-xs
        font-semibold
        tracking-wide
        ${variants[variant].className}
      `}
    >
      <Icon size={14} />
      {label}
    </motion.span>
  );
}