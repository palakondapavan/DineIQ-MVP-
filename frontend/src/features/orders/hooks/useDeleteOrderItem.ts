import { useMutation, useQueryClient } from "@tanstack/react-query";

import { customerOrderItemService } from "../services/customerOrderItem.service";

export function useDeleteOrderItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemId: number) =>
      customerOrderItemService.deleteItem(
        itemId
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