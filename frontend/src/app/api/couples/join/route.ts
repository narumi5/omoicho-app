import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * 招待コードでカップルに参加
 * POST /api/couples/join
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, inviteCode } = body;

    if (!userId || !inviteCode) {
      return NextResponse.json(
        { error: 'userId and inviteCode are required' },
        { status: 400 }
      );
    }

    // ユーザー確認
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

    // 招待コードでカップル検索
    const couple = await prisma.couple.findUnique({
      where: { inviteCode },
      include: { users: true },
    });

    if (!couple) {
      return NextResponse.json({ error: 'Invalid invite code' }, { status: 404 });
    }

    // カップルは最大2人まで
    if (couple.users.length >= 2) {
      return NextResponse.json({ error: 'Couple is full' }, { status: 400 });
    }

    // ユーザーをカップルに参加
    await prisma.user.update({
      where: { id: userId },
      data: { coupleId: couple.id },
    });

    return NextResponse.json({
      message: 'Successfully joined couple',
      coupleId: couple.id,
    });
  } catch (error) {
    console.error('Error joining couple:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
