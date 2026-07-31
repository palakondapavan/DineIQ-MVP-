import type { CartItem } from "../types/cart.types";

const STORAGE_KEY = "customer_cart";

export const cartStorage = {
  save(items: CartItem[]) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(items)
    );
  },

  load(): CartItem[] {
    const raw = localStorage.getItem(
      STORAGE_KEY
    );

    if (!raw) {
      return [];
    }

    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  },

  clear() {
    localStorage.removeItem(
      STORAGE_KEY
    );
  },
};