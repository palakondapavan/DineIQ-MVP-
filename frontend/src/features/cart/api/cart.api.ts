import { api } from "@/shared/api/client";

import type { CustomerCartResponse } from "../types/cart.types";

export const cartApi = {
  async getCart(sessionId: number) {
    const { data } =
      await api.get<CustomerCartResponse>(
        `/customer/cart/${sessionId}`
      );

    return data;
  },

  async removeItem(itemId: number) {
    await api.delete(
      `/customer/order-items/${itemId}`
    );
  },

  async updateItem(
    itemId: number,
    quantity: number,
    notes: string
  ) {
    const { data } = await api.put(
      `/customer/order-items/${itemId}`,
      {
        quantity,
        notes,
      }
    );

    return data;
  },
};