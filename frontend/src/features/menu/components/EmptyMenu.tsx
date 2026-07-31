import { UtensilsCrossed } from "lucide-react";

import EmptyState from "@/shared/components/ui/EmptyState";

interface EmptyMenuProps {
  search?: string;
}

export default function EmptyMenu({
  search = "",
}: EmptyMenuProps) {
  const hasSearch = search.trim().length > 0;

  return (
    <EmptyState
      icon={UtensilsCrossed}
      title={
        hasSearch
          ? "No matching dishes found"
          : "Menu is currently unavailable"
      }
      description={
        hasSearch
          ? "Try searching with another keyword or browse a different category."
          : "The restaurant hasn't published any menu items yet."
      }
    />
  );
}