import { api } from "./client";
import type { CustomerSessionCreate } from "@/types/customer";
export async function createCustomerSession(
  data: CustomerSessionCreate
) {
  const response = await api.post(
    "/customer-sessions",
    data
  );

  return response.data;
}