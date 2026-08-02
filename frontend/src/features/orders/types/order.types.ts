export interface PlaceOrderItemRequest {
  variant_id: number;
  quantity: number;
  special_instruction: string;
}

export interface PlaceOrderRequest {
  table_id: number;
  remarks: string;
  items: PlaceOrderItemRequest[];
}

export interface OrderedItem {
  order_item_id: number;
  variant_id: number;
  quantity: number;
  status: string;
  special_instruction: string;
}

export interface PlaceOrderResponse {
  order_id: number;
  session_id: number;
  waiter_id: number | null;
  chef_id: number | null;
  status: string;
  total_amount: number;
  remarks: string;
  items: OrderedItem[];
}