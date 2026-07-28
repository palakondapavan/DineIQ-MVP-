import { create } from "zustand";

export interface CartItem {
  item_id: number;
  item_name: string;

  variant_id: number;
  variant_name: string;

  unit_price: number;

  quantity: number;

  image_url?: string | null;

  note?: string;
}

interface CartStore {
  tableId: number | null;
  sessionId: number | null;
  restaurantId: number | null;

  items: CartItem[];

  setTableInfo: (
    tableId: number,
    sessionId: number,
    restaurantId?: number
  ) => void;

  addItem: (item: CartItem) => void;

  removeItem: (variantId: number) => void;

  increaseQuantity: (variantId: number) => void;

  decreaseQuantity: (variantId: number) => void;

  updateNote: (variantId: number, note: string) => void;

  clearCart: () => void;

  getSubtotal: () => number;

  getTotalItems: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  tableId: null,
  sessionId: null,
  restaurantId: null,

  items: [],

  setTableInfo: (
    tableId,
    sessionId,
    restaurantId = 0
  ) =>
    set({
      tableId,
      sessionId,
      restaurantId,
    }),

  addItem: (item) =>
    set((state) => {
      const existing = state.items.find(
        (i) => i.variant_id === item.variant_id
      );

      if (existing) {
        return {
          items: state.items.map((i) =>
            i.variant_id === item.variant_id
              ? {
                  ...i,
                  quantity: i.quantity + 1,
                }
              : i
          ),
        };
      }

      return {
        items: [...state.items, item],
      };
    }),

  removeItem: (variantId) =>
    set((state) => ({
      items: state.items.filter(
        (i) => i.variant_id !== variantId
      ),
    })),

  increaseQuantity: (variantId) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.variant_id === variantId
          ? {
              ...i,
              quantity: i.quantity + 1,
            }
          : i
      ),
    })),

  decreaseQuantity: (variantId) =>
    set((state) => ({
      items: state.items
        .map((i) =>
          i.variant_id === variantId
            ? {
                ...i,
                quantity: i.quantity - 1,
              }
            : i
        )
        .filter((i) => i.quantity > 0),
    })),

  updateNote: (variantId, note) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.variant_id === variantId
          ? {
              ...i,
              note,
            }
          : i
      ),
    })),

  clearCart: () =>
    set({
      items: [],
    }),

  getSubtotal: () => {
    return get().items.reduce(
      (total, item) =>
        total + item.unit_price * item.quantity,
      0
    );
  },

  getTotalItems: () => {
    return get().items.reduce(
      (total, item) => total + item.quantity,
      0
    );
  },
}));