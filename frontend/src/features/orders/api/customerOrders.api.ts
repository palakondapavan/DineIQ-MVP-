import { api } from "@/shared/api/client";

import type {
  CustomerOrder,
} from "../types/customerOrder.types";

export const customerOrdersApi = {
  /**
   * Get Orders of Current Session
   */
  async getSessionOrders(
    sessionId: number
  ): Promise<CustomerOrder[]> {
    const { data } = await api.get(
      `/customer/session/${sessionId}/orders`
    );

    return data;
  },

  /**
   * Cancel Entire Order
   */
  async cancelOrder(
    orderId: number
  ): Promise<CustomerOrder> {
    const { data } = await api.delete(
      `/customer/orders/${orderId}`
    );

    return data;
  },
};