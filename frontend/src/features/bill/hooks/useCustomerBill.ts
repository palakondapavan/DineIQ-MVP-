import { useQuery } from "@tanstack/react-query";

import { customerBillService } from "../services/customerBill.service";

export function useCustomerBill(
  sessionId: number | null
) {
  return useQuery({
    queryKey: [
      "customer-bill",
      sessionId,
    ],

    enabled: !!sessionId,

    queryFn: () =>
      customerBillService.getBill(
        sessionId!
      ),

    refetchInterval: 3000,

    refetchOnWindowFocus: true,

    staleTime: 0,
  });
}