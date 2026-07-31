import { motion } from "framer-motion";
import { Clock3, MapPin, Star } from "lucide-react";

import Logo from "@/shared/components/ui/Logo";
import StatusBadge from "@/shared/components/ui/StatusBadge";

interface MenuHeaderProps {
  restaurantName: string;
  restaurantAddress?: string;
  isOpen?: boolean;
  rating?: number;
}

export default function MenuHeader({
  restaurantName,
  restaurantAddress,
  isOpen = true,
  rating,
}: MenuHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="
        mb-8
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-gradient-to-r
        from-white
        via-slate-50
        to-indigo-50
        p-6
        shadow-sm
      "
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}
        <div className="space-y-4">
          <Logo
            size="sm"
            showSubtitle={false}
          />

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              {restaurantName}
            </h1>

            {restaurantAddress && (
              <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                <MapPin size={16} />
                <span>{restaurantAddress}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge
            variant={isOpen ? "success" : "error"}
            label={isOpen ? "Open Now" : "Closed"}
          />

          {typeof rating === "number" && (
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-amber-200
                bg-amber-50
                px-4
                py-2
                text-sm
                font-semibold
                text-amber-700
              "
            >
              <Star
                size={16}
                className="fill-amber-500 text-amber-500"
              />
              {rating.toFixed(1)}
            </div>
          )}

          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-slate-200
              bg-white
              px-4
              py-2
              text-sm
              text-slate-600
            "
          >
            <Clock3 size={16} />
            <span>Freshly Prepared</span>
          </div>
        </div>
      </div>
    </motion.header>
  );
}