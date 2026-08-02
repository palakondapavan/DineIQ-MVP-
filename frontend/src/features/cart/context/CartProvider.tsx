import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { cartStorage } from "../utils/cartStorage";

import type {
  AddToCartPayload,
  CartItem,
} from "../types/cart.types";

import { sessionStorage } from "@/features/customer-session/utils/sessionStorage";

interface CartContextValue {
  items: CartItem[];

  addItem: (
    payload: AddToCartPayload & {
      item_name: string;
      image_url: string;
      variant_name: string | null;
      price: number;
      is_available: boolean;
    }
  ) => void;

  increaseQuantity: (
    itemId: number,
    variantId?: number | null
  ) => void;

  decreaseQuantity: (
    itemId: number,
    variantId?: number | null
  ) => void;

  removeItem: (
    itemId: number,
    variantId?: number | null
  ) => void;

  updateNotes: (
    itemId: number,
    variantId: number | null,
    notes: string
  ) => void;

  clearCart: () => void;

  /**
   * Helpers
   */
  getItemQuantity: (
    itemId: number
  ) => number;

  getVariantCount: (
    itemId: number
  ) => number;

  getVariantQuantity: (
    itemId: number,
    variantId: number
  ) => number;

  hasItem: (
    itemId: number
  ) => boolean;

  totalItems: number;

  subtotal: number;

  grandTotal: number;
}

const CartContext =
  createContext<CartContextValue | null>(
    null
  );

interface Props {
  children: ReactNode;
}

export function CartProvider({
  children,
}: Props) {
  /**
   * Current Session
   */
  const customerSession =
    sessionStorage.load();

  const sessionId =
    customerSession?.sessionId ?? null;

  /**
   * Cart
   */
  const [items, setItems] =
    useState<CartItem[]>(() =>
      cartStorage.load(sessionId)
    );

  /**
   * Load cart when session changes
   */
  useEffect(() => {
    setItems(
      cartStorage.load(sessionId)
    );
  }, [sessionId]);

  /**
   * Persist cart
   */
  useEffect(() => {
    cartStorage.save(
      sessionId,
      items
    );
  }, [sessionId, items]);

  /**
   * Add Item
   */
  const addItem = (
    payload: AddToCartPayload & {
      item_name: string;
      image_url: string;
      variant_name: string | null;
      price: number;
      is_available: boolean;
    }
  ) => {
    setItems((previous) => {
      const index =
        previous.findIndex(
          (item) =>
            item.item_id ===
              payload.item_id &&
            item.variant_id ===
              payload.variant_id
        );

      if (index !== -1) {
        const updated = [...previous];

        updated[index] = {
          ...updated[index],
          quantity:
            updated[index].quantity +
            (payload.quantity ?? 1),
        };

        return updated;
      }

      return [
        ...previous,
        {
          item_id: payload.item_id,
          item_name:
            payload.item_name,
          image_url:
            payload.image_url,
          variant_id:
            payload.variant_id,
          variant_name:
            payload.variant_name,
          price: payload.price,
          quantity:
            payload.quantity ?? 1,
          notes:
            payload.notes ?? "",
          is_available:
            payload.is_available,
        },
      ];
    });
  };

  /**
   * Increase Quantity
   */
  const increaseQuantity = (
    itemId: number,
    variantId: number | null = null
  ) => {
    setItems((previous) =>
      previous.map((item) =>
        item.item_id === itemId &&
        item.variant_id ===
          variantId
          ? {
              ...item,
              quantity:
                item.quantity + 1,
            }
          : item
      )
    );
  };

  /**
   * Decrease Quantity
   */
  const decreaseQuantity = (
    itemId: number,
    variantId: number | null = null
  ) => {
    setItems((previous) =>
      previous
        .map((item) =>
          item.item_id === itemId &&
          item.variant_id ===
            variantId
            ? {
                ...item,
                quantity:
                  item.quantity - 1,
              }
            : item
        )
        .filter(
          (item) =>
            item.quantity > 0
        )
    );
  };

  /**
   * Remove Item
   */
  const removeItem = (
    itemId: number,
    variantId: number | null = null
  ) => {
    setItems((previous) =>
      previous.filter(
        (item) =>
          !(
            item.item_id ===
              itemId &&
            item.variant_id ===
              variantId
          )
      )
    );
  };

  /**
   * Update Notes
   */
  const updateNotes = (
    itemId: number,
    variantId: number | null,
    notes: string
  ) => {
    setItems((previous) =>
      previous.map((item) =>
        item.item_id === itemId &&
        item.variant_id ===
          variantId
          ? {
              ...item,
              notes,
            }
          : item
      )
    );
  };

  /**
   * Clear Cart
   */
  const clearCart = () => {
    cartStorage.clear(
      sessionId
    );

    setItems([]);
  };

  /**
   * Total quantity of all variants
   * for one menu item.
   */
  const getItemQuantity = (
    itemId: number
  ) => {
    return items
      .filter(
        (item) =>
          item.item_id === itemId
      )
      .reduce(
        (sum, item) =>
          sum + item.quantity,
        0
      );
  };

  /**
   * Number of variants
   * selected for one item.
   */
  const getVariantCount = (
    itemId: number
  ) => {
    return items.filter(
      (item) =>
        item.item_id === itemId
    ).length;
  };

  /**
   * Quantity of one variant.
   */
  const getVariantQuantity = (
    itemId: number,
    variantId: number
  ) => {
    return (
      items.find(
        (item) =>
          item.item_id === itemId &&
          item.variant_id ===
            variantId
      )?.quantity ?? 0
    );
  };

  /**
   * Menu item exists?
   */
  const hasItem = (
    itemId: number
  ) => {
    return items.some(
      (item) =>
        item.item_id === itemId
    );
  };

  /**
   * Totals
   */
  const totalItems = useMemo(
    () =>
      items.reduce(
        (sum, item) =>
          sum + item.quantity,
        0
      ),
    [items]
  );

  const subtotal = useMemo(
    () =>
      items.reduce(
        (sum, item) =>
          sum +
          item.price *
            item.quantity,
        0
      ),
    [items]
  );

  const value: CartContextValue = {
    items,

    addItem,

    increaseQuantity,

    decreaseQuantity,

    removeItem,

    updateNotes,

    clearCart,

    getItemQuantity,

    getVariantCount,

    getVariantQuantity,

    hasItem,

    totalItems,

    subtotal,

    grandTotal: subtotal,
  };

  return (
    <CartContext.Provider
      value={value}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context =
    useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCartContext must be used inside CartProvider."
    );
  }

  return context;
}