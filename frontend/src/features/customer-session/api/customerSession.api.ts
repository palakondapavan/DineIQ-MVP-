import { api } from "@/shared/api/client";

import type { CustomerSession } from "../types";

export const customerSessionApi = {
  async getSession(
    requestId: number
  ): Promise<CustomerSession> {
    const { data } = await api.get(
      `/table-requests/${requestId}`
    );

    return data;
  },
};