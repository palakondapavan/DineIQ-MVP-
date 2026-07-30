import { customerApi } from "../api/customer.api";

import type {
  TableRequest,
  TableRequestResponse,
} from "../types/customer.types";

export const customerService = {
  requestTable(
    tableId: number,
    data: TableRequest
  ): Promise<TableRequestResponse> {
    return customerApi.requestTable(tableId, data);
  },
};