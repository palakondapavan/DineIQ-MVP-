export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: "bearer";
}

export interface User {
  id: number;
  full_name: string;
  email: string;
  mobile: string;
  role: string;
}