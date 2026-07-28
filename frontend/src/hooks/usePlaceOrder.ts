import { useMutation } from "@tanstack/react-query";

import {
  placeOrder,
  type PlaceOrderRequest,
} from "@/api/orderApi";

export function usePlaceOrder() {
  return useMutation({
    mutationFn: (payload: PlaceOrderRequest) =>
      placeOrder(payload),
  });
}