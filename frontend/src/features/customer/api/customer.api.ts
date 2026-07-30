import { api } from "@/shared/api/client";

import type {
  TableInfo,
  TableRequest,
  TableRequestResponse,
} from "../types/customer.types";

export const customerApi = {
  /**
   * Get table details from QR code
   */
  async getTable(tableId: number): Promise<TableInfo> {
    const response = await api.get<TableInfo>(
      `/tables/${tableId}`
    );

    return response.data;
  },

  /**
   * Send customer table request
   */
  async requestTable(
    tableId: number,
    data: TableRequest
  ): Promise<TableRequestResponse> {
    const response = await api.post<TableRequestResponse>(
      `/table-requests/tables/${tableId}/request`,
      data
    );

    return response.data;
  },
};