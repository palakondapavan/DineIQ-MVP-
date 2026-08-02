import { useMutation, useQueryClient } from "@tanstack/react-query";

import { customerOrdersService } from "../services/customerOrders.service";

export function useCancelOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId: number) =>
      customerOrdersService.cancelOrder(
        orderId
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