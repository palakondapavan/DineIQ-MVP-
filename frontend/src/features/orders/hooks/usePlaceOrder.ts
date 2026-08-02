import { useMutation } from "@tanstack/react-query";

import { placeOrderService } from "../services/placeOrder.service";

import type {
  PlaceOrderRequest,
  PlaceOrderResponse,
} from "../types/order.types";

export function usePlaceOrder() {
  return useMutation<
    PlaceOrderResponse,
    Error,
    PlaceOrderRequest
  >({
    mutationFn: (payload) =>
      placeOrderService.place(payload),
  });
}