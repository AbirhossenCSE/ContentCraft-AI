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

export interface Content {
  _id: string;
  userId: string;
  type: 'blog' | 'caption' | 'description' | 'newsletter';
  topic: string;
  tone: string;
  length: 'short' | 'medium' | 'long';
  generatedText: string;
  isFavorite: boolean;
  createdAt: string;
}
