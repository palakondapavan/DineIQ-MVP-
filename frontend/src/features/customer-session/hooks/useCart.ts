import { useMemo, useState } from "react";

export function useCart() {
  const [cart, setCart] = useState<
    Record<number, number>
  >({});

  const addItem = (itemId: number) => {
    setCart((prev) => ({
      ...prev,
      [itemId]: 1,
    }));
  };

  const increase = (itemId: number) => {
    setCart((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] ?? 0) + 1,
    }));
  };

  const decrease = (itemId: number) => {
    setCart((prev) => {
      const qty = (prev[itemId] ?? 0) - 1;

      if (qty <= 0) {
        const next = { ...prev };
        delete next[itemId];
        return next;
      }

      return {
        ...prev,
        [itemId]: qty,
      };
    });
  };

  const clearCart = () => {
    setCart({});
  };

  const totalItems = useMemo(
    () =>
      Object.values(cart).reduce(
        (sum, qty) => sum + qty,
        0
      ),
    [cart]
  );

  return {
    cart,
    addItem,
    increase,
    decrease,
    clearCart,
    totalItems,
  };
}