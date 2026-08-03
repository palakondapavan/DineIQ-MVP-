import { motion } from "framer-motion";
import {
  Receipt,
  Trash2,
} from "lucide-react";

import { useCancelOrder } from "../hooks/useCancelOrder";

import type {
  CustomerOrder,
} from "../types/customerOrder.types";

import OrderItem from "./OrderItem";
import OrderStatusChip from "./OrderStatusChip";

import { useConfirmDialog } from "@/shared/components/confirm-dialog";

interface Props {
  order: CustomerOrder;
}

export default function OrderCard({
  order,
}: Props) {
  const cancelOrder =
    useCancelOrder();

  const confirm =
    useConfirmDialog();

  const editable =
    order.status === "PLACED" ||
    order.status === "ACCEPTED";

  async function handleCancel() {
    const confirmed =
      await confirm({
        variant: "warning",

        title: "Cancel Order",

        description:
          "Are you sure you want to cancel this entire order? All editable items in this order will be cancelled.",

        confirmText:
          "Cancel Order",

        cancelText:
          "Keep Order",
      });

    if (!confirmed) {
      return;
    }

    try {
      await cancelOrder.mutateAsync(
        order.order_id
      );
    } catch (error) {
      console.error(error);

      alert(
        "Unable to cancel order."
      );
    }
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
        scale: 0.98,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.35,
      }}
      whileHover={{
        y: -2,
      }}
      className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-xl transition-all"
    >
      {/* Header */}

      <div className="bg-gradient-to-r from-indigo-50 via-white to-violet-50 px-7 py-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg">
              <Receipt size={24} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Order #{order.order_id}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {order.items.length}{" "}
                {order.items.length === 1
                  ? "Item"
                  : "Items"}
              </p>
            </div>
          </div>

          <OrderStatusChip
            status={order.status}
          />
        </div>
      </div>

      {/* Items */}

      <div className="space-y-5 bg-slate-50/50 p-6">
        {order.items.map((item) => (
          <OrderItem
            key={item.order_item_id}
            item={item}
          />
        ))}
      </div>

      {/* Footer */}

      <div className="border-t border-slate-200 bg-white px-7 py-6">
        <div className="flex items-center justify-between">
          <span className="text-base font-semibold text-slate-600">
            Order Total
          </span>

          <span className="bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-3xl font-extrabold text-transparent">
            ₹{order.total_amount}
          </span>
        </div>

        {editable && (
          <button
            onClick={handleCancel}
            disabled={
              cancelOrder.isPending
            }
            className="
              mt-6
              flex
              h-14
              w-full
              items-center
              justify-center
              gap-3
              rounded-2xl
              border
              border-rose-200
              bg-gradient-to-r
              from-rose-50
              to-red-50
              font-semibold
              text-rose-600
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:border-rose-300
              hover:shadow-md
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <Trash2 size={18} />

            {cancelOrder.isPending
              ? "Cancelling..."
              : "Cancel Order"}
          </button>
        )}
      </div>
    </motion.div>
  );
}