import { api } from "@/shared/api/client";

export interface PublicTable {
  table_id: number;
  table_number: string;
  status: "AVAILABLE" | "OCCUPIED";
}

export const publicTableApi = {
  async get(tableId: number): Promise<PublicTable> {
    const { data } = await api.get(
      `/tables/public/${tableId}`
    );

    return data;
  },
};