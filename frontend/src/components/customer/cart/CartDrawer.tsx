import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";

import {
  Minus,
  Plus,
  Trash2,
  ShoppingCart,
  Loader2,
  Clock3,
} from "lucide-react";

import { toast } from "sonner";

import { useCartStore } from "@/store/cartStore";
import { usePlaceOrder } from "@/hooks/usePlaceOrder";


interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  tableId: number;
  canPlaceOrder: boolean;
}


export default function CartDrawer({
  open,
  onOpenChange,
  tableId,
  canPlaceOrder,
}: Props) {

  const items = useCartStore(
    (state) => state.items
  );

  const increaseQuantity = useCartStore(
    (state) => state.increaseQuantity
  );

  const decreaseQuantity = useCartStore(
    (state) => state.decreaseQuantity
  );

  const removeItem = useCartStore(
    (state) => state.removeItem
  );

  const clearCart = useCartStore(
    (state) => state.clearCart
  );

  const subtotal = useCartStore(
    (state) => state.getSubtotal()
  );

  const totalItems = useCartStore(
    (state) => state.getTotalItems()
  );


  const placeOrderMutation = usePlaceOrder();


  // =====================================================
  // Place Order
  // =====================================================

  const handlePlaceOrder = () => {

    if (items.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }


    if (!canPlaceOrder) {

      toast.info(
        "Please wait for the waiter to activate your table."
      );

      return;
    }


    const payload = {

      table_id: tableId,

      remarks: null,

      items: items.map((item) => ({

        variant_id: item.variant_id,

        quantity: item.quantity,

        special_instruction:
          item.note?.trim()
            ? item.note.trim()
            : null,

      })),

    };


    placeOrderMutation.mutate(
      payload,
      {
        onSuccess: (order) => {

          toast.success(
            `Order #${order.order_id} placed successfully!`
          );

          clearCart();

          onOpenChange(false);
        },

        onError: (error: any) => {

          console.error(
            "Place order error:",
            error
          );


          const message =
            error?.response?.data?.detail ||
            "Failed to place order. Please try again.";


          toast.error(message);
        },
      }
    );
  };


  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >

      <SheetContent
        side="bottom"
        className="flex h-[90vh] flex-col rounded-t-3xl p-0"
      >

        {/* Header */}

        <SheetHeader className="border-b p-6">

          <SheetTitle className="flex items-center gap-2 text-2xl">

            <ShoppingCart size={22} />

            Your Order

          </SheetTitle>

        </SheetHeader>


        {/* Cart Items */}

        <div className="flex-1 overflow-y-auto p-6">

          {items.length === 0 ? (

            <div className="flex h-full flex-col items-center justify-center text-center">

              <ShoppingCart
                size={64}
                className="mb-4 text-slate-300"
              />

              <h3 className="text-xl font-semibold">
                Your cart is empty
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Add some delicious dishes to get started.
              </p>

            </div>

          ) : (

            <div className="space-y-4">

              {items.map((item) => (

                <div
                  key={item.variant_id}
                  className="rounded-2xl border bg-white p-4 shadow-sm"
                >

                  <div className="flex justify-between">

                    <div className="flex-1">

                      <h3 className="font-semibold">
                        {item.item_name}
                      </h3>

                      <p className="text-sm text-slate-500">
                        {item.variant_name}
                      </p>


                      {item.note && (

                        <p className="mt-1 text-xs italic text-slate-400">
                          "{item.note}"
                        </p>

                      )}

                    </div>


                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={placeOrderMutation.isPending}
                      onClick={() =>
                        removeItem(item.variant_id)
                      }
                    >

                      <Trash2
                        size={18}
                        className="text-red-500"
                      />

                    </Button>

                  </div>


                  <div className="mt-4 flex items-center justify-between">

                    {/* Quantity */}

                    <div className="flex items-center gap-2">

                      <Button
                        variant="outline"
                        size="icon"
                        disabled={placeOrderMutation.isPending}
                        onClick={() =>
                          decreaseQuantity(
                            item.variant_id
                          )
                        }
                      >

                        <Minus size={14} />

                      </Button>


                      <span className="w-8 text-center font-semibold">
                        {item.quantity}
                      </span>


                      <Button
                        variant="outline"
                        size="icon"
                        disabled={placeOrderMutation.isPending}
                        onClick={() =>
                          increaseQuantity(
                            item.variant_id
                          )
                        }
                      >

                        <Plus size={14} />

                      </Button>

                    </div>


                    {/* Price */}

                    <div className="text-lg font-bold">

                      ₹
                      {item.unit_price *
                        item.quantity}

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>


        {/* Footer */}

        <div className="space-y-4 border-t bg-white p-6">

          <div className="flex justify-between text-sm">

            <span>Items</span>

            <span>{totalItems}</span>

          </div>


          <div className="flex justify-between text-lg font-semibold">

            <span>Subtotal</span>

            <span>₹{subtotal}</span>

          </div>


          {!canPlaceOrder && items.length > 0 && (

            <div className="flex items-start gap-2 rounded-xl bg-amber-50 p-3 text-sm text-amber-800">

              <Clock3
                size={17}
                className="mt-0.5 shrink-0"
              />

              <p>
                You can prepare your cart now.
                Place Order will unlock after the
                waiter activates your table.
              </p>

            </div>

          )}


          <p className="text-xs text-slate-500">
            Taxes and additional charges will be
            calculated during checkout.
          </p>


          <Button
            disabled={
              items.length === 0 ||
              !canPlaceOrder ||
              placeOrderMutation.isPending
            }
            onClick={handlePlaceOrder}
            className="h-12 w-full rounded-xl text-base font-semibold"
          >

            {placeOrderMutation.isPending ? (

              <span className="flex items-center gap-2">

                <Loader2
                  size={18}
                  className="animate-spin"
                />

                Placing Order...

              </span>

            ) : !canPlaceOrder ? (

              "Waiting for Waiter"

            ) : (

              `Place Order • ₹${subtotal}`

            )}

          </Button>

        </div>

      </SheetContent>

    </Sheet>
  );
}