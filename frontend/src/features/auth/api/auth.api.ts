import { api } from "@/shared/api/client";

import type {
  LoginRequest,
  LoginResponse,
} from "../types/auth.types";

export const authApi = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const formData = new URLSearchParams();

    formData.append("username", data.email);
    formData.append("password", data.password);

    const response = await api.post<LoginResponse>(
      "/auth/login",
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data;
  },
};