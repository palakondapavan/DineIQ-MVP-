export interface CreateCustomerRequest {
  customer_name: string;
  customer_mobile: string;
}

export interface CreateCustomerResponse {
  request_id: number;

  table_id: number;

  customer_name: string;

  customer_mobile: string;

  waiter_id: number | null;

  status: "PENDING";

  requested_at: string;

  accepted_at: string | null;
}