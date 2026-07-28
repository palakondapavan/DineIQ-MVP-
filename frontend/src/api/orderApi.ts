import api from "@/lib/api";

export interface PlaceOrderItem {
  variant_id: number;
  quantity: number;
  special_instruction?: string | null;
}

export interface PlaceOrderRequest {
  table_id: number;
  remarks?: string | null;
  items: PlaceOrderItem[];
}

export interface OrderItemResponse {
  order_item_id: number;
  variant_id: number;
  quantity: number;
  price_at_order: number;
  item_status: string;
  special_instruction?: string | null;
}

export interface PlaceOrderResponse {
  order_id: number;
  session_id: number;
  waiter_id?: number | null;
  chef_id?: number | null;
  status: string;
  total_amount: number;
  remarks?: string | null;
  items: OrderItemResponse[];
}

export async function placeOrder(
  payload: PlaceOrderRequest
): Promise<PlaceOrderResponse> {
  const response = await api.post<PlaceOrderResponse>(
    "/orders/place",
    payload
  );

  return response.data;
}