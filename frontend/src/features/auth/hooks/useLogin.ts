import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { authService } from "../services/auth.service";

import type {
  LoginFormData,
  LoginRequest,
} from "../types/auth.types";

export function useLogin() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  async function login(data: LoginFormData) {
    try {
      setIsLoading(true);

      const payload: LoginRequest = {
        email: data.email,
        password: data.password,
      };

      await authService.login(payload);

      navigate("/welcome");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.detail ?? "Login failed"
        );
      }

      throw new Error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return {
    login,
    isLoading,
  };
}