import { api } from "@/shared/api/client";

import type { CustomerSession } from "../types";

export const customerSessionApi = {
  async getSession(
    sessionId: number
  ): Promise<CustomerSession> {
    const { data } = await api.get(
      `/sessions/customer/session/${sessionId}`
    );

    return data;
  },
};