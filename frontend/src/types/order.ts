export interface OrderItemRequest {
  variant_id: number;
  quantity: number;
  note?: string;
}

export interface PlaceOrderRequest {
  table_id: number;
  session_id: number;
  items: OrderItemRequest[];
}

export interface PlaceOrderResponse {
  order_id: number;
  status: string;
  estimated_time: number;
}