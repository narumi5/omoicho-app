import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prisma';
import { generateToken } from '@/lib/jwt';
import { setAuthCookie } from '@/lib/cookies';
import type { LoginInput } from '@/types/api';

/**
 * ログイン
 * POST /api/auth/login
 */
export async function POST(req: NextRequest) {
  try {
    const body: LoginInput = await req.json();
    const { email, password } = body;

    // バリデーション
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // ユーザー検索
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
      select: {
        id: true,
        email: true,
        password: true,
        name: true,
        coupleId: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // パスワード検証
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // JWTトークン生成
    const token = generateToken({
      userId: user.id,
      email: user.email,
    });

    // レスポンス作成
    const response = NextResponse.json(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        coupleId: user.coupleId,
      },
      { status: 200 }
    );

    // HttpOnly Cookieにトークンをセット
    setAuthCookie(response, token);

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
