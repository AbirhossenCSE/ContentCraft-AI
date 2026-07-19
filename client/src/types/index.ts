export interface User {
  id: string;
  name: string;
  email: string;
  credits: number;
  createdAt?: string;
}

export interface AuthResponse {
  status?: string;
  token: string;
  user: User;
}
