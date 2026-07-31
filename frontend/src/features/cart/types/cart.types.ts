/**
 * ===========================
 * Frontend Cart Models
 * ===========================
 */

export interface CartItem {
  item_id: number;

  item_name: string;

  image_url: string;

  variant_id: number | null;

  variant_name: string | null;

  price: number;

  quantity: number;

  notes: string;

  is_available: boolean;
}

export interface CartState {
  items: CartItem[];
}

export interface AddToCartPayload {
  item_id: number;

  item_name: string;

  image_url: string;

  variant_id: number | null;

  variant_name: string | null;

  price: number;

  quantity?: number;

  notes?: string;

  is_available: boolean;
}

export interface UpdateCartItemPayload {
  quantity: number;

  notes?: string;
}

export interface CartSummary {
  totalItems: number;

  subtotal: number;

  grandTotal: number;
}

/**
 * ===========================
 * Backend DTOs
 * ===========================
 */

export interface CustomerCartItem {
  order_item_id: number;

  item_id: number;

  item_name: string;

  image_url: string;

  variant_id: number | null;

  variant_name: string | null;

  quantity: number;

  unit_price: number;

  total_price: number;

  notes: string;
}

export interface CustomerCartResponse {
  session_id: number;

  subtotal: number;

  grand_total: number;

  items: CustomerCartItem[];
}