import { Outlet } from "react-router-dom";

import { CartProvider } from "@/features/cart/context/CartProvider";

import { CartDrawerProvider } from "@/features/cart/context/CartDrawerProvider";


import { VariantProvider } from "@/features/variant/context/VariantProvider";

import VariantBottomSheet from "@/features/variant/components/VariantBottomSheet";

export default function CustomerLayout() {
  return (
    <CartProvider>
        <CartDrawerProvider>
            <VariantProvider>
                <Outlet />
                

                <VariantBottomSheet />
            </VariantProvider>
      </CartDrawerProvider>
    </CartProvider>
  );
}