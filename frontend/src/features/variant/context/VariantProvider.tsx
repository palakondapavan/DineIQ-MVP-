import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { useCartContext } from "@/features/cart/context/CartProvider";

import type { MenuItem } from "@/features/customer-session/types/customerMenu.types";
import type { Variant } from "../types/variant.types";

interface SelectedVariant {
  variant: Variant;

  quantity: number;
}

interface VariantContextValue {
  isOpen: boolean;

  menuItem: MenuItem | null;

  selectedVariants: SelectedVariant[];

  open: (item: MenuItem) => void;

  close: () => void;

  increase: (variant: Variant) => void;

  decrease: (variant: Variant) => void;

  getQuantity: (variantId: number) => number;

  totalItems: number;

  totalPrice: number;

  confirm: () => void;
}

const VariantContext =
  createContext<VariantContextValue | null>(
    null
  );

interface Props {
  children: ReactNode;
}

export function VariantProvider({
  children,
}: Props) {
  const { addItem } = useCartContext();

  const [isOpen, setIsOpen] =
    useState(false);

  const [menuItem, setMenuItem] =
    useState<MenuItem | null>(null);

  const [
    selectedVariants,
    setSelectedVariants,
  ] = useState<SelectedVariant[]>([]);

  function open(item: MenuItem) {
    /**
     * Single variant
     * Direct add.
     */
    if (item.variants.length === 1) {
      const variant = item.variants[0];

      addItem({
        item_id: item.item_id,
        item_name: item.item_name,
        image_url: item.image_url,
        variant_id: variant.variant_id,
        variant_name: variant.variant_name,
        price: variant.price,
        quantity: 1,
        notes: "",
        is_available: item.is_available,
      });

      return;
    }

    setMenuItem(item);

    setSelectedVariants([]);

    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);

    setMenuItem(null);

    setSelectedVariants([]);
  }

  function increase(
    variant: Variant
  ) {
    setSelectedVariants(
      (previous) => {
        const index =
          previous.findIndex(
            (item) =>
              item.variant.variant_id ===
              variant.variant_id
          );

        if (index === -1) {
          return [
            ...previous,
            {
              variant,
              quantity: 1,
            },
          ];
        }

        const updated = [...previous];

        updated[index] = {
          ...updated[index],
          quantity:
            updated[index].quantity + 1,
        };

        return updated;
      }
    );
  }

  function decrease(
    variant: Variant
  ) {
    setSelectedVariants(
      (previous) =>
        previous
          .map((item) =>
            item.variant.variant_id ===
            variant.variant_id
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
  }

  function getQuantity(
    variantId: number
  ) {
    return (
      selectedVariants.find(
        (item) =>
          item.variant.variant_id ===
          variantId
      )?.quantity ?? 0
    );
  }

  const totalItems = useMemo(
    () =>
      selectedVariants.reduce(
        (sum, item) =>
          sum + item.quantity,
        0
      ),
    [selectedVariants]
  );

  const totalPrice = useMemo(
    () =>
      selectedVariants.reduce(
        (sum, item) =>
          sum +
          item.variant.price *
            item.quantity,
        0
      ),
    [selectedVariants]
  );

  function confirm() {
    if (!menuItem) {
      return;
    }

    selectedVariants.forEach(
      ({ variant, quantity }) => {
        addItem({
          item_id: menuItem.item_id,
          item_name:
            menuItem.item_name,
          image_url:
            menuItem.image_url,
          variant_id:
            variant.variant_id,
          variant_name:
            variant.variant_name,
          price: variant.price,
          quantity,
          notes: "",
          is_available:
            menuItem.is_available,
        });
      }
    );

    close();
  }

  return (
    <VariantContext.Provider
      value={{
        isOpen,
        menuItem,
        selectedVariants,

        open,
        close,

        increase,
        decrease,

        getQuantity,

        totalItems,

        totalPrice,

        confirm,
      }}
    >
      {children}
    </VariantContext.Provider>
  );
}

export function useVariantContext() {
  const context =
    useContext(VariantContext);

  if (!context) {
    throw new Error(
      "useVariantContext must be used inside VariantProvider."
    );
  }

  return context;
}