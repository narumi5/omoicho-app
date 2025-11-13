/**
 * 認証関連のAPI呼び出し
 */

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
  const res = await fetch('/api/auth/me');

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'ユーザー情報の取得に失敗しました');
  }

  return res.json();
}

/**
 * ログアウト
 */
export async function logout(): Promise<void> {
  const res = await fetch('/api/auth/logout', {
    method: 'POST',
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'ログアウトに失敗しました');
  }
}
