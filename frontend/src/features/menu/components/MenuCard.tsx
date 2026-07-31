import { motion } from "framer-motion";
import {
  Clock3,
  Leaf,
  Flame,
  ShoppingCart,
} from "lucide-react";

import AppButton from "@/shared/components/ui/AppButton";
import AppCard from "@/shared/components/ui/AppCard";
import StatusBadge from "@/shared/components/ui/StatusBadge";

import type { MenuItem } from "../types";

interface MenuCardProps {
  item: MenuItem;
  onAddToCart?: (item: MenuItem) => void;
  showAddButton?: boolean;
}

export default function MenuCard({
  item,
  onAddToCart,
  showAddButton = false,
}: MenuCardProps) {
  const defaultVariant =
    item.variants.find((v) => v.is_default) ??
    item.variants[0];

  const price =
    defaultVariant?.price ?? item.base_price;

  return (
    <AppCard
      padding="none"
      className="overflow-hidden"
    >
      {/* Image */}

      <div className="relative h-52 overflow-hidden bg-slate-100">
        {item.image_url ? (
          <motion.img
            src={item.image_url}
            alt={item.name}
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.35 }}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
            <ShoppingCart
              size={48}
              className="text-slate-300"
            />
          </div>
        )}

        {/* Veg / Non-Veg */}

        <div className="absolute left-4 top-4">
          {item.is_veg ? (
            <StatusBadge
              label="Veg"
              variant="success"
              icon={Leaf}
            />
          ) : (
            <StatusBadge
              label="Non Veg"
              variant="error"
              icon={Flame}
            />
          )}
        </div>

        {/* Availability */}

        <div className="absolute right-4 top-4">
          <StatusBadge
            label={
              item.is_available
                ? "Available"
                : "Unavailable"
            }
            variant={
              item.is_available
                ? "success"
                : "error"
            }
          />
        </div>
      </div>

      {/* Content */}

      <div className="space-y-5 p-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900">
            {item.name}
          </h3>

          {item.description && (
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
              {item.description}
            </p>
          )}
        </div>

        {/* Footer */}

        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-indigo-600">
              ₹{price.toFixed(2)}
            </p>

            {item.preparation_time && (
              <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                <Clock3 size={16} />
                <span>
                  {item.preparation_time} mins
                </span>
              </div>
            )}
          </div>

          {showAddButton && (
            <AppButton
              fullWidth={false}
              disabled={!item.is_available}
              onClick={() =>
                onAddToCart?.(item)
              }
            >
              Add
            </AppButton>
          )}
        </div>
      </div>
    </AppCard>
  );
}