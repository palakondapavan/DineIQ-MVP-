export type CustomerSessionStatus =
  | "PENDING"
  | "ACCEPTED"
  | "REJECTED"
  | "COMPLETED"
  | "CANCELLED";

export interface CustomerSession {
  request_id: number;

  table_id: number;

  customer_name: string;

  customer_mobile: string;

  status: CustomerSessionStatus;

  created_at: string;

  updated_at?: string;

  accepted_at?: string;

  rejected_at?: string;

  completed_at?: string;
}