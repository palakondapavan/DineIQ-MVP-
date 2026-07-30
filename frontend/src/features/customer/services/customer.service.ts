import { createTableRequest } from "../api/customer.api";
import type {
  CreateCustomerRequest,
  CreateCustomerResponse,
} from "../types/customer.types";

export const customerService = {
  createRequest: (
    tableId: number,
    data: CreateCustomerRequest
  ): Promise<CreateCustomerResponse> =>
    createTableRequest(tableId, data),
};