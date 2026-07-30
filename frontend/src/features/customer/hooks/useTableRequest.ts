import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { customerService } from "../services/customer.service";
import type {
  TableRequest,
  TableRequestResponse,
} from "../types/customer.types";

interface RequestTablePayload {
  tableId: number;
  data: TableRequest;
}

interface ApiError {
  detail?: string;
  message?: string;
}

export function useTableRequest() {
  return useMutation<
    TableRequestResponse,
    AxiosError<ApiError>,
    RequestTablePayload
  >({
    mutationFn: ({ tableId, data }) =>
      customerService.requestTable(tableId, data),
  });
}