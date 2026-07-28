import { useMutation } from "@tanstack/react-query";
import { createCustomerSession } from "@/api/customerApi";

export function useCreateCustomerSession() {
  return useMutation({
    mutationFn: createCustomerSession,
  });
}