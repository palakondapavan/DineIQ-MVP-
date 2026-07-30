import type { ReactNode } from "react";

import BrandPanel from "./BrandPanel";
import GlassCard from "./GlassCard";

import type { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface AuthLayoutProps {
  badge: string;
  heading: string;
  description: string;
  features: Feature[];

  children: ReactNode;

  cardClassName?: string;

  showBrandPanel?: boolean;
}

export default function AuthLayout({
  badge,
  heading,
  description,
  features,
  children,
  cardClassName,
  showBrandPanel = true,
}: AuthLayoutProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-100">

      {/* Background */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#ffffff_0%,#f8fafc_35%,#eef2ff_100%)]" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-10">

        <div
          className="
            grid
            w-full
            max-w-[1700px]
            overflow-hidden
            rounded-[36px]
            border
            border-slate-200/70
            bg-white/60
            shadow-[0_35px_100px_rgba(15,23,42,0.08)]
            backdrop-blur-xl

            lg:grid-cols-[1.1fr_0.9fr]
          "
        >

          {/* Left Brand Panel */}

          {showBrandPanel && (
            <BrandPanel
              badge={badge}
              heading={heading}
              description={description}
              features={features}
            />
          )}

          {/* Right Side */}

          <section
            className="
              relative
              flex
              items-center
              justify-center
              overflow-hidden
              bg-gradient-to-br
              from-slate-50
              via-white
              to-slate-100
              p-8
              lg:p-14
            "
          >

            {/* Floating Glow */}

            <div className="absolute left-20 top-16 h-52 w-52 rounded-full bg-indigo-200/30 blur-3xl" />

            <div className="absolute bottom-10 right-10 h-64 w-64 rounded-full bg-blue-200/20 blur-3xl" />

            <GlassCard className={cardClassName}>
              {children}
            </GlassCard>

          </section>

        </div>

      </div>

    </main>
  );
}