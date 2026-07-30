import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -2,
        scale: 1.01,
      }}
      transition={{
        duration: 0.2,
      }}
      className="
        flex
        items-center
        gap-4
        rounded-2xl
        border
        border-white/10
        bg-white/8
        p-5
        backdrop-blur-md
        transition-all
        duration-300
        hover:border-indigo-400/30
        hover:bg-white/12
      "
    >
      <div
        className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-xl
          bg-indigo-500/20
        "
      >
        <Icon
          size={22}
          className="text-indigo-200"
        />
      </div>

      <div>
        <h3 className="font-semibold text-white">
          {title}
        </h3>

        <p className="mt-1 text-sm text-slate-300">
          {description}
        </p>
      </div>
    </motion.div>
  );
}