import { motion } from "framer-motion";

import AppCard from "@/shared/components/ui/AppCard";

interface MenuSkeletonProps {
  count?: number;
}

export default function MenuSkeleton({
  count = 8,
}: MenuSkeletonProps) {
  return (
    <div
      className="
        grid
        gap-6

        grid-cols-1

        sm:grid-cols-2

        xl:grid-cols-3

        2xl:grid-cols-4
      "
    >
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}

function SkeletonCard() {
  return (
    <AppCard
      padding="none"
      hover={false}
      className="overflow-hidden"
    >
      {/* Image */}

      <Skeleton className="h-52 w-full" />

      <div className="space-y-5 p-6">
        {/* Badge */}

        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>

        {/* Title */}

        <Skeleton className="h-7 w-3/4" />

        {/* Description */}

        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>

        {/* Footer */}

        <div className="flex items-end justify-between pt-2">
          <div className="space-y-2">
            <Skeleton className="h-7 w-20" />
            <Skeleton className="h-4 w-24" />
          </div>

          <Skeleton className="h-11 w-24 rounded-2xl" />
        </div>
      </div>
    </AppCard>
  );
}

interface SkeletonProps {
  className?: string;
}

function Skeleton({
  className = "",
}: SkeletonProps) {
  return (
    <motion.div
      animate={{
        opacity: [0.45, 1, 0.45],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`
        rounded-xl
        bg-slate-200
        ${className}
      `}
    />
  );
}