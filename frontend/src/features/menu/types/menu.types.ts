import type { Category } from "./category.types";
import type { MenuItem } from "./menu-item.types";

export type MenuMode =
  | "PUBLIC"
  | "PENDING"
  | "ACTIVE";

export interface Offer {
  id: number;

  title: string;

  description: string;

  image_url?: string;
}

export interface MenuResponse {
  categories: Category[];

  items: MenuItem[];

  offers: Offer[];
}