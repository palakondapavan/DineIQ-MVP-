import { useQuery } from "@tanstack/react-query";
import { getCustomerMenu } from "@/api/customerMenuApi";

export function useCustomerMenu() {
  return useQuery({
    queryKey: ["customer-menu"],
    queryFn: getCustomerMenu,
  });
}