import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { customerSessionService } from "../services/customerSession.service";

export function useActiveSession(
  sessionId: number | null
) {
  const query = useQuery({
    queryKey: ["customer-session", sessionId],

    queryFn: () =>
      customerSessionService.getSession(sessionId!),

    enabled: sessionId !== null,

    staleTime: 0,
  });

  const session = query.data;

  const derived = useMemo(() => {
    if (!session) {
      return {
        hasSession: false,
        canPlaceOrders: false,
      };
    }

    return {
      hasSession: true,
      canPlaceOrders:
        customerSessionService.canPlaceOrders(
          session
        ),
    };
  }, [session]);

  return {
    session,

    ...derived,

    isLoading: query.isLoading,

    isError: query.isError,
  };
}