import { api } from "@/shared/api/client";

import type {
  Category,
  MenuItem,
  MenuVariant,
} from "../types";

export const menuApi = {
  getCategories: async (): Promise<Category[]> => {
    const { data } = await api.get("/categories/");

    return data;
  },

  getMenuItems: async (): Promise<MenuItem[]> => {
    const { data } = await api.get("/menu-items/");

    return data;
  },

  getVariants: async (): Promise<MenuVariant[]> => {
    const { data } = await api.get("/menu-variants/");

    return data;
  },
};