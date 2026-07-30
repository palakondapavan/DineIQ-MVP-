import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export default function GlassCard({
  children,
  className = "",
}: GlassCardProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 40,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.45,
        ease: "easeOut",
      }}
      className={`
        relative
        w-full
        max-w-lg
        rounded-[32px]
        border
        border-slate-200/70
        bg-white/90
        p-10
        shadow-[0_25px_80px_rgba(15,23,42,0.08)]
        backdrop-blur-xl
        ${className}
      `}
    >
      {/* Glow */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-[32px]
          bg-gradient-to-br
          from-white/40
          via-transparent
          to-indigo-100/20
        "
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}