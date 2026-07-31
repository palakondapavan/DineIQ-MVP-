import { api } from "@/shared/api/client";

import type { CustomerSession } from "../types";

export const sessionBootstrapApi = {
  async getSession(sessionId: string): Promise<CustomerSession> {
    const { data } = await api.get(
      `/sessions/customer/session/${sessionId}`
    );

    return data;
  },
};