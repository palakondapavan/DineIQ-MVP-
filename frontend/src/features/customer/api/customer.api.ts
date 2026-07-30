import { api } from "@/shared/api/client";

import type {
  CreateCustomerRequest,
  CreateCustomerResponse,
} from "../types/customer.types";

export const createTableRequest = async (
  tableId: number,
  data: CreateCustomerRequest
): Promise<CreateCustomerResponse> => {
  const response = await api.post<CreateCustomerResponse>(
    `/table-requests/tables/${tableId}/request`,
    data
  );

  return response.data;
};