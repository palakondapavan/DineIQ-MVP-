export type CustomerSessionStatus =
  | "PENDING"
  | "ACTIVE"
  | "REJECTED"
  | "COMPLETED"
  | "CANCELLED";

export interface CustomerSession {
  session_id: number;

  table_id: number;

  customer_name: string;

  customer_mobile: string;

  status: CustomerSessionStatus;

  started_at: string;

  ended_at?: string | null;
}