import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { authService } from "../services/auth.service";
import { loginSchema } from "../schemas/login.schema";

import type {
  LoginFormData,
  LoginRequest,
} from "../types/auth.types";

export function useLogin() {
  const navigate = useNavigate();

  const [serverError, setServerError] = useState("");

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    mode: "onSubmit",
  });

  const mutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const payload: LoginRequest = {
        email: data.email,
        password: data.password,
      };

      return authService.login(payload);
    },

    onSuccess: () => {
      setServerError("");
      navigate("/welcome");
    },

    onError: (error) => {
      if (axios.isAxiosError(error)) {
        setServerError(
          error.response?.data?.detail ??
            "Invalid email or password"
        );
      } else {
        setServerError("Something went wrong. Please try again.");
      }
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setServerError("");

    try {
      await mutation.mutateAsync(data);
    } catch {
      // Error is already handled by onError
    }
  };

  return {
    register: form.register,
    handleSubmit: form.handleSubmit,
    errors: form.formState.errors,
    isPending: mutation.isPending,
    isSubmitting: form.formState.isSubmitting,
    serverError,
    onSubmit,
  };
}