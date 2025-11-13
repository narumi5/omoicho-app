/**
 * 認証関連のAPI呼び出し
 */

import api from '@/lib/axios';

interface UserData {
  id: string;
  email: string;
  name: string;
  coupleId: string | null;
  createdAt: string;
}

interface MeResponse {
  data: UserData;
}

/**
 * 現在のユーザー情報を取得
 */
export async function getMe(): Promise<MeResponse> {
  try {
    const response = await api.get<MeResponse>('/api/auth/me');
    return response.data;
  } catch (error) {
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { data?: { error?: string } } };
      throw new Error(axiosError.response?.data?.error || 'ユーザー情報の取得に失敗しました');
    }
    throw new Error('ユーザー情報の取得に失敗しました');
  }
}

/**
 * ログアウト
 */
export async function logout(): Promise<void> {
  try {
    await api.post('/api/auth/logout');
  } catch (error) {
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { data?: { error?: string } } };
      throw new Error(axiosError.response?.data?.error || 'ログアウトに失敗しました');
    }
    throw new Error('ログアウトに失敗しました');
  }
}
