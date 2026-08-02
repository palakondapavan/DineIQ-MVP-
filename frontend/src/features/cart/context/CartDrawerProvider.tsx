import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface CartDrawerContextValue {
  isOpen: boolean;

  open: () => void;

  close: () => void;

  toggle: () => void;
}

const CartDrawerContext =
  createContext<CartDrawerContextValue | null>(
    null
  );

interface Props {
  children: ReactNode;
}

export function CartDrawerProvider({
  children,
}: Props) {
  const [isOpen, setIsOpen] =
    useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  function toggle() {
    setIsOpen((previous) => !previous);
  }

  return (
    <CartDrawerContext.Provider
      value={{
        isOpen,
        open,
        close,
        toggle,
      }}
    >
      {children}
    </CartDrawerContext.Provider>
  );
}

export function useCartDrawerContext() {
  const context =
    useContext(CartDrawerContext);

  if (!context) {
    throw new Error(
      "useCartDrawerContext must be used inside CartDrawerProvider."
    );
  }

  return context;
}