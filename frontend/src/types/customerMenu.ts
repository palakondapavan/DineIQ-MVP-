export interface MenuVariant {
  variant_id: number;
  variant_name: string;
  price: number;
}

export interface MenuItem {
  item_id: number;
  item_name: string;
  description: string | null;
  image_url: string | null;
  food_type: string;
  is_available: boolean;
  variants: MenuVariant[];
}

export interface Category {
  category_id: number;
  category_name: string;
  description: string | null;
  items: MenuItem[];
}

export interface CustomerMenuResponse {
  categories: Category[];
}