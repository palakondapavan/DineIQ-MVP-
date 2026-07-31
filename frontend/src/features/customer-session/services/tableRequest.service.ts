import { tableRequestApi } from "../api/tableRequest.api";

export const tableRequestService = {
  getRequest(requestId: number) {
    return tableRequestApi.getRequest(requestId);
  },

  isPending(status: string) {
    return status === "PENDING";
  },

  isAccepted(status: string) {
    return status === "ACCEPTED";
  },

  isRejected(status: string) {
    return status === "REJECTED";
  },
};