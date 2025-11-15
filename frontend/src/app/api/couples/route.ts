import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

/**
 * カップル作成 & 招待コード発行
 * POST /api/couples
 */
export async function POST(req: NextRequest) {
  try {
    // 認証チェック
    const auth = requireAuth(req);
    if (auth.error) return auth.error;
    const { user: payload } = auth;

    // ユーザーが既にカップルに所属していないか確認
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user) {
      return NextResponse.json({ error: 'ユーザーが見つかりません' }, { status: 404 });
    }

    if (user.coupleId) {
      return NextResponse.json({ error: '既にカップルに所属しています' }, { status: 400 });
    }

    // カップル作成
    const couple = await prisma.couple.create({
      data: {},
    });

    // ユーザーをカップルに紐付け
    await prisma.user.update({
      where: { id: payload.userId },
      data: { coupleId: couple.id },
    });

    return NextResponse.json(
      {
        message: 'カップルを作成しました',
        data: {
          coupleId: couple.id,
          inviteCode: couple.inviteCode,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating couple:', error);
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 });
  }
}
