import { useMemo } from "react";

import { useCartContext } from "../context/CartProvider";

export function useCart() {
  const cart = useCartContext();

  const isEmpty = useMemo(
    () => cart.items.length === 0,
    [cart.items]
  );

  const totalQuantity = useMemo(
    () => cart.totalItems,
    [cart.totalItems]
  );

  return {
    ...cart,

    isEmpty,

    totalQuantity,
  };
}