/**
 * カップル関連のAPI呼び出し
 */

import api from '@/lib/axios';
import { handleError } from '../error-handler';

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
    throw new Error(handleError('createCouple', error));
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
    throw new Error(handleError('joinCouple', error));
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
    throw new Error(handleError('getCoupleInfo', error));
  }
}
