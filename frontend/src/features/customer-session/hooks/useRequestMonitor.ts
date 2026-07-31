import { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";

import { resumeSessionService } from "../services/resumeSession.service";
import { tableRequestService } from "../services/tableRequest.service";
import { sessionStorage } from "../utils/sessionStorage";

interface UseRequestMonitorProps {
  requestId: number;
}

export function useRequestMonitor({
  requestId,
}: UseRequestMonitorProps) {
  const stored = sessionStorage.load();

  const requestQuery = useQuery({
    queryKey: ["table-request", requestId],

    queryFn: () =>
      tableRequestService.getRequest(requestId),

    enabled:
      requestId > 0 &&
      stored?.sessionId === null,

    refetchInterval: ({ state }) => {
      const request = state.data;

      if (!request) {
        return 3000;
      }

      return request.status === "PENDING"
        ? 3000
        : false;
    },

    staleTime: 0,
  });

  useEffect(() => {
    async function resumeSession() {
      if (!stored) return;

      const request = requestQuery.data;

      if (!request) return;

      if (request.status !== "ACCEPTED") {
        return;
      }

      if (stored.sessionId) {
        return;
      }

      try {
        const session =
          await resumeSessionService.resume({
            table_id: stored.tableId,
            customer_mobile:
              stored.customerMobile,
          });

        sessionStorage.update({
          sessionId: session.session_id,
        });

        /**
         * Refresh page state.
         * We'll remove this in the next phase
         * using React Query cache.
         */
        window.location.reload();
      } catch (error) {
        console.error(
          "Resume session failed",
          error
        );
      }
    }

    resumeSession();
  }, [requestQuery.data]);

  return {
    request: requestQuery.data,

    isLoading: requestQuery.isLoading,

    isPending:
      requestQuery.data?.status === "PENDING",

    isAccepted:
      requestQuery.data?.status === "ACCEPTED",

    isRejected:
      requestQuery.data?.status === "REJECTED",
  };
}