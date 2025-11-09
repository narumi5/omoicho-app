// API関連の型定義

// 共通APIレスポンス
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

// 日記関連
export interface CreateDiaryInput {
  content: string;
  isPrivate?: boolean;
  images?: string[];
  authorId: string;
  coupleId: string;
}

export interface UpdateDiaryInput {
  content?: string;
  isPrivate?: boolean;
  images?: string[];
}

// カップル関連
export interface CreateCoupleInput {
  userId: string;
}

export interface CreateCoupleResponse {
  coupleId: string;
  inviteCode: string;
}

export interface JoinCoupleInput {
  userId: string;
  inviteCode: string;
}

// ユーザー関連
export interface SignupInput {
  email: string;
  name: string;
  password: string;
}

export interface SignupResponse {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResponse {
  id: string;
  email: string;
  name: string;
  coupleId: string | null;
}
