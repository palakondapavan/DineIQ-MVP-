import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";

import { sessionStorage } from "@/features/customer-session/utils/sessionStorage";

import { customerBillService } from "../services/customerBill.service";

export function usePayBill() {

  const navigate =
    useNavigate();

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: (
      billId: number
    ) =>
      customerBillService.payBill(
        billId
      ),

    onSuccess: () => {

      sessionStorage.clear();

      queryClient.clear();

      navigate(
        "/customer/thank-you",
        {
          replace: true,
        }
      );

    },

  });

}