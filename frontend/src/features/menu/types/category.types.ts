export interface Category {
  id: number;
  name: string;
  description?: string;
  display_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}