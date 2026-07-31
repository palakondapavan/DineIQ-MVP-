import { UtensilsCrossed } from "lucide-react";

import EmptyState from "@/shared/components/ui/EmptyState";

import type { MenuItem } from "../types";

import MenuCard from "./MenuCard";
import MenuSkeleton from "./MenuSkeleton";

interface MenuGridProps {
  items: MenuItem[];
  isLoading?: boolean;
  showAddButton?: boolean;
  onAddToCart?: (item: MenuItem) => void;
}

export default function MenuGrid({
  items,
  isLoading = false,
  showAddButton = false,
  onAddToCart,
}: MenuGridProps) {
  if (isLoading) {
    return <MenuSkeleton count={8} />;
  }

  if (items.length === 0) {
    return (
      <EmptyState
        icon={UtensilsCrossed}
        title="No dishes found"
        description="Try changing your search or selecting another category."
      />
    );
  }

  return (
    <section
      className="
        grid
        gap-6

        grid-cols-1

        sm:grid-cols-2

        xl:grid-cols-3

        2xl:grid-cols-4
      "
    >
      {items.map((item) => (
        <MenuCard
          key={item.id}
          item={item}
          showAddButton={showAddButton}
          onAddToCart={onAddToCart}
        />
      ))}
    </section>
  );
}