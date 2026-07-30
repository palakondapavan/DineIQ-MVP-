import { authApi } from "../api/auth.api";
import { tokenStorage } from "../utils/token";

import type {
  LoginRequest,
  LoginResponse,
} from "../types/auth.types";

class AuthService {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await authApi.login(data);

    tokenStorage.setAccessToken(response.access_token);

    return response;
  }

  logout(): void {
    tokenStorage.clear();
  }

  isAuthenticated(): boolean {
    return tokenStorage.isAuthenticated();
  }
}

export const authService = new AuthService();