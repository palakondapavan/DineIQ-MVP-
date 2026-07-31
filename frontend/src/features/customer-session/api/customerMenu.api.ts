import { api } from "@/shared/api/client";

import type { CustomerMenuResponse } from "../types/customerMenu.types";

export const customerMenuApi = {
  async getMenu(): Promise<CustomerMenuResponse> {
    const { data } = await api.get(
      "/customer/menu"
    );

    return data;
  },
};