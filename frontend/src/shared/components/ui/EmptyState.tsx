import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

import AppButton from "./AppButton";

interface EmptyStateProps {
  title: string;
  description: string;

  icon: LucideIcon;

  actionLabel?: string;
  onAction?: () => void;

  className?: string;
}

export default function EmptyState({
  title,
  description,
  icon: Icon,
  actionLabel,
  onAction,
  className = "",
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.3,
      }}
      className={`
        flex
        flex-col
        items-center
        justify-center
        rounded-3xl
        border
        border-dashed
        border-slate-300
        bg-slate-50
        px-8
        py-14
        text-center
        ${className}
      `}
    >
      <div
        className="
          mb-6
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-full
          bg-indigo-100
          text-indigo-600
        "
      >
        <Icon size={38} />
      </div>

      <h3 className="text-2xl font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
        {description}
      </p>

      {actionLabel && onAction && (
        <div className="mt-8">
          <AppButton
            fullWidth={false}
            onClick={onAction}
          >
            {actionLabel}
          </AppButton>
        </div>
      )}
    </motion.div>
  );
}