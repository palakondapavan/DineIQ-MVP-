import { api } from "@/api/client";
import type { CustomerMenuResponse } from "@/types/customerMenu";

export async function getCustomerMenu(): Promise<CustomerMenuResponse> {
  const { data } = await api.get<CustomerMenuResponse>(
    "/customer/menu"
  );

  return data;
}