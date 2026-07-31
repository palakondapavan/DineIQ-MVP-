import { api } from "@/shared/api/client";

export type TableStatus =
  | "AVAILABLE"
  | "OCCUPIED"
  | "PENDING";

export interface PublicTableResponse {
  table_id: number;
  table_number: string;
  status: TableStatus;
}

export const publicTableApi = {
  async get(tableId: number): Promise<PublicTableResponse> {
    const { data } = await api.get<PublicTableResponse>(
      `/tables/public/${tableId}`
    );

    return data;
  },
};