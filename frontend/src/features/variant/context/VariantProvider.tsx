import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import { useCartContext } from "@/features/cart/context/CartProvider";

import type { MenuItem } from "@/features/customer-session/types/customerMenu.types";
import type { Variant } from "../types/variant.types";

interface VariantContextValue {
  isOpen: boolean;

  menuItem: MenuItem | null;

  selectedVariant: Variant | null;

  open: (item: MenuItem) => void;

  close: () => void;

  selectVariant: (variant: Variant) => void;

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
    selectedVariant,
    setSelectedVariant,
  ] = useState<Variant | null>(null);

  function open(item: MenuItem) {
    // Single variant → directly add to cart
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

    // Multiple variants → open selector
    setMenuItem(item);

    setSelectedVariant(
      item.variants.length > 0
        ? item.variants[0]
        : null
    );

    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);

    setMenuItem(null);

    setSelectedVariant(null);
  }

  function selectVariant(
    variant: Variant
  ) {
    setSelectedVariant(variant);
  }

  function confirm() {
    if (!menuItem || !selectedVariant) {
      return;
    }

    addItem({
      item_id: menuItem.item_id,
      item_name: menuItem.item_name,
      image_url: menuItem.image_url,
      variant_id:
        selectedVariant.variant_id,
      variant_name:
        selectedVariant.variant_name,
      price: selectedVariant.price,
      quantity: 1,
      notes: "",
      is_available:
        menuItem.is_available,
    });

    close();
  }

  return (
    <VariantContext.Provider
      value={{
        isOpen,
        menuItem,
        selectedVariant,
        open,
        close,
        selectVariant,
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