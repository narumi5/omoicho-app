import { NextRequest, NextResponse } from 'next/server';
import { getAuthToken } from './cookies';
import { verifyToken, JWTPayload } from './jwt';

/**
 * リクエストから認証済みユーザー情報を取得
 */
export function getAuthUser(request: NextRequest): JWTPayload | null {
  const token = getAuthToken(request);
  if (!token) return null;

  return verifyToken(token);
}

/**
 * 認証が必要なAPIルートで使用するヘルパー関数
 */
export function requireAuth(request: NextRequest):
  | {
      user: JWTPayload;
      error?: never;
    }
  | {
      user?: never;
      error: NextResponse;
    } {
  const user = getAuthUser(request);

  if (!user) {
    return {
      error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
    };
  }

  return { user };
}
