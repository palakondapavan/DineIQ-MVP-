export interface MenuVariant {
  variant_id: number;
  variant_name: string;
  price: number;
}

export interface MenuItem {
  item_id: number;
  item_name: string;
  description: string;
  image_url: string;
  food_type: string;
  is_available: boolean;
  variants: MenuVariant[];
}

export interface MenuCategory {
  category_id: number;
  category_name: string;
  description: string;
  items: MenuItem[];
}

export interface CustomerMenuResponse {
  categories: MenuCategory[];
}