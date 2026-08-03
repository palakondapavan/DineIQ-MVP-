import { Outlet } from "react-router-dom";

import { CartProvider } from "@/features/cart/context/CartProvider";
import { CartDrawerProvider } from "@/features/cart/context/CartDrawerProvider";

import { VariantProvider } from "@/features/variant/context/VariantProvider";
import VariantBottomSheet from "@/features/variant/components/VariantBottomSheet";

import { BillSheetProvider } from "@/features/bill/context/BillSheetProvider";

import ConfirmDialogProvider from "@/shared/components/confirm-dialog/ConfirmDialogProvider";

export default function CustomerLayout() {
  return (
    <ConfirmDialogProvider>
      <BillSheetProvider>
        <CartProvider>
          <CartDrawerProvider>
            <VariantProvider>
              <Outlet />

              <VariantBottomSheet />
            </VariantProvider>
          </CartDrawerProvider>
        </CartProvider>
      </BillSheetProvider>
    </ConfirmDialogProvider>
  );
}