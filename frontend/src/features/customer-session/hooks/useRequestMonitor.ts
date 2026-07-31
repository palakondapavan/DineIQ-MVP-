import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { resumeSessionService } from "../services/resumeSession.service";
import { tableRequestService } from "../services/tableRequest.service";
import { sessionStorage } from "../utils/sessionStorage";

interface UseRequestMonitorProps {
  requestId: number;

  onSessionCreated: (
    sessionId: number
  ) => void;
}

export function useRequestMonitor({
  requestId,
  onSessionCreated,
}: UseRequestMonitorProps) {
  const [resumeCompleted, setResumeCompleted] =
    useState(false);

  const stored = sessionStorage.load();

  const requestQuery = useQuery({
    queryKey: ["table-request", requestId],

    queryFn: () =>
      tableRequestService.getRequest(requestId),

    enabled:
      requestId > 0 &&
      !!stored &&
      stored.sessionId === null,

    staleTime: 0,

    refetchInterval: ({ state }) => {
      const request = state.data;

      if (!request) {
        return 3000;
      }

      return request.status === "PENDING"
        ? 3000
        : false;
    },
  });

  useEffect(() => {
    async function resume() {
      if (resumeCompleted) return;

      if (!stored) return;

      const request = requestQuery.data;

      if (!request) return;

      if (request.status !== "ACCEPTED") {
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

        onSessionCreated(
          session.session_id
        );

        setResumeCompleted(true);
      } catch (error) {
        console.error(
          "Resume session failed",
          error
        );
      }
    }

    resume();
  }, [
    requestQuery.data,
    stored,
    resumeCompleted,
    onSessionCreated,
  ]);

  return {
    request: requestQuery.data,

    isLoading:
      requestQuery.isLoading,

    isPending:
      requestQuery.data?.status ===
      "PENDING",

    isAccepted:
      requestQuery.data?.status ===
      "ACCEPTED",

    isRejected:
      requestQuery.data?.status ===
      "REJECTED",
  };
}