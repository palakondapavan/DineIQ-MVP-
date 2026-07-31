import { menuApi } from "../api/menu.api";

import type {
  Category,
  MenuItem,
  MenuResponse,
  MenuVariant,
} from "../types";

export const menuService = {
  async getMenu(): Promise<MenuResponse> {
    const [
      categories,
      items,
      variants,
    ] = await Promise.all([
      menuApi.getCategories(),
      menuApi.getMenuItems(),
      menuApi.getVariants(),
    ]);

    const menuItems = this.attachVariants(
      items,
      variants
    );

    return {
      categories,
      items: menuItems,
      offers: [],
    };
  },

  attachVariants(
    items: MenuItem[],
    variants: MenuVariant[]
  ): MenuItem[] {
    return items.map((item) => ({
      ...item,

      variants: variants.filter(
        (variant) =>
          variant.menu_item_id === item.id
      ),
    }));
  },
};