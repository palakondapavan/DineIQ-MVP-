import { api } from "@/shared/api/client";

import type {
  PlaceOrderRequest,
  PlaceOrderResponse,
} from "../types/order.types";

export const placeOrderApi = {
  async place(
    payload: PlaceOrderRequest
  ): Promise<PlaceOrderResponse> {
    const { data } = await api.post(
      "/orders/place",
      payload
    );

    return data;
  },
};