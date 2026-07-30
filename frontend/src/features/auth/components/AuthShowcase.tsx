import { motion } from "framer-motion";
import type { ReactNode } from "react";
import {
  ChefHat,
  ClipboardList,
  QrCode,
  BarChart3,
  CheckCircle2,
} from "lucide-react";

export function AuthShowcase() {
  return (
    <div className="relative hidden overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-12 lg:flex lg:flex-col lg:justify-between">
      {/* Background Glow */}
      <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-indigo-500/30 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />

      {/* Floating Shapes */}

      <motion.div
        animate={{ y: [-12, 12, -12] }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-16 top-20 h-24 w-24 rounded-3xl bg-white/5"
      />

      <motion.div
        animate={{ y: [10, -10, 10] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-24 right-20 h-20 w-20 rounded-full bg-indigo-400/10"
      />

      {/* Brand */}

      <div className="relative z-10">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-2xl font-bold text-slate-900 shadow-lg">
          D
        </div>

        <p className="text-sm uppercase tracking-[0.3em] text-indigo-300">
          Restaurant Operating System
        </p>

        <h1 className="mt-6 text-5xl font-bold leading-tight text-white">
          Run your restaurant
          <br />
          smarter.
        </h1>

        <p className="mt-6 max-w-md text-lg leading-8 text-slate-300">
          Manage orders, tables, kitchen, staff and analytics from one
          powerful dashboard.
        </p>
      </div>

      {/* Feature Cards */}

      <div className="relative z-10 mt-16 space-y-4">

        <FeatureCard
          icon={<QrCode size={22} />}
          title="QR Ordering"
          subtitle="Customers order instantly"
        />

        <FeatureCard
          icon={<ChefHat size={22} />}
          title="Kitchen Live"
          subtitle="Real-time cooking status"
        />

        <FeatureCard
          icon={<ClipboardList size={22} />}
          title="Order Management"
          subtitle="Track every table effortlessly"
        />

        <FeatureCard
          icon={<BarChart3 size={22} />}
          title="Restaurant Analytics"
          subtitle="Sales & performance insights"
        />
      </div>

      {/* Bottom Badge */}

      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{
          repeat: Infinity,
          duration: 3,
        }}
        className="absolute bottom-10 right-10"
      >
        <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-5 py-3 text-emerald-300 backdrop-blur">
          <CheckCircle2 size={18} />
          <span className="text-sm font-medium">
            System Online
          </span>
        </div>
      </motion.div>
    </div>
  );
}

type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  subtitle: string;
};

function FeatureCard({
  icon,
  title,
  subtitle,
}: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{
        x: 6,
      }}
      className="
        flex
        items-center
        gap-4
        rounded-2xl
        border
        border-white/10
        bg-white/5
        p-4
        backdrop-blur-md
      "
    >
      <div className="rounded-xl bg-indigo-500/20 p-3 text-indigo-300">
        {icon}
      </div>

      <div>
        <h3 className="font-semibold text-white">
          {title}
        </h3>

        <p className="text-sm text-slate-400">
          {subtitle}
        </p>
      </div>
    </motion.div>
  );
}