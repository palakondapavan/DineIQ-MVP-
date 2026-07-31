import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { customerService } from "../services/customer.service";
import {
  customerSchema,
  type CustomerFormData,
} from "../schemas/customer.schema";

import { sessionStorage } from "../utils/sessionStorage";

export function useCustomerRequest() {
  const navigate = useNavigate();

  const { tableId } = useParams<{
    tableId: string;
  }>();

  const [serverError, setServerError] =
    useState("");

  const form = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),

    defaultValues: {
      customer_name: "",
      customer_mobile: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (
      data: CustomerFormData
    ) =>
      customerService.createRequest(
        Number(tableId),
        data
      ),

    onSuccess: (response, variables) => {
      console.log(
        "Create Request Success",
        response
      );

      setServerError("");

      /**
       * Save pending request.
       * Session will be created later
       * after waiter accepts.
       */
      sessionStorage.save({
        requestId: response.request_id,

        sessionId: null,

        tableId: response.table_id,

        customerMobile:
          variables.customer_mobile,
      });

      toast.success(
        "Request sent successfully."
      );

      navigate(
        `/customer/menu/${response.request_id}`,
        {
          replace: true,
        }
      );
    },

    onError: (error: any) => {
      console.error(
        "Create Request Error",
        error
      );

      const message =
        error?.response?.data?.detail ??
        error?.message ??
        "Unable to create table request.";

      setServerError(message);

      toast.error(message);
    },
  });

  const onSubmit = form.handleSubmit(
    (data) => {
      mutation.mutate(data);
    }
  );

  return {
    ...form,

    onSubmit,

    isLoading: mutation.isPending,

    serverError,
  };
}