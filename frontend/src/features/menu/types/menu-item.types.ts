import type { MenuVariant } from "./variant.types";

export interface MenuItem {
  id: number;

  category_id: number;

  name: string;

  description?: string;

  image_url?: string;

  base_price: number;

  is_veg: boolean;

  is_available: boolean;

  preparation_time?: number;

  display_order: number;

  variants: MenuVariant[];

  created_at?: string;

  updated_at?: string;
}