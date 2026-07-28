export interface CartItem {
  item_id: number;
  item_name: string;

  variant_id: number;
  variant_name: string;

  unit_price: number;

  quantity: number;

  image_url?: string | null;

  special_instruction?: string;
}