import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

/**
 * 招待コードでカップルに参加
 * POST /api/couples/join
 */
export async function POST(req: NextRequest) {
  try {
    // 認証チェック
    const auth = requireAuth(req);
    if (auth.error) return auth.error;
    const { user: payload } = auth;

    const body = await req.json();
    const { inviteCode } = body;

    if (!inviteCode) {
      return NextResponse.json({ error: '招待コードを入力してください' }, { status: 400 });
    }

    // ユーザー確認
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user) {
      return NextResponse.json({ error: 'ユーザーが見つかりません' }, { status: 404 });
    }

    if (user.coupleId) {
      return NextResponse.json({ error: '既にカップルに所属しています' }, { status: 400 });
    }

    // 招待コードでカップル検索
    const couple = await prisma.couple.findUnique({
      where: { inviteCode },
      include: { users: true },
    });

    if (!couple) {
      return NextResponse.json({ error: '無効な招待コードです' }, { status: 404 });
    }

    // カップルは最大2人まで
    if (couple.users.length >= 2) {
      return NextResponse.json({ error: 'このカップルは既に2人です' }, { status: 400 });
    }

    // ユーザーをカップルに参加
    await prisma.user.update({
      where: { id: payload.userId },
      data: { coupleId: couple.id },
    });

    return NextResponse.json({
      message: 'カップルに参加しました',
      data: {
        coupleId: couple.id,
      },
    });
  } catch (error) {
    console.error('Error joining couple:', error);
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 });
  }
}
