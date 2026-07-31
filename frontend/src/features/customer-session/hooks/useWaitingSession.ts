import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import { sessionStorage } from "../utils/sessionStorage";

import { tableRequestService } from "../services/tableRequest.service";
import { resumeSessionService } from "../services/resumeSession.service";

interface UseWaitingSessionProps {
  requestId: number;
}

export function useWaitingSession({
  requestId,
}: UseWaitingSessionProps) {
  const navigate = useNavigate();

  const stored = sessionStorage.load();

  const query = useQuery({
    queryKey: ["table-request", requestId],

    queryFn: () =>
      tableRequestService.getRequest(requestId),

    enabled: requestId > 0,

    refetchInterval: (query) => {
      const request = query.state.data;

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
      if (!query.data) return;

      if (query.data.status !== "ACCEPTED") {
        return;
      }

      if (!stored) return;

      if (stored.sessionId) {
        return;
      }


      try {
        const session =
        await resumeSessionService.resume({
            table_id: stored.tableId,
            customer_mobile: stored.customerMobile,
        });

        if (!session) {
        return;
        }

        sessionStorage.update({
        sessionId: session.session_id,
        });

        navigate(
          `/customer/menu/${requestId}`,
          {
            replace: true,
          }
        );
      } catch (error) {
        console.error(error);
      }
    }

    resume();
  }, [
    query.data,
    stored,
    navigate,
    requestId,
  ]);

  return {
    request: query.data,

    isPending:
      query.data?.status === "PENDING",

    isAccepted:
      query.data?.status === "ACCEPTED",

    isRejected:
      query.data?.status === "REJECTED",
  };
}