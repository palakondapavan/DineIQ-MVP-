export interface MenuVariant {
  id: number;

  menu_item_id: number;

  name: string;

  price: number;

  is_default: boolean;

  is_active: boolean;

  created_at?: string;

  updated_at?: string;
}