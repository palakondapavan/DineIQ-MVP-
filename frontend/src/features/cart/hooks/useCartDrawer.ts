import { useCartDrawerContext } from "../context/CartDrawerProvider";

export function useCartDrawer() {
  return useCartDrawerContext();
}