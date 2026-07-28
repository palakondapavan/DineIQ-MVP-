export interface CustomerSessionCreate {
  customer_name: string;
  customer_mobile: string;
  table_id: number;
}

export interface CustomerSessionResponse {
  session_id: number;
  customer_name: string;
  customer_mobile: string;
  table_id: number;
  status: string;
}