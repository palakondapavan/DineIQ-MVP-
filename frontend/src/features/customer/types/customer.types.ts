export interface CreateCustomerRequest {
  customer_name: string;
  customer_mobile: string;
}

export interface CreateCustomerResponse {
  request_id: number;
  table_id: number;
  status: "PENDING";
  message: string;
}