import { customerSessionApi } from "../api/customerSession.api";

import type {
  CustomerSession,
  CustomerSessionStatus,
} from "../types";

export const customerSessionService = {
  async getSession(
    requestId: number
  ): Promise<CustomerSession> {
    return customerSessionApi.getSession(requestId);
  },

  isPending(session: CustomerSession): boolean {
    return session.status === "PENDING";
  },

  isAccepted(session: CustomerSession): boolean {
    return session.status === "ACCEPTED";
  },

  isRejected(session: CustomerSession): boolean {
    return session.status === "REJECTED";
  },

  isCompleted(session: CustomerSession): boolean {
    return session.status === "COMPLETED";
  },

  canPlaceOrders(
    session: CustomerSession
  ): boolean {
    return session.status === "ACCEPTED";
  },

  getStatusLabel(
    status: CustomerSessionStatus
  ): string {
    switch (status) {
      case "PENDING":
        return "Waiting for Approval";

      case "ACCEPTED":
        return "Table Open";

      case "REJECTED":
        return "Request Rejected";

      case "COMPLETED":
        return "Dining Completed";

      case "CANCELLED":
        return "Cancelled";

      default:
        return "Unknown";
    }
  },
};