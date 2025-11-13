/**
 * カップル関連のAPI呼び出し
 */

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
  const res = await fetch('/api/couples', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'カップル作成に失敗しました');
  }

  return res.json();
}

/**
 * 招待コードでカップルに参加
 */
export async function joinCouple(inviteCode: string): Promise<CoupleJoinResponse> {
  const res = await fetch('/api/couples/join', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ inviteCode }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'カップル参加に失敗しました');
  }

  return res.json();
}

/**
 * カップル情報取得
 */
export async function getCoupleInfo(coupleId: string): Promise<CoupleInfoResponse> {
  const res = await fetch(`/api/couples/${coupleId}`);

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'カップル情報の取得に失敗しました');
  }

  return res.json();
}
