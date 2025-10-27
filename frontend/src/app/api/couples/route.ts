import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * カップル作成 & 招待コード発行
 * POST /api/couples/create
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    // ユーザーが既にカップルに所属していないか確認
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (user.coupleId) {
      return NextResponse.json(
        { error: 'User already belongs to a couple' },
        { status: 400 }
      );
    }

    // カップル作成
    const couple = await prisma.couple.create({
      data: {},
    });

    // ユーザーをカップルに紐付け
    await prisma.user.update({
      where: { id: userId },
      data: { coupleId: couple.id },
    });

    return NextResponse.json({
      coupleId: couple.id,
      inviteCode: couple.inviteCode,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating couple:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
