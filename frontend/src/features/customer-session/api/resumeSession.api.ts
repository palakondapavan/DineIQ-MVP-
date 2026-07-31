import { api } from "@/shared/api/client";

export interface ResumeSessionRequest {
  table_id: number;
  customer_mobile: string;
}

export interface ResumeSessionResponse {
  session_id: number;
  table_id: number;
  customer_name: string;
  customer_mobile: string;
  status: string;
  started_at: string;
  ended_at: string | null;
}

export const resumeSessionApi = {
  async resume(
    payload: ResumeSessionRequest
  ): Promise<ResumeSessionResponse> {
    const { data } =
      await api.post<ResumeSessionResponse>(
        "/sessions/resume",
        payload
      );

    return data;
  },
};