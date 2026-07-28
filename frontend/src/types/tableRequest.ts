export interface TableRequestCreate {
  customer_name: string;
  customer_mobile: string;
}

export interface TableRequestResponse {
  request_id: number;
  table_id: number;
  customer_name: string;
  customer_mobile: string;
  waiter_id: number | null;
  status: string;
  requested_at: string;
  accepted_at: string | null;
}