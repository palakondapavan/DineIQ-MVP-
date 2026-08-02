import { AxiosError } from "axios";

import { customerOrderItemApi } from "../api/customerOrderItem.api";

export const customerOrderItemService = {
  /**
   * Update Order Item Quantity
   */
  async updateQuantity(
    itemId: number,
    quantity: number
  ) {
    try {
      return await customerOrderItemApi.updateQuantity(
        itemId,
        quantity
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(
          "Failed to update order item:",
          error.response?.data ??
            error.message
        );
      } else {
        console.error(error);
      }

      throw error;
    }
  },

  /**
   * Remove Order Item
   */
  async deleteItem(
    itemId: number
  ) {
    try {
      return await customerOrderItemApi.deleteItem(
        itemId
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(
          "Failed to delete order item:",
          error.response?.data ??
            error.message
        );
      } else {
        console.error(error);
      }

      throw error;
    }
  },
};