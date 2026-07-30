import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";
import type { ReactNode } from "react";

interface AppButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  variant?: "primary" | "secondary" | "outline" | "danger";
}

const variants = {
  primary:
    "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-200",

  secondary:
    "bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-300",

  outline:
    "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-200",

  danger:
    "bg-red-600 text-white hover:bg-red-700 focus:ring-red-200",
};

export default function AppButton({
  children,
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = true,
  variant = "primary",
  disabled = false,
  className = "",
  type = "button",
  ...props
}: AppButtonProps) {
  return (
    <motion.button
      type={type}
      disabled={disabled || loading}
      whileHover={!disabled && !loading ? { scale: 1.01 } : undefined}
      whileTap={!disabled && !loading ? { scale: 0.98 } : undefined}
      transition={{ duration: 0.15 }}
      className={`
        inline-flex
        h-14
        items-center
        justify-center
        gap-2
        rounded-2xl
        px-6
        text-base
        font-semibold
        shadow-lg
        transition-all
        duration-300
        focus:outline-none
        focus:ring-4
        disabled:cursor-not-allowed
        disabled:opacity-60
        disabled:shadow-none

        ${variants[variant]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          {leftIcon && (
            <span className="flex items-center">
              {leftIcon}
            </span>
          )}

          <span>{children}</span>

          {rightIcon && (
            <span className="flex items-center">
              {rightIcon}
            </span>
          )}
        </>
      )}
    </motion.button>
  );
}