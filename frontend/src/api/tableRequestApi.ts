import { api } from "./client";

import type {
  TableRequestCreate,
  TableRequestResponse,
} from "@/types/tableRequest";

/**
 * Create a new table request
 */
export async function createTableRequest(
  tableId: number,
  request: TableRequestCreate
): Promise<TableRequestResponse> {
  const { data } = await api.post<TableRequestResponse>(
    `/table-requests/tables/${tableId}/request`,
    request
  );

  return data;
}

/**
 * Get latest status of a table request
 */
export async function getTableRequest(
  requestId: number
): Promise<TableRequestResponse> {
  const { data } = await api.get<TableRequestResponse>(
    `/table-requests/${requestId}`
  );

  return data;
}