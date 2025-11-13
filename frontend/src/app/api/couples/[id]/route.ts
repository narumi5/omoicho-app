import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/jwt';

/**
 * カップル情報取得
 * GET /api/couples/:id
 */
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // 認証チェック
    const token = req.cookies.get('auth_token')?.value;
    if (!token) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: '無効なトークンです' }, { status: 401 });
    }

    const { id: coupleId } = await params;

    // カップル情報取得
    const couple = await prisma.couple.findUnique({
      where: { id: coupleId },
      include: {
        users: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!couple) {
      return NextResponse.json({ error: 'カップルが見つかりません' }, { status: 404 });
    }

    // リクエストユーザーがこのカップルに所属しているか確認
    const isMember = couple.users.some((user) => user.id === payload.userId);
    if (!isMember) {
      return NextResponse.json(
        { error: 'このカップルにアクセスする権限がありません' },
        { status: 403 }
      );
    }

    // パートナー情報（自分以外）を取得
    const partner = couple.users.find((user) => user.id !== payload.userId);

    return NextResponse.json({
      data: {
        id: couple.id,
        inviteCode: couple.inviteCode,
        partner: partner || null,
      },
    });
  } catch (error) {
    console.error('Error fetching couple:', error);
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 });
  }
}
