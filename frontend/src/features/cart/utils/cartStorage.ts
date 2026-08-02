import type { CartItem } from "../types/cart.types";

const STORAGE_PREFIX = "customer_cart";

function getStorageKey(sessionId: number | null) {
  if (!sessionId) {
    return `${STORAGE_PREFIX}_guest`;
  }

  return `${STORAGE_PREFIX}_${sessionId}`;
}

export const cartStorage = {
  save(
    sessionId: number | null,
    items: CartItem[]
  ) {
    localStorage.setItem(
      getStorageKey(sessionId),
      JSON.stringify(items)
    );
  },

  load(
    sessionId: number | null
  ): CartItem[] {
    const raw = localStorage.getItem(
      getStorageKey(sessionId)
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

  clear(sessionId: number | null) {
    localStorage.removeItem(
      getStorageKey(sessionId)
    );
  },
};