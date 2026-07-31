import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface AppCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingClasses = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export default function AppCard({
  children,
  className = "",
  hover = true,
  padding = "md",
}: AppCardProps) {
  return (
    <motion.div
      whileHover={
        hover
          ? {
              y: -4,
              scale: 1.01,
            }
          : undefined
      }
      transition={{
        duration: 0.2,
      }}
      className={`
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:border-indigo-200
        hover:shadow-xl
        ${paddingClasses[padding]}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}