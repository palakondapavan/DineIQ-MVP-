import { create } from "zustand";

import type { User } from "@/features/auth/types/auth.types";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;

  setUser: (user: User | null) => void;

  setTokens: (
    accessToken: string,
    refreshToken: string,
  ) => void;

  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  accessToken: null,
  refreshToken: null,

  setUser: (user) =>
    set({
      user,
    }),

  setTokens: (accessToken, refreshToken) =>
    set({
      accessToken,
      refreshToken,
    }),

  clearAuth: () =>
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
    }),
}));