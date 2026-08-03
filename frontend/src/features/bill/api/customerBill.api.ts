import { api } from "@/shared/api/client";

import type {
  CustomerBill,
} from "../types/customerBill.types";

export const customerBillApi = {
  /**
   * Get Customer Bill
   */
  async getBill(
    sessionId: number
  ): Promise<CustomerBill> {
    const { data } =
      await api.get(
        `/customer/bill/${sessionId}`
      );

    return data;
  },

  /**
   * Pay Bill
   */
  async payBill(
    billId: number
  ): Promise<CustomerBill> {    
    const { data } =
      await api.put(
        `/customer/bill/${billId}/pay`
      );

    return data;
  },
};