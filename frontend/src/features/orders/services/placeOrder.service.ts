import { AxiosError } from "axios";

import { placeOrderApi } from "../api/placeOrder.api";

import type {
  PlaceOrderRequest,
  PlaceOrderResponse,
} from "../types/order.types";

export const placeOrderService = {
  async place(
    payload: PlaceOrderRequest
  ): Promise<PlaceOrderResponse> {
    try {
      return await placeOrderApi.place(
        payload
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(
          "Place order failed:",
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