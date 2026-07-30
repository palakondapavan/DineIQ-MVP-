import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  fullScreen?: boolean;
}

const sizeClasses = {
  sm: {
    icon: "h-5 w-5",
    text: "text-sm",
  },
  md: {
    icon: "h-8 w-8",
    text: "text-base",
  },
  lg: {
    icon: "h-12 w-12",
    text: "text-lg",
  },
};

export default function LoadingSpinner({
  size = "md",
  text,
  fullScreen = false,
}: LoadingSpinnerProps) {
  const content = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col items-center justify-center gap-4"
      role="status"
      aria-live="polite"
    >
      <Loader2
        className={`${sizeClasses[size].icon} animate-spin text-indigo-600`}
      />

      {text && (
        <p
          className={`${sizeClasses[size].text} font-medium text-slate-600`}
        >
          {text}
        </p>
      )}
    </motion.div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return content;
}