import { serialize, parse } from 'cookie';
import { NextRequest, NextResponse } from 'next/server';

const TOKEN_NAME = 'auth_token';

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
  secure: process.env.NODE_ENV === 'production', // 本番環境のみHTTPS必須
  sameSite: 'lax',
  path: '/',
  maxAge: 60 * 60 * 24 * 7, // 7日間
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
