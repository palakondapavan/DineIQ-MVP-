import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

import { usePlaceOrder } from "../hooks/usePlaceOrder";

import { useCart } from "@/features/cart/hooks/useCart";
import { useCartDrawer } from "@/features/cart/hooks/useCartDrawer";
import { sessionStorage } from "@/features/customer-session/utils/sessionStorage";

export default function PlaceOrderButton() {
  const navigate = useNavigate();

  const {
    items,
    clearCart,
  } = useCart();

  const { close } =
    useCartDrawer();

  const placeOrder =
    usePlaceOrder();

  async function handlePlaceOrder() {
    const session =
      sessionStorage.load();

    if (!session) {
      return;
    }

    if (items.length === 0) {
      return;
    }

    try {
      const response =
        await placeOrder.mutateAsync({
          table_id: session.tableId,

          remarks: "",

          items: items.map(
            (item) => ({
              variant_id:
                item.variant_id!,
              quantity:
                item.quantity,
              special_instruction:
                item.notes ?? "",
            })
          ),
        });

      console.log(
        "Order Created",
        response
      );

      clearCart();

      close();

      navigate(
        `/customer/orders/${response.order_id}`
      );
    } catch (error) {
      console.error(error);

      alert(
        "Unable to place order."
      );
    }
  }

  return (
    <button
      onClick={handlePlaceOrder}
      disabled={
        placeOrder.isPending ||
        items.length === 0
      }
      className="
        h-14
        w-full
        rounded-2xl
        bg-green-600
        text-lg
        font-semibold
        text-white
        transition
        hover:bg-green-700
        disabled:cursor-not-allowed
        disabled:bg-slate-300
      "
    >
      {placeOrder.isPending ? (
        "Placing Order..."
      ) : placeOrder.isSuccess ? (
        <span className="flex items-center justify-center gap-2">
          <CheckCircle2 size={20} />
          Order Placed
        </span>
      ) : (
        "Place Order"
      )}
    </button>
  );
}