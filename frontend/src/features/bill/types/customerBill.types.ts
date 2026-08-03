export interface CustomerBillItem {
  order_item_id: number;

  item_name: string;

  variant_name: string | null;

  quantity: number;

  unit_price: number;

  subtotal: number;
}

export interface CustomerBill {
  bill_generated: boolean;

  bill_id: number | null;

  session_id: number;

  subtotal: number;

  gst: number;

  discount: number;

  grand_total: number;

  bill_status: string | null;

  items: CustomerBillItem[];
}