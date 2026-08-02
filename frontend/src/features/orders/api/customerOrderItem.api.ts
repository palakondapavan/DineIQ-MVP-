import { api } from "@/shared/api/client";

export const customerOrderItemApi = {
  /**
   * Update Order Item Quantity
   */
  async updateQuantity(
    itemId: number,
    quantity: number
  ) {
    const { data } = await api.put(
      `/customer/order-items/${itemId}`,
      {
        quantity,
      }
    );

    return data;
  },

  /**
   * Remove Order Item
   */
  async deleteItem(
    itemId: number
  ) {
    const { data } = await api.delete(
      `/customer/order-items/${itemId}`
    );

    return data;
  },
};