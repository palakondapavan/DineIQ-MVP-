import { customerSessionApi } from "../api/customerSession.api";

import type {
  CustomerSession,
  CustomerSessionStatus,
} from "../types";

export const customerSessionService = {
  async getSession(
    sessionId: number
  ): Promise<CustomerSession> {
    return customerSessionApi.getSession(sessionId);
  },

  isPending(session: CustomerSession): boolean {
    return session.status === "PENDING";
  },

  isAccepted(session: CustomerSession): boolean {
    return session.status === "ACTIVE";
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
    return session.status === "ACTIVE";
  },

  getStatusLabel(
    status: CustomerSessionStatus
  ): string {
    switch (status) {
      case "PENDING":
        return "Waiting for Waiter Approval";

      case "ACTIVE":
        return "Table Open";

      case "REJECTED":
        return "Request Rejected";

      case "COMPLETED":
        return "Dining Completed";

      case "CANCELLED":
        return "Session Cancelled";

      default:
        return "Unknown";
    }
  },
};