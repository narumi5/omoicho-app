import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

/**
 * 現在のユーザー情報を取得
 * GET /api/auth/me
 */
export async function GET(req: NextRequest) {
  try {
    // 認証チェック
    const auth = requireAuth(req);
    if (auth.error) return auth.error;

    // ユーザー情報を取得
    const user = await prisma.user.findUnique({
      where: { id: auth.user.userId },
      select: {
        id: true,
        email: true,
        name: true,
        coupleId: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
