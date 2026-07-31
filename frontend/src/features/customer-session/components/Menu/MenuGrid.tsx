import MenuCard from "./MenuCard";

import type { MenuItem } from "../../types/customerMenu.types";

interface MenuGridProps {
  items: MenuItem[];

  cart: Record<number, number>;

  onAdd: (itemId: number) => void;

  onIncrease: (itemId: number) => void;

  onDecrease: (itemId: number) => void;
}

export default function MenuGrid({
  items,
  cart,
  onAdd,
  onIncrease,
  onDecrease,
}: MenuGridProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-16 text-center shadow-sm">
        <h3 className="text-xl font-semibold text-slate-700">
          No menu items found
        </h3>

        <p className="mt-2 text-slate-500">
          Try another search or category.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        grid
        gap-6
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
      "
    >
      {items.map((item) => (
        <MenuCard
          key={item.item_id}
          item={item}
          quantity={cart[item.item_id] ?? 0}
          onAdd={onAdd}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
        />
      ))}
    </div>
  );
}