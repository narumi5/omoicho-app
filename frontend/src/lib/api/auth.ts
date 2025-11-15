/**
 * 認証関連のAPI呼び出し
 */

import api from '@/lib/axios';
import { handleError } from '../error-handler';

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
    throw new Error(handleError('getMe', error));
  }
}

/**
 * ログアウト
 */
export async function logout(): Promise<void> {
  try {
    await api.post('/api/auth/logout');
  } catch (error) {
    throw new Error(handleError('logout', error));
  }
}
