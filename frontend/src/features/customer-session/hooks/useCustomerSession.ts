import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { customerSessionService } from "../services/customerSession.service";

export function useCustomerSession(sessionId: number) {
  const query = useQuery({
    queryKey: ["customer-session", sessionId],

    queryFn: () =>
      customerSessionService.getSession(sessionId),

    enabled: sessionId > 0,

    /**
     * Poll while customer is waiting
     * for waiter approval.
     */
    refetchInterval: (query) => {
      const session = query.state.data;

      if (!session) {
        return 3000;
      }

      return customerSessionService.canPlaceOrders(session)
        ? false
        : 3000;
    },

    staleTime: 0,
  });

  const session = query.data;

  const derived = useMemo(() => {
    if (!session) {
      return {
        isPending: false,
        isAccepted: false,
        isRejected: false,
        isCompleted: false,
        canPlaceOrders: false,
        statusLabel: "",
      };
    }

    return {
      isPending:
        customerSessionService.isPending(session),

      isAccepted:
        customerSessionService.isAccepted(session),

      isRejected:
        customerSessionService.isRejected(session),

      isCompleted:
        customerSessionService.isCompleted(session),

      canPlaceOrders:
        customerSessionService.canPlaceOrders(session),

      statusLabel:
        customerSessionService.getStatusLabel(
          session.status
        ),
    };
  }, [session]);

  return {
    session,

    ...derived,

    isLoading: query.isLoading,

    isFetching: query.isFetching,

    isError: query.isError,

    error: query.error,

    refetch: query.refetch,
  };
}