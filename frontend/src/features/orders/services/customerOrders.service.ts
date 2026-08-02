import { AxiosError } from "axios";

import { customerOrdersApi } from "../api/customerOrders.api";

import type {
  CustomerOrder,
} from "../types/customerOrder.types";

export const customerOrdersService = {
  /**
   * Get Orders of Current Session
   */
  async getSessionOrders(
    sessionId: number
  ): Promise<CustomerOrder[]> {
    try {
      return await customerOrdersApi.getSessionOrders(
        sessionId
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(
          "Failed to fetch customer orders:",
          error.response?.data ??
            error.message
        );
      } else {
        console.error(error);
      }

      throw error;
    }
  },

  /**
   * Cancel Entire Order
   */
  async cancelOrder(
    orderId: number
  ): Promise<CustomerOrder> {
    try {
      return await customerOrdersApi.cancelOrder(
        orderId
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(
          "Failed to cancel order:",
          error.response?.data ??
            error.message
        );
      } else {
        console.error(error);
      }

      throw error;
    }
  },
};