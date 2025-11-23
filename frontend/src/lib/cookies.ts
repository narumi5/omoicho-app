import { serialize, parse } from 'cookie';
import { NextRequest, NextResponse } from 'next/server';
import { AUTH } from './constants';

const TOKEN_NAME = AUTH.TOKEN_NAME;

export interface CookieOptions {
  maxAge?: number;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  path?: string;
}

/**
 * Cookieのデフォルト設定
 */
const defaultCookieOptions: CookieOptions = {
  httpOnly: true,
  // HTTPS必須（環境変数DISABLE_SECURE_COOKIE=trueで無効化可能）
  secure: process.env.DISABLE_SECURE_COOKIE !== 'true' && process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
  maxAge: AUTH.COOKIE_MAX_AGE,
};

/**
 * レスポンスにCookieをセット
 */
export function setAuthCookie(
  response: NextResponse,
  token: string,
  options: CookieOptions = {}
): void {
  const cookieOptions = { ...defaultCookieOptions, ...options };
  const serialized = serialize(TOKEN_NAME, token, cookieOptions);
  response.headers.append('Set-Cookie', serialized);
}

/**
 * Cookieを削除
 */
export function clearAuthCookie(response: NextResponse): void {
  const serialized = serialize(TOKEN_NAME, '', {
    ...defaultCookieOptions,
    maxAge: 0,
  });
  response.headers.append('Set-Cookie', serialized);
}

/**
 * リクエストからトークンを取得
 */
export function getAuthToken(request: NextRequest): string | null {
  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) return null;

  const cookies = parse(cookieHeader);
  return cookies[TOKEN_NAME] || null;
}
