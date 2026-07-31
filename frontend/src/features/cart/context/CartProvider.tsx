import { useEffect } from "react";
import { cartStorage } from "../utils/cartStorage";


import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type {
  AddToCartPayload,
  CartItem,
} from "../types/cart.types";

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
    const [items, setItems] = useState<CartItem[]>(
        () => cartStorage.load()
        );
        useEffect(() => {
            cartStorage.save(items);
            }, [items]);

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
      const index = previous.findIndex(
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
          item_name: payload.item_name,
          image_url: payload.image_url,
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

  const increaseQuantity = (
    itemId: number,
    variantId: number | null = null
  ) => {
    setItems((previous) =>
      previous.map((item) =>
        item.item_id === itemId &&
        item.variant_id === variantId
          ? {
              ...item,
              quantity:
                item.quantity + 1,
            }
          : item
      )
    );
  };

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
          (item) => item.quantity > 0
        )
    );
  };

  const removeItem = (
    itemId: number,
    variantId: number | null = null
  ) => {
    setItems((previous) =>
      previous.filter(
        (item) =>
          !(
            item.item_id === itemId &&
            item.variant_id ===
              variantId
          )
      )
    );
  };

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

  const clearCart = () => {
    setItems([]);
  };

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
          item.price * item.quantity,
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