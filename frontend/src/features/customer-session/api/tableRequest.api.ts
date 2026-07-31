import { api } from "@/shared/api/client";

export interface TableRequestResponse {
  request_id: number;
  table_id: number;
  customer_name: string;
  customer_mobile: string;
  waiter_id: number | null;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  requested_at: string;
  accepted_at: string | null;
}

export const tableRequestApi = {
  async getRequest(
    requestId: number
  ): Promise<TableRequestResponse> {
    const { data } = await api.get<TableRequestResponse>(
      `/table-requests/${requestId}`
    );

    return data;
  },
};