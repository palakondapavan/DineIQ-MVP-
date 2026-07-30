import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  badge?: string;
  align?: "left" | "center";
}

export default function PageHeader({
  title,
  description,
  icon: Icon,
  badge,
  align = "left",
}: PageHeaderProps) {
  const isCenter = align === "center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`mb-8 ${isCenter ? "text-center" : "text-left"}`}
    >
      {badge && (
        <span
          className="
            mb-4
            inline-flex
            items-center
            rounded-full
            border
            border-indigo-100
            bg-indigo-50
            px-4
            py-1.5
            text-xs
            font-semibold
            uppercase
            tracking-wider
            text-indigo-700
          "
        >
          {badge}
        </span>
      )}

      <div
        className={`flex items-center gap-3 ${
          isCenter ? "justify-center" : "justify-start"
        }`}
      >
        {Icon && (
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-indigo-600
              to-blue-600
              text-white
              shadow-lg
            "
          >
            <Icon size={22} />
          </div>
        )}

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            {title}
          </h1>

          {description && (
            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
              {description}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}