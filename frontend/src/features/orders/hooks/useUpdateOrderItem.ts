import { useMutation, useQueryClient } from "@tanstack/react-query";

import { customerOrderItemService } from "../services/customerOrderItem.service";

export function useUpdateOrderItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      itemId,
      quantity,
    }: {
      itemId: number;
      quantity: number;
    }) =>
      customerOrderItemService.updateQuantity(
        itemId,
        quantity
      ),

    onSuccess: async () => {
    await queryClient.refetchQueries({
        queryKey: [
        "customer-orders",
        ],
        exact: false,
    });
    },
  });
}