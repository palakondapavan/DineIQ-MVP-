export interface TableInfo {
  id: number;
  table_number: number;
  status: string;
  restaurant_name: string;
}

export interface TableRequest {
  customer_name: string;
  customer_mobile: string;
}

export interface TableRequestResponse {
  success: boolean;
  message: string;
  request_id?: number;
}