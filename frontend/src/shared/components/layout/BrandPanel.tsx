import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

import FeatureCard from "./FeatureCard";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface BrandPanelProps {
  badge: string;
  heading: string;
  description: string;
  features: Feature[];
}

export default function BrandPanel({
  badge,
  heading,
  description,
  features,
}: BrandPanelProps) {
  return (
    <div className="relative hidden overflow-hidden rounded-l-[32px] bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-12 lg:flex lg:flex-col lg:justify-between">

      {/* Animated Background */}

      <div className="absolute inset-0 overflow-hidden">

        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -25, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "easeInOut",
          }}
          className="absolute -left-10 top-20 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 12,
            ease: "easeInOut",
          }}
          className="absolute bottom-10 right-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl"
        />

      </div>

      {/* Content */}

      <div className="relative z-10">

        {/* Logo */}

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-14"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl font-bold text-slate-900 shadow-xl">
            D
          </div>
        </motion.div>

        {/* Badge */}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .15 }}
          className="mb-6 text-sm uppercase tracking-[0.35em] text-indigo-200"
        >
          {badge}
        </motion.p>

        {/* Heading */}

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .25 }}
          className="max-w-xl text-6xl font-bold leading-tight text-white"
        >
          {heading}
        </motion.h1>

        {/* Description */}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .35 }}
          className="mt-8 max-w-lg text-xl leading-9 text-slate-300"
        >
          {description}
        </motion.p>

      </div>

      {/* Features */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: .5 }}
        className="relative z-10 mt-16 space-y-5"
      >
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            {...feature}
          />
        ))}
      </motion.div>

    </div>
  );
}