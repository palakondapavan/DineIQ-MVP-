import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  badge?: string;
  action?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export default function SectionTitle({
  title,
  subtitle,
  badge,
  action,
  align = "left",
  className = "",
}: SectionTitleProps) {
  const isCenter = align === "center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`
        mb-6
        flex
        flex-col
        gap-4

        md:flex-row
        md:items-end
        md:justify-between

        ${className}
      `}
    >
      <div className={isCenter ? "text-center w-full" : ""}>
        {badge && (
          <span
            className="
              mb-2
              inline-flex
              rounded-full
              bg-indigo-50
              px-3
              py-1
              text-xs
              font-semibold
              tracking-wide
              text-indigo-700
            "
          >
            {badge}
          </span>
        )}

        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            {subtitle}
          </p>
        )}
      </div>

      {action && (
        <div className={isCenter ? "self-center" : ""}>
          {action}
        </div>
      )}
    </motion.div>
  );
}