import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/jwt';

/**
 * カップル作成 & 招待コード発行
 * POST /api/couples
 */
export async function POST(req: NextRequest) {
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
