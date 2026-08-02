import { useQuery } from "@tanstack/react-query";

import { customerOrdersService } from "../services/customerOrders.service";

export function useCustomerOrders(
  sessionId: number | null
) {
  return useQuery({
    queryKey: [
      "customer-orders",
      sessionId,
    ],

    enabled: !!sessionId,

    queryFn: () =>
      customerOrdersService.getSessionOrders(
        sessionId!
      ),

    // Live updates
    refetchInterval: 5000,

    // Refetch when returning to the tab
    refetchOnWindowFocus: true,

    // Refetch when internet reconnects
    refetchOnReconnect: true,

    // Consider data fresh briefly
    staleTime: 1000,

    // Keep cache for 5 minutes
    gcTime: 1000 * 60 * 5,
  });
}