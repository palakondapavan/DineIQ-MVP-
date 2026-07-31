import { cartApi } from "../api/cart.api";

export const cartService = {
  getCart: cartApi.getCart,

  removeItem: cartApi.removeItem,

  updateItem: cartApi.updateItem,

  toCartItems(response: Awaited<ReturnType<typeof cartApi.getCart>>) {
    return response.items.map((item) => ({
      item_id: item.item_id,
      item_name: item.item_name,
      image_url: item.image_url,
      variant_id: item.variant_id,
      variant_name: item.variant_name,
      price: item.unit_price,
      quantity: item.quantity,
      notes: item.notes,
      is_available: true,
    }));
  },
};