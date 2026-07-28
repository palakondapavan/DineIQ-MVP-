import { useMutation, useQuery } from "@tanstack/react-query";

import {
  createTableRequest,
  getTableRequest,
} from "@/api/tableRequestApi";

import type { TableRequestCreate } from "@/types/tableRequest";

/**
 * Create Table Request
 */
export function useTableRequest() {
  return useMutation({
    mutationFn: ({
      tableId,
      request,
    }: {
      tableId: number;
      request: TableRequestCreate;
    }) => createTableRequest(tableId, request),
  });
}

/**
 * Poll Table Request Status
 */
export function useTableRequestStatus(requestId?: number) {
  return useQuery({
    queryKey: ["table-request-status", requestId],

    queryFn: () => getTableRequest(requestId!),

    enabled: !!requestId,

    // Poll every 3 seconds while request is pending
    refetchInterval: (query) => {
      const status = query.state.data?.status;

      if (status === "ACCEPTED") {
        return false;
      }

      if (status === "REJECTED") {
        return false;
      }

      return 3000;
    },

    // Keep polling even if the tab regains focus
    refetchOnWindowFocus: true,

    retry: 2,
  });
}