/**
 * カップル関連のAPI呼び出し
 */

import api from '@/lib/axios';

interface CoupleCreateResponse {
  message: string;
  data: {
    coupleId: string;
    inviteCode: string;
  };
}

interface CoupleJoinResponse {
  message: string;
  data: {
    coupleId: string;
  };
}

interface CoupleData {
  id: string;
  inviteCode: string;
  partner?: {
    id: string;
    name: string;
    email: string;
  } | null;
}

interface CoupleInfoResponse {
  data: CoupleData;
}

/**
 * 新規カップル作成
 */
export async function createCouple(): Promise<CoupleCreateResponse> {
  try {
    const response = await api.post<CoupleCreateResponse>('/api/couples');
    return response.data;
  } catch (error) {
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { data?: { error?: string } } };
      throw new Error(axiosError.response?.data?.error || 'カップル作成に失敗しました');
    }
    throw new Error('カップル作成に失敗しました');
  }
}

/**
 * 招待コードでカップルに参加
 */
export async function joinCouple(inviteCode: string): Promise<CoupleJoinResponse> {
  try {
    const response = await api.post<CoupleJoinResponse>('/api/couples/join', { inviteCode });
    return response.data;
  } catch (error) {
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { data?: { error?: string } } };
      throw new Error(axiosError.response?.data?.error || 'カップル参加に失敗しました');
    }
    throw new Error('カップル参加に失敗しました');
  }
}

/**
 * カップル情報取得
 */
export async function getCoupleInfo(coupleId: string): Promise<CoupleInfoResponse> {
  try {
    const response = await api.get<CoupleInfoResponse>(`/api/couples/${coupleId}`);
    return response.data;
  } catch (error) {
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { data?: { error?: string } } };
      throw new Error(axiosError.response?.data?.error || 'カップル情報の取得に失敗しました');
    }
    throw new Error('カップル情報の取得に失敗しました');
  }
}
