export type OrderStatus =
  | "PLACED"
  | "ACCEPTED"
  | "PREPARING"
  | "READY"
  | "SERVED"
  | "CANCELLED";

export interface CustomerOrderItem {
  order_item_id: number;

  variant_id: number;

  variant_name: string;

  item_name: string;

  image_url: string | null;

  food_type: string;

  quantity: number;

  price_at_order: number;

  item_status: string;

  special_instruction: string | null;
}

export interface CustomerOrder {
  order_id: number;

  session_id: number;

  waiter_id: number | null;

  chef_id: number | null;

  status: OrderStatus;

  total_amount: number;

  remarks: string | null;

  items: CustomerOrderItem[];
}